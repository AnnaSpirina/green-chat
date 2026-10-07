import { API_BASE_URL} from "../utils/constants";

export async function sendMessage({ idInstance, apiTokenInstance, phone, message }) {
    const url = `${API_BASE_URL}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;

    const body = { chatId: `${phone}@c.us`, message };

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        throw new Error(`Ошибка при отправке: ${response.status}`);
    }

    const data = await response.json();
    return data;
}