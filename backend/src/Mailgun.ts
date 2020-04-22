import * as Mailgun from 'mailgun-js';

export const mailgun = new Mailgun({ apiKey: process.env.MAILGUN_KEY!, domain: process.env.MAILGUN_DOMAIN! });
