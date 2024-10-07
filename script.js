document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');

    // Armazenamento em cache das análises por URL
    let cache = {};

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var currentTab = tabs[0];
        var currentUrl = currentTab.url;
        console.log('Current tab URL:', currentUrl);
        var statusText = document.getElementById('current-url');
        var expressionsList = document.getElementById('expressions-list');
        var analyzeAgainButton = document.getElementById('analyze-again');
        var loadingIndicator = document.getElementById('loading');

        if (statusText) {
            statusText.innerHTML = currentUrl;
            console.log('Status text element found and updated');

            // Verifica se a URL já foi analisada
            if (cache[currentUrl]) {
                console.log('URL already analyzed, loading from cache:', currentUrl);
                displayExpressions(cache[currentUrl]);
                highlightExpressionsInPage(cache[currentUrl], currentTab.id);
            } else {
                fetchAndAnalyze(currentUrl);
            }

            // Adiciona o evento para o botão "Analisar Novamente"
            analyzeAgainButton.addEventListener('click', function() {
                console.log('Analisar Novamente button clicked');
                fetchAndAnalyze(currentUrl, true);
            });
        } else {
            console.error('Status text element not found');
        }

        // Função para buscar e analisar expressões
        function fetchAndAnalyze(url, forceAnalyze = false) {
            // Exibe a animação de carregamento
            loadingIndicator.style.display = 'block';

            // Limpa a lista de expressões se for forçado a analisar novamente
            if (forceAnalyze) {
                console.log('Forcing re-analysis');
                expressionsList.innerHTML = '';
            }

            // Envia a URL para o servidor Flask
            fetch('http://localhost:5000/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({url: url, force_analyze: forceAnalyze})
            })
            .then(response => response.json())
            .then(data => {
                console.log('Received data from server:', data);
                if (data.expressions) {
                    console.log('Received expressions:', data.expressions);
                    let allExpressions = [];
                    data.expressions.forEach(expressionBlock => {
                        console.log('Expression block:', expressionBlock);
                        let expressions = extractExpressions(expressionBlock);
                        expressions.forEach((expression, index) => {
                            console.log('Adding expression to list and highlighting:', expression);
                            let listItem = document.createElement('li');
                            let link = document.createElement('a');
                            link.href = `#highlight-${index}`;
                            link.textContent = expression;
                            link.addEventListener('click', function() {
                                chrome.tabs.sendMessage(currentTab.id, {
                                    action: "highlightExpression",
                                    expression: expression
                                });
                            });
                            listItem.appendChild(link);
                            expressionsList.appendChild(listItem);
                            allExpressions.push(expression);
                        });
                    });

                    if (!forceAnalyze) {
                        cache[url] = allExpressions;
                    }
                    highlightExpressionsInPage(allExpressions, currentTab.id);
                } else {
                    console.error('No expressions found:', data);
                }
            })
            .catch(error => console.error('Error fetching data from server:', error))
            .finally(() => {

                loadingIndicator.style.display = 'none';
            });
        }

        function displayExpressions(expressions) {
            console.log('Displaying expressions:', expressions);
            expressionsList.innerHTML = '';
            expressions.forEach((expression, index) => {
                let listItem = document.createElement('li');
                let link = document.createElement('a');
                link.href = `#highlight-${index}`;
                link.textContent = expression;
                link.addEventListener('click', function() {
                    chrome.tabs.sendMessage(currentTab.id, {
                        action: "highlightExpression",
                        expression: expression
                    });
                });
                listItem.appendChild(link);
                expressionsList.appendChild(listItem);
            });
        }


        function extractExpressions(block) {
            let matches = block.match(/"([^"]+)"/g);
            if (matches) {
                console.log('Extracted quoted expressions:', matches);
                return matches.map(match => match.replace(/"/g, '').trim());
            } else {
                let lines = block.split('\n');
                console.log('Extracted lines:', lines);
                return lines.map(line => line.replace(/^\[\d+\]\s*/, '').trim()).filter(line => line);
            }
        }

        function highlightExpressionsInPage(expressions, tabId) {
            console.log('Highlighting expressions in page:', expressions);
            chrome.runtime.sendMessage({ action: "highlightExpressions", expressions: expressions, tabId: tabId });
        }
    });
});
