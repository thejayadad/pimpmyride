import db from "@/lib/db";
import User from "@/models/User";


export async function GET(req, ctx) {
    await db.connect()

    const id = ctx.params.id

    try {
        const user = await User.findById(id)

        return new Response(JSON.stringify(user), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}

export async function PUT(req, ctx) {
    await db.connect()

    const id = ctx.params.id

    try {
        const body = await req.json()
 
        const updatedUser = await User.findByIdAndUpdate(id, { $set: { ...body } }, { new: true })

        return new Response(JSON.stringify(updatedUser), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}
export async function DELETE(req, ctx) {
    await db.connect()

    const id = ctx.params.id

    try {
   
        await User.findByIdAndDelete(id)

        return new Response(JSON.stringify({msg: 'Successfully deleted User'}), {status: 200})
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 }) 
    }
}