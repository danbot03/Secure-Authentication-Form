import { response } from "express";
import { PASSWORD_RESET_REQUEST_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js"
import { mailtrapClient, sender } from "./mailtrap.config.js"

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{ email }]

    try {
      const response = await mailtrapClient.send({
        from:sender,
        to: recipient,
        subject:"Verify your email",
        html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
        category: "Email Verification"
      })
      console.log("Email sent successfully:", response)
    } catch (error) {
      console.error(`Error sending verification`,error);

      throw new Error(`Error sending verification email: ${error}`)  
    }
};


export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{ email }];

    try {
      const response = await mailtrapClient.send({        
        from: sender,
        to: recipient,
        template_uuid:"2e6d3510-cc77-4e16-ac22-0bcc9a2d6fdd",
        template_variables: {
          "company_info_name": "Digistern DataBase Systems",
        "name": name
        },     
      });

      console.log("Email sent welcome successfully", response);
    } catch (error) {
      console.error(`Error sending welcome email`, error);
      
      throw new Error(`Error sending welcome email: ${error}`);
    }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL), 
      category: "Password Reset",
    });

    console.log("Password reset email sent successfully:", response)
  } catch (error) {
    console.error(`Error sending password reset email`, error);
    throw new Error(`Error sending password reset email: ${error}`);
    
  }
};

export const sendResetSuccessEmail = async (email) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password reset successful",
      html: `<h1>Password reset successful!</h1> <p>Your password has been successfully reset. You can now log in with your new credentials.</p>`,
      category: "Password Reset",
    });
    console.log("Password reset email sent successfully", response);
  } catch (error) {
    console.error(`Error sending password reset email`, error);
    
    throw new Error(`Error sending password reset email: ${error}`);    
  }
};