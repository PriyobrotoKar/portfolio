import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: process.env.SMTP_HOST!,
  port: Number(process.env.SMTP_PORT!),
  secure: true,
  auth: {
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PASS!,
  },
});

export const sendMail = async (emailTo: string) => {
  try {
    await transporter.sendMail({
      from: "Priyobroto <priyobrotokar@gmail.com>",
      to: emailTo,
      subject: "Thanks for contacting",
      html: "<h1>Hello World</h1>",
    });
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};
