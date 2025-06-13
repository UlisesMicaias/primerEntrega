const container = document.getElementById('productsContainer');
const cartId = localStorage.getItem('cartId');

fetch('/api/products')
    .then(res => res.json())
    .then(products => {
        products.forEach(p => {
            const div = document.createElement('div');
            div.innerHTML = `
        <h4>${p.title}</h4>
        <p>${p.description}</p>
        <p>$${p.price}</p>          
        <button onclick="addToCart('${p._id}')">Agregar al carrito</button>
    `;
            container.appendChild(div);
        });
    });

async function addToCart(pid) {
    let cid = localStorage.getItem('cartId');
    if (!cid) {
        const res = await fetch('/api/carts', { method: 'POST' });
        const data = await res.json();
        cid = data._id;
        localStorage.setItem('cartId', cid);
    }
    await fetch(`/api/carts/${cid}/product/${pid}`, { method: 'POST' });
    alert('Producto agregado');
}
