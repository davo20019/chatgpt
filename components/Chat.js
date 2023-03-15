import React, { useState } from "react";
import { useOpenAI } from "nextjs-openai";
import styles from "./Chat.module.css";

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const openai = useOpenAI();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessages((prev) => [...prev, { text: input, sender: "user" }]);
        try {
            const result = await openai.complete({
                prompt: messages.map((m) => `${m.sender}: ${m.text}`).join("\n") + `\nassistant:`,
                max_tokens: 50,
                stop: "\n",
            });
            setMessages((prev) => [
                ...prev,
                { text: result.choices[0].text.trim(), sender: "assistant" },
            ]);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
        setInput("");
    };

    return (
        <div className={styles.chat}>
            <h1>Bing Chat</h1>
            <div className={styles.messages}>
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`${styles.message} ${
                            message.sender === "user" ? styles.user : styles.assistant
                        }`}
                    >
                        <p>{message.text}</p>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className={styles.input}
                />
                <button type="submit" disabled={loading} className={styles.button}>
                    Send
                </button>
            </form>
        </div>
    );
};

export default Chat;