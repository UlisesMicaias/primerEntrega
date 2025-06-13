const cartContainer = document.getElementById('cartContainer');
const cid = localStorage.getItem('cartId');

fetch(`/api/carts/${cid}`)
    .then(res => res.json())
    .then(cart => {
        cart.products.forEach(p => {
            const div = document.createElement('div');
            div.innerHTML = `
        <h4>${p.product.title}</h4>
        <p>Cantidad: ${p.quantity}</p>
        <p>Precio: $${p.product.price}</p>
        <button onclick="removeFromCart('${p.product._id}')">Eliminar</button>
        <p>Total: $${p.quantity * p.product.price}</p>`;
            cartContainer.appendChild(div);
        });
    });

async function removeFromCart(pid) {
    await fetch(`/api/carts/${cid}/product/${pid}`, { method: 'DELETE' });
    location.reload();
}
