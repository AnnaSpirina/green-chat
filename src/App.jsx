import './App.css';
import { useState } from 'react';
import LoginForm from './components/LoginForm';
import NewChatForm from './components/NewChatForm';
import ChatWindow from './components/ChatWindow';

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
  const [chatPhone, setChatPhone] = useState("");

  const handleLogin = (idInstance, apiTokenInstance) => {
    const authDataObject = { idInstance, apiTokenInstance };
    setAuthData(authDataObject);
    localStorage.setItem('authData', JSON.stringify(authDataObject));
  };

  const handleLogout = () => {
    setAuthData(null);
    setChatPhone("");
    localStorage.removeItem('authData');
  };

  return (
    <>
      {authData ? (
        <div>
          {chatPhone ? (
            <ChatWindow phone={chatPhone} onBack={() => setChatPhone("")} />
          ) : (
            <NewChatForm onCreateChat={(phone) => setChatPhone(phone)} />
          )}
          <button onClick={handleLogout}>Выйти</button>
        </div>
        ) : (
          <LoginForm onLogin={handleLogin} />
        )
      }
    </>
  )
}

export default App