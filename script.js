localStorage.clear();

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault(); // Previne o comportamento padrão do formulário

  const username = document.getElementById("username").value.trim() || "";
  const senha = document.getElementById("senha").value.trim() || "";
  document.getElementById("erro").innerHTML = "";

  // Verifica se campos estão vazios
  if (username === "" || senha === "") {
    document.getElementById("erro").innerHTML = "Usuário ou senha faltando";
    return;
  }

  // Faz o fetch para buscar os registros no backend
  fetch("http://localhost:3000/registro") // URL do backend
    .then((resposta) => resposta.json())
    .then((registros) => {
      // Filtra para encontrar a conta correspondente
      const conta = registros.find(
        (c) => c.username === username && c.senha === senha
      );

      if (senha.startsWith("adm")) {
        // Verifica se a senha começa com "adm"
        alert(`Bem-vindo administrador, ${username}`);
        window.location.href = "http://127.0.0.1:5500/adm/adm.html"; // Redireciona para a página de administrador
        localStorage.setItem("nome", conta.nome);
        localStorage.setItem("sobrenome", conta.sobrenome);

        // Armazena dados do administrador no localStorage
        if (conta) {
          localStorage.setItem("nome", conta.nome);
          localStorage.setItem("sobrenome", conta.sobrenome);
        }
      } else if (conta) {
        // Caso seja um usuário comum
        localStorage.setItem("nome", conta.nome);
        localStorage.setItem("sobrenome", conta.sobrenome);
        window.location.href = "/home/home.html"; // Redireciona para a página de usuário
      } else {
        // Caso nenhum registro seja encontrado
        alert("Nome ou senha inválidos");
      }
    })
    .catch((erro) => {
      console.error("Erro ao buscar registros:", erro);
      document.getElementById("erro").innerHTML = "Erro ao acessar o servidor.";
    });
});
