document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());

    const res = await fetch('/api/sessions/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    const result = await res.json();
    if (result.token) {
        localStorage.setItem('token', result.token);
        alert('Login correcto');
        window.location.href = '/profile';
    } else {
        alert('Login inválido');
    }
});
