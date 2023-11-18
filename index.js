let APIentry;

let textareaContent;

//captures text area

const textArea = document.getElementById("textArea")

function captureTextArea() {

textareaContent = textArea.value;

 console.log(textareaContent);
}

const submit = document.getElementById("submit")
submit.addEventListener("click", captureTextArea)

//enter API key and it hides

const APIkey = document.getElementById("APIkey")

function captureAPI() {

    APIentry = APIkey.value;

    console.log(APIentry);
}


const enterAPI = document.getElementById("enterAPI")


function hideAPI() {
    const APIKeySubmission = document.getElementById("APIkeySubmission");
    APIKeySubmission.style.display = "none";
}


enterAPI.addEventListener("click", captureAPI)
enterAPI.addEventListener("click", hideAPI)

//conect with open API 



function sendRequestToOpenAI() {
    // Replace 'your-api-key' with your actual OpenAI API key
    const apiKey = APIentry;
    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    };
    const data = {
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: 'user',
                content: textareaContent
            }
        ]
    };

    const responseContainer = document.getElementById('responseContainer');
    fetch(apiUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(responseData => {
        // Handle the API response data
        console.log(responseData);

        const userMessageContent = responseData.choices[0].message.content;
        responseContainer.innerHTML = `<p>${userMessageContent}</p>`;
    })
    
    .catch(error => {
        // Handle errors
        console.error('Error:', error);
    });
}



function displayResponse() {
    // Access the response data and update the DOM
    const responseContainer = document.getElementById('responseContainer');

    // Use JSON.stringify to format the response data for display
    const formattedResponse = JSON.stringify(responseData, null, 2);
    // Update the paragraph element in the DOM
    console.log(formattedResponse);
    
    responseContainer.textContent = formattedResponse;
}



submit.addEventListener("click", sendRequestToOpenAI)