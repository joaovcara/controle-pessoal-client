/**
 * Função responsável por formatar data
 * @param dateString YYYT-MM-DDTHH:MM:SS.MS	
 * @returns DD/MM/YYYY
 */
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);  // Cria um objeto Date a partir da string
    const day = String(date.getDate()).padStart(2, "0"); // Extrai o dia e adiciona 0 à esquerda, se necessário
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Extrai o mês (adiciona 1, pois o mês começa em 0)
    const year = date.getFullYear();  // Extrai o ano

    return `${day}/${month}/${year}`;  // Retorna a data no formato dd/mm/yyyy
};