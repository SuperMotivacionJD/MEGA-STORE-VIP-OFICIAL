document.addEventListener('DOMContentLoaded', () => {
    const quantities = document.querySelectorAll('.quantity');
    const totalAmountSpan = document.getElementById('total-amount');
    const totalYapeSpan = document.getElementById('total-yape');
    const orderSummaryDiv = document.getElementById('order-summary');
    const submitButton = document.getElementById('submit-order');
    const hiddenSummaryInput = document.getElementById('hidden-summary');
    const productItems = document.querySelectorAll('.animated-item');
    const plusButtons = document.querySelectorAll('.plus-btn');
    const minusButtons = document.querySelectorAll('.minus-btn');

    // ----------------------------------------------------
    // 1. Lógica de Cálculo y Resumen (Sin Costo de Envío)
    // ----------------------------------------------------

    function updateOrder() {
        let total = 0;
        let summaryHTML = '';
        let hiddenSummaryText = '';
        let hasItems = false; 

        quantities.forEach(input => {
            const quantity = Math.max(0, parseInt(input.value) || 0);
            input.value = quantity; 

            const productDiv = input.closest('.product');
            const price = parseFloat(productDiv.getAttribute('data-price'));
            const productName = productDiv.getAttribute('data-name');

            if (quantity > 0) {
                const itemTotal = quantity * price;
                total += itemTotal;
                hasItems = true;
                
                // Resumen Visual: Estructura limpia para el resumen
                summaryHTML += `<p><strong>${quantity} x ${productName}</strong> <span style="float:right;">S/ ${itemTotal.toFixed(2)}</span></p>`;
                // Resumen Oculto (para Formspree)
                hiddenSummaryText += `${quantity}x ${productName} (S/${itemTotal.toFixed(2)}); `;
            }
        });
        
        // Actualizar el resumen HTML
        if (!hasItems) {
            summaryHTML = '<p class="empty-cart-message">Tu carrito está vacío. ¡Agrega productos!</p>'; 
        }
        orderSummaryDiv.innerHTML = summaryHTML;

        // ANIMACIÓN: Efecto "Flash" al actualizar el total
        totalAmountSpan.classList.add('flash');
        setTimeout(() => {
            totalAmountSpan.classList.remove('flash');
        }, 300);

        // Actualizar los totales y el campo oculto
        const finalTotalString = total.toFixed(2);
        totalAmountSpan.textContent = `S/ ${finalTotalString}`;
        totalYapeSpan.textContent = finalTotalString; // Para las instrucciones de Yape
        hiddenSummaryInput.value = hiddenSummaryText + `TOTAL: S/${finalTotalString}`;

        // Habilitar o deshabilitar el botón de envío
        submitButton.disabled = !hasItems;
        submitButton.textContent = hasItems ? 'Enviar' : 'Agrega productos para ordenar';
    }

    // Escuchar cambios en la cantidad de productos
    quantities.forEach(input => {
        input.addEventListener('change', updateOrder);
    });
    
    // Funcionalidad de los botones + y -
    plusButtons.forEach(button => {
        button.addEventListener('click', () => {
            const input = button.parentNode.querySelector('.quantity');
            input.value = parseInt(input.value) + 1;
            updateOrder();
        });
    });

    minusButtons.forEach(button => {
        button.addEventListener('click', () => {
            const input = button.parentNode.querySelector('.quantity');
            const currentValue = parseInt(input.value);
            if (currentValue > 0) {
                input.value = currentValue - 1;
                updateOrder();
            }
        });
    });

    // ----------------------------------------------------
    // 2. Animaciones de Interfaz (Intersection Observer)
    // ----------------------------------------------------

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    productItems.forEach(item => {
        observer.observe(item);
    });

    // Inicializar el resumen al cargar la página
    updateOrder();
});
