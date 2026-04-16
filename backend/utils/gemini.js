import "dotenv/config";

const geminiAPIResponse = async (message) => {
  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": process.env.GEMINI_API_KEY,
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: message }],
          },
        ],
      }),
    }
  );

  const data = await response.json();

  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!response.ok || !text) {
    throw new Error(data?.error?.message || "Failed to get Gemini API response");
  }

  return text;
};

export default geminiAPIResponse;