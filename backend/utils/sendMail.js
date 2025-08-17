const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  secure: false, 
  auth: {
    user : process.env.MAIL_USER,
    pass : process.env.MAIL_PASS
  },
});


exports.sendEmail = async (to , subject , html) => {
    const mailOptions = {
        from : process.env.MAIL_USER ,
        to : to,
        subject : subject,
        html : html
    };
    
    try{
        await transporter.sendMail(mailOptions);
    }
    
    catch(error){
        console.error(error);
    }
}