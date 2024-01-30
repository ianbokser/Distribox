import { cargarProductos } from './productsFunctions.js';

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
                
                // const productos = document.querySelectorAll(".producto");
                // const vistaPrevia = document.querySelector(".vista_imagen");
            
                // productos.forEach(function(producto) {
                //     producto.addEventListener("click", function() {
                //         // Obtener el código del producto clickeado
                //         const codigoProductoClickeado = producto.querySelector(".producto_codigo p").textContent;
                //         console.log(codigoProductoClickeado)
                //         // Buscar el producto correspondiente en la lista de productos
                //         const clickedProducto = data.find(p => p.codigo === codigoProductoClickeado);
                //         console.log(clickedProducto)
                //         if (clickedProducto) {
                //             // Actualizar la vista previa
                //             vistaPrevia.innerHTML = `
                //                 <div class="vista_previa">
                //                     <img class="vista_previa_img" src="${clickedProducto.img}" alt="">
                //                     <div class="vista_previa_desc">
                //                         <p>código: ${clickedProducto.codigo}</p>
                //                         <p>costo: $${clickedProducto.costo}</p>
                //                     </div>
                //                 </div>
                //             `;
                //         } else {
                //             console.error(`No se encontró el producto con código ${codigoProductoClickeado}`);
                //         }
                //     });
                // });        
            } else {
                console.error('La respuesta no es un array:', data);
            }
        })
        .catch(error => console.error('Error en el fetch:', error));
});
