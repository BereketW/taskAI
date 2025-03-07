import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateTags(title: string, description: string) {
  const apiKey = process.env.GEMINI_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Generate 3-5 relevant tags for this task:
    Title: ${title}
    Description: ${description || "No description provided"}
    Return the tags as a list, each one on a new line, without extra text.`;

  try {
    console.log(`📡 Sending request to Gemini API for task: ${title}`);

    const response = await model.generateContent(prompt);
    const text = response.response.text(); // Extract text response

    if (!text) {
      console.warn("⚠️ Empty response from Gemini API.");
      return [];
    }

    // ✅ Properly split by newline characters instead of commas
    const tags = text.split("\n").map((tag) => tag.replace("*", "").trim());

    console.log(`✅ AI-Generated Tags:`, tags);
    return tags;
  } catch (error) {
    console.error("❌ Gemini API Error:", error);
    return [];
  }
}
