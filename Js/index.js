import { cargarProductos } from "./functions.js";

const tokenRecuperado = localStorage.getItem("jwt");
const fechaExpiracionRecuperada = localStorage.getItem("expiracion");

var iniciarSesionLink = document.querySelector('.iniciar_sesion');
var registrarseLink = document.querySelector('.header_login a[href="./pages/register.html"]');

document.addEventListener("DOMContentLoaded", function() {
    fetch('http://localhost:4000/productos')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud de productos');
            }
            return response.json();
        })
        .then(data => {
            if (Array.isArray(data)) {
                cargarProductos(data);    
            } else {
                console.error('La respuesta no es un array:', data);
            }
        })
        .catch(error => console.error('Error en el fetch:', error));
});


document.getElementById("button_login").addEventListener("click", () => {
        console.log("cerrar sesión");
        localStorage.removeItem("jwt");
        localStorage.removeItem("expiracion");
});

if (tokenRecuperado && fechaExpiracionRecuperada) {
    const fechaExpiracion = new Date(parseInt(fechaExpiracionRecuperada, 10));
    if (fechaExpiracion < new Date()) {
        console.log("El token ha expirado");
        localStorage.removeItem("jwt");
        localStorage.removeItem("expiracion");
    } else {
        var jwt = localStorage.getItem('jwt');
        const res = await fetch("http://localhost:4000/api/user",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                token: jwt,
            })
        });
        const resJson = await res.json();
        console.log(resJson);
        if (res.ok){
            var nuevoContenido = `<p class="user">${resJson.user}</p>`;
            iniciarSesionLink.outerHTML = nuevoContenido;
            registrarseLink.outerHTML = '';
        }
    }
} else {
    console.log("No hay token almacenado");
}
