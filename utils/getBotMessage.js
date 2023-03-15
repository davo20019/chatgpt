async function getBotMessage(apiKey, sessionId, userMessage) {
    const response = await fetch(`${API_URL}/message`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            session_id: sessionId,
            message: {
                type: 'text',
                content: userMessage
            }
        })
    });
    const { messages } = await response.json();
    const botMessage = messages[0].content;
    return botMessage;
}
