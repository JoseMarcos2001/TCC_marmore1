const { lerBD, pesquisar, desenhar } = require('./programa/tela_inicial/orcamento/script.js'); 


const localStorageMock = (() => {
  let store = {};

  return {
    getItem: (key) => store[key],
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();


Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('lerBD', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('deve ler dados do armazenamento local e atualizar listaRegistros', () => {
    const data = JSON.stringify({ usuarios: [{ id: 1, nome: 'John', fone: '123456789' }] });
    localStorage.setItem(KEY_BD, data);

    lerBD();

    expect(listaRegistros).toEqual({ usuarios: [{ id: 1, nome: 'John', fone: '123456789' }] });
  });

  test('não deve fazer nada se os dados não existirem no armazenamento local', () => {
    lerBD();

    expect(listaRegistros).toEqual({ usuarios: [] });
  });
});

describe('pesquisar', () => {
  beforeEach(() => {
    FILTRO = '';
  });

  test('deve definir a variável FILTRO com o valor fornecido', () => {
    pesquisar('John');

    expect(FILTRO).toBe('John');
  });
});

describe('desenhar', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <table>
        <tbody id="listaRegistrosBody"></tbody>
      </table>
    `;
    listaRegistros = {
      usuarios: [
        { id: 1, nome: 'John', fone: '123456789' },
        { id: 2, nome: 'Jane', fone: '987654321' },
      ],
    };
  });

  test('deve renderizar todos os dados quando o FILTRO estiver vazio', () => {
    desenhar();

    const tbody = document.getElementById('listaRegistrosBody');
    expect(tbody.innerHTML).toContain('<td>1</td>');
    expect(tbody.innerHTML).toContain('<td>John</td>');
    expect(tbody.innerHTML).toContain('<td>123456789</td>');
    expect(tbody.innerHTML).toContain('<td>2</td>');
    expect(tbody.innerHTML).toContain('<td>Jane</td>');
    expect(tbody.innerHTML).toContain('<td>987654321</td>');
  });

  test('deve renderizar os dados filtrados quando o FILTRO não estiver vazio', () => {
    FILTRO = 'John';

    desenhar();

    const tbody = document.getElementById('listaRegistrosBody');
    expect(tbody.innerHTML).toContain('<td>1</td>');
    expect(tbody.innerHTML).toContain('<td>John</td>');
    expect(tbody.innerHTML).toContain('<td>123456789</td>');
    expect(tbody.innerHTML).not.toContain('<td>2</td>');
    expect(tbody.innerHTML).not.toContain('<td>Jane</td>');
    expect(tbody.innerHTML).not.toContain('<td>987654321</td>');
  });
});
