import nodemailer from 'nodemailer';

const createTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.EMAIL_PORT || '587'),
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false
        }
    });
};

export const verifyConnection = async (): Promise<boolean> => {
    try {
        const transporter = createTransporter();
        await transporter.verify();
        console.log('✅ SMTP Connection established successfully.');
        return true;
    } catch (error) {
        console.error('❌ SMTP Connection failed:', error);
        return false;
    }
};

export const sendEmail = async (to: string, subject: string, html: string): Promise<boolean> => {
    try {
        const transporter = createTransporter();
        const info = await transporter.sendMail({
            from: process.env.EMAIL_FROM || '"Gupta Car Rental" <noreply@Guptacarrental.com>',
            to,
            subject,
            html,
        });
        console.log(`📧 Email sent to: ${to} | MessageID: ${info.messageId}`);
        return true;
    } catch (error) {
        console.error(`❌ Email Error (To: ${to}):`, error);
        return false;
    }
};

export default createTransporter;
