# BOU-Guard | Extension

BOU-Guard | Extension (Behavior Observation Unit - Guard | Extension), é uma extensão para o Google Chrome que realiza web scraping em páginas da web para identificar conteúdos preconceituosos utilizando a tecnologia GPT e exibi-los em uma janela própria, facilitando a visualização e análise do usuário.

## 📌 Funcionalidades
- Identificação de conteúdos preconceituosos em páginas da web.
- Exibição dos conteúdos detectados em uma interface interativa.
- Armazenamento temporário dos dados coletados para análise posterior.

## 📺 Demonstração
![Demonstração da Extensão](docs/midia/executionextension.gif)

## 🛠️ Tecnologias Utilizadas
- **JavaScript** (background scripts, content scripts)
- **Python** (backend para processamento)
- **HTML/CSS** (interface gráfica da extensão)
- **JSON** (armazenamento de cache e configuração do manifest)

## 📂 Estrutura do Projeto
```
BOU-Guard-Extension
│── config/
│   └── manifest.json
│── docs/
│   └── midia/
│   │   └── executionextension.git
│── src/
│   ├── backend/
│   │   └── main.py
│   ├── data/
│   │   └── cache.json
│   ├── frontend/
│   │   └── index.html
│   ├── scripts/
│   │   ├── background.js
│   │   ├── contentScript.js
│   │   └── script.js 
```

## 📜 Funções dos Arquivos
- **`manifest.json`**: Define permissões e configurações da extensão no Chrome.
- **`background.js`**: Gerencia eventos em segundo plano, intercepta requisições e envia mensagens para os scripts de conteúdo.
- **`contentScript.js`**: Atua dentro das páginas da web, identificando e destacando expressões detectadas pela extensão.
- **`script.js`**: Suporte para manipulação da interface da extensão.
- **`main.py`**: Backend responsável pelo Web scraping (raspagem de dados), processamento de dados e análise dos conteúdos.
- **`cache.json`**: Armazena temporariamente os dados coletados.
- **`index.html`**: Interface gráfica da extensão (estilização com Tailwind CSS).

## 🔧 Instalação
### 1. Pré-requisitos
Antes de instalar a extensão, certifique-se de ter os seguintes requisitos:
- **Google Chrome** instalado
- **Python 3.x** instalado
- **Node.js e npm** instalados

### 2. Instalação da Extensão no Chrome
1. Baixe ou clone este repositório.
2. No Chrome, acesse `chrome://extensions/`.
3. Ative o `Modo do Desenvolvedor`.
4. Clique em `Carregar sem compactação` e selecione a pasta `BOU-Guard-Extension`.
5. A extensão será adicionada ao Chrome e poderá ser utilizada.

### 3. Instalação das Dependências
#### Python
Dentro da pasta `backend`, instale as dependências executando:
```sh
pip install nltk
pip install requests
pip install beautifulsoup4
pip install flask
pip install flask-cors
pip install os
```
Para instalação dos pacotes NLTK
```python
import nltk
nltk.download('punkt')
nltk.download('stopwords')
```

Principais bibliotecas usadas:
- **Flask**: Para criar a API backend.
- **BeautifulSoup**: Para extração de dados HTML.
- **Requests**: Para requisições HTTP.

#### JavaScript
Se houver pacotes npm, instale-os executando:
```sh
npm install
```

---
✉️ Para dúvidas ou sugestões, entre em contato.
