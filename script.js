document.addEventListener('DOMContentLoaded', () => {
    // 1. Animación de Scroll Suave para los botones de la cabecera
    document.querySelectorAll('nav a[href^="#"], .cta-button').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 2. Animación de Hover para las Tarjetas de Producto (Efecto 3D Ligero)
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20; 
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(0px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // 3. Manejo de Enlaces Dinámicos para Redirección
    const dynamicLinks = document.querySelectorAll('.dynamic-link');
    dynamicLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            console.log(`Redirigiendo a: ${link.href}`);
        });
    });

    // 4. Lógica de Envío del Formulario (ELIMINADA/COMENTADA para usar FormSubmit)
    // const paymentForm = document.querySelector('.payment-form');
    // if (paymentForm) {
    //     paymentForm.addEventListener('submit', (e) => {
    //         e.preventDefault();
    //         // ... CÓDIGO DE SIMULACIÓN ELIMINADO
    //     });
    // }

});
