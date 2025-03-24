document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    const userIdInput = document.getElementById('userId');
    const userContainer = document.getElementById('userContainer');
    const errorMessage = document.getElementById('errorMessage');
    
    searchButton.addEventListener('click', async () => {
        const userId = userIdInput.value.trim();
        
        if (!userId) {
            showError('Por favor, digite um ID válido.');
            return;
        }
        
        try {
            const user = await fetchUser(userId);
            displayUser(user);
        } catch (error) {
            showError(error.message);
        }
    });
    
    async function fetchUser(userId) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
            
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Usuário não encontrado.');
                } else {
                    throw new Error('Erro ao buscar usuário.');
                }
            }
            
            return await response.json();
        } catch (error) {
            throw error;
        }
    }
    
    function displayUser(user) {
        // Esconder mensagem de erro se estiver visível
        errorMessage.style.display = 'none';
        
        // Preencher os campos com os dados do usuário
        document.getElementById('userName').textContent = user.name;
        document.getElementById('userEmail').textContent = user.email;
        document.getElementById('userPhone').textContent = user.phone;
        document.getElementById('userWebsite').textContent = user.website;
        document.getElementById('userCompany').textContent = `${user.company.name} (${user.company.catchPhrase})`;
        document.getElementById('userAddress').textContent = 
            `${user.address.street}, ${user.address.suite}, ${user.address.city} - ${user.address.zipcode}`;
        
        // Mostrar o container de informações do usuário
        userContainer.style.display = 'block';
    }
    
    function showError(message) {
        // Esconder informações do usuário se estiverem visíveis
        userContainer.style.display = 'none';
        
        // Limpar campos
        userIdInput.value = '';
        
        // Mostrar mensagem de erro
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }
});