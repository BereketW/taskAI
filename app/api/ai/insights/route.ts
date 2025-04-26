// import { auth } from "@/lib/auth";
// import { prisma } from "@/lib/prisma";
// import { NextRequest, NextResponse } from "next/server";
// // import { OpenAI } from "openai";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
// // const openai = new OpenAI({
// //   baseURL: "https://openrouter.ai/api/v1",
// //   apiKey: process.env.DEEPSEEK_API_KEY,
// // });
// export async function GET(req: NextRequest) {
//   const session = await auth.api.getSession({ headers: req.headers });
//   if (!session) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }
//   try {
//     const tasks = await prisma.user.findUnique({
//       where: {
//         id: session.user.id,
//       },
//       include: {
//         accounts: true,
//         Notification: true,
//         Reminder: true,
//         Task: true,
//         TaskList: true,
//         Workspace: true,
//       },
//     });
//     console.log(tasks);
//     console.log("started to generate ai suggestions.....");
//     const prompt = `
//     Given the task "${JSON.stringify(tasks)}" can you generate ai suggesstions and actions needed to be implemented based on the tasks information and also calculate average completation date and also when you generate the suggesstions i want you to generate your confidence for each actions and also a single confidence for the whole actions and how much potential time will be saved by taking all the actions and and if implemented you also tell implementation rate so this is going to be the format for you to generate the suggesstions : so here is the format for you to generate {
//     "insights":{
//     confidenceScore,
//     potentialTimeSaved,
//     implementationRate,

import { NextResponse } from "next/server";

//     activeActionsCount,
//     actions:[
//       {
//     id,
//     title,
//     description,
//     confidenceScore,

//     estimatedTime,
//     actionType,
//     impactLevel: high, medium or low
// },
// suggestions:[{
// id,
// title,
// suggestions,
// aiConfidenceScore,
// actionType,
// impactLevel,
// estimatedTime,
// aiInsight
// }]]
//    and please don't generate anything else tather than the json file and also please refer the task titles when recommending actions to be taken  and also the action description doesn't need to surpass 2 or 3 lines and also calculate average and the number of actions to be taken depends on how many suggestions  have been made and but it the suggestions have to be >=4 also remember to suggest creating subtasks if there is no subtask to the task potential time save must be either a whole number or a float and also when creating the action description don't use quatioation mark or any other symbols use html tags if necessary and also make it short as much as possible like i said don't use "" or ''
//    `;

//     const result = await model.generateContent(prompt);
//     let responseText = result.response.text();
//     responseText = responseText
//       .replace(/^```json\s*/, "") // Remove starting triple backticks and 'json'
//       .replace(/```$/, ""); // Remove ending triple backticks

//     // Trim whitespace
//     const jsonMatch = responseText.match(/\{[\s\S]*\}/);

//     const response = JSON.parse(jsonMatch[0]);
//     // console.log(responseText);
//     // console.log(response.insights);
//     console.log("Generating DeepSeek Response......");
//     // const deepseekResponse = await fetch(
//     //   "https://openrouter.ai/api/v1/chat/completions",
//     //   {
//     //     method: "POST",
//     //     headers: {
//     //       Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,

//     //       "Content-Type": "application/json",
//     //     },
//     //     body: JSON.stringify({
//     //       model: "deepseek/deepseek-r1:free",
//     //       messages: [
//     //         {
//     //           role: "user",
//     //           content: prompt,
//     //         },
//     //       ],
//     //     }),
//     //   }
//     // );
//     // const deepseekInsights = await deepseekResponse.json();
//     // const message = deepseekInsights.choices[0].message;
//     // const messageMatch = message.content.match(/\{[\s\S]*\}/);
//     // console.log(messageMatch);
//     // console.log("deepseek response", deepseekInsights);
//     // console.log("deepseek message", JSON.parse(messageMatch[0]));

//     return NextResponse.json({ suggestions: response.insights, success: true });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({
//       error: "Internal Server Error",
//       success: false,
//     });
//   }
// }
export async function GET() {
  return NextResponse.json({ hello: "hello" });
}
