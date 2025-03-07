import { auth } from "@/lib/auth";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { headers } from "next/headers";

// export async function generateInsights({ data }) {
//   try {
//     // const { title, description } = await req.json();
//     const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//     const prompt = `
//       Given the task "${JSON.stringify(data)}" can you generate ai suggesstions and actions needed to be implemented based on the tasks information and also calculate average completation date and also when you generate the suggesstions i want you to generate your confidence for each actions and also a single confidence for the whole actions and how much potential time will be saved by taking all the actions and and if implemented you also tell implementation rate so this is going to be the format for you to generate the suggesstions : so here is the format for you to generate {
//       "insights":{
//       confidenceScore,
//       potentialTimeSaved,
//       implementationRate,
//       activeSuggestions,
//       actions:[
//         {
//       id,
//       title,
//       description,
//       confidenceScore,
//       implementationRate
//       duration,
//       tags,
//       impactLevel: high, medium or low
//   }]
//     `;

//     const result = await model.generateContent(prompt);
//     const responseText = result.response.text();

//     return Response.json(JSON.parse(responseText));
//   } catch (error) {
//     return Response.json(
//       { error: "Failed to generate subtasks" },
//       { status: 500 }
//     );
//   }
// }

export async function generateInsights() {
  const session = await auth.api.getSession({ headers: await headers() });
  try {
    const data = await fetch(`${process.env.BASE_URL}/api/ai/insights`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.session.token}`,
      },
    });
    const insights = await data.json();
    console.log(data);
    return { insights: insights.suggestions };
  } catch (error) {
    console.log(error);
    return { error: error, message: "Could not fetch insights" };
  }
}
