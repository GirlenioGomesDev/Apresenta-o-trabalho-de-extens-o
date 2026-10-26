/* Funções independentes da interface: também podem ser verificadas com Node. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.WorkshopLogic = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  function resolveIndex(hash, ids) {
    let id;
    try { id = decodeURIComponent(String(hash).replace(/^#/, '')); }
    catch (_) { return 0; }
    const index = ids.indexOf(id);
    return index >= 0 ? index : 0;
  }

  function clampIndex(index, count) {
    if (!Number.isInteger(index) || count < 1) return 0;
    return Math.max(0, Math.min(index, count - 1));
  }

  function scoreQuiz(questions, answers) {
    return questions.reduce((score, question, index) => score + (answers[index] === question.correct ? 1 : 0), 0);
  }

  function recordAnswer(answers, index, answer, questions) {
    if (!Number.isInteger(index) || !questions[index] || answers[index] != null) return answers;
    if (!Number.isInteger(answer) || answer < 0 || answer >= questions[index].options.length) return answers;
    const updated = answers.slice();
    updated[index] = answer;
    return updated;
  }

  function canEdit(role) { return role === 'editor'; }

  function formatTime(seconds) {
    const safe = Math.max(0, Math.floor(Number(seconds) || 0));
    return String(Math.floor(safe / 60)).padStart(2, '0') + ':' + String(safe % 60).padStart(2, '0');
  }

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  }

  function buildPreview({ html, css, js, stage, token }) {
    // A prévia tem origem opaca (sandbox sem allow-same-origin) e não pode fazer requisições.
    // O código editado nunca é inserido no DOM da apresentação.
    const styles = stage >= 2 ? String(css).replace(/<\/style/gi, '<\\/style') : '';
    const script = stage >= 3 ? String(js).replace(/<\/script/gi, '<\\/script') : '';
    const safeToken = JSON.stringify(String(token)).replace(/</g, '\\u003c');
    const report = `
      (function(){
        function send(kind,message,level){parent.postMessage({kind:kind,token:${safeToken},message:String(message).slice(0,600),level:level},'*')}
        function format(value){if(typeof value==='string')return value;try{var text=JSON.stringify(value);return text===undefined?String(value):text}catch(_){return String(value)}}
        ['log','info','warn','error'].forEach(function(level){console[level]=function(){send('workshop-console',Array.from(arguments).map(format).join(' '),level)}});
        window.addEventListener('error',function(event){send('workshop-error',event.message,'error')});
        window.addEventListener('unhandledrejection',function(event){send('workshop-error',String(event.reason),'error')});
      })();`;
    return '<!doctype html><html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src \'none\'; script-src \'unsafe-inline\'; style-src \'unsafe-inline\'; img-src data:; connect-src \'none\'; form-action \'none\'; base-uri \'none\'"><script>' + report + '</script><style>' + styles + '</style></head><body>' + String(html) + '<script>' + script + '</script></body></html>';
  }

  return { resolveIndex, clampIndex, scoreQuiz, recordAnswer, canEdit, formatTime, escapeHTML, buildPreview };
});
