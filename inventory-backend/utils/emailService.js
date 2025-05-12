import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
// nodemailer needs a transport service using which it can send emails
console.log("email user>>", process.env.EMAIL_USER);
console.log("email pass>>", process.env.EMAIL_PASS);
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendWelcomePackageEmail = async (customer, package_) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: customer.email,
      subject: 'Your Welcome Package is Being Dispatched!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Welcome to Our Family, ${customer.name}!</h2>
          <p>We're excited to have you join us! Your welcome package is being dispatched.</p>
          
          <h3>Package Details:</h3>
          <ul>
            <li>Package Type: ${package_.packageType}</li>
            <li>Status: ${package_.status}</li>
            <li>Delivery Address: ${package_.deliveryAddress}</li>
          </ul>
          
          <h3>Contents:</h3>
          <ul>
            ${package_.contents.map(item => `<li>${item}</li>`).join('')}
          </ul>
          
          <p>We hope you enjoy your package! If you have any questions, feel free to reach out.</p>
          
          <p>Best regards,<br>Your Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Welcome package email sent successfully');
  } catch (error) {
    console.error('Error sending welcome package email:', error);
  }
};