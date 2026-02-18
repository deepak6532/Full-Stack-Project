import { Request, Response } from 'express';
import UserQuery from '../models/UserQuery';
import { sendEmail } from '../config/email';

export const submitQuery = async (req: Request, res: Response) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        const newQuery = new UserQuery({
            name,
            email,
            phone,
            subject,
            message
        });

        await newQuery.save();

        // Send notification to Admin (or the configured email)
        const adminEmail = process.env.EMAIL_USER;
        if (adminEmail) {
            await sendEmail(
                adminEmail,
                `New Contact Query: ${subject}`,
                `
                <h3>New "Contact Us" Message</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <blockquote style="background: #f9f9f9; padding: 10px; border-left: 4px solid #orange;">
                    ${message}
                </blockquote>
                `
            );
        }

        res.status(201).json({ message: 'Query submitted successfully', query: newQuery });
    } catch (error) {
        console.error('Error submitting query:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
