import { NextRequest, NextResponse } from 'next/server';
export async function POST(req:NextRequest){const {email,topic}=await req.json();if(!email||!topic)return NextResponse.json({error:'missing fields'},{status:400});console.log('[lead]',{email,topic,at:new Date().toISOString()});return NextResponse.json({ok:true});}
