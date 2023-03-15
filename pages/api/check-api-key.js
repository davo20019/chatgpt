export default async function handler(req, res) {
    const { apiKey } = req.body;

    // Check if the API key is valid by making a request to the OpenAI API
    const response = await fetch('https://api.openai.com/v1/engines', {
        headers: {
            Authorization: `Bearer ${apiKey}`,
        },
    });

    if (response.ok) {
        // API key is valid, return success response
        res.status(200).json({ success: true });
    } else {
        // API key is invalid, return error response
        res.status(400).json({ success: false });
    }
}
