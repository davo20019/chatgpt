import fetch from 'node-fetch';

const createApiRequest = (text, apiKey) => {
    console.log('Text create:', text);
    console.log('API Key:', apiKey);
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            inputs: {
                text,
            },
            context: {
                metadata: {
                    language: 'en',
                    timezone: 'America/Los_Angeles',
                },
            },
        }),
    };

    return fetch(
        'https://api.openai.com/v1/engines/davinci-codex/completions',
        requestOptions
    )
        .then((response) => response.json())
        .then((result) => {
            console.log('Result:', result);
            return result.choices[0].text;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};

export { createApiRequest };
