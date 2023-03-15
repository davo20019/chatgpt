export default async function getSessionId(req, res) {
    try {
        const apiKey = req.body.apiKey;
        const sessionId = await generateSession(apiKey);
        res.status(200).json(createChatResponse(sessionId));
    } catch (error) {
        console.error(error);
        res.status(500).json(createChatResponse('Something went wrong.'));
    }
}
