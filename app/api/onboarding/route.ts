import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body;
  console.log("onboarding body", body);
  return NextResponse.json(body.jobTitle);
}
