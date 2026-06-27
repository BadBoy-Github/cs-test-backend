const nodemailer = require('nodemailer');

const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

const BASE_URL = 'https://codescapex.com';

const baseStyles = `
  body {
    margin: 0;
    padding: 0;
    background-color: #f0fdfa;
    font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', Arial, sans-serif;
  }
  .container {
    max-width: 600px;
    margin: 40px auto;
    background: #ffffff;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(16, 185, 129, 0.12);
    border: 1px solid #ccfbf1;
  }
  .header {
    background: linear-gradient(135deg, #10b981, #059669);
    color: white;
    text-align: center;
    padding: 35px 25px;
  }
  .header h2 {
    margin: 0;
    font-size: 28px;
    font-weight: 700;
    letter-spacing: 0.5px;
  }
  .header-icon {
    font-size: 48px;
    margin-bottom: 10px;
  }
  .content {
    padding: 35px 25px;
    color: #1f2937;
    line-height: 1.7;
    font-size: 16px;
  }
  .content p {
    margin: 18px 0;
  }
  .btn {
    display: inline-block;
    margin-top: 20px;
    padding: 14px 32px;
    background: linear-gradient(135deg, #10b981, #059669);
    color: #ffffff;
    text-decoration: none;
    border-radius: 10px;
    font-weight: 600;
    font-size: 16px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25);
  }
  .btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(16, 185, 129, 0.35);
  }
  .secondary-btn {
    display: inline-block;
    margin-top: 15px;
    padding: 12px 24px;
    background-color: #ecfeff;
    color: #059669;
    text-decoration: none;
    border-radius: 10px;
    font-weight: 600;
    border: 1px solid #a7f3d0;
  }
  .info-box {
    margin: 25px auto;
    padding: 20px;
    background: linear-gradient(135deg, #d1fae5, #a7f3d0);
    border-radius: 12px;
    display: block;
    text-align: center;
    border: 1px solid #6ee7b7;
  }
  .info-box-text {
    color: #065f46;
    font-size: 18px;
    font-weight: 600;
    margin: 0;
  }
  .score-box {
    margin: 25px auto;
    padding: 25px;
    background: linear-gradient(135deg, #ecfdf5, #d1fae5);
    border-radius: 14px;
    text-align: center;
    border: 2px dashed #34d399;
    display: block;
  }
  .score-value {
    font-size: 36px;
    font-weight: 800;
    color: #059669;
    margin: 0;
    letter-spacing: 1px;
  }
  .score-label {
    font-size: 14px;
    color: #6b7280;
    margin-top: 8px;
  }
  .divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, #ccfbf1, transparent);
    margin: 30px 0;
  }
  .footer {
    text-align: center;
    padding: 25px;
    font-size: 14px;
    color: #4b5563;
    background: linear-gradient(135deg, #f0fdfa, #ccfbf1);
  }
  .footer a {
    color: #059669;
    text-decoration: none;
    font-weight: 600;
  }
  .highlight {
    color: #059669;
    font-weight: 600;
  }
`;

const sendWelcomeEmail = async (user) => {
  const transporter = createTransporter();
  const { name, email } = user;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Welcome to Code Scapex! 🚀',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Welcome to Code Scapex</title>
        <style>${baseStyles}</style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="header-icon">💻</div>
            <h2>Welcome to Code Scapex, ${name}!</h2>
          </div>
          
          <div class="content">
            <p>Your account is all set and ready to roll! 🎉</p>
            
            <p>Dive into the world of coding challenges, where learning meets fun. Take tests, level up your skills, and become a code wizard!</p>
            
            <div class="divider"></div>
            
            <p>Ready to start your coding adventure? Click below:</p>
            
            <a href="${BASE_URL}/dashboard" class="btn">🚀 Launch Dashboard</a>
            
            <p style="margin-top:25px; color: #6b7280; font-size: 15px;">May the code be with you! 🧙‍♂️</p>
          </div>
          
          <div class="footer">
            © 2026 Code Scapex. All rights reserved.<br><br>
            <a href="${BASE_URL}">codescapex.com</a>
          </div>
        </div>
      </body>
      </html>
    `
  });
};

const sendResultEmail = async ({ email, userName, testTitle, score, totalMarks }) => {
  const transporter = createTransporter();

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Your Test Results are Here! 📊`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Test Result</title>
        <style>${baseStyles}</style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="header-icon">🏆</div>
            <h2>Test Results | Code Scapex</h2>
          </div>
          
          <div class="content">
            <p>Hey <span class="highlight">${userName}</span>! 👋</p>
            
            <p>You've just aced (or tried to ace) <strong>${testTitle}</strong>. Either way, you're awesome for giving it your best shot! 💪</p>
            
            <div class="score-box">
              <p class="score-value">${score} / ${totalMarks}</p>
              <p class="score-label">Your Score</p>
            </div>
            
            <div class="divider"></div>
            
            <p>Want to see how you did? Check your performance below:</p>
            
            <a href="${BASE_URL}/results" class="btn">📊 View Detailed Results</a>
            
            <p style="margin-top:25px; color: #6b7280; font-size: 15px;">Keep coding, keep conquering! 🔥</p>
          </div>
          
          <div class="footer">
            © 2026 Code Scapex. All rights reserved.<br><br>
            <a href="${BASE_URL}">codescapex.com</a>
          </div>
        </div>
      </body>
      </html>
    `
  });
};

const sendReminderEmail = async ({ email, userName, testTitle, duration }) => {
  const transporter = createTransporter();

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: `⏰ Heads Up! Your ${testTitle} Test is Live`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Test Reminder</title>
        <style>${baseStyles}</style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="header-icon">📣</div>
            <h2>Test Reminder | Code Scapex</h2>
          </div>
          
          <div class="content">
            <p>Hello there <span class="highlight">${userName}</span>! 😎</p>
            
            <p>Ready to put your coding skills to the test? <strong>${testTitle}</strong> is now live and waiting for you!</p>
            
            <div class="info-box">
              <p class="info-box-text">⏱️ Duration: ${duration} minutes of pure coding fun!</p>
            </div>
            
            <div class="divider"></div>
            
            <p>Time to shine! Let's see what you've got:</p>
            
            <a href="${BASE_URL}/dashboard" class="btn">🎯 Start Test Now</a>
            
            <p style="margin-top:25px; color: #6b7280; font-size: 15px;">May the force of code be with you! ✨</p>
          </div>
          
          <div class="footer">
            © 2026 Code Scapex. All rights reserved.<br><br>
            <a href="${BASE_URL}">codescapex.com</a>
          </div>
        </div>
      </body>
      </html>
    `
  });
};

module.exports = {
  createTransporter,
  sendWelcomeEmail,
  sendResultEmail,
  sendReminderEmail
};