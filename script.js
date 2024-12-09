localStorage.clear();

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault(); // Previne o comportamento padrão do formulário

  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();
  const erroElement = document.getElementById("erro");
  erroElement.innerHTML = "";

  // Verifica se campos estão vazios
  if (!email || !senha) {
    erroElement.innerHTML = "E-mail ou senha faltando.";
    return;
  }

  // Faz o fetch para buscar os registros no backend
  fetch("http://localhost:3000/registro") // URL do backend
    .then((resposta) => {
      if (!resposta.ok) {
        throw new Error("Erro ao acessar o servidor.");
      }
      return resposta.json();
    })
    .then((registros) => {
      // Filtra para encontrar a conta correspondente
      const conta = registros.find(
        (c) => c.email === email && c.senha === senha
      );

      if (conta) {
        // Verifica o tipo de usuário pelo campo "role"
        if (conta.role === "admin") {
          alert(`Bem-vindo, administrador ${conta.nome}`);
          localStorage.setItem("nome", conta.nome);
          localStorage.setItem("sobrenome", conta.sobrenome);
          window.location.href = "/adm/adm.html"; // Redireciona para a página de administrador
        } else if (conta.role === "user") {
          alert(`Bem-vindo, ${conta.nome}`);
          localStorage.setItem("nome", conta.nome);
          localStorage.setItem("sobrenome", conta.sobrenome);
          window.location.href = "/home/home.html"; // Redireciona para a página de usuário comum
        } else {
          alert("Tipo de usuário desconhecido.");
        }
      } else {
        erroElement.innerHTML = "Usuário ou senha inválidos.";
      }
    })
    .catch((erro) => {
      console.error("Erro:", erro);
      erroElement.innerHTML = "Erro ao acessar o servidor. Tente novamente mais tarde.";
    });
});
