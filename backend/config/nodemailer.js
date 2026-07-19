import nodemailer from 'nodemailer';

const sendEmailNotification = async (messageData) => {
  const { name, email, phone, subject, message } = messageData;

  // Gracefully skip email if credentials are using placeholders
  if (
    !process.env.EMAIL_USER ||
    process.env.EMAIL_USER === 'your_email@gmail.com' ||
    !process.env.EMAIL_PASS ||
    process.env.EMAIL_PASS === 'your_gmail_app_password'
  ) {
    console.log('\n--- SMTP Credentials Not Set. Simulation Mode ---');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Phone: ${phone || 'N/A'}`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);
    console.log('--------------------------------------------------\n');
    return true;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT) || 465,
      secure: parseInt(process.env.EMAIL_PORT) === 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
        <h2 style="color: #2563EB; border-bottom: 2px solid #2563EB; padding-bottom: 10px;">New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 15px; border-left: 4px solid #7C3AED;">
          <p style="margin: 0; white-space: pre-wrap;">${message}</p>
        </div>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="font-size: 0.8rem; color: #888; text-align: center;">Sent from your Portfolio contact form.</p>
      </div>
    `;

    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.TO_EMAIL || process.env.EMAIL_USER,
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email notification sent: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error(`Email delivery failed: ${error.message}`);
    return false;
  }
};

export default sendEmailNotification;
