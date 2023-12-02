import db from "@/lib/db";
import Hotel from "@/models/Hotel";

export async function GET(req) {
    await db.connect()

    try {
        const hotels = await Hotel.find({})
        return new Response(JSON.stringify(hotels), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}

export async function POST(req) {
    await db.connect()

    try {
        const body = await req.json()
        const newHotel = await Hotel.create(body)

        return new Response(JSON.stringify(newHotel), { status: 201 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}