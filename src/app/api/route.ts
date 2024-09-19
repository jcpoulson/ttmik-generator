import { NextResponse } from "next/server";

export async function GET(request: Request) {
    
    try {
        return NextResponse.json({
            message: "You successfully made a request to the root route of the project API"
        })
    } catch (error) {
        return NextResponse.json({
            message: "There was an error in accessing the root route of the API",
            error: error
        })
    }
}