function gerarEtiqueta() {
  const skuInput = document.getElementById('sku');
  const skuValue = skuInput.value;

  // Carregar os dados dos produtos do arquivo JSON
  fetch('produtos.json')
    .then(response => response.json())
    .then(data => {
      let descricao = '';
      // Procurar pelo SKU correspondente nos dados carregados
      for (const produto of data) {
        if (produto.sku === skuValue) {
          descricao = produto.descricao;
          break;
        }
      }

      // Atualizar a etiqueta exibida na página
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
            <style>
                body {
                    font-family: Arial-black, sans-serif;
                    text-align: center;
                }
				#etiqueta {
					width: 15cm;
					height: 9.5cm;
					margin: 0 auto;
					padding: 10px;
					text-align: center;
				}

				#etiqueta h2 {
					font-size: 320px;
					margin: 0;
					padding: 20px;
					line-height: 75%;
					font-weight: bold;
				}

				#etiqueta p {
					font-size: 36px;
					margin: 0;
					padding: 20px;
					line-height: 80%;
					font-weight: bold;
				}
            </style>
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
      console.error('Erro ao carregar os produtos:', error);
      // Tratar o erro conforme necessário
    });
}
