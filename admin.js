document.getElement
document.addEventListener('DOMContentLoaded', () => {
    const formCadastro = document.getElementById('form-cadastro');
    const listaUsuarios = document.getElementById('lista-usuarios');
    const limparCamposBtn = document.getElementById('limpar-campos');
    const pesquisaInput = document.getElementById('pesquisa');
    const btnPesquisar = document.getElementById('btn-pesquisar');
    const btnExcluirTodos = document.getElementById('btn-excluir-todos');

    // Carregar usuários do Local Storage
    carregarUsuarios();

    // Adicionar evento de envio do formulário
    formCadastro.addEventListener('submit', function(event) {
        event.preventDefault();
        const nomeUsuario = document.getElementById('nome-usuario').value;
        const emailUsuario = document.getElementById('email-usuario').value;
        const dataEnvio = new Date().toLocaleString();

        const usuario = { nome: nomeUsuario, email: emailUsuario, data: dataEnvio };
        adicionarUsuario(usuario);
        salvarUsuarioNoLocalStorage(usuario);
        exibirUsuarios();
        formCadastro.reset(); // Limpa os campos do formulário
    });

    // Função para adicionar usuário à lista
    function adicionarUsuario(usuario) {
        const li = document.createElement('li');
        li.textContent = `${usuario.data} - Nome: ${usuario.nome}, E-mail: ${usuario.email}`;
        li.dataset.email = usuario.email; // Armazenar o e-mail para exclusão
        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.addEventListener('click', function() {
            excluirUsuario(usuario.email);
        });
        li.appendChild(btnExcluir);
        listaUsuarios.appendChild(li);
    }

    // Função para salvar usuário no Local Storage
    function salvarUsuarioNoLocalStorage(usuario) {
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios.push(usuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }

    // Função para carregar usuários do Local Storage
    function carregarUsuarios() {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios.forEach(usuario => {
            adicionarUsuario(usuario);
        });
    }

    // Função para excluir um usuário
    function excluirUsuario(email) {
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios = usuarios.filter(usuario => usuario.email !== email);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        exibirUsuarios();
    }

    // Função para excluir todos os usuários
    btnExcluirTodos.addEventListener('click', function() {
        localStorage.removeItem('usuarios');
        listaUsuarios.innerHTML = ''; // Limpa a lista exibida
    });

    // Função para exibir todos os usuários
    function exibirUsuarios() {
        listaUsuarios.innerHTML = ''; // Limpa a lista antes de exibir
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios.forEach(usuario => {
            adicionarUsuario(usuario);
        });
    }

    // Função para limpar campos do formulário
    limparCamposBtn.addEventListener('click', function() {
        formCadastro.reset(); // Limpa os campos do formulário
    });

    // Função para pesquisar usuários
    btnPesquisar.addEventListener('click', function() {
        const pesquisa = pesquisaInput.value.toLowerCase();
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        listaUsuarios.innerHTML = ''; // Limpa a lista antes de exibir
        usuarios.forEach(usuario => {
            if (usuario.nome.toLowerCase().includes(pesquisa) || usuario.email.toLowerCase().includes(pesquisa)) {
                adicionarUsuario(usuario);
            }
        });
    });
});