const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  // Utilisation de SMTP fictif pour les tests
  // Pour la production, vous utiliserez un véritable service SMTP
  host: 'smtp-relay.gmail.com',
  port: 465,
  secureConnection: true,
  auth: {
      user: 'hamza.nasri.ingr@gmail.com',  // Remplacer par votre e-mail et mot de passe SMTP
      pass: 'Souadwanna1@',
      tls: {
        rejectUnauthorized: false
      }
  }
});

function sendActivationEmail(email, token) {
    const activationLink = `http://localhost:3000/auth/activate/${token}`;
  
    const message = {
      from: 'hamza.nasri.ingr@gmail.com',
      to: email,
      subject: 'Activation de votre compte',
      text: `Cliquez sur ce lien pour activer votre compte : ${activationLink}`,
      html: `<p>Cliquez sur ce <a href="${activationLink}">lien</a> pour activer votre compte.</p>`
    };
  
    return transporter.sendMail(message);
  }
  module.exports = {
    sendActivationEmail
  };