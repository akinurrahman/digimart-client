// Function to check if a path exists dynamically
export async function checkIfPathExists(path: string): Promise<boolean> {
  try {
    const response = await fetch(path, { method: "HEAD" });
    return response.ok;
  } catch {
    return false;
  }
}
