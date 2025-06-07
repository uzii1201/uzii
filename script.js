// Manejamos tap en móviles (o click en desktop)
document.querySelectorAll('.track').forEach(track => {
    track.addEventListener('click', function(e) {
        // Si no está activa, la activamos y prevenimos navegación
        if (!track.classList.contains('active')) {
            e.preventDefault();
            // Quitar active a las demás (opcional)
            document.querySelectorAll('.track').forEach(t => t.classList.remove('active'));
            track.classList.add('active');
        } else {
            const target = e.target;
            if (target.tagName !== 'A') {
                // Si tocas fuera de los links, cerrar la overlay
                e.preventDefault();
                track.classList.remove('active');
            }
            // Si es un <a>, permitimos la navegación normal
        }
    });
});
