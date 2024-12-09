document.addEventListener("DOMContentLoaded", () => {
    const tabelaUsuarios = document.querySelector("#tabela-usuarios tbody");
    const formEdicao = document.getElementById("form-edicao");
    const editarForm = document.getElementById("editar-form");

    // Função para carregar os usuários
    function carregarUsuarios() {
        fetch("http://localhost:3000/registro")
            .then((res) => res.json())
            .then((usuarios) => {
                tabelaUsuarios.innerHTML = ""; // Limpa a tabela
                usuarios.forEach((usuario) => {
                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                        <td>${usuario.id}</td>
                        <td>${usuario.nome}</td>
                        <td>${usuario.sobrenome}</td>
                        <td>${usuario.rg}</td>
                        <td>${usuario.email}</td>
                        <td>${usuario.senha}</td>
                        <td>${usuario.role}</td>
                        <td>
                            <button class="editar" data-id="${usuario.id}">Editar</button>
                            <button class="deletar" data-id="${usuario.id}">Deletar</button>
                        </td>
                    `;
                    tabelaUsuarios.appendChild(tr);
                });

                // Adiciona eventos aos botões
                document.querySelectorAll(".editar").forEach((btn) =>
                    btn.addEventListener("click", abrirFormularioEdicao)
                );
                document.querySelectorAll(".deletar").forEach((btn) =>
                    btn.addEventListener("click", deletarUsuario)
                );
            })
            .catch((erro) => console.error("Erro ao carregar usuários:", erro));
    }

    // Função para abrir o formulário de edição
    function abrirFormularioEdicao(e) {
        const id = e.target.dataset.id;
        fetch(`http://localhost:3000/registro/${id}`)
            .then((res) => res.json())
            .then((usuario) => {
                document.getElementById("edit-id").value = usuario.id;
                document.getElementById("edit-nome").value = usuario.nome;
                document.getElementById("edit-sobrenome").value = usuario.sobrenome;
                document.getElementById("edit-rg").value = usuario.rg;
                document.getElementById("edit-email").value = usuario.email;
                document.getElementById("edit-senha").value = usuario.senha;
                document.getElementById("edit-role").value = usuario.role;

                formEdicao.style.display = "block";
            })
            .catch((erro) => console.error("Erro ao buscar usuário:", erro));
    }

    // Função para salvar as alterações
    editarForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const id = document.getElementById("edit-id").value;
        const usuarioAtualizado = {
            nome: document.getElementById("edit-nome").value,
            sobrenome: document.getElementById("edit-sobrenome").value,
            rg: document.getElementById("edit-rg").value,
            email: document.getElementById("edit-email").value,
            senha: document.getElementById("edit-senha").value,
            role: document.getElementById("edit-role").value
        };

        fetch(`http://localhost:3000/registro/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuarioAtualizado)
        })
            .then(() => {
                alert("Usuário atualizado com sucesso!");
                formEdicao.style.display = "none";
                carregarUsuarios();
            })
            .catch((erro) => console.error("Erro ao atualizar usuário:", erro));
    });

    // Função para deletar um usuário
    function deletarUsuario(e) {
        const id = e.target.dataset.id;
        fetch(`http://localhost:3000/registro/${id}`, {
            method: "DELETE"
        })
            .then(() => {
                alert("Usuário deletado com sucesso!");
                carregarUsuarios();
            })
            .catch((erro) => console.error("Erro ao deletar usuário:", erro));
    }

    // Evento para cancelar a edição
    document.getElementById("cancelar-edicao").addEventListener("click", () => {
        formEdicao.style.display = "none";
    });

    // Carrega os usuários na inicialização
    carregarUsuarios();
});
