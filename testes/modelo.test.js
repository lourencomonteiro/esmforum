const bd = require('../bd/bd_utils.js');
const modelo = require('../modelo.js');

beforeEach(() => {
  bd.reconfig('./bd/esmforum-teste.db');
  // limpa dados de todas as tabelas
  bd.exec('delete from perguntas', []);
  bd.exec('delete from respostas', []);
});

test('Testando banco de dados vazio', () => {
  expect(modelo.listar_perguntas().length).toBe(0);
});

test('Testando cadastro de três perguntas', () => {
  modelo.cadastrar_pergunta('1 + 1 = ?');
  modelo.cadastrar_pergunta('2 + 2 = ?');
  modelo.cadastrar_pergunta('3 + 3 = ?');
  const perguntas = modelo.listar_perguntas(); 
  expect(perguntas.length).toBe(3);
  expect(perguntas[0].texto).toBe('1 + 1 = ?');
  expect(perguntas[1].texto).toBe('2 + 2 = ?');
  expect(perguntas[2].num_respostas).toBe(0);
  expect(perguntas[1].id_pergunta).toBe(perguntas[2].id_pergunta-1);
});

test('Testando cadastrar três respostas', () => {
  modelo.cadastrar_pergunta('1 + 1 = ?');
  modelo.cadastrar_pergunta('2 + 2 = ?');
  
  const ids = modelo.listar_perguntas();

  modelo.cadastrar_resposta(ids[0].id_pergunta, '2');
  modelo.cadastrar_resposta(ids[1].id_pergunta, '4');
  modelo.cadastrar_resposta(ids[1].id_pergunta, '>3');

  const num_respostas0 = modelo.get_num_respostas(ids[0].id_pergunta);
  const num_respostas1 = modelo.get_num_respostas(ids[1].id_pergunta); 
  const respostas0 = modelo.get_respostas(ids[0].id_pergunta);
  const respostas1 = modelo.get_respostas(ids[1].id_pergunta);
  

  expect(num_respostas0).toBe(1);
  expect(num_respostas1).toBe(2);
  expect(respostas0[0].texto).toBe('2');
  expect(respostas1[0].texto).toBe('4');
  expect(respostas1[1].texto).toBe('>3');

})


test('Testando get pergunta', () => {
  modelo.cadastrar_pergunta('1 + 1 = ?');
  modelo.cadastrar_pergunta('2 + 2 = ?');

  const ids = modelo.listar_perguntas();

  const get1 = modelo.get_pergunta(ids[0].id_pergunta);
  const get2 = modelo.get_pergunta(ids[1].id_pergunta);

  expect(get1.texto).toBe('1 + 1 = ?');
  expect(get2.texto).toBe('2 + 2 = ?');

})

