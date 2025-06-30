// import * as functions from "firebase-functions";
import * as nodemailer from "nodemailer";
import * as express from "express";
import * as cors from "cors";
// import * as dotenv from "dotenv";

// dotenv.config();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Email transporter setup using Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,     // Your Gmail address
    pass: process.env.EMAIL_PASS,     // App password from Gmail
  },
});

// POST endpoint for sending email
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `Contact form message from ${name}`,
    text: `
      Name: ${name}
      Email: ${email}
      Message: ${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (err) {
    console.error("Failed to send email:", err);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
});

// Export the function
// export const api = functions.https.onRequest(app);
