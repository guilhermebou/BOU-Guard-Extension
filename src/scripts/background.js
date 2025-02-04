chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "highlightExpressions") {
      chrome.scripting.executeScript({
        target: { tabId: request.tabId },
        function: highlightExpressions,
        args: [request.expressions]
      });
    } else if (request.action === "searchExpression") {
      chrome.scripting.executeScript({
        target: { tabId: request.tabId },
        function: searchExpression,
        args: [request.expression]
      });
    }
  });

  function highlightExpressions(expressions) {
    expressions.forEach((expression, index) => {
      let regex = new RegExp(expression, 'gi');
      document.body.innerHTML = document.body.innerHTML.replace(regex, match => `<span id="highlight-${index}" style="background-color: yellow;">${match}</span>`);
    });
  }

  function searchExpression(expression) {
    chrome.runtime.sendMessage({
      action: 'highlightExpression',
      expression: expression
    });
  }
