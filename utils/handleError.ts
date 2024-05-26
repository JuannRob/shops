export function handleError(error: Error | string): never {
  const formattedError: Error = typeof error === 'string' ? new Error(error) : error;
  console.error('Error: ', formattedError);
  throw formattedError;
}
