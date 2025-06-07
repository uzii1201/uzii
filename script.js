document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.track').forEach(track => {
        track.addEventListener('click', function(e) {
            // Si clicka en foto entonces funciona boton
            if (e.target.tagName === 'A') {
                return;
            }

            // Si activo entonces desactivar
            if (track.classList.contains('active')) {
                e.preventDefault();
                track.classList.remove('active');
            } else {
                // Desactivar las demás
                document.querySelectorAll('.track').forEach(t => t.classList.remove('active'));
                // Activar esta
                e.preventDefault();
                track.classList.add('active');
            }
        });
    });

    // Cerrar si clicka afuera
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.track')) {
            document.querySelectorAll('.track').forEach(t => t.classList.remove('active'));
        }
    });
});
