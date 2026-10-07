import { useState } from "react";
import { validatePhone } from "../utils/phoneUtils";

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
        <div className="new-chat-form">
            <h2>Создать новый чат</h2>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Создать чат</button>
            </form>
        </div>
    );
}

export default NewChatForm;