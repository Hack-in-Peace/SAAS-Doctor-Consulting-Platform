// app/api/groqAPI/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getGroqChatCompletion } from "@/lib/groq"; // adjust path if needed

export async function GET(request: NextRequest) {
  try {
    const symptoms = request.nextUrl.searchParams.get("symptoms");

    if (symptoms) {
      const chatCompletion = await getGroqChatCompletion(symptoms);

      return NextResponse.json({ value: chatCompletion }, { status: 200 });
    }

    return NextResponse.json(
      { error: "Symptoms not provided." },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error getting chat completion:", error);
    return NextResponse.json(
      { error: "Error generating response." },
      { status: 500 }
    );
  }
}
