import { cargarProductos,userName,cerrarSesion,tokenData,tokenExpired } from "./functions.js";

const tokenRecuperado = localStorage.getItem("jwt");
const fechaExpiracionRecuperada = localStorage.getItem("expiracion");
var elementosIniciarSesion = document.querySelectorAll('.iniciar_sesion');
var contenedor = document.querySelector('.header_login');
var elementoP = contenedor.querySelector('.user');


document.addEventListener("DOMContentLoaded", function() {
    fetch('http://localhost:4000/productos')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud de productos');
            }
            return response.json();
        })
        .then(async data => {
            if (Array.isArray(data)) {
                const percent = await tokenData();
                if (percent.ok){
                    var porcentaje = percent.descuento;
                }else{
                    var porcentaje = 0;
                }
                cargarProductos(data, porcentaje);    
            } else {
                console.error('La respuesta no es un array:', data);
            }
        })
        .catch(error => console.error('Error en el fetch:', error));
});


document.getElementById("button_login").addEventListener("click", () => {
        console.log("cerrar sesión");
            cerrarSesion(contenedor, elementoP);
            location.reload();
});

const tokenExpiredResults = tokenExpired(tokenRecuperado,fechaExpiracionRecuperada);
if (tokenExpiredResults){
    const tokenDataResult = await tokenData();
    userName(tokenDataResult.user, elementosIniciarSesion, contenedor);
}
