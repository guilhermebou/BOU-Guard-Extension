// contentScript.js

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "highlightExpression") {
      highlightExpression(request.expression);
    }
  });

  function highlightExpression(expression) {
    let regex = new RegExp(expression, 'gi');
    let bodyText = document.body.innerHTML;
    document.body.innerHTML = bodyText.replace(regex, match => `<span id="highlight" style="background-color: yellow;">${match}</span>`);

    let element = document.getElementById('highlight');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.removeAttribute('id');
    }
  }
