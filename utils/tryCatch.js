export async function tryCatchSync(promise) {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    return [null, error];
  }
}
