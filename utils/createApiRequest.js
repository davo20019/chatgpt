const createApiRequest = async (text, apiKey) => {
    console.log('Text create:', text);
    console.log('API Key:', apiKey);
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            messages: [
                {
                    role: 'user',
                    content: text,
                },
            ],
            temperature: 0.5,
            max_tokens: 100,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            stop: ["\n"],
            model: "gpt-3.5-turbo",
            user: "user123456",
        }),
    };

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', requestOptions);
        const result = await response.json();
        console.log('Result:', result);
        return result.choices[0].text;
    } catch (error) {
        console.error('Error:', error);
    }
};

export { createApiRequest };
