const firebaseConfig = {
    apiKey: "AIzaSyCV2Eu8UdJX2_9FYVLFTV4aF_hLQJ4Edj8",
    authDomain: "marmore-9e301.firebaseapp.com",
    databaseURL: "https://marmore-9e301-default-rtdb.firebaseio.com",
    projectId: "marmore-9e301",
    storageBucket: "marmore-9e301.appspot.com",
    messagingSenderId: "213981622362",
    appId: "1:213981622362:web:2638b873284157c055e863"
  };
  
  // initialize firebase
  firebase.initializeApp(firebaseConfig);

  // reference your database
  var clienteFormDB = firebase.database().ref("clienteForm");
  
  document.getElementById("clienteForm").addEventListener("submit", submitForm);
  
  function submitForm(e) {
    e.preventDefault();
  
    var name = getElementVal("name");
    var emailid = getElementVal("emailid");
    var cpf = getElementVal("cpf");
    var phone = getElementVal("phone");
    var endereco = getElementVal("endereco");
  
    saveMessages(name,phone, emailid,cpf,endereco);
  
    //   enable alert
    
  
    //   reset the form
    alert("Cliente cadastrado(a)!");
    document.getElementById("clienteForm").reset();
  }
  
  const saveMessages = (name,phone, emailid, cpf,endereco) => {
    var newClienteForm = clienteFormDB.push();
  
    newClienteForm.set({
      name: name,
      phone: phone,
      emailid: emailid,
      cpf: cpf,
      endereco: endereco,
    });
  };
  
  const getElementVal = (id) => {
    return document.getElementById(id).value;
  };
  
  
  