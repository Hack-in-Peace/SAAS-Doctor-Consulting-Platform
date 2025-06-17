// lib/groq.ts
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! });

// export async function getGroqChatCompletion(symptoms: string) {
//   return groq.chat.completions.create({
//     messages: [
//       {
//         role: "user",
//         content: `Suggest me precautions, course of action, next steps, and possible diseases based on these symptoms: ${symptoms}`,
//       },
//     ],
//     model: "llama-3-70b-8192", // or "llama-3.3-70b-versatile" if that's the correct name
//   });
// }

export async function getGroqChatCompletion(symptoms: string) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Suggest me precautions, course of action, next steps, and possible disease with the given symptoms: ${symptoms}`,
      },
    ],
    model: "llama-3.3-70b-versatile", // ✅ correct model name
  });
}
