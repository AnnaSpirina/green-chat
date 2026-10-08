import './App.css';
import { useState, useCallback } from 'react';
import useIncomingMessages from './hooks/useIncomingMessages';
import { sendMessage } from './api/greenApi';
import LoginForm from './components/LoginForm';
import NewChatForm from './components/NewChatForm';
import ChatWindow from './components/ChatWindow';
import ChatList from './components/ChatList';

function App() {
  const [authData, setAuthData] = useState(() => {
    const storedAuthData = localStorage.getItem('authData');
    try {
      return storedAuthData ? JSON.parse(storedAuthData) : null;
    } catch {
      localStorage.removeItem('authData');
      return null;
    }
  });
  const [chats, setChats] = useState([]);
  const [chatPhone, setChatPhone] = useState("");

  const addMessage = useCallback((phone, message) => {
    setChats((prevChats) => {
      const existing = prevChats.find((chat) => chat.phone === phone);

      const updatedChat = existing
        ? { ...existing, messages: [...existing.messages, message] }
        : { phone, messages: [message] };

      const otherChats = prevChats.filter((chat) => chat.phone !== phone);

      return [updatedChat, ...otherChats];
    });
  }, []);

  useIncomingMessages(authData, addMessage);

  const handleLogin = (idInstance, apiTokenInstance) => {
    const authDataObject = { idInstance, apiTokenInstance };
    setAuthData(authDataObject);
    localStorage.setItem('authData', JSON.stringify(authDataObject));
  };

  const handleLogout = () => {
    setAuthData(null);
    setChats([]);
    setChatPhone("");
    localStorage.removeItem('authData');
  };

  const handleCreateChat = (phone) => {
    setChats((prevChats) =>
      prevChats.some((chat) => chat.phone === phone)
        ? prevChats
        : [{ phone, messages: [] }, ...prevChats]
    );
    setChatPhone(phone);
  };

  const handleSend = async (text) => {
    await sendMessage({ ...authData, phone: chatPhone, message: text });
    addMessage(chatPhone, { id: crypto.randomUUID(), text, fromMe: true });
  };

  const activeChat = chats.find((chat) => chat.phone === chatPhone);

  return (
    <div className="page">
      {authData ? (
        <div className='chats'>
          <div className='left-panel'>
            <button className="button-white" onClick={handleLogout}>Выйти</button>
            <NewChatForm onCreateChat={handleCreateChat} />
            {chats.length > 0 && (
              <ChatList chats={chats} activePhone={chatPhone} onSelect={setChatPhone} />
            )}
          </div>
          <div className='right-panel'>
            {chatPhone ? (
              <ChatWindow
                phone={chatPhone}
                messages={activeChat ? activeChat.messages : []}
                onSend={handleSend}
                key={chatPhone}
              />
            ) : (
              <p className='empty-text'>Выберите или создайте чат</p>
            )}
          </div>
        </div>
        ) : (
          <LoginForm onLogin={handleLogin} />
        )
      }
    </div>
  )
}

export default App