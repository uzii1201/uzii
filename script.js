document.querySelectorAll('.track').forEach(track => {
    track.addEventListener('click', function(e) {
        // Si clicas en un <a>, dejamos que funcione el link
        if (e.target.tagName === 'A') {
            return;
        }

        // Si esta track ya está activa → desactivarla
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
