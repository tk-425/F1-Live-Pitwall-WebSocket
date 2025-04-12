export function checkError(array, error, type) {
  if (error || !Array.isArray(array)) {
    printError(`Failed to fetch ${type}:`, error?.message);
    return;
  }
}
