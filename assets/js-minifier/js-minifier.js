document.addEventListener('DOMContentLoaded', () => {
  const inputJs = document.getElementById('input-js');
  const outputJs = document.getElementById('output-js');
  const minifyButton = document.getElementById('minify-button');

  minifyButton.addEventListener('click', () => {
    const minifiedJs = minifyJs(inputJs.value);
    outputJs.value = minifiedJs;
  });

  function minifyJs(js) {
    return js
      .replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1') // Remove comments
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/^\s+|\s+$/gm, '') // Remove leading/trailing spaces
      .replace(/\s*({|}|\[|\]|=|:|$$|$$|,|;)\s*/g, '$1') // Remove spaces around special characters
      .replace(/;}/g, '}') // Remove unnecessary semicolons
      .trim(); // Remove leading and trailing whitespaces
  }
});