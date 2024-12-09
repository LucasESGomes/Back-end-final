function registro (){   
    console.log("enviar")
    var nome = document.getElementById('nome').value
    var sobrenome = document.getElementById('sobrenome').value
    var rg = document.getElementById('rg').value
    var email = document.getElementById('email').value
    var senha = document.getElementById('senha').value

    // Verifica se campos estão vazios
  if (!email || !senha) {
    erroElement.innerHTML = "Usuário ou senha faltando.";
    return;
  }

  // Define o role com base na senha
  const role = senha.startsWith("adm") ? "admin" : "user";

  // Cria o objeto do usuário
  const novoUsuario = {
    email: email,
    senha: senha,
    role: role
  };

  // Faz o POST para o JSON Server
  fetch("http://localhost:3000/registro", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(novoUsuario)
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao cadastrar o usuário.");
      }
      return response.json();
    })
    .then((dados) => {
      alert(`Usuário ${dados.username} cadastrado com sucesso como ${dados.role}!`);
      // Limpa os campos após o cadastro
      document.getElementById("email").value = "";
      document.getElementById("senha").value = "";
    })
    
    fetch(`http://localhost:3000/registro`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({nome: nome,  sobrenome: sobrenome, rg: rg, email: email, senha: senha})
    }).then(resposta => resposta.JSON()).then(dados => {
        const registro = document.getElementById('registro')
    })
}