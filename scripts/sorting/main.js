let jsonData;
const wordsOutput = document.getElementById("output-word-startswith");
const wordsOutputIncludes = document.getElementById("output-word-includes");

fetch('/scripts/sorting/data.json')
  .then(response => response.json())  // Parse the JSON from the response
  .then(data => RecieveData(data))    // Work with the JavaScript object
  .catch(error => console.error('Error:', error));


function RecieveData(data)
{
    jsonData = data;
}

function GetInputValue() {
    // Get the input element
    const inputElement = document.getElementById('input-value');

    // Retrieve the value from the input element
    const inputValue = inputElement.value;

    GetWordStartWith(inputValue);
    GetWordInclude(inputValue);
}

function GetWordInclude(inputWord)
{
    // Assuming jsonData is already defined and contains the 'words' array
    let words = jsonData.words;

    // Array to hold paragraph elements
    let wordsAsPara = [];

    // Loop through the words array
    for (let i = 0; i < words.length; i++) {
        // Check if the current word includes the inputWord
        if (words[i].includes(inputWord.toLowerCase())) {
            let p = document.createElement("p");
            p.innerHTML = words[i];

            wordsAsPara.push(p);
        }
    }

    // Assuming wordsOutput is a valid DOM element
    let wordsOutput = document.getElementById('output-word-includes');
    
    // Clear previous results
    wordsOutput.innerHTML = '';

    // Append new paragraphs to the output element
    for (let j = 0; j < wordsAsPara.length; j++) {
        wordsOutput.append(wordsAsPara[j]);
    }
}

function GetWordStartWith(inputWord) {
    // Assuming jsonData is already defined and contains the 'words' array
    let words = jsonData.words;

    // Array to hold paragraph elements
    let wordsAsPara = [];

    // Loop through the words array
    for (let i = 0; i < words.length; i++) {
        // Check if the current word starts with the inputWord
        if (words[i].startsWith(inputWord.toLowerCase())) {
            let p = document.createElement("p");
            p.innerHTML = words[i];

            wordsAsPara.push(p);
        }
    }
    
    // Clear previous results
    wordsOutput.innerHTML = '';

    // Append new paragraphs to the output element
    for (let j = 0; j < wordsAsPara.length; j++) {
        wordsOutput.append(wordsAsPara[j]);
    }
}