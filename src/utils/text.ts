// Tira acentos e maiúsculas para "estatistica" encontrar "Estatística".
export function normalize(text: string) {
    return text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

// Verdadeiro se algum dos campos contém o termo buscado; termo vazio aceita tudo.
export function matchesSearch(search: string, fields: string[]) {
    const term = normalize(search.trim());
    return fields.some((field) => normalize(field).includes(term));
}
