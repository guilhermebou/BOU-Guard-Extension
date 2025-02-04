# BOU-Guard Extension

BOU-Guard é uma extensão para o Google Chrome que realiza web scraping em páginas da web para identificar conteúdos preconceituosos e exibi-los em uma janela própria, facilitando a visualização e análise do usuário.

## 📌 Funcionalidades
- Identificação de conteúdos preconceituosos em páginas da web.
- Exibição dos conteúdos detectados em uma interface interativa.
- Armazenamento temporário dos dados coletados para análise posterior.

## 📺 Demonstração
![Demonstração da Extensão](docs/midia/executionextension.mp4)

## 🛠️ Tecnologias Utilizadas
- **JavaScript** (background scripts, content scripts)
- **Python** (backend para processamento)
- **HTML/CSS** (interface gráfica da extensão)
- **JSON** (armazenamento de cache e configuração do manifest)

## 📂 Estrutura do Projeto
```
BOU-Guard-Extension-main/
│── config/
│   └── manifest.json  # Configuração da extensão Chrome
│── docs/
│   └── midia/executionextension.mp4  # Demonstração da extensão
│── src/
│   ├── backend/
│   │   └── main.py  # Código backend para processamento
│   ├── data/
│   │   └── cache.json  # Armazenamento de dados
│   ├── frontend/
│   │   └── index.html  # Interface da extensão
│   ├── scripts/
│   │   ├── background.js  # Script de background
│   │   ├── contentScript.js  # Web scraping e coleta de dados
│   │   └── script.js  # Código auxiliar
```

## 📜 Funções dos Arquivos
- **`manifest.json`**: Define permissões e configurações da extensão no Chrome.
- **`background.js`**: Gerencia eventos da extensão em segundo plano.
- **`contentScript.js`**: Coleta os conteúdos das páginas e identifica termos ofensivos.
- **`script.js`**: Suporte para manipulação da interface da extensão.
- **`main.py`**: Backend responsável pelo processamento de dados e análise dos conteúdos.
- **`cache.json`**: Armazena temporariamente os dados coletados.
- **`index.html`**: Interface gráfica da extensão.

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
4. Clique em `Carregar sem compactação` e selecione a pasta `BOU-Guard-Extension-main`.
5. A extensão será adicionada ao Chrome e poderá ser utilizada.

### 3. Instalação das Dependências
#### Python
Dentro da pasta `backend`, instale as dependências executando:
```sh
pip install -r requirements.txt
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
