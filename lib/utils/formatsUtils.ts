/* snowboard to Snowboard */
export const capitalize = (word: string): string => {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

/* "L'île d'Oléron" to "liledoleron" */
export function sanitizeString(input?: string): string {
  if (!input) return ''
  // Supprime tous les espaces
  let formattedString = input.replace(/\s/g, '')

  // Supprime les accents
  formattedString = formattedString.normalize('NFD').replace(/[\u0300-\u036F]/g, '')

  // Supprime les caractères spéciaux
  formattedString = formattedString.replace(/[^a-zA-Z0-9]/g, '')

  // Convertit en minuscules
  formattedString = formattedString.toLowerCase()

  return formattedString
}
