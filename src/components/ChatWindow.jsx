import { useState } from "react";

function ChatWindow({ phone, onBack }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const handleSendMessage = (e) => {
        e.preventDefault();
        const newMessageText = newMessage.trim();
        if (newMessageText === "") return;
        setMessages((prevMessages) => [
            ...prevMessages,
            { id: crypto.randomUUID(), text: newMessageText, fromMe: true },
        ]);
        setNewMessage("");
    }

    return (
        <div className="chat-window">
            <button onClick={onBack}>Назад</button>
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
                <button type="submit">Отправить</button>
            </form>
        </div>
    );
}

export default ChatWindow;