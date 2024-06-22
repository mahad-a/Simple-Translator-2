document.addEventListener('DOMContentLoaded', () => {
    console.log("Page loaded.");

    // Function to populate language dropdown
    fetchLanguages();

    // Event listener for translation button click
    document.getElementById('translateButton').addEventListener('click', translateText);
});

function fetchLanguages() {
    console.log("Fetching supported languages...");
    fetch('http://localhost:5000/languages')
    .then(response => response.json())
    .then(data => {
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
