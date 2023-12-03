import db from "@/lib/db";
import Hotel from "@/models/Hotel";
import Room from "@/models/Room";

export async function POST(req) {
    await db.connect()
    const hotelId = ctx.params.id

    try {
        const body = await req.json()
        const newRoom = await Room.create(body)
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $push :{rooms: newRoom._id},
            });
        } catch (error) {
            return new Response(JSON.stringify(error))
        }
        

        return new Response(JSON.stringify(newRoom), { status: 201 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}