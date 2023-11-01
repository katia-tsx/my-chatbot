import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'edge';

export async function POST(req: Request) {
  const { req_menssage } = await req.json();

  const chatCompletion = await openai.chat.completions.create({
    messages: req_menssage,
    model: "gpt-3.5-turbo",
    temperature: 0.9
  });


  return NextResponse.json(chatCompletion);
}