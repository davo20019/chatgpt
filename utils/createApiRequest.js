// utils/createApiRequest.js
/**
 * Generate text using the OpenAI API
 * @param text
 * @param apiKey
 * @returns {Promise<*>}
 */
const generateText = async (text, apiKey) => {

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
        return result.choices[0].message.content;
    } catch (error) {
        throw error;
    }
};

/**
 * Generate an image using the OpenAI API
 * @param text
 * @param apiKey
 * @returns {Promise<*>}
 */
const getImage = async (text, apiKey) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: 'image-alpha-001', // or use 'image-beta-001' for smaller images
            prompt: `generate ${text}`,
            num_images: 1,
        }),
    };

    try {
        const response = await fetch('https://api.openai.com/v1/images/generations', requestOptions);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`API request failed with status ${response.status}`);
        }

        const result = await response.json();
        return result.data[0].url;
    } catch (error) {
        throw error;
    }
};

/**
 * Create an API request to the OpenAI API
 * @param text
 * @param apiKey
 * @param generateImage
 * @returns {Promise<*|undefined>}
 */
const createApiRequest = async (text, apiKey, generateImage = false) => {

    try {

        if (generateImage) {
            return getImage(text, apiKey);
        } else {
            return generateText(text, apiKey);
        }
    } catch (error) {
        throw error;
    }
};

export { createApiRequest };