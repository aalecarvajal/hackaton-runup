// Cargar Header
fetch('/src/components/header.html') 
    .then(response => {
        if (!response.ok) throw new Error('Error al cargar el header');
        return response.text();
    })
    .then(data => {
        document.getElementById('header-component').innerHTML = data;
    })
    .catch(error => console.error(error));

// Cargar Footer
fetch('/src/components/footer.html')
    .then(response => {
        if (!response.ok) throw new Error('Error al cargar el footer');
        return response.text();
    })
    .then(data => {
        document.getElementById('footer-placeholder').innerHTML = data; 
    })
    .catch(error => console.error(error));