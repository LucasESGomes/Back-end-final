function registro (){   
    console.log("enviar")
    var nome = document.getElementById('nome').value
    var sobrenome = document.getElementById('sobrenome').value
    var senha = document.getElementById('senha').value
    var username = document.getElementById('username').value
    
    fetch(`http://localhost:3000/registro`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({nome: nome,  sobrenome: sobrenome, senha:senha, username: username})
    }).then(resposta => resposta.JSON()).then(dados => {
        const registro = document.getElementById('registro')
       
    })
}