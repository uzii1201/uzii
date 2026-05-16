// ========== FRUTIGER AERO - INTERACTIVIDAD ==========
(function(){
    console.log("%c✦✦✦ FRUTIGER AERO MODE ✦✦✦", "color: #3bc0ff; font-size: 14px; font-family: monospace; font-weight: bold;");
    console.log("%c➤ uzii music archive | neocities vibes", "color: #7ad0f5; font-size: 11px");
    
    const tracks = document.querySelectorAll('.track');
    tracks.forEach(track => {
        track.addEventListener('mousemove', (e) => {
            const rect = track.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const glare = track.querySelector('.glare-effect');
            if(glare) {
                glare.style.left = `${x - 20}%`;
            }
        });
    });
    
    const buttons = document.querySelectorAll('.btn-aero');
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.background = 'radial-gradient(circle, rgba(0,255,255,0.8) 0%, rgba(0,200,255,0.4) 100%)';
            ripple.style.width = '40px';
            ripple.style.height = '40px';
            ripple.style.borderRadius = '50%';
            ripple.style.left = `${e.offsetX - 20}px`;
            ripple.style.top = `${e.offsetY - 20}px`;
            ripple.style.pointerEvents = 'none';
            ripple.style.transition = 'transform 0.3s, opacity 0.3s';
            ripple.style.transform = 'scale(0)';
            ripple.style.opacity = '1';
            btn.style.position = 'relative';
            btn.style.overflow = 'hidden';
            btn.appendChild(ripple);
            setTimeout(() => {
                ripple.style.transform = 'scale(3)';
                ripple.style.opacity = '0';
                setTimeout(() => ripple.remove(), 300);
            }, 10);
        });
    });
    
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -30px 0px' };
    const appearObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                appearObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const tracksForReveal = document.querySelectorAll('.track');
    tracksForReveal.forEach(track => {
        track.style.opacity = '0';
        track.style.transform = 'translateY(35px)';
        track.style.transition = 'opacity 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1), transform 0.5s ease';
        appearObserver.observe(track);
    });
    
    console.log("%c✨ botones unificados · logos arreglados ✨", "color: #88ddff; font-size: 12px");
})();
