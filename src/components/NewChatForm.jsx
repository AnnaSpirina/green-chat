import { useState } from "react";
import { validatePhone } from "../utils/phoneUtils";
import './NewChatForm.css';

function NewChatForm({ onCreateChat }) {
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const { valid, error: validationError, value } = validatePhone(phone);

        if (!valid) {
            setError(validationError);
            return;
        }

        setError("");
        onCreateChat(value);
        setPhone("");
    };

    return (
        <form onSubmit={handleSubmit} className="new-chat-form">
            <div className="form-group">
                <label htmlFor="phone">Номер телефона</label>
                <input
                    value={phone}
                    onChange={(e) => {
                        setPhone(e.target.value); 
                        setError("")}
                    }
                    type="text"
                    id="phone"
                    name="phone"
                    required
                />
                {error && <p className="form-error">{error}</p>}
            </div>
            <button type="submit" className="button-blue">Начать диалог</button>
        </form>
    );
}

export default NewChatForm;