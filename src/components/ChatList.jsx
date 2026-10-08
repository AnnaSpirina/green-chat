function ChatList({ chats, activePhone, onSelect }) {
    return (
        <div className="chat-list">
            {chats.length === 0 ? (
                <p>Нет чатов</p>
            ) : (
                chats.map((chat) => (
                    <button
                        key={chat.phone}
                        className={`chat-item ${chat.phone === activePhone ? 'active' : ''}`}
                        onClick={() => onSelect(chat.phone)}
                    >
                        <span>{chat.phone}</span>
                        <span className="last-message">
                            {chat.messages.length > 0 ? chat.messages[chat.messages.length - 1].text : "Нет сообщений"}
                        </span>
                    </button>
                ))
            )}
        </div>
    );
}

export default ChatList;