document.querySelectorAll('.track').forEach(track => {
    track.addEventListener('click', function(e) {
        // Si clicas en un <a>, NO hacemos nada (dejamos que el link funcione)
        if (e.target.tagName === 'A') {
            return; // Deja que el link funcione normal
        }

        // Si la track ya estaba activa → quitar active
        if (track.classList.contains('active')) {
            e.preventDefault();
            track.classList.remove('active');
        } else {
            // Quitar active de las demás
            document.querySelectorAll('.track').forEach(t => t.classList.remove('active'));
            // Activar la actual
            e.preventDefault();
            track.classList.add('active');
        }
    });
});
