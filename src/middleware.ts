import {NextApiRequest, NextApiResponse} from "next";
import {NextResponse} from "next/server";

/**
 * Middleware definition
 */
export function middleware(req: NextApiRequest, res: NextApiResponse) {
    return NextResponse.next()
}