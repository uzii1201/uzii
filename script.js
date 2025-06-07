document.querySelectorAll('.track').forEach(track => {
    track.addEventListener('click', function(e) {
        // Si esta track ya estaba activa → cerrarla
        if (track.classList.contains('active')) {
            e.preventDefault();
            track.classList.remove('active');
        } else {
            // Quitar active a todas las demás
            document.querySelectorAll('.track').forEach(t => t.classList.remove('active'));
            // Activar la actual
            e.preventDefault();
            track.classList.add('active');
        }
    });
});
