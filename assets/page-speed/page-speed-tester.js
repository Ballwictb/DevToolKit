document.addEventListener('DOMContentLoaded', () => {
  const urlInput = document.getElementById('url-input');
  const testButton = document.getElementById('test-button');
  const loadTime = document.getElementById('load-time');
  const pageSize = document.getElementById('page-size');
  const resourceCount = document.getElementById('resource-count');

  testButton.addEventListener('click', () => {
    const url = urlInput.value;
    if (!url) {
      alert('Por favor, ingresa una URL válida.');
      return;
    }

    // Resetear resultados
    loadTime.textContent = 'Analizando...';
    pageSize.textContent = 'Analizando...';
    resourceCount.textContent = 'Analizando...';

    const startTime = performance.now();

    fetch(url)
      .then(response => {
        const endTime = performance.now();
        const timeTaken = endTime - startTime;
        loadTime.textContent = `${timeTaken.toFixed(2)} ms`;

        return response.text();
      })
      .then(html => {
        // Calcular tamaño de la página
        const pageBytes = new Blob([html]).size;
        pageSize.textContent = `${(pageBytes / 1024).toFixed(2)} KB`;

        // Contar recursos
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const resources = [
          ...doc.getElementsByTagName('script'),
          ...doc.getElementsByTagName('link'),
          ...doc.getElementsByTagName('img')
        ];
        resourceCount.textContent = resources.length;
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Hubo un error al analizar la página. Por favor, verifica la URL e intenta de nuevo.');
      });
  });
});