export type ModelType =
  | "deepseek"
  | "gemini-2.0-flash-lite-preview-02-05"
  | "gemini-1.5-flash"
  | "gemini-2.0-flash";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const sendMessage = async (
  message: string,
  model: ModelType = "deepseek"
) => {
  const response = await fetch(`${API_BASE_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, model }),
  });

  const data = await response.json();
  return data.response; // Since we wrapped the response in an object on the backend
};
