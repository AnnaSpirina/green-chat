import { useState, useEffect, useRef } from "react";
import './ChatWindow.css';

function ChatWindow({ phone, messages, onSend }) {
    const [newMessage, setNewMessage] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState(null);
    const messagesRef = useRef(null);
    const isFirstScrollRef = useRef(true);
    const isSendingRef = useRef(false);

    useEffect(() => {
        const container = messagesRef.current;
        if (!container) return;

        container.scrollTo({
            top: container.scrollHeight,
            behavior: isFirstScrollRef.current ? "auto" : "smooth",
        });
        isFirstScrollRef.current = false;
    }, [messages]);

    const sendCurrentMessage = async () => {
        if (isSendingRef.current) return;

        const text = newMessage.trim();
        if (text === "") return;

        isSendingRef.current = true;
        setIsSending(true);
        setError(null);

        try {
            await onSend(text);
            setNewMessage("");
        } catch (err) {
            console.error("Ошибка при отправке сообщения:", err);
            setError("Ошибка при отправке сообщения");
        } finally {
            isSendingRef.current = false;
            setIsSending(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendCurrentMessage();
    };

    const handleKeyDown = (e) => {
        if (e.key !== "Enter") return;

        if (e.shiftKey) return;

        e.preventDefault();
        e.currentTarget.form?.requestSubmit();
    };

    return (
        <div className="chat-window">
            <div className="chat-header">
                <h2>Чат с номером: {phone}</h2>
            </div>
            <div className="chat-messages" ref={messagesRef}>
                {
                    messages.length === 0 ? (
                        <p className="empty-text">Нет сообщений</p>
                    ) : (
                        messages.map((m) => (
                            <div key={m.id} className={`message ${m.fromMe ? 'from-me' : 'from-them'}`}>
                                <span>{m.text}</span>
                            </div>
                        ))
                    )
                }
            </div>
            <form onSubmit={handleSubmit} className="chat-footer">
                <div className="chat-input">
                    <textarea
                        placeholder="Введите сообщение..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        rows={1}
                    />
                    <button disabled={isSending} className="button-blue" type="submit">Отправить</button>
                </div>
                {error && <p className="form-error">{error}</p>}
            </form>
        </div>
    );
}

export default ChatWindow;