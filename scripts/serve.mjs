import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mkdirSync } from 'node:fs';
import { handleQuizRequest } from '../server/quiz-service.mjs';
import { openQuizDatabase } from '../server/quiz-local-db.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
mkdirSync(path.join(root,'.quiz'),{recursive:true});
const quizDatabase=openQuizDatabase(path.join(root,'.quiz','local.sqlite'));
const portArgument = process.argv.indexOf('--port');
const port = Number(portArgument >= 0 ? process.argv[portArgument + 1] : process.env.PORT || 5173);
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Porta inválida.');
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.jpg': 'image/jpeg', '.ttf':'font/ttf', '.txt':'text/plain; charset=utf-8', '.svg': 'image/svg+xml', '.json': 'application/json; charset=utf-8' };

http.createServer(async (request, response) => {
  try {
    const requestURL=new URL(request.url,'http://'+(request.headers.host||'localhost'));
    if(requestURL.pathname.startsWith('/api/quiz/')){
      const chunks=[];let size=0;
      for await(const chunk of request){size+=chunk.length;if(size>4096){response.writeHead(413);response.end('Pedido muito grande');return;}chunks.push(chunk);}
      const method=request.method||'GET',raw=Buffer.concat(chunks);
      const result=await handleQuizRequest(new Request(requestURL,{method,headers:request.headers,...(!['GET','HEAD'].includes(method)&&raw.length?{body:raw}:{} )}),{DB:quizDatabase});
      response.writeHead(result.status,Object.fromEntries(result.headers));response.end(Buffer.from(await result.arrayBuffer()));return;
    }
    if (!['GET', 'HEAD'].includes(request.method)) {
      response.writeHead(405, { Allow: 'GET, HEAD' }); response.end(); return;
    }
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const relative = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
    const resolved = path.resolve(root, relative);
    const inside = path.relative(root, resolved);
    if (inside.startsWith('..') || path.isAbsolute(inside) || inside.split(path.sep).some(part => part.startsWith('.'))) {
      response.writeHead(403); response.end('Acesso negado'); return;
    }
    // O servidor de desenvolvimento serve somente arquivos públicos da apresentação.
    if (!(['index.html','competicao.html'].includes(relative) || /^assets\/[\w.-]+$/.test(relative))) {
      response.writeHead(404); response.end('Arquivo não encontrado'); return;
    }
    const bytes = await readFile(resolved);
    response.writeHead(200, { 'Content-Type': mime[path.extname(resolved)] || 'application/octet-stream', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
    response.end(request.method === 'HEAD' ? undefined : bytes);
  } catch (_) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Arquivo não encontrado');
  }
}).listen(port, '0.0.0.0', () => console.log(`Apresentação disponível na porta ${port}.`));
