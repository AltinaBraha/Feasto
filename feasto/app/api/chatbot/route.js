import { NextResponse } from "next/server";
import food from "../../menus/data/food.json";

export async function POST(req) {
  try {
    const { message } = await req.json();
    const lowerMsg = message.toLowerCase();


    if (lowerMsg.includes("hello") || lowerMsg.includes("hi")) {
      return NextResponse.json({ reply: "Hello! Welcome to Feasto. How can I help you today?" });
    }

    if (lowerMsg.includes("close") || lowerMsg.includes("What time does the restaurant close") || lowerMsg.includes("What time does the restaurant open")) {
      return NextResponse.json({ reply: "We open at 8:00 AM and close at 11:00 PM every day." });
    }

    if (
        lowerMsg.includes("where are you located") ||
        lowerMsg.includes("location") ||
        lowerMsg.includes("located")
        ) {
        return NextResponse.json({ reply: "We are located at Prishtine, City Center." });
        }

    
    const menuItems = food
      .map((item) => `${item.name} - ${item.description ?? "No description."}`)
      .join("\n");

    const systemPrompt = `
        You are a restaurant chatbot. Always answer with max 2-3 short suggestions based on the menu provided:

${menuItems}

Do not make up any other items or drinks that are not listed above.
Answer clearly and concisely.
`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "Feasto Chatbot"
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ],
        max_tokens: 150,  // kufizo përgjigjen në gjatësinë e dëshiruar
      }),
    });

    const data = await response.json();

    console.log("OpenRouter API response:", JSON.stringify(data, null, 2));

    if (!data.choices || data.choices.length === 0) {
      return NextResponse.json({ reply: "Error: No response from the model." });
    }

    const reply = data.choices[0].message.content;
    return NextResponse.json({ reply });

  } catch (error) {
    console.error("API call error:", error);
    return NextResponse.json({ reply: "Server error. Please try again later." });
  }
}
