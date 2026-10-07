import { useState } from "react";

function NewChatForm({ onCreateChat }) {
    const [phone, setPhone] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const phoneTrim = phone.trim();
        if (phoneTrim) {
            onCreateChat(phoneTrim);
            setPhone("");
        }
    };

    return (
        <div className="new-chat-form">
            <h2>Создать новый чат</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="phone">Номер телефона</label>
                    <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        type="text"
                        id="phone"
                        name="phone"
                        required
                    />
                </div>
                <button type="submit">Создать чат</button>
            </form>
        </div>
    );
}

export default NewChatForm;