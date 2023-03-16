import { useState } from 'react';
import styles from './ChatGpt.module.css';

const ChatGpt = () => {
    const [apiKey, setApiKey] = useState('');
    const [chatInput, setChatInput] = useState('');
    const [chatLog, setChatLog] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [apiKeyValidated, setApiKeyValidated] = useState(false);

    const handleApiKeySubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError(null);

        if (!apiKey) {
            setError('Please enter an API key');
            setLoading(false);
            return;
        }

        try {
            console.log('API Key:', apiKey);
            const response = await fetch('/api/check-api-key', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ apiKey }),
            });

            console.log('Response:', response);
            console.log('Response OK:', response.ok);

            if (response.ok) {
                setApiKeyValidated(true);
            } else {
                const errorText = await response.text();
                setError(errorText);
                setApiKey('');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while validating the API key.');
        } finally {
            setLoading(false);
        }
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
                ChatGPT{' '}
                <a
                    href="https://davidloor.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                >
                    created by David Loor M.
                </a>
            </h1>
            {!apiKey && (
                <p className={styles.helpText}>
                    To use this chat, you&apos;ll need an OpenAI API key. You can get one by signing up for an account at{' '}
                    <a href="https://beta.openai.com/signup/" target="_blank" rel="noopener noreferrer">
                        OpenAI
                    </a>
                    . Once you have your API key, enter it in the provided input field.
                </p>
            )}
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
                    disabled={!apiKeyValidated || loading}
                    className={styles.input}
                />
                <button
                    type="submit"
                    disabled={!apiKeyValidated || loading}
                    className={styles.button}
                >
                    {loading ? 'Loading...' : 'Send'}
                </button>
            </form>
            {!apiKeyValidated && (
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
            )}
            {apiKeyValidated && <div className={styles.success}>API key validated and in use.</div>}
        </div>
    );
};

export default ChatGpt;
