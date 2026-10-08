import "./ChatList.css";

function ChatList({ chats, activePhone, onSelect }) {
    return (
        <div className="chat-list-container">
            <h1>Чаты</h1>
            <div className="chat-list">
                {chats.map((chat) => (
                    <button
                        key={chat.phone}
                        className={`chat-item ${chat.phone === activePhone ? 'active' : ''}`}
                        onClick={() => onSelect(chat.phone)}
                    >
                        <span className="chat-item-phone">{chat.phone}</span>
                        <span className="chat-item-last-message">
                            {chat.messages.length > 0 ? chat.messages[chat.messages.length - 1].text : "Нет сообщений"}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ChatList;