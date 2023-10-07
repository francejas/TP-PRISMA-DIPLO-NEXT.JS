import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const publicaciones = await req.json();

    const publicacionSubida = await prisma.publicacion.create({ data: publicaciones });

    return new Response ("Subido con exito") 
}


export async function GET() {
    const publicaciones = await prisma.publicacion.findMany();

    return new Response(JSON.stringify(publicaciones));
}