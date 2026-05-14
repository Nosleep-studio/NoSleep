// NoSleep Studio - Catálogo Carruseles
document.addEventListener('DOMContentLoaded', function () {

    // ── Inicializar cada carrusel de producto ────────────────────
    document.querySelectorAll('[data-carousel]').forEach(function (carousel) {
        const track  = carousel.querySelector('.producto-carousel-track');
        const slides = track.querySelectorAll('.producto-slide');
        const total  = slides.length;
        const dotsContainer = carousel.querySelector('.producto-dots');
        const prevBtn = carousel.querySelector('.producto-arrow-prev');
        const nextBtn = carousel.querySelector('.producto-arrow-next');
        let current = 0;

        // Crear dots dinámicamente
        slides.forEach(function (_, i) {
            const dot = document.createElement('button');
            dot.className = 'producto-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', 'Imagen ' + (i + 1));
            dot.dataset.index = i;
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('.producto-dot');

        function goTo(index) {
            current = ((index % total) + total) % total;
            track.style.transform = 'translateX(-' + (current * 100) + '%)';
            dots.forEach(function (d, i) {
                d.classList.toggle('active', i === current);
            });
        }

        // Flechas
        if (prevBtn) {
            prevBtn.addEventListener('click', function () {
                goTo(current - 1);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function () {
                goTo(current + 1);
            });
        }

        // Click en dots
        dots.forEach(function (dot) {
            dot.addEventListener('click', function () {
                goTo(parseInt(dot.dataset.index, 10));
            });
        });

        // Swipe en mobile
        let touchStartX = 0;
        track.addEventListener('touchstart', function (e) {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });

        track.addEventListener('touchend', function (e) {
            var diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 40) {
                diff > 0 ? goTo(current + 1) : goTo(current - 1);
            }
        });
    });
});
