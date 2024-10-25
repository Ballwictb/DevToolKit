document.addEventListener('DOMContentLoaded', () => {
  const inputCss = document.getElementById('input-css');
  const outputCss = document.getElementById('output-css');
  const minifyButton = document.getElementById('minify-button');

  minifyButton.addEventListener('click', () => {
    const minifiedCss = minifyCss(inputCss.value);
    outputCss.value = minifiedCss;
  });

  function minifyCss(css) {
    return css
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/\s*([:;{}])\s*/g, '$1') // Remove spaces before and after :, ;, {, }
      .replace(/;}/g, '}') // Remove last semicolon
      .trim(); // Remove leading and trailing whitespaces
  }
});