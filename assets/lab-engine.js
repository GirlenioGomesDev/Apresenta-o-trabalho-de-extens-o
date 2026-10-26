/* Executor dos laboratórios de funções. Isolado da apresentação e sem rede. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.LiveLabEngine = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  // Esta função é serializada em um Worker dentro de um iframe de origem opaca.
  function workerMain() {
    self.onmessage = function (event) {
      const logs = [];
      let output;
      const format = value => {
        if (typeof value === 'string') return value.slice(0, 500);
        try { const text=JSON.stringify(value); return (text===undefined ? String(value) : text).slice(0, 500); }
        catch (_) { return String(value).slice(0, 500); }
      };
      const consoleProxy = {};
      ['log', 'info', 'warn', 'error'].forEach(level => {
        consoleProxy[level] = (...values) => {
          if (logs.length < 30) logs.push({ level, text: values.map(format).join(' ') });
        };
      });
      try {
        const mostrar = value => { output = value; };
        const run = new Function('entrada', 'console', 'mostrar', '"use strict";\n' + event.data.code);
        run(event.data.input, consoleProxy, mostrar);
        if (output === undefined) throw new Error('Use mostrar({ ... }) para enviar um resultado ao cenário.');
        const serialized = JSON.stringify(output);
        if (!serialized || serialized.length > 20000) throw new Error('O resultado deve ser um objeto pequeno.');
        self.postMessage({ ok: true, output: JSON.parse(serialized), logs });
      } catch (error) {
        self.postMessage({ ok: false, error: String(error.message || error).slice(0, 350), logs });
      }
    };
  }

  function runnerMain(token, source) {
    let worker;
    let timer;
    let currentId;
    const send = data => parent.postMessage(Object.assign({ kind: 'function-lab', token, requestId: currentId }, data), '*');
    window.addEventListener('message', event => {
      if (event.source !== parent || !event.data || event.data.token !== token || event.data.kind !== 'run-function-lab') return;
      if (worker) worker.terminate();
      clearTimeout(timer);
      currentId = event.data.requestId;
      const url = URL.createObjectURL(new Blob([source], { type: 'text/javascript' }));
      try {
        const activeWorker = new Worker(url);
        worker = activeWorker;
        URL.revokeObjectURL(url);
        activeWorker.onmessage = result => { if (worker !== activeWorker) return; clearTimeout(timer); activeWorker.terminate(); send(result.data); };
        activeWorker.onerror = error => { if (worker !== activeWorker) return; clearTimeout(timer); activeWorker.terminate(); send({ ok: false, error: error.message || 'Não foi possível executar o exemplo.', logs: [] }); };
        timer = setTimeout(() => {
          worker.terminate();
          send({ ok: false, error: 'Execução interrompida após 1 segundo. Confira se há um loop que não termina.', logs: [] });
        }, 1000);
        worker.postMessage({ code: String(event.data.code).slice(0, 20000), input: event.data.input });
      } catch (error) {
        URL.revokeObjectURL(url);
        send({ ok: false, error: String(error.message), logs: [] });
      }
    });
    send({ ready: true });
  }

  function buildRunnerDocument(token) {
    const safe = value => JSON.stringify(value).replace(/</g, '\\u003c');
    const workerSource = '(' + workerMain.toString() + ')();';
    const script = '(' + runnerMain.toString() + ')(' + safe(token) + ',' + safe(workerSource) + ');';
    return '<!doctype html><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="default-src \'none\'; script-src \'unsafe-inline\' \'unsafe-eval\' blob:; worker-src blob:; connect-src \'none\'; form-action \'none\'; base-uri \'none\'"><script>' + script + '</script>';
  }

  // Valida o contrato de cada visualização. O código editado só devolve dados.
  function validateOutput(id, value) {
    if (!value || typeof value !== 'object') throw new Error('Envie um objeto para mostrar({ ... }).');
    if (id === 'software') {
      if (!Number.isFinite(value.pontos) || Math.abs(value.pontos) > 999999) throw new Error('O campo pontos precisa ser um número entre -999999 e 999999.');
      return { pontos: value.pontos };
    }
    if (id === 'infra') {
      if (!['rede', 'servidor', 'online'].includes(value.status)) throw new Error('Use um destes status: "rede", "servidor" ou "online".');
      return { status: value.status };
    }
    if (id === 'dados') {
      if (!Array.isArray(value.valores) || value.valores.length !== 3 || !value.valores.every(n => Number.isFinite(n) && n >= 0 && n <= 9999)) throw new Error('Envie três valores numéricos de 0 a 9999 em valores.');
      if (!Number.isFinite(value.total)) throw new Error('O campo total precisa ser numérico.');
      return { valores: value.valores, total: value.total };
    }
    if (id === 'cyber') {
      if (typeof value.permitido !== 'boolean') throw new Error('O campo permitido precisa ser true ou false.');
      return { permitido: value.permitido };
    }
    throw new Error('Laboratório desconhecido.');
  }

  return { workerMain, buildRunnerDocument, validateOutput };
});
