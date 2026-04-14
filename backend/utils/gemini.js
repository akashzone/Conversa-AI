import "dotenv/config";

const geminiAPIResponse = async (message) => {
  const options = {
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": `${process.env.GEMINI_API_KEY}`,
    },
    method: "POST",
    body: JSON.stringify({
      model: "gemini-flash-latest",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: message,
            },
          ],
        },
      ],
    }),
  };
  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent",
      options,
    );
    const data = await response.json();
    return data.candidates[0].content.parts[0].text; //reply
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get Gemini API response");
  }
};

export default geminiAPIResponse;