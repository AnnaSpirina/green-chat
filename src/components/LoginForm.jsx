import { useState } from "react";

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
        <div className="login-form">
            <h2>Авторизация</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="idInstance">idInstance</label>
                    <input
                        value={idInstance}
                        onChange={(e) => setIdInstance(e.target.value)}
                        type="text"
                        id="idInstance"
                        name="idInstance"
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
                        required 
                    />
                </div>
                <button type="submit">Войти</button>
            </form>
        </div>
    );
}

export default LoginForm;