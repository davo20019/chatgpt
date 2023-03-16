// utils/createApiRequest.js
const createApiRequest = async (text, apiKey) => {

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
            model: "gpt-3.5-turbo",
        }),
    };

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', requestOptions);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`API request failed with status ${response.status}`);
        }

        const result = await response.json();
        console.log('Message: ', result.choices[0].message.content);
        return result.choices[0].message.content;
    } catch (error) {
        throw error;
    }
};

export { createApiRequest };
