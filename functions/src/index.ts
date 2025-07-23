import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as nodemailer from "nodemailer";
import * as cors from "cors";
import * as express from "express";

// Initialize Firebase Admin
admin.initializeApp();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Email transporter setup
const transporter = nodemailer.createTransporter({
  service: "gmail",
  auth: {
    user: functions.config().email?.user || process.env.EMAIL_USER,
    pass: functions.config().email?.pass || process.env.EMAIL_PASS,
  },
});

// Send email function
app.post("/send-email", async (req, res) => {
  try {
    const { name, email, subject, message, type = "contact" } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        error: "Name, email, and message are required." 
      });
    }

    let emailSubject = subject || "New Contact Form Message";
    let emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4361ee; border-bottom: 2px solid #4361ee; padding-bottom: 10px;">
          ${type === "chat" ? "New Chat Message" : "New Contact Form Message"}
        </h2>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ""}
          <p><strong>Type:</strong> ${type}</p>
        </div>
        
        <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #4361ee; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Message:</h3>
          <p style="line-height: 1.6; color: #555;">${message.replace(/\n/g, '<br>')}</p>
        </div>
        
        <div style="margin-top: 30px; padding: 15px; background-color: #e3f2fd; border-radius: 8px;">
          <p style="margin: 0; color: #1976d2; font-size: 14px;">
            <strong>📧 Reply directly to this email to respond to ${name}</strong>
          </p>
        </div>
        
        <div style="margin-top: 20px; text-align: center; color: #888; font-size: 12px;">
          <p>This message was sent from your portfolio website contact form.</p>
          <p>Time: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `;

    const mailOptions = {
      from: `"Portfolio Contact" <${functions.config().email?.user || process.env.EMAIL_USER}>`,
      to: functions.config().email?.user || process.env.EMAIL_USER,
      replyTo: email,
      subject: `[Portfolio] ${emailSubject} - From ${name}`,
      html: emailContent,
    };

    await transporter.sendMail(mailOptions);

    // Send auto-reply to user
    const autoReplyOptions = {
      from: `"Sumit Kumar" <${functions.config().email?.user || process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thanks for reaching out! - Sumit Kumar",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #4361ee 0%, #7209b7 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">Thanks for reaching out!</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">I've received your message and will get back to you soon.</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">Hi ${name},</p>
            
            <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">
              Thank you for your interest in my work! I've received your message and will review it carefully. 
              I typically respond within 24-48 hours during business days.
            </p>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #4361ee; margin-top: 0;">Your Message:</h3>
              <p style="color: #666; font-style: italic; margin: 0;">"${message.substring(0, 200)}${message.length > 200 ? '...' : ''}"</p>
            </div>
            
            <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">
              In the meantime, feel free to:
            </p>
            
            <ul style="color: #555; line-height: 1.8; padding-left: 20px;">
              <li>Check out my <a href="https://your-portfolio-url.com/projects" style="color: #4361ee; text-decoration: none;">latest projects</a></li>
              <li>Read my <a href="https://your-portfolio-url.com/blog" style="color: #4361ee; text-decoration: none;">development blog</a></li>
              <li>Connect with me on <a href="https://linkedin.com/in/your-profile" style="color: #4361ee; text-decoration: none;">LinkedIn</a></li>
            </ul>
            
            <div style="margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%); border-radius: 8px; text-align: center;">
              <p style="margin: 0; color: #1976d2; font-weight: bold;">
                🚀 Looking for immediate help with development questions?
              </p>
              <p style="margin: 10px 0 0 0; color: #555;">
                Try my <a href="https://your-portfolio-url.com/chat" style="color: #4361ee; text-decoration: none;">AI Development Assistant</a> for instant answers!
              </p>
            </div>
            
            <div style="margin-top: 30px; text-align: center;">
              <p style="color: #333; margin-bottom: 5px;">Best regards,</p>
              <p style="color: #4361ee; font-weight: bold; font-size: 18px; margin: 0;">Sumit Kumar</p>
              <p style="color: #888; font-size: 14px; margin: 5px 0 0 0;">Full Stack Developer</p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #888; font-size: 12px;">
            <p>This is an automated response. Please don't reply to this email.</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(autoReplyOptions);

    res.status(200).json({ 
      success: true, 
      message: "Email sent successfully! You'll receive a confirmation shortly." 
    });

  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({ 
      success: false, 
      error: "Failed to send email. Please try again later." 
    });
  }
});

// Chat message notification
app.post("/notify-chat-message", async (req, res) => {
  try {
    const { message, senderEmail, sessionId } = req.body;

    if (!message) {
      return res.status(400).json({ 
        success: false, 
        error: "Message is required." 
      });
    }

    const mailOptions = {
      from: `"Portfolio Chat" <${functions.config().email?.user || process.env.EMAIL_USER}>`,
      to: functions.config().email?.user || process.env.EMAIL_USER,
      subject: `[Portfolio Chat] New message ${senderEmail ? `from ${senderEmail}` : ''}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4361ee;">💬 New Chat Message</h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            ${senderEmail ? `<p><strong>From:</strong> ${senderEmail}</p>` : '<p><strong>From:</strong> Anonymous User</p>'}
            <p><strong>Session ID:</strong> ${sessionId}</p>
            <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #4361ee;">
            <h3>Message:</h3>
            <p style="line-height: 1.6;">${message}</p>
          </div>
          
          <p style="margin-top: 20px; color: #666;">
            <a href="https://your-portfolio-url.com/chat" style="color: #4361ee;">View in Chat Dashboard</a>
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ 
      success: true, 
      message: "Chat notification sent successfully!" 
    });

  } catch (error) {
    console.error("Chat notification error:", error);
    res.status(500).json({ 
      success: false, 
      error: "Failed to send chat notification." 
    });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: "Email service is running!",
    timestamp: new Date().toISOString()
  });
});

// Export the function
export const emailService = functions.https.onRequest(app);

// Firestore trigger for new chat messages
export const onNewChatMessage = functions.firestore
  .document('messages/{messageId}')
  .onCreate(async (snap, context) => {
    const message = snap.data();
    
    // Only notify for visitor messages, not bot responses
    if (message.sender === 'visitor') {
      try {
        const mailOptions = {
          from: `"Portfolio Chat Bot" <${functions.config().email?.user || process.env.EMAIL_USER}>`,
          to: functions.config().email?.user || process.env.EMAIL_USER,
          subject: `[Portfolio] New Chat Message`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #4361ee;">💬 New Chat Message Received</h2>
              
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>From:</strong> ${message.email || 'Anonymous User'}</p>
                <p><strong>Session:</strong> ${message.metadata?.sessionId || 'Unknown'}</p>
                <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
              </div>
              
              <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #4361ee;">
                <h3>Message:</h3>
                <p style="line-height: 1.6;">${message.content}</p>
              </div>
              
              <div style="margin-top: 20px; text-align: center;">
                <a href="https://your-portfolio-url.com/chat" 
                   style="display: inline-block; padding: 12px 24px; background-color: #4361ee; color: white; text-decoration: none; border-radius: 6px;">
                  View in Chat Dashboard
                </a>
              </div>
            </div>
          `,
        };

        await transporter.sendMail(mailOptions);
        console.log('Chat notification email sent successfully');
      } catch (error) {
        console.error('Error sending chat notification:', error);
      }
    }
  });