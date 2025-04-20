export function checkError(array, error, type) {
  if (error || !Array.isArray(array)) {
    printError(`Failed to fetch ${type}:`, error?.message);
    return;
  }
}

export function isValidArray(data) {
  return Array.isArray(data) && data.length > 0;
}
