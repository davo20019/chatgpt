import { useState } from 'react';
import styles from './ChatGpt.module.css';

const ChatGpt = () => {
    const [apiKey, setApiKey] = useState('');
    const [chatInput, setChatInput] = useState('');
    const [chatLog, setChatLog] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleApiKeySubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError(null);

        if (!apiKey) {
            setError('Please enter an API key');
            setLoading(false);
            return;
        }

        const response = await fetch('/api/check-api-key', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ apiKey }),
        });

        if (response.ok) {
            setApiKey(apiKey);
        } else {
            const errorText = await response.text();
            setError(errorText);
            setApiKey('');
        }

        setLoading(false);
    };

    const handleChatSubmit = async (e) => {
        e.preventDefault();

        if (!chatInput) {
            setError('Please enter a message');
            return;
        }

        if (!apiKey) {
            setError('Please enter an API key');
            return;
        }

        setLoading(true);

        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: chatInput, apiKey: apiKey }),
        });

        if (!response.ok) {
            setError(await response.text());
            setLoading(false);
            return;
        }

        const data = await response.json();

        if (data.messages && data.messages.length > 0) {
            setChatLog((prevChatLog) => [
                ...prevChatLog,
                { user: chatInput, bot: data.messages[0].text },
            ]);
        }

        setChatInput('');
        setLoading(false);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                ChatGPT created by{' '}
                <a href="https://davidloor.com/" target="_blank" rel="noopener noreferrer" className={styles.author}>
                    David Loor M.
                </a>
            </h1>
            <div className={styles.chat}>
                {chatLog.map((chat, index) => (
                    <div key={index}>
                        <div className={styles.user}>{chat.user}</div>
                        <div className={styles.bot}>{chat.bot}</div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleChatSubmit} className={styles.form}>
                <input
                    type="text"
                    placeholder="Type your message here..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    disabled={!apiKey || loading}
                    className={styles.input}
                />
                <button
                    type="submit"
                    disabled={!apiKey || loading}
                    className={styles.button}
                >
                    {loading ? 'Loading...' : 'Send'}
                </button>
            </form>
            <form onSubmit={handleApiKeySubmit} className={styles.apiKeyForm}>
                <input
                    type="password"
                    placeholder="Enter your OpenAI API key here..."
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    disabled={loading}
                    className={styles.apiKeyInput}
                />
                <button
                    type="submit"
                    disabled={loading}
                    className={styles.apiKeyButton}
                >
                    {loading ? 'Loading...' : 'Submit'}
                </button>
                {error && <div className={styles.error}>{error}</div>}
            </form>
        </div>
    );
};

export default ChatGpt;
