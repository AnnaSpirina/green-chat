import { API_BASE_URL} from "../utils/constants";

export function sendMessage({ idInstance, apiTokenInstance, phone, message }) {
    return request(idInstance, apiTokenInstance, "sendMessage", {
        method: "POST",
        body: { chatId: `${phone}@c.us`, message }
    });
}

export function receiveNotification({ idInstance, apiTokenInstance }) {
    return request(idInstance, apiTokenInstance, "receiveNotification", { method: "GET" }, "?receiveTimeout=10");
}

export function deleteNotification({ idInstance, apiTokenInstance, receiptId }) {
    return request(idInstance, apiTokenInstance, "deleteNotification", { method: "DELETE" }, `/${receiptId}`);
}

async function request(idInstance, apiTokenInstance, apiMethod, options = {}, suffix = ""){
    const url = `${API_BASE_URL}/waInstance${idInstance}/${apiMethod}/${apiTokenInstance}${suffix}`;
    const response = await fetch(url, {
        method: options.method || "GET",
        headers: options.body ? { "Content-Type": "application/json" } : undefined,
        body: options.body ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
        throw new Error(`Ошибка ${apiMethod}: ${response.status}`);
    }

    const data = await response.json();
    return data;
}