document.addEventListener("DOMContentLoaded", function() {
    const players = document.querySelectorAll('.video-outer-container');

    players.forEach(player => {
        const videoId = player.getAttribute('data-id');
        const thumbImg = player.querySelector('.thumbnail-cover');
        const cover = player.querySelector('.video-initial-cover');
        const iframeContainer = player.querySelector('.video-frame-container');
        const adBox = player.querySelector('.ad-floating-box');
        const closeBtn = player.querySelector('.ad-close-cross');

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