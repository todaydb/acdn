document.addEventListener("DOMContentLoaded", function() {
    const players = document.querySelectorAll('.as__mX__media__player');
    players.forEach(player => {
        const videoId = player.getAttribute('data-v-id');
        const cover = player.querySelector('.tdb__vp__cover');
        const thumbImg = player.querySelector('.tdb__vp__cover__thumbnail');
        const iframeContainer = player.querySelector('.tdb__m__vp__frame');
        const adBox = player.querySelector('.tdb__vp__floating__bx');
        const closeBtn = player.querySelector('.tdb__vp__floating__close');
        thumbImg.src = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        cover.addEventListener('click', function() {
            cover.style.display = 'none';
            iframeContainer.style.display = 'block';
            iframeContainer.innerHTML = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="position: absolute; top: 0; left: 0;"></iframe>`;
        });
        function showAd() {
            adBox.style.display = 'block';
            setTimeout(() => {
                adBox.style.opacity = '1';
                adBox.style.transform = 'translateY(0)';
            }, 100);
        }
        function closeAd() {
            adBox.style.opacity = '0';
            adBox.style.transform = 'translateY(20px)';
            setTimeout(() => {
                adBox.style.display = 'none';
                setTimeout(showAd, 30000);
            }, 500);
        }
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeAd();
        });
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(showAd, 3000);
                    observer.unobserve(player);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(player);
    });
});
