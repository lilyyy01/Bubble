import user from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';
import { NextApiRequest, NextApiResponse } from "next";
// import nodemailer from 'nodemailer';
// import formidable from 'formidable';
const nodemailer = require("nodemailer");
const formidable = require("formidable");
const jwt = require('jsonwebtoken');

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function POST(req: NextApiRequest, res: NextApiResponse){
    // just send email here...
    if (req.method === 'POST') {
        const username = process.env.NEXT_PUBLIC_EMAIL_USERNAME;
        const password = process.env.NEXT_PUBLIC_EMAIL_PASSWORD;
        
        console.log("username (from)", username);
        
        // create transporter object
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            tls: {
                ciphers: "SSLv3",
                rejectUnauthorized: false,
            },
            auth: {
                user: username,
                pass: password
            }
        });

        // load the form using the formidable package for convenience
        const parseForm = async (req) => new Promise(
            (resolve, reject) => new formidable.IncomingForm().parse(
                req, (err, fields, files) => err ? reject(err) : resolve([fields, files])
            )
        )
        const [fields, files] = await parseForm(req);

        const toEmail = fields.email;
        console.log("toEmail (to):", toEmail);

        // generate JWT token
        let secret = 'fe1a1915a3vanleshjgvasnfe15068681066751984';
        let one_time_token = jwt.sign({toEmail: toEmail}, secret);

        console.log("one time token", one_time_token);
        
        // create a email template to reset password
        // (1) gentle background Introduction
        // (2) generate a special url link to reset password
        // (3) tell the user not to share the link with anybody.
        // (4) the url link field is temporally recorded, then destroyed...

        // TODO: use a html component with Bubble style for this...
        const passwordReset = `http://localhost:3000/forgot-password/${one_time_token}/${toEmail}`;
        const messageMainContent = `
        Hi ${toEmail}, <br>
            We've received a request to reset your password. <br>
            If you didn't make the request, just ignore this message. <br>
            Otherwise, you can reset the password following this link: <br>
            <a href=${passwordReset}>Link to Reset password</a> <br>
            Thanks, <br>
            The Bubble team.
        `

        try {
            const mail = await transporter.sendMail({
                from: username,
                to: toEmail,
                replyTo: toEmail,
                subject: `Bubble: Reset your password`,
                html: `
                <p>${messageMainContent}</p>
                `,
            });
            return res.json({ message: "Success: email was sent" })
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "COULD NOT SEND MESSAGE" });
        }
    
      } else {
        // Handle any other HTTP method
    }
}
