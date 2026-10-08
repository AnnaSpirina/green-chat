import { useState, useEffect, useRef } from "react";
import { sendMessage, receiveNotification, deleteNotification } from "../api/greenApi";

function ChatWindow({ authData, phone, onBack }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState(null);
    const seenIdsRef = useRef(new Set());

    useEffect(() => {
        let isCancelled = false;

        const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

        const runLoop = async () => {
            while (!isCancelled) {
                try {
                    const notification = await receiveNotification(authData);

                    if (notification === null) continue;
                    if (isCancelled) break;

                    const { receiptId, body } = notification;

                    if (body?.typeWebhook === "incomingMessageReceived") {
                        const senderPhoneNumber = body?.senderData?.senderPhoneNumber;
                        const typeMessage = body?.messageData?.typeMessage;
                        const text = body?.messageData?.textMessageData?.textMessage;
                        const idMessage = body?.idMessage;

                        const isText = typeMessage === "textMessage";
                        const isFromThisChat = String(senderPhoneNumber) === phone;
                        const isNotSeen = idMessage && !seenIdsRef.current.has(idMessage);

                        if (isText && isFromThisChat && isNotSeen) {
                            seenIdsRef.current.add(idMessage);
                            setMessages((prev) => [
                                ...prev,
                                { id: idMessage, text, fromMe: false },
                            ]);
                        }
                    }

                    await deleteNotification({ ...authData, receiptId });
                } catch (err) {
                    if (isCancelled) break;
                    console.error("Ошибка в цикле получения уведомлений:", err);
                    await sleep(3000);
                }
            }
        }
        runLoop();

        return () => {
            isCancelled = true;
        };
    }, [authData, phone]);


    const handleSendMessage = async (e) => {
        e.preventDefault();

        const newMessageText = newMessage.trim();
        if (newMessageText === "") return;

        setIsSending(true);
        setError(null);

        try{
            await sendMessage({ ...authData, phone, message: newMessageText });
            setMessages((prevMessages) => [
                ...prevMessages,
                { id: crypto.randomUUID(), text: newMessageText, fromMe: true },
            ]);
            setNewMessage("");
        } catch (err){
            console.error("Ошибка при отправке сообщения:", err);
            setError("Ошибка при отправке сообщения");
        } finally {
            setIsSending(false);
        }
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
                {error && <p className="form-error">{error}</p>}
                <button disabled={isSending} type="submit">Отправить</button>
            </form>
        </div>
    );
}

export default ChatWindow;