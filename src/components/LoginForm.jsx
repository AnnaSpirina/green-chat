import { useState } from "react";
import './LoginForm.css';

function LoginForm({ onLogin }) {
    const [idInstance, setIdInstance] = useState("");
    const [apiTokenInstance, setApiTokenInstance] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const idInstanceTrim = idInstance.trim();
        const apiTokenInstanceTrim = apiTokenInstance.trim();
        if (idInstanceTrim && apiTokenInstanceTrim) {
            onLogin(idInstanceTrim, apiTokenInstanceTrim);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <h1 className="login-form-title">Авторизация</h1>
            <div className="form-group">
                <label htmlFor="idInstance">idInstance</label>
                <input
                    value={idInstance}
                    onChange={(e) => setIdInstance(e.target.value)}
                    type="text"
                    id="idInstance"
                    name="idInstance"
                    autoComplete="off"
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="apiTokenInstance">apiTokenInstance</label>
                <input 
                    value={apiTokenInstance} 
                    onChange={(e) => setApiTokenInstance(e.target.value)} 
                    type="password" 
                    id="apiTokenInstance" 
                    name="apiTokenInstance" 
                    autoComplete="new-password"
                    required 
                />
            </div>
            <button type="submit" className="button-blue">Войти</button>
        </form>
    );
}

export default LoginForm;