
import { PrismaClient } from "@prisma/client";



const prisma = new PrismaClient();



export async function POST(req: Request) {
    const usuario = await req.json();


    //ACTUALIZAR REGISTRO

    const usuarioActualizado = await prisma.usuario.update({
        where: { id: "2e78d96c-535f-409e-9d9c-fe97cc4bf71b" }, //CARLOS
        data: { activo: false }
    });
    console.log(usuarioActualizado)
    return new Response("Usuario actualizado", { status: 200 });
}
