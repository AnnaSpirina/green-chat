export const toChatId = (phone) => `${phone}@c.us`;

export function normalizePhone(raw) {
    let digits = raw.replace(/\D/g, "");

    if (digits.length === 11 && digits[0] === "8") {
        digits = "7" + digits.slice(1);
    }

    return digits;
}

export function validatePhone(raw) {
    const normalized = normalizePhone(raw);

    if (normalized.length !== 11) {
        return { valid: false, error: "Номер должен содержать 11 цифр", value: normalized };
    }
    if (normalized[0] !== "7") {
        return { valid: false, error: "Номер должен начинаться с 7", value: normalized };
    }

    return { valid: true, error: "", value: normalized };
}