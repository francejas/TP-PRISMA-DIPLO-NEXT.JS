
import { Publicacion, Usuario } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function obtenerUsuarios() {
    const usuarios = await prisma.usuario.findMany({
        where: {
            edad: { gt: 25 },                                         //gt significa mayor qe
        },
    });
    return usuarios;
}



async function obtenerPublicaciones(usuarioId: string) {      // Esto es la lista de parámetros de la función. En este caso, la función toma un parámetro llamado usuarioId, que se espera que sea de tipo string. Los parámetros son valores que se pueden pasar a la función cuando se llama, y la función puede usarlos internamente.
    const publicaciones = await prisma.publicacion.findMany({
        where: {
            autorId: usuarioId,                             //la condición es que la propiedad autorId en la tabla de "publicacion" debe coincidir con el valor de usuarioId que se pasó como argumento a la función.  
        },
    });
    return publicaciones;
}

export default async function Pagina() {
    const usuarios = await obtenerUsuarios();

    return (
        <section>
            <h2>Usuarios mayores de 25 años</h2>
            <ul>
                {usuarios.map(async (usuario: Usuario) => {
                    const publicaciones = await obtenerPublicaciones(usuario.id);
                    return (
                        <main key={usuario.id}>
                            <li>
                                {usuario.nombre} - {usuario.edad}
                            </li>
                            <li>
                                {publicaciones.map((publicacion: Publicacion) => (                   //aca me gustaria agregar una verificacion donde vea si el usuario tiene publicaciones, si no las tiene qe aparezca un cartel diciendo qe no hay publicaciones 
                                    <ul key={publicacion.id}>
                                        <li>
                                            {publicacion.titulo} - {publicacion.contenido}
                                        </li>
                                    </ul>
                                ))}
                            </li>
                        </main>
                    );
                })}
            </ul>
        </section>
    );
}
