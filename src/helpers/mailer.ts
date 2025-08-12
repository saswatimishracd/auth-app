import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

export const sendMail = async ({email,emailType,userId}:any)=>{
    try {
        //Create a hashed Token
       const hashedToken = await bcryptjs.hash(userId.toString(),10);
       const routePath = emailType === 'VERIFY' ? 'verifyemail' : 'resetpassword';
       //Update the user
        if(emailType === 'VERIFY'){
            await User.findByIdAndUpdate(userId,{
                verifyToken:hashedToken,
                verifyTokenExpiry:Date.now() + 3600000
            });
        }else{
            await User.findByIdAndUpdate(userId,{
                forgotPasswordToken:hashedToken,
                forgotPasswordExpiry:Date.now() + 3600000
            });
        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
        var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "b39e2c10934eb9",
            pass: "c8f9e522c0c0bd"
            
        }
        });
        const mailOptions = {
            from: "harrystyles666@gmail.com",
            to:email,
            subject: emailType === 'VERIFY' ? "Verify your account" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/${routePath}?token=${hashedToken}">here</a> to ${emailType === 'VERIFY' ? 'verify your account' : 'reset your password'}
            or copy and paste the following link into your browser: <br>
            <a href="${process.env.DOMAIN}/${routePath}?token=${hashedToken}">${process.env.DOMAIN}/${routePath}?token=${hashedToken}</a>
            <br><br
            </p>`
        }
        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;
    } catch (error:any) {
        throw new Error(error.message);
        
    }
}