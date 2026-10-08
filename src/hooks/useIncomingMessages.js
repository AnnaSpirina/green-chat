import { useEffect } from "react";
import { receiveNotification, deleteNotification } from "../api/greenApi";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function useIncomingMessages(authData, onMessage) {
    useEffect(() => {
        if (!authData) return;

        let isCancelled = false;
        const seenIds = new Set();

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
                        const isNotSeen = idMessage && !seenIds.has(idMessage);

                        if (isText && senderPhoneNumber && isNotSeen) {
                            seenIds.add(idMessage);
                            onMessage(String(senderPhoneNumber), { id: idMessage, text, fromMe: false });
                        }
                    }

                    await deleteNotification({ ...authData, receiptId });
                } catch (err) {
                    if (isCancelled) break;
                    console.error("Ошибка в цикле получения уведомлений:", err);
                    await sleep(3000);
                }
            }
        };
        runLoop();

        return () => {
            isCancelled = true;
        };
    }, [authData, onMessage]);
}

export default useIncomingMessages;