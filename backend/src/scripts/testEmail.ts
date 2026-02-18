import { verifyConnection, sendEmail } from '../config/email';
import dotenv from 'dotenv';
dotenv.config();

const testEmail = async () => {
    console.log('🔍 Testing Email Configuration...');

    // 1. Verify Connection
    const isConnected = await verifyConnection();
    if (!isConnected) {
        console.error('❌ Failed to establish SMTP connection. Check your credentials.');
        process.exit(1);
    }

    // 2. Send Test Email
    const testRecipient = process.env.EMAIL_USER; // Send to self
    if (!testRecipient) {
        console.error('❌ EMAIL_USER is not defined in .env');
        process.exit(1);
    }

    console.log(`📤 Sending test email to ${testRecipient}...`);
    const isSent = await sendEmail(
        testRecipient,
        'Test Email - Sharma Car Rental',
        '<h1>It Works!</h1><p>Your email configuration is correct. 🚀</p>'
    );

    if (isSent) {
        console.log('✅ Test email sent successfully!');
    } else {
        console.error('❌ Failed to send test email.');
    }
};

testEmail();
