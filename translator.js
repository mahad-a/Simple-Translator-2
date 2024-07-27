document.addEventListener('DOMContentLoaded', () => {
    console.log("Page loaded.");

    // function to populate language dropdown
    fetchLanguages();

    // event listener for translation button click
    document.getElementById('translateButton').addEventListener('click', translateText);
});

// function to get the desired langauge from the user
function fetchLanguages() {
    console.log("Fetching supported languages...");
    fetch('http://localhost:5000/languages') // flask server
    .then(response => response.json())
    .then(data => { // parse for user's selected language
        console.log("Received supported languages:", data);
        const languages = data.languages;
        const languageSelector = document.getElementById('languageSelector');
        for (const code in languages) {
            if (languages.hasOwnProperty(code)) {
                const name = languages[code];
                const option = document.createElement('option');
                option.value = code;
                option.textContent = name;
                languageSelector.appendChild(option);
            }
        }
    })
    .catch(error => console.error('Error:', error));
}

// function to translate the user entered text
function translateText() {
    console.log("Translating text...");
    const textInput = document.getElementById('textInput').value;
    const targetLanguage = document.getElementById('languageSelector').value;
    
    fetch('http://localhost:5000/translate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: textInput, target_language: targetLanguage })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Received translation:", data);
        const translationOutput = document.getElementById('translationOutput');
        translationOutput.value = data.translation;
    })
    .catch(error => console.error('Error:', error));
}
