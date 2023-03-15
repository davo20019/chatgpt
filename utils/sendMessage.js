export default async function sendMessage(req, res) {
    try {
        const apiKey = req.body.apiKey;
        const sessionId = req.body.sessionId;
        const userMessage = req.body.message;
        const botMessage = await getBotMessage(apiKey, sessionId, userMessage);
        res.status(200).json(createChatResponse(botMessage));
    } catch (error) {
        console.error(error);
        res.status(500).json(createChatResponse('Something went wrong.'));
    }
}
