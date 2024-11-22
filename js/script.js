// Referenciando os elementos do formulário
document.addEventListener('DOMContentLoaded', function () {
    const form = document.forms['frmContato'];
    const rgField = document.getElementById('txtRG');
    const cpfField = document.getElementById('txtCPF');
    const telField = document.getElementById('txtTel');
    const photoButton = document.getElementById('botaoEnviar');
    const photoPreview = document.querySelector('.fotografia .content img');
    const sendButton = document.querySelector('.btn-primario'); // Botão "Enviar" no final da página

    // validação de campos 
    function validateFields() {
        const requiredFields = form.querySelectorAll('[required]');
        for (let field of requiredFields) {
            if (!field.value.trim()) {
                
                const label = form.querySelector(`label[for="${field.id}"]`);
                const fieldName = label ? label.innerText : 'Campo'; // se não achar o nome irá aparecer campo no lugar
                alert(`O campo "${fieldName}" é obrigatório.`);
                field.focus(); 
                return false; 
            }
        }
        return true; // se campos estão preenchidos
    }
    // Restringindo os campos RG, CPF e Telefone para aceitarem apenas números
    [rgField, cpfField, telField].forEach(field => {
        field.addEventListener('input', function () {
            this.value = this.value.replace(/\D/g, ''); // Remove tudo que não for dígito
        });
    });

    //  upload de foto / exibir a imagem
    photoButton.addEventListener('click', function (event) {
        event.preventDefault();

        //  input para upload de arquivo
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';

        fileInput.addEventListener('change', function () {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();

                reader.onload = function (e) {
                    photoPreview.src = e.target.result; // muda a imagem para a que foi selecionada
                };

                reader.readAsDataURL(file);
            }
        });

        fileInput.click(); 
    });

    // Exibir alerta de formulário enviado e limpar os campos
    sendButton.addEventListener('click', function (event) {
        event.preventDefault();

        // Validação campo por campo
        if (validateFields()) {
            alert("Formulário enviado com sucesso!");
            form.reset(); // Limpa todos os campos do formulário
            photoPreview.src = 'images/profile.png'; // Reseta a imagem de pré-visualização
        }
    });
});

/*Pagina de cadastro de usuario  */
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("cadastro-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); 

        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const passwordConfirma = document.getElementById("password-confirma").value.trim();

        // Verifica se os campos estão preenchidos
        if (!username || !email || !password || !passwordConfirma) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        // Verifica se as senhas coincidem
        if (password !== passwordConfirma) {
            alert("As senhas não coincidem.");
            return;
        }

        // Verifica se o email tem o formato correto
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            alert("Por favor, insira um e-mail válido.");
            return;
        }

        // Guarda o usuario no localStorage
        const userData = {
            username: username,
            email: email,
            password: password
        };

        localStorage.setItem("userData", JSON.stringify(userData));

        alert("Cadastro realizado com sucesso!");
        form.reset(); 

        // Redireciona para a página principal após o cadastro
        window.location.href = "login.html";  //redireciona para o login
    });
});


/*pagina login */
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        // Verifica se os campos estão preenchidos
        if (!username || !password) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        // busca usuario guardado no local storage
        const userData = JSON.parse(localStorage.getItem("userData"));

        if (!userData) {
            alert("Nenhum usuário cadastrado.");
            return;
        }

        // Verifica se o nome de usuário e senha coincidem
        if (userData.username === username && userData.password === password) {
            alert("Login realizado com sucesso!");

            // Redireciona para a página principal após o login
            window.location.href = "index.html";  
        } else {
            alert("Usuário ou senha inválidos.");
        }
    });
});


