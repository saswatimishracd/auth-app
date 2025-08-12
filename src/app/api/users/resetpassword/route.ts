import { NextRequest,NextResponse } from 'next/server';
import User from '@/models/userModel';
import connect from '@/dbConfig/dbConfig';
import bcryptjs from 'bcryptjs';
connect();

export async function POST(request: NextRequest) {
  const { token, password } = await request.json();

  if (!token || !password) {
    return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
  }

  try {
    // Find the user associated with the reset token
    const user = await User.findOne({forgotPasswordToken: token, forgotPasswordExpiry: {$gt: Date.now()}});
    console.log(user);
    
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
         const salt = await bcryptjs.genSalt(10)
         const hashedPassword = await bcryptjs.hash(password,salt)
    // Update the user's password
    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();
    return NextResponse.json({ message: 'Password reset successful' }, { status: 200 });
  } catch (error) {
    console.error('Error resetting password: ', error);
    return NextResponse.json({ message: 'Error resetting password' }, { status: 500 });
  }
}