document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    const resultsContainer = document.getElementById('results-container');

    searchButton.addEventListener('click', async () => {
        const searchTerm = searchInput.value.trim();

        if (!searchTerm) {
            alert('Por favor, insira o nome do produto para pesquisar.');
            return;
        }
        const apiUrl = `https://makeup-api.herokuapp.com/api/v1/products.json?product_name=${encodeURIComponent(searchTerm)}`;

        try {
            // Limpe o conteúdo anterior
            resultsContainer.innerHTML = '';

            // Exiba uma mensagem de carregamento
            resultsContainer.innerHTML = '<p class="carregandoresultados">Carregando resultados...</p>';

            // Faça uma solicitação GET à API usando o fetch e aguarde a resposta
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error('Erro ao buscar dados da API');
            }

            const data = await response.json();

            // Remova a mensagem de carregamento
            resultsContainer.innerHTML = '';

            // Manipule os dados da API aqui e exiba os resultados
            data.forEach(product => {
                if (product.image_link) {
                    const productElement = document.createElement('div');
                    productElement.classList.add('product');

                    const productName = document.createElement('p');
                    productName.textContent = product.name;

                    const productPrice = document.createElement('p');
                    productPrice.textContent = `$${product.price}`;

                    const productImage = document.createElement('img');
                    productImage.src = product.image_link; // Adicione o URL da imagem da API
                    productImage.alt = product.name; // Defina o texto alternativo da imagem

                    // Use o evento onerror para ocultar o elemento do produto completo se a imagem não for carregada corretamente
                    productImage.onerror = () => {
                        productElement.style.display = 'none'; // Oculta o elemento do produto completo
                    };

                    productImage.classList.add('product-image');

                    productElement.appendChild(productName);
                    productElement.appendChild(productPrice);
                    productElement.appendChild(productImage);

                    resultsContainer.appendChild(productElement);
                }
               
            });
        } catch (error) {
            // Lidar com erros de conexão ou JSON inválido
            console.error(error);
            resultsContainer.innerHTML = '<p>Ocorreu um erro ao buscar os resultados.</p>';
        }
    });
});
