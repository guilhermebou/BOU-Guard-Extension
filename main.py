import nltk
import string
import requests
from bs4 import BeautifulSoup
from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)


url = 'https://api.openai.com/v1/chat/completions'
model = 'gpt-3.5-turbo'

token = ''


#nltk.download('punkt')
#nltk.download('stopwords')
stopwords = nltk.corpus.stopwords.words("portuguese")
ponctuation = string.punctuation


def soup_func(link):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    try:
        response = requests.get(link, headers=headers)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, "html.parser")
        input_text = soup.get_text(strip=True)
        return input_text
    except requests.RequestException as e:
        print(f"Erro ao acessar a URL: {e}")
        return ""

def preprocess(text):
    try:
        tokens = []
        for token in nltk.word_tokenize(text):
            token = token.lower()
            if token not in stopwords and token not in ponctuation:
                tokens.append(token)
        return tokens
    except Exception as e:
        print(f"Erro durante o pré-processamento: {e}")
        return []


def div_string(input_text):
    size_all = len(input_text)
    size_part = size_all // 2
    parts = [input_text[i:i + size_part] for i in range(0, size_all, size_part)]
    return parts

def gpt(input_text):
    prompt = [
    {'role': 'user', 'content': 'Identifique e enumere exclusivamente as expressões (frases ou palavras dentro do contexto) presentes nos dados que estão associadas a homofobia.'},
    {'role': 'user', 'content': 'Identifique e enumere exclusivamente as expressões (frases ou palavras dentro do contexto) presentes nos dados que estão associadas ao racismo.'},
    {'role': 'user', 'content': 'Identifique e enumere exclusivamente as expressões (frases ou palavras dentro do contexto) presentes nos dados que estão associadas ao sexismo.'},
    {'role': 'user', 'content': 'Retorne as expressões encontradas em uma lista numerada no formato: "[1] ... \n[2] ...". Não inclua explicações ou exemplos que não estejam nos dados. vai ter momentos que o site tera apenas expressões de uma tematica, entao não é preciso adicionar uma lista para as demais tematicas'},
    {'role': 'user', 'content': input_text}
]


    try:
        response = requests.post(
            url,
            headers={'Authorization': f'Bearer {token}'},
            json={'model': model, 'messages': prompt}
        )
        response.raise_for_status()
        data = response.json()
        all_responses = []
        for choice in data['choices']:
            reply = choice['message']['content']
            all_responses.append(reply)
        return all_responses
    except requests.RequestException as e:
        print(f"Erro ao acessar a API da OpenAI: {e}")
        return []

#load JSON
def load_cache():
    if os.path.exists('cache.json'):
        with open('cache.json', 'r') as f:
            return json.load(f)
    return {}

# save JSON
def save_cache(cache):
    with open('cache.json', 'w') as f:
        json.dump(cache, f)

@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        data = request.get_json()
        url = data['url']
        force_analyze = data.get('force_analyze', False)
        print(f"Received URL: {url}")

        # load cache
        cache = load_cache()

        # Verificar se a URL já foi analisada e se não forçar a nova análise
        if url in cache and not force_analyze:
            print(f"URL already analyzed, loading from cache: {url}")
            return jsonify({'expressions': cache[url]})

        # Analisar a URL
        soup = soup_func(url)
        if not soup:
            print("Erro ao acessar o conteúdo da URL")
            return jsonify({'error': 'Erro ao acessar o conteúdo da URL'}), 500
        print(f"Soup content: {soup[:500]}")  # Print the first 500 characters of the soup
        tokens = preprocess(soup)
        if not tokens:
            print("Erro durante o pré-processamento do texto")
            return jsonify({'error': 'Erro durante o pré-processamento do texto'}), 500
        parts = div_string(soup)

        all_output = []
        for part in parts:
            output = gpt(part)
            all_output.extend(output)

        # save cache
        cache[url] = all_output
        save_cache(cache)

        print('Processed expressions:', all_output)
        return jsonify({'expressions': all_output})
    except Exception as e:
        print(f"Erro durante a análise: {e}")
        return jsonify({'error': 'Erro durante a análise'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
