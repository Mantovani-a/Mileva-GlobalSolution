export function matchesText(value, query) {
  const normalize = (text) =>
    String(text)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLocaleLowerCase('pt-BR')
  return normalize(value).includes(normalize(query.trim()))
}
