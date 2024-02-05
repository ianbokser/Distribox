export function cargarProductos(productos, percent) {
    const products = document.querySelector('#products');
    let vista = true;
    productos.forEach(producto => {
        if (percent > 0) {
            var costo = producto.costo - ((percent / 100) * producto.costo);
        } else {
            var costo = producto.costo
        }
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
                <p class="tamaño_letras_descripcion">$${costo.toFixed(2)}</p>
            </div>
            <div class="producto_grid producto_venta">
                <p class="tamaño_letras_descripcion">$${producto.costo_venta.toFixed(2)}</p>
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

export function crateToken(token){
    const tiempoExpiracion = 3600 * 1000;
    const fechaExpiracion = new Date();
    fechaExpiracion.setTime(fechaExpiracion.getTime() + tiempoExpiracion);
    localStorage.setItem("jwt", token);
    localStorage.setItem("expiracion", fechaExpiracion.getTime().toString());
}

export function userName(user, elementos, contenedor){
    var nuevoElemento = document.createElement('p');
    nuevoElemento.className = 'user';
    nuevoElemento.textContent = user;
    contenedor.classList.remove('header_login');
    contenedor.classList.add('header_login_user');
    elementos.forEach(function (elemento) {
        elemento.remove();
    });
    contenedor.insertBefore(nuevoElemento, contenedor.firstChild);
}

export function cerrarSesion(contenedor, elementoP) {
    localStorage.removeItem("jwt");
    localStorage.removeItem("expiracion");

    if (contenedor) {
        if (elementoP) {
            elementoP.remove();
        }

        var nuevoElemento1 = document.createElement('a');
        nuevoElemento1.className = 'iniciar_sesion';
        nuevoElemento1.href = './pages/login.html';
        nuevoElemento1.textContent = 'Iniciar Sesión';

        var nuevoElemento2 = document.createElement('a');
        nuevoElemento2.className = 'iniciar_sesion';
        nuevoElemento2.href = './pages/register.html';
        nuevoElemento2.textContent = 'Registrarse';

        if (contenedor) {
            contenedor.appendChild(nuevoElemento1);
            contenedor.appendChild(nuevoElemento2);
            contenedor.classList.remove('header_login_user');
            contenedor.classList.add('header_login');
        }
    }
}

export async function tokenData(){
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
    return resJson;
}

export function tokenExpired(tokenRecuperado,fechaExpiracionRecuperada){
    if (tokenRecuperado && fechaExpiracionRecuperada) {
        const fechaExpiracion = new Date(parseInt(fechaExpiracionRecuperada, 10));
        if (fechaExpiracion < new Date()) {
            console.log("El token ha expirado");
            localStorage.removeItem("jwt");
            localStorage.removeItem("expiracion");
            return;
        } else {
            return true;
        }
    } else {
        return false;
    }
}