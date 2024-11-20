/**
 * Utility Method to create options for a fetch call
 * @param method GET, POST, PUT, DELETE
 * @param body  The request body (only relevant for POST and PUT)
 * @returns
 */
export const makeOptions = (method: string, body?: unknown) => {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const options: RequestInit = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  return options;
};

/**
 * Utility Method to handle http-errors returned as a JSON-response with fetch
 * Meant to be used in the first .then() clause after a fetch-call
 */
export const handleHttpErrors = async (response: Response) => {
  if (!response.ok) {
    const errorText = await response.text(); // Fetch error text
    console.error("Error response text:", errorText); // Log the error for debugging
    throw new Error(response.statusText || "Unknown error");
  }

  // Check if response body is empty before parsing JSON
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }

  return response.text(); // Return text if there’s no JSON body
};
