from flask import Flask, request, jsonify
import googletrans

app = Flask(__name__)

# pull the Google Translator to translate user text
def translate(text, target_language):
    try:
        translator = googletrans.Translator() 
        translation = translator.translate(text, dest=target_language)
        return translation.text
    except Exception as e:
        return f"Translation Error: {e}"

# gets all available languages to translate into
def get_languages():
    return googletrans.LANGUAGES

# received request to translate text from js GUI
@app.route('/translate', methods=['POST'])
def translate_route():
    data = request.json
    translation = googletrans.Translator().translate(data['text'], dest=data['target_language'])
    return jsonify({'translation': translation.text})

# received request to display languages (drop down)
@app.route('/languages', methods=['GET'])
def languages():
    return jsonify({'languages': get_languages}) 

if __name__ == '__main__':
    app.run()
