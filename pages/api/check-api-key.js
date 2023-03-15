export default async function handler(req, res) {
    const requestBody = await req.text();
    const body = JSON.parse(requestBody);

    const { apiKey } = body;

    // Check if the API key is valid by making a request to the OpenAI API
    const response = await fetch('https://api.openai.com/v1/engines', {
        headers: {
            Authorization: `Bearer ${apiKey}`,
        },
    });

    if (response.ok) {
        // API key is valid, return success response
        const successResponse = new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
        return successResponse;
    } else {
        // API key is invalid, return error response
        const errorResponse = new Response(JSON.stringify({ success: false }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
        return errorResponse;
    }
}
