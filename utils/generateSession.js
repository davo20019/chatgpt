async function generateSession(apiKey) {
    const response = await fetch(`${API_URL}/session/new`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`
        }
    });
    const { session_id: sessionId } = await response.json();
    return sessionId;
}
