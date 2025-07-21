import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function GET(request: NextRequest) {
    try {
        const symptoms: string | null = request.nextUrl.searchParams.get("symptoms");
        if(symptoms){
          const chatCompletion = await getGroqChatCompletion(symptoms);
            
            return NextResponse.json({
                value: chatCompletion},
                {status: 200});
        }

        return NextResponse.json(
            {error: "Error creating list!"},
            {status: 500}
        )
  // Print the completion returned by the LLM.

    } catch (error) {
        console.error("Error creating order: ", error);
        return NextResponse.json(
            {error: "Error creating list!"},
            {status: 500}
        )
    }
}


export async function getGroqChatCompletion(symptoms: string ) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `suggest me precautions, course of action, next steps, possible disease with the given symptoms. The symptoms are ${symptoms}`,
      },
    ],
    model: "llama-3.3-70b-versatile",
  });
}
