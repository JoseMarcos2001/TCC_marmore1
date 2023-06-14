const {
    submitForm,
    saveMessages,
    getElementValue,
    resetForm,
  } = require('./scriptClient.js'); 
  
  describe('submitForm', () => {
    test('deve chamar a função saveCallback com os argumentos corretos', () => {
      const name = 'John Doe';
      const email = 'johndoe@example.com';
      const cpf = '123456789';
      const phone = '1234567890';
      const endereco = '123 Main St';
  
      const saveCallbackMock = jest.fn();
  
      submitForm(name, email, cpf, phone, endereco, saveCallbackMock);
  
      expect(saveCallbackMock).toHaveBeenCalledWith(name, email, cpf, phone, endereco);
    });
  });
  
  describe('saveMessages', () => {
    test('deve salvar as mensagens no banco de dados', () => {
      const name = 'John Doe';
      const email = 'johndoe@example.com';
      const cpf = '123456789';
      const phone = '1234567890';
      const endereco = '123 Main St';
  
      const dbRefMock = {
        push: jest.fn().mockReturnThis(),
        set: jest.fn(),
      };
  
      saveMessages(name, email, cpf, phone, endereco, dbRefMock);
  
      expect(dbRefMock.push).toHaveBeenCalled();
      expect(dbRefMock.set).toHaveBeenCalledWith({
        name: name,
        emailid: email,
        cpf: cpf,
        phone: phone,
        endereco: endereco,
      });
    });
  });
  
  