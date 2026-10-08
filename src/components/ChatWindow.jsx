import { useState } from "react";

function ChatWindow({ phone, messages, onSend }) {
    const [newMessage, setNewMessage] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState(null);

    const handleSendMessage = async (e) => {
        e.preventDefault();

        const newMessageText = newMessage.trim();
        if (newMessageText === "") return;

        setIsSending(true);
        setError(null);

        try{
            await onSend(newMessageText);
            setNewMessage("");
        } catch (err){
            console.error("Ошибка при отправке сообщения:", err);
            setError("Ошибка при отправке сообщения");
        } finally {
            setIsSending(false);
        }
    }

    return (
        <div className="chat-window">
            <h2>Чат с номером: {phone}</h2>
            {
                messages.length === 0 ? (
                    <p>Нет сообщений</p>
                ) : (
                    messages.map((m) => (
                        <div key={m.id} className={`message ${m.fromMe ? 'from-me' : 'from-them'}`}>
                            <span>{m.text}</span>
                        </div>
                    ))
                )
            }
            <form onSubmit={handleSendMessage}>
                <input
                    type="text"
                    placeholder="Введите сообщение..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                {error && <p className="form-error">{error}</p>}
                <button disabled={isSending} type="submit">Отправить</button>
            </form>
        </div>
    );
}

export default ChatWindow;