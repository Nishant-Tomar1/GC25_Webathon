import nodemailer from 'nodemailer';
import dotenv from 'dotenv'

dotenv.config({ path: '.env'});

const sendmail = async (options) => {
    const htmlTemplate = `
    <h2>Dear User,</h2>
        Your opt for verifaction is ${options.otp}
    </body>
    </html>`;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASS
        }
    });

    const mailoptions = {
        from: process.env.SMTP_MAIL,
        to: options.email,
        subject: "OTP Verification",
        html: htmlTemplate
    };

    await transporter.sendMail(mailoptions);
}

export {
    sendmail
}
