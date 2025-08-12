import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";
/* eslint-disable @typescript-eslint/no-explicit-any */
connect()

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({_id:userId}).select("-password");
        return NextResponse.json({
            message:"User found",
            user
        })
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });   
    }
}