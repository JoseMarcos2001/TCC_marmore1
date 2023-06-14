const firebase = require('firebase');
const { initializeApp } = require('firebase/app');
const { database } = require('firebase/database');


jest.mock('firebase/app', () => {
  return {
    initializeApp: jest.fn(),
  };
});
jest.mock('firebase/database', () => {
  return {
    database: jest.fn(),
  };
});


const {
  submitForm,
  saveMessages,
  getElementVal,
} = require('./script.js'); 
describe('submitForm', () => {
  beforeEach(() => {
    
    initializeApp.mockClear();
    database.mockClear();
  });

  test('deve salvar os dados do formulário no banco de dados', () => {
    
    const name = 'John Doe';
    const phone = '1234567890';
    const emailid = 'johndoe@example.com';
    const passwordid = 'password123';

    
    document.body.innerHTML = `
      <form id="funcionarioForm">
        <input id="name" type="text" value="${name}">
        <input id="phone" type="text" value="${phone}">
        <input id="emailid" type="email" value="${emailid}">
        <input id="passwordid" type="password" value="${passwordid}">
      </form>
    `;
    const form = document.getElementById('funcionarioForm');
    form.addEventListener = jest.fn();

    
    submitForm(new Event('submit'));

    
    expect(form.addEventListener).toHaveBeenCalledWith('submit', expect.any(Function));
    expect(form.addEventListener.mock.calls[0][1].name).toBe('submitForm');
    expect(form.addEventListener.mock.calls[0][2]).toBe(false);

    
    expect(initializeApp).toHaveBeenCalledWith({
        apiKey: "AIzaSyCV2Eu8UdJX2_9FYVLFTV4aF_hLQJ4Edj8",
        authDomain: "marmore-9e301.firebaseapp.com",
        databaseURL: "https://marmore-9e301-default-rtdb.firebaseio.com",
        projectId: "marmore-9e301",
        storageBucket: "marmore-9e301.appspot.com",
        messagingSenderId: "213981622362",
        appId: "1:213981622362:web:2638b873284157c055e863",
    });

    
    expect(database).toHaveBeenCalledWith().ref('funcionarioForm');

    
    expect(saveMessages).toHaveBeenCalledWith(name, phone, emailid, passwordid);
  });
});
