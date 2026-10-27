import {DatabaseSync} from 'node:sqlite';
import {readFileSync} from 'node:fs';
// Adaptador D1/SQLite para executar o mesmo serviço no desenvolvimento e nos testes.
export function openQuizDatabase(filename=':memory:'){
 const sqlite=new DatabaseSync(filename);sqlite.exec('PRAGMA foreign_keys = ON');
 if(!sqlite.prepare("SELECT name FROM sqlite_master WHERE name = 'quiz_rooms'").get())sqlite.exec(readFileSync(new URL('./quiz-schema.sql',import.meta.url),'utf8'));
 function prepare(sql){let args=[];const api={bind(...values){args=values;return api;},async first(){return sqlite.prepare(sql).get(...args)||null;},async all(){return {results:sqlite.prepare(sql).all(...args)};},async run(){const result=sqlite.prepare(sql).run(...args);return {success:true,meta:{changes:Number(result.changes)}};}};return api;}
 return {prepare,close:()=>sqlite.close(),sqlite};
}
