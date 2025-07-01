import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a legal assistant specialized in Indian law only. First suggest what kind of lawyer the user should consult (don't give specific names) and **bold** it. Use simple, respectful language. Avoid legal jargon unless needed.",
        },
        ...messages,
      ],
      model: "llama3-8b-8192",
    });

    const reply = chatCompletion.choices[0]?.message?.content || "Sorry, I couldn't reply.";
    return NextResponse.json({ reply });

  } catch (err) {
    console.error("Groq API Error:", err);
    return NextResponse.json({ reply: "Server error. Please try again." }, { status: 500 });
  }
}
