import nodemailer from "nodemailer";

const handler = async (req, res) => {
    try {
        const { email, message, fullName, subject } = req.body;
        let transport = nodemailer.createTransport({
            host: 'smtp.titan.email',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: { rejectUnauthorized: false }
        });
        const mailOptions = {
            from: `${fullName} <info@turpio.com>`,
            to: "access@gpcgolf.com",
            subject: subject,
            html: `
      <h1 style="color: black;" >GPC-Golf</h1>
      <p style="font-size: 16px; font-weight: 600; text-transform: capitalize;">Name:</P><br/>
      <p style="font-size: 20px; font-weight: 600; text-transform: capitalize;" ><span style="color: black;" >${fullName}</span></p><br/><br/>

      <p style="font-size: 16px; font-weight: 600; text-transform: capitalize;">Message:</P><br/>
      <p style="font-size: 20px; font-weight: 600; text-transform: capitalize;" ><span style="color: black;" >${message}</span></p>
      `
        };

        const mailOptions2 = {
            from: `GPC-Golf <info@turpio.com>`,
            to: email,
            subject: "Thank you for Contacting us",
            html: `
      <h1 style="color: black;" >GPC-Golf</h1>
      <p style="font-size: 16px; font-weight: 600; text-transform: capitalize;">Hi ${fullName},</P><br/><br/>
      <p style="font-size: 20px; font-weight: 600; text-transform: capitalize;" ><span style="color: black;" >We are diligently working on your request.</span></p><br/>
      <p style="font-size: 20px; font-weight: 600; text-transform: capitalize;" ><span style="color: black;" >We'll get back to you soon</span></p><br/><br/>
      <p style="font-size: 20px; font-weight: 600; text-transform: capitalize;" ><span style="color: black;" >Best regards,</span></p><br/>
      <p style="font-size: 20px; font-weight: 600; text-transform: capitalize;" ><span style="color: black;" >GPC-Golf Team</span></p><br/>
      `
        };


        await transport.sendMail(mailOptions);
        await transport.sendMail(mailOptions2);
        return res.status(200).json({ success: true, message: "Thank you for contacting us!" });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message })
    }
}

export default handler
