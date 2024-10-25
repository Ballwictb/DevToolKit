document.addEventListener('DOMContentLoaded', () => {
  const fontSelector = document.getElementById('font-selector');
  const fontSize = document.getElementById('font-size');
  const fontColor = document.getElementById('font-color');
  const previewText = document.getElementById('preview-text');

  function updatePreview() {
    previewText.style.fontFamily = fontSelector.value;
    previewText.style.fontSize = `${fontSize.value}px`;
    previewText.style.color = fontColor.value;
  }

  fontSelector.addEventListener('change', updatePreview);
  fontSize.addEventListener('input', updatePreview);
  fontColor.addEventListener('input', updatePreview);

  updatePreview();
});