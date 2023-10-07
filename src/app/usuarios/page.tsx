import { Publicacion } from "@prisma/client";

async function obtenerUsuarios() {
    const respuesta = await fetch("http://localhost:3000/api/usuarios", {
        cache: "no-store",
    });
    const datosUsuario = await respuesta.json();
    return datosUsuario;
}

async function obtenerPublicaciones() {
    const respestaPublicacion = await fetch("http://localhost:3000/api/usuarios/Publicaciones", {
        cache: "no-store",
    });
    const usuarioPublicacion = await respestaPublicacion.json();
    return usuarioPublicacion;
}

type Usuario = {
    id: string;
    nombre: string;
    edad: number;
    email: string;
    password: string;
    activo: boolean;
    Publicacion: Publicacion[]
};

export default async function Pagina() {
    const usuarios = await obtenerUsuarios();
    const publicaciones = await obtenerPublicaciones();

    return (
        <section>
            <h2>Usuarios mayores de 25 años</h2>

            <ul>
                {usuarios
                    .filter((usuario: Usuario) => usuario.edad > 25)
                    .map((usuario: Usuario) => (
                        <main>
                        <li key={usuario.id}>
                            {usuario.nombre} - {usuario.edad}
                        </li>
                        <li>
                        {publicaciones.map((publicacion: Publicacion) => (
                            <li>
                                {publicacion.titulo} - {publicacion.contenido}
                            </li>
                        ))}
                        </li>
                        </main>
                    ))}
            </ul>
        </section>
    );

}



// ME GUSTARIA AGREGARLE UNA VERIFICACION PARA QE SI EL USUARIO NO TIENE NIINGUNA PUBLICACION SE MUESTRE QE NO HAY NINGUNA PUBLICACION PERO NO LOGRO HACERLO
//LINEA 110
//



// import { Publicacion } from "@prisma/client";

// async function obtenerUsuarios() {
//     const respuesta = await fetch("http://localhost:3000/api/usuarios", {
//         cache: "no-store",
//     });
//     const datosUsuario = await respuesta.json();
//     return datosUsuario;
// }

// async function obtenerPublicaciones() {
//     const respestaPublicacion = await fetch("http://localhost:3000/api/usuarios/Publicaciones", {
//         cache: "no-store",
//     });
//     const usuarioPublicacion = await respestaPublicacion.json();
//     return usuarioPublicacion;
// }

// type Usuario = {
//     id: string;
//     nombre: string;
//     edad: number;
//     email: string;
//     password: string;
//     activo: boolean;
//     Publicacion: Publicacion[];
// };

// export default async function Pagina() {
//     const usuarios = await obtenerUsuarios();
//     const publicaciones = await obtenerPublicaciones();

//     return (
//         <section>
//             <h2>Usuarios mayores de 25 años</h2>
//             <ul>
//                 {usuarios
//                     .filter((usuario: Usuario) => usuario.edad > 25)
//                     .map((usuario: Usuario) => (
//                         <main key={usuario.id}>
//                             <li>
//                                 {usuario.nombre} - {usuario.edad}
//                             </li>
//                             <li>
//                                 {usuario.Publicacion && usuario.Publicacion.length > 0 ? (
//                                     <ul>
//                                         {usuario.Publicacion.map((publicacion: Publicacion) => (
//                                             <li key={publicacion.id}>
//                                                 {publicacion.titulo} - {publicacion.contenido}
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 ) : (
//                                     <p>No hay publicaciones</p>
//                                 )}
//                             </li>
//                         </main>
//                     ))}
//             </ul>
//         </section>
//     );
// }
