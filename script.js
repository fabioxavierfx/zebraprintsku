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
              <link rel="stylesheet" href="styles.css">
          </head>
          <body>
              <div id="etiqueta">
                  <h2 id="etiquetaSKU">${skuValue}</h2>
                  <p id="etiquetaDescricao">${descricao}</p>
              </div>
              <script>
                  // Função para ajustar o tamanho da fonte
                  function ajustarTamanhoFonte() {
                      const etiqueta = document.getElementById('etiqueta');
                      const h2 = document.getElementById('etiquetaSKU');
                      const p = document.getElementById('etiquetaDescricao');
                      const tamanhoMaximo = etiqueta.offsetWidth; // Largura máxima da etiqueta
  
                      // Ajustar tamanho da fonte do SKU
                      let tamanhoFonteH2 = 1.5;
                      h2.style.fontSize = tamanhoFonteH2 + "cm";
                      while (h2.scrollWidth > tamanhoMaximo * 0.8) {
                          tamanhoFonteH2 -= 0.1;
                          h2.style.fontSize = tamanhoFonteH2 + "cm";
                      }
  
                      // Ajustar tamanho da fonte da descrição
                      let tamanhoFonteP = 1;
                      p.style.fontSize = tamanhoFonteP + "cm";
                      while (p.scrollWidth > tamanhoMaximo) {
                          tamanhoFonteP -= 0.1;
                          p.style.fontSize = tamanhoFonteP + "cm";
                      }
                  }
  
                  // Aguardar um curto período antes de acionar a impressão
                  setTimeout(() => {
                      ajustarTamanhoFonte();
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
    .catch(error => {
      console.error('Erro ao carregar os produtos:', error);
      // Tratar o erro conforme necessário
    });
}
