import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateSubtask({ data }) {
  try {
    // const { title, description } = await req.json();
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Given the task title "${data.title}" and description "${data.description}", generate a list of 5 clear and concise subtasks.
      Format them as a JSON array of objects like this:
      [{"subtask": "First subtask"}, {"subtask": "Second subtask"}, ...]
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    return Response.json(JSON.parse(responseText));
  } catch (error) {
    return Response.json(
      { error: "Failed to generate subtasks" },
      { status: 500 }
    );
  }
}
