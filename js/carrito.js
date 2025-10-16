const botonesAgregar = document.querySelectorAll('.btn-agregar');
const carritoBody = document.getElementById('carrito-body');
const totalTexto = document.getElementById('total');
const vaciarBtn = document.getElementById('vaciar');
const comprarBtn = document.getElementById('comprar');
let carrito = [];

botonesAgregar.forEach(boton => {
    boton.addEventListener('click', () => {
        const producto = boton.parentElement;
        const nombre = producto.dataset.nombre;
        const precio = parseFloat(producto.dataset.precio);

        const existente = carrito.find(p => p.nombre === nombre);
        if (existente) {
            existente.cantidad++;
        } else {
            carrito.push({ nombre, precio, cantidad: 1 });
        }
        actualizarCarrito();
    });
});

function actualizarCarrito() {
    carritoBody.innerHTML = '';
    let total = 0;

    carrito.forEach((p, index) => {
        const subtotal = p.precio * p.cantidad;
        total += subtotal;

        const fila = document.createElement('tr');
        fila.innerHTML = `
        <td>${p.nombre}</td>
        <td>$${p.precio.toFixed(2)}</td>
        <td>${p.cantidad}</td>
        <td>$${subtotal.toFixed(2)}</td>
        <td><button class="eliminar" data-index="${index}">X</button></td>
        `;
        carritoBody.appendChild(fila);
    });

    if (carrito.length === 0) {
        carritoBody.innerHTML = '<tr><td colspan="5">Tu carrito está vacío</td></tr>';
    }

    totalTexto.textContent = `Total: $${total.toFixed(2)}`;

    document.querySelectorAll('.eliminar').forEach(b => {
        b.addEventListener('click', e => {
            const i = e.target.dataset.index;
            carrito.splice(i, 1);
            actualizarCarrito();
            });
    });
}

vaciarBtn.addEventListener('click', () => {
    carrito = [];
    actualizarCarrito();
});

comprarBtn.addEventListener('click', () => {
    if (carrito.length === 0) {
        alert('Tu carrito está vacío.');
    } else {
        alert('¡Gracias por tu compra!');
        carrito = [];
        actualizarCarrito();
    }
});
