export default function createChatResponse(message) {
    return {
        messages: [
            {
                type: 'text',
                content: message
            }
        ]
    };
}
