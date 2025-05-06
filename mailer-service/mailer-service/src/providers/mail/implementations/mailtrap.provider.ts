import { IMailAccess, IMessageMail } from "../imail-access.interface";
import nodemailer from 'nodemailer'
import Mail from "nodemailer/lib/mailer";

export class MailTrap implements IMailAccess {
    private transporter: Mail;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "73512b54b5c4a5",
                pass: "0f73b17f7ba419"
            }
        });        
    }

    /**
     * Send Mail
     * @param mail 
     */
    async send(mail: IMessageMail): Promise<void> {
        await this.transporter.sendMail({
            to: {
                name: mail.to.name,
                address: mail.to.email,
            },
            from: {
                name: mail.from.name,
                address: mail.from.email,
            },
            subject: mail.subject,
            html: mail.body,
        })
    }
}