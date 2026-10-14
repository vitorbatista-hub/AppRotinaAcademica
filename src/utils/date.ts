const MONTHS = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
const DAY_IN_MS = 24 * 60 * 60 * 1000;

function startOfDay(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

// Deixa só os números e coloca as barras: "24102026" vira "24/10/2026".
export function maskDate(text: string) {
    const digits = text.replace(/\D/g, "").slice(0, 8);
    return [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4)]
        .filter(Boolean)
        .join("/");
}

// Devolve null se o texto estiver incompleto ou for uma data que não existe (31/02).
export function parseDate(text: string) {
    const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(text);
    if (!match) {
        return null;
    }

    const [day, month, year] = match.slice(1).map(Number);
    const date = new Date(year, month - 1, day);
    const exists = date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;

    return exists ? date : null;
}

export function isPastDate(date: Date, today = new Date()) {
    return date.getTime() < startOfDay(today).getTime();
}

// Formato gravado no banco: "2026-10-24".
export function toIsoDate(date: Date) {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${date.getFullYear()}-${month}-${day}`;
}

// Monta a data no fuso do aparelho. O new Date("2026-10-24") leria como UTC e voltaria um dia no Brasil.
export function parseIsoDate(text: string) {
    const [year, month, day] = text.split("-").map(Number);
    return new Date(year, month - 1, day);
}

// Negativo quando a data já passou.
export function daysUntil(date: Date, today = new Date()) {
    return Math.round((startOfDay(date).getTime() - startOfDay(today).getTime()) / DAY_IN_MS);
}

export function formatDueLabel(date: Date, today = new Date()) {
    const days = daysUntil(date, today);

    if (days === -1) {
        return "Ontem";
    }
    if (days === 0) {
        return "Hoje";
    }
    if (days === 1) {
        return "Amanhã";
    }
    return `${date.getDate()} ${MONTHS[date.getMonth()]}`;
}
