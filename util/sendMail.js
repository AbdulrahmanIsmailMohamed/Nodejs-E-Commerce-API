const nodeMailer = require("nodemailer");

const sendMail = async (options) => {
    // 1) Create transporter ( service that will send email like "gmail","Mailgun", "mialtrap", sendGrid)
    const transport = nodeMailer.createTransport({
        host: process.env.MAILER_HOST,
        port: process.env.MAILER_PORT, // if secure false port = 587, if true port= 465
        secure: true,
        auth: {
            user: process.env.MAILER_USER,
            pass: process.env.MAILER_PASS
        }
    });

    // 2) Define email options (like from, to, subject, email content)
    const emailOpt = {
        from: "E-Commerce",
        to: options.email,
        subject: options.subject,
        html: options.message,
    };

    // 3) Send email
    await transport.sendMail(emailOpt)
}

module.exports = sendMail;