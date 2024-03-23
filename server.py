from flask import Flask, request, jsonify
from flask_cors import CORS
import nltk
from textblob import TextBlob
from newspaper import Article

nltk.download('punkt')

app = Flask(__name__)
CORS(app)

@app.route('/analyze', methods=['POST'])
def analyze_article():
    data = request.get_json()
    url = data['url']
    
    article = Article(url)
    article.download()
    article.parse()
    article.nlp()
    
    result = {
        'title': article.title,
        'authors': article.authors,
        'publication_date': str(article.publish_date),
        'summary': article.summary
    }
    
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
