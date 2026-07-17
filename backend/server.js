import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/send", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",

      to: "YOUR_EMAIL@gmail.com",

      subject,

      html: `
                <h2>New Portfolio Message</h2>

                <p><strong>Name:</strong> ${name}</p>

                <p><strong>Email:</strong> ${email}</p>

                <p>${message}</p>
            `,
    });

    res.json({ success: true });
  } catch {
    res.json({ success: false });
  }
});

app.listen(5000);
