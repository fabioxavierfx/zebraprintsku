// Importante: Substitua 'SEU_TOKEN_DE_ACESSO' pelo seu token de acesso do Ideris
const iderisToken = 'e858992596e7c7ee0b7d596e46b34ab7bb968f582c1ef6fff86fe52fb3fc2cd21c8a585848c2691fa50cb20629bf9ab7';

function gerarEtiqueta() {
    const skuInput = document.getElementById('sku');
    const skuValue = skuInput.value;

    // Fazer a requisição para a API do Ideris para buscar a descrição do SKU
    fetch(`http://api.ideris.com.br/Produto?sku=${skuValue}`, {
        headers: {
            'Authorization': `Bearer ${iderisToken}`
			'Content-Type': 'application/jason'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('SKU não encontrado no Ideris.');
        }
        return response.json();
    })
    .then(data => {
        const descricao = data.title; // Supondo que o nome do produto é a descrição no Ideris

        // Atualiza a etiqueta exibida na página
        const etiquetaSKUDiv = document.getElementById('etiquetaSKU');
        const etiquetaDescricaoDiv = document.getElementById('etiquetaDescricao');
        etiquetaSKUDiv.textContent = skuValue;
        etiquetaDescricaoDiv.textContent = descricao;

        // Cria o conteúdo da etiqueta na nova janela
        const conteudoEtiqueta = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Etiqueta</title>
                <link rel="stylesheet" href="styles.css">
            </head>
            <body>
                <div id="etiqueta">
                    <h2>${skuValue}</h2>
                    <p>${descricao}</p>
                </div>
                <script>
                    // Aguardar um curto período antes de acionar a impressão
                    setTimeout(() => {
                        window.print();
                        window.close();
                    }, 1000);
                </script>
            </body>
            </html>
        `;

        // Abrir uma nova janela com o conteúdo da etiqueta
        const novaJanela = window.open('', '_blank', 'width=200,height=150');
        novaJanela.document.open();
        novaJanela.document.write(conteudoEtiqueta);
        novaJanela.document.close();
    })
    .catch(error => {
        console.error('Erro ao buscar a descrição no Ideris:', error);
        // Tratar o erro conforme necessário
    });
}
