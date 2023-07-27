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

    // Função para ajustar o tamanho da fonte
    function ajustarTamanhoFonte(texto, elemento) {
        const tamanhoMaximo = elemento.offsetWidth; // Largura máxima do elemento
        const tamanhoIdeal = 0.1 * tamanhoMaximo; // Defina o tamanho ideal em relação à largura (ajuste conforme necessário)

        // Verifica se o texto cabe no tamanho ideal
        if (elemento.scrollWidth > tamanhoIdeal) {
            let tamanhoFonte = 1; // Tamanho inicial da fonte (1 rem)
            elemento.style.fontSize = tamanhoFonte + "rem";

            // Aumenta o tamanho da fonte gradualmente até que o texto caiba no tamanho ideal
            while (elemento.scrollWidth > tamanhoIdeal) {
                tamanhoFonte -= 0.1; // Diminui o tamanho da fonte em 0.1 rem
                elemento.style.fontSize = tamanhoFonte + "rem";
            }
        }
    }

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
                <h2 id="etiquetaSKU">${skuValue}</h2>
                <p id="etiquetaDescricao">${descricao}</p>
            </div>
            <script>
                // Aguardar um curto período antes de acionar a impressão
                setTimeout(() => {
                    // Ajustar o tamanho da fonte após a renderização da etiqueta
                    ajustarTamanhoFonte("${skuValue}", document.getElementById('etiquetaSKU'));
                    ajustarTamanhoFonte("${descricao}", document.getElementById('etiquetaDescricao'));
                    window.print();
                    window.close();
                }, 1000);
            </script>
        </body>
        </html>
    `;

    // Abre uma nova janela para exibir a etiqueta
    const novaJanela = window.open("", "_blank");
    novaJanela.document.write(conteudoEtiqueta);
}
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
