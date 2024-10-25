document.addEventListener('DOMContentLoaded', () => {
  const htmlInput = document.getElementById('html-input');
  const previewButton = document.getElementById('preview-button');
  const convertButton = document.getElementById('convert-button');
  const previewContainer = document.getElementById('preview-container');

  previewButton.addEventListener('click', () => {
    const html = htmlInput.value;
    previewContainer.innerHTML = html;
  });

  convertButton.addEventListener('click', () => {
    const html = htmlInput.value;
    if (!html) {
      alert('Por favor, ingresa algún contenido HTML.');
      return;
    }

    const element = document.createElement('div');
    element.innerHTML = html;

    html2pdf().from(element).save('converted.pdf');
  });
});