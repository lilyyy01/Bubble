import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
    console.log("Request body:", req.body); // Log incoming request

    const reqBody = req.body;
    const userMessage = reqBody.prompt;

    if (!userMessage || userMessage.trim().length === 0) {
        res.status(400).json({ error: { message: "Please enter a valid message" } });
        return;
    }

    try {
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ "role": "user", "content": userMessage }],
        });
        // Extract the text from the message object
        const botResponse = chatCompletion.choices[0].message.content;
        res.status(200).json({ result: botResponse });
    } catch (error) {
        console.error("OpenAI API request error:", error); // Log detailed error
        res.status(500).json({ error: { message: 'An error occurred during your request.' } });
    }
}
