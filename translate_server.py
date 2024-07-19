from flask import Flask, request, jsonify
import googletrans

app = Flask(__name__)

def translate(text, target_language):
    try:
        translator = googletrans.Translator() 
        translation = translator.translate(text, dest=target_language)
        return translation.text
    except Exception as e:
        return f"Translation Error: {e}"

def get_languages():
    return googletrans.LANGUAGES

# Translation routes
@app.route('/translate', methods=['POST'])
def translate_route():
    data = request.json
    text = data['text']
    target_language = data['target_language']
    translation = googletrans.Translator().translate(text, dest=target_language)
    return jsonify({'translation': translation.text})

@app.route('/languages', methods=['GET'])
def languages():
    languages = googletrans.LANGUAGES
    return jsonify({'languages': languages}) 

if __name__ == '__main__':
    app.run()
