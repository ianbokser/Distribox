export function cargarProductos(productos) {
    const products = document.querySelector('#products');
    let vista = true;
    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <div class="producto_grid producto_foto">
                <img class="producto_foto_imagen" src="${producto.img}" alt="Imagen del producto">
            </div>  
            <div class="producto_grid producto_codigo">
                <p class="tamaño_letras_descripcion">${producto.codigo}</p>
            </div>
            <div class="producto_grid producto_descripcion">
                <p class="tamaño_letras_descripcion">${producto.descripcion}</p>
            </div>
            <div class="producto_grid producto_costo">
                <p class="tamaño_letras_descripcion">$${producto.costo}</p>
            </div>
            <div class="producto_grid producto_venta">
                <p class="tamaño_letras_descripcion">$${producto.costo_venta}</p>
            </div>
            <section class="producto_grid producto_cantidad">
                <input type="number" name="cant" id="cant_productos" class="cant_productos">
            </section>
        `;
        products.append(div);
        if (vista){
            vista = false;
            const filters = document.querySelector('#filters');
            const div = document.createElement("div");
            div.classList.add("vista_imagen");
            div.innerHTML = `
                <div class="vista_previa">
                    <img class="vista_previa_img" src="${producto.img}" alt="">
                    <div class="vista_previa_desc">
                        <p>código: ${producto.codigo}</p>
                        <p>costo: $${producto.costo}</p>
                    </div>
                </div>
            `;
            filters.append(div);
        }
    });
}

// export function vistaPrevia(data) {

// }  