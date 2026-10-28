const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');

function formDemo(){
  const context={window:{}};
  for(const name of ['content.js','course-data.js'])vm.runInNewContext(fs.readFileSync(path.join(root,'assets',name),'utf8'),context);
  const handlers={};
  const field={value:'',minLength:3,required:true,validationMessage:'',setCustomValidity(message){this.validationMessage=message;},addEventListener(name,fn){handlers['field:'+name]=fn;}};
  // Valores preenchidos por script/autofill podem não ativar tooShort no navegador.
  const form={reportValidity:()=>!field.validationMessage,addEventListener(name,fn){handlers['form:'+name]=fn;}};
  const output={textContent:''};
  const button={addEventListener(name,fn){handlers['button:'+name]=fn;}};
  const elements={'#perfil':form,'#apelido':field,'#saida':output,'#validar':button};
  vm.runInNewContext(context.window.WorkshopCourse.experiments['lab-html-form'].support.js,{document:{querySelector:selector=>elements[selector]}});
  return {field,output,handlers};
}

test('o formulário acompanha a mudança do mínimo mesmo sem tooShort nativo',()=>{
  const {field,output,handlers}=formDemo();
  field.value='Ana';handlers['button:click']();assert.match(output.textContent,/campo válido/);
  field.minLength=5;handlers['button:click']();assert.equal(output.textContent,'Use pelo menos 5 caracteres.');
  field.value='Alice';handlers['field:input']();handlers['button:click']();assert.equal(output.textContent,'Alice: campo válido!');
});
test('editar o campo limpa a confirmação anterior e o erro de validação',()=>{
  const {field,output,handlers}=formDemo();
  field.value='Alice';handlers['button:click']();
  field.value='A';handlers['field:input']();assert.equal(output.textContent,'');assert.equal(field.validationMessage,'');
  handlers['button:click']();assert.match(output.textContent,/pelo menos 3/);
});
test('um campo obrigatório vazio apresenta um motivo visível',()=>{
  const {output,handlers}=formDemo();handlers['button:click']();
  assert.equal(output.textContent,'Preencha o apelido antes de testar.');
});
test('o envio pelo formulário valida localmente e impede navegação',()=>{
  const {field,output,handlers}=formDemo();let prevented=false;field.value='Alice';
  handlers['form:submit']({preventDefault(){prevented=true;}});
  assert.equal(prevented,true);assert.equal(output.textContent,'Alice: campo válido!');
});
