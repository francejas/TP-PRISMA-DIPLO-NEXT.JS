import { emailRegex, passwordRegex } from "@/app/utils/regex";
import { encriptarPassword } from "@/app/utils/crypto";
import { PrismaClient } from "@prisma/client";
import { sign } from "jsonwebtoken"

const prisma = new  PrismaClient();



export async function POST(req:Request){
    const usuario = await req.json();



// usuario = {nombre: x, edad: a, mail: b}

// Object.values(usuario)= [x,a,b]

    if (Object.values(usuario).includes(undefined)){
        return new Response("Error ! Faltan datos", {status:400});
    }

    //Vamos a fijarnos si los mails son mails y la contrasenia es valida - RegEx

    if(!usuario.email.match(emailRegex)) 
    return new Response("Email invalido!", {status:400});

    if (!usuario.password.match(passwordRegex))
    return new Response("Contraseña invalida!", { status: 400 });

    const hash = await encriptarPassword(usuario.password)

    const usuarioAGuardar = { ... usuario, password:hash }

    const usuarioSubido = await prisma.usuario.create({data: usuarioAGuardar})

    if (!usuarioSubido)
    return new Response("No se pudo subir el usuario!", { status: 500 }); //aca hay un error

  const token = sign(usuarioAGuardar, process.env.TOKEN_SECRET as string);


 


    return new Response(token,{status:201});


}