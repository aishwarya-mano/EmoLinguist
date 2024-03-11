from flask import Flask, jsonify, request
from textblob import TextBlob
from flask_cors import CORS
from googletrans import Translator, LANGUAGES

app = Flask(__name__)
CORS(app)


@app.route('/analyze', methods=['POST'])
def analyzer():

    data = request.json
    text = data.get('text', '')

    translator = Translator()

    if translator.detect(text).lang != 'en':
        text = translator.translate(text, dest='en').text

    analysis = TextBlob(text)
    sentiment = analysis.sentiment

    response = {
        'polarity': sentiment.polarity,
        'subjectivity': sentiment.subjectivity,
        'sentiment': 'positive' if sentiment.polarity > 0 else 'negative' if sentiment.polarity < 0 else 'neutral'

    }

    return jsonify(response)


if __name__ == '__main__':
    app.run(debug=True)
