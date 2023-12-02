import db from "@/lib/db";
import Hotel from "@/models/Hotel";


export async function GET(req, ctx) {
    await db.connect()

    const id = ctx.params.id

    try {
        const hotel = await Hotel.findById(id)

        return new Response(JSON.stringify(hotel), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}

export async function PUT(req, ctx) {
    await db.connect()

    const id = ctx.params.id

    try {
        const body = await req.json()
 
        const updatedHotel = await Hotel.findByIdAndUpdate(id, { $set: { ...body } }, { new: true })

        return new Response(JSON.stringify(updatedHotel), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}

export async function DELETE(req, ctx) {
    await db.connect()

    const id = ctx.params.id

    try {
   
        await Hotel.findByIdAndDelete(id)

        return new Response(JSON.stringify({msg: 'Successfully deleted Hotel'}), {status: 200})
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 }) 
    }
}
