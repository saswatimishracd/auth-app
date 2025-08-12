import connect from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest,NextResponse } from 'next/server'
import { sendMail } from '@/helpers/mailer'
/* eslint-disable @typescript-eslint/no-explicit-any */
connect();

export async function POST(request:NextRequest){
    try {
        const { email } = await request.json();

        const user = await User.findOne({ email });
        console.log(user._id);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        await sendMail({
            email,
            emailType: "RESET",
            userId: user._id
        });

        return NextResponse.json({ message: "Reset password email sent" }, { status: 200 });
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500});
        
    }
}