const assert = require('chai').assert;

// Função que valida o campo de nome
function validateName(name) {
  // Lógica de validação do nome
  return name && typeof name === 'string' && name.trim().length > 0;
}

// Teste de unidade
describe('Name Field', function() {
  it('deve retornar true quando um nome válido é fornecido', function() {
    const validName = 'Daniel';
    const isValid = validateName(validName);
    assert.isTrue(isValid);
  });

  it('deve retornar false quando um nome inválido é fornecido', function() {
    const invalidName = '12345';
    const isValid = validateName(invalidName);
    assert.isFalse(isValid);
  });

  it('deve retornar false quando um nome vazio é fornecido', function() {
    const emptyName = '';
    const isValid = validateName(emptyName);
    assert.isFalse(isValid);
  });
});