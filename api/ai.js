// api/ai.js
import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
  apiKey: process.env.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, // simpan sebagai variabel environment
});
const openai = new OpenAIApi(config);

export default async function handler(req, res) {
  const { message } = req.query;

  if (!message) {
    return res.status(400).json({ reply: "Pertanyaan tidak boleh kosong." });
  }

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Kamu adalah AI pribadi yang membantu dengan pertanyaan coding JavaScript, HTML, CSS, dan lainnya." },
        { role: "user", content: message }
      ],
    });

    const reply = completion.data.choices[0].message.content;
    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({ reply: "Terjadi kesalahan: " + error.message });
  }
}
