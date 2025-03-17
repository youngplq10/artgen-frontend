import { NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(process.env.NEXT_PRIVATE_SECRET_STRIPE_KEY);

export async function POST(request: NextRequest) {
    try {
        const { amount } = await request.json();

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data : { name: "ArtGen Credits" },
                        unit_amount: amount * 10 //To convert to cents,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: "http://localhost:3000/dashboard/credits/success?session_id={CHECKOUT_SESSION_ID}&amount=" + amount,
            cancel_url: "http://localhost:3000/dashboard/credits/cancel",
        });

        console.log(session)        

        return NextResponse.json({
            url: session.url
        });
    } catch (error) {
        return NextResponse.json({
            error: error instanceof Error ? error.message : "An unknown error occurred",
            status: 500,
        });
    }
}