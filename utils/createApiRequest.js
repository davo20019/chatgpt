// utils/createApiRequest.js
const createApiRequest = async (text, apiKey) => {
    console.log('Prompt:', text);
    console.log('API Key:', apiKey);

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            prompt: text,
            temperature: 0.5,
            max_tokens: 100,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            stop: ["\n"],
            model: "text-davinci-003",
        }),
    };

    try {
        const response = await fetch('https://api.openai.com/v1/completions', requestOptions);

        if (!response.ok) {
            const error = await response.json();
            console.error('Error:', error);
            throw new Error(`API request failed with status ${response.status}`);
        }

        const result = await response.json();
        console.log('Result:', result);
        return result.choices[0].text;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export { createApiRequest };
