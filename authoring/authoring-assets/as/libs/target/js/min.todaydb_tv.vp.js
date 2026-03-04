document.addEventListener("DOMContentLoaded", function() {
    const players = document.querySelectorAll('.as__mX__media__player');
    const backupImage = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg8HaWB-MNGb3OloOauG8R49l2XDzv3-S6RwtTigJ8ELUDF9HgTXrGKYLf750gaSt-rwufm3PbRb8GSHE0jiJphHBd6780Z32YjE5jmFLxk7IrSAXR7RZkpQflmdxehXq4xE4-XRyjKkMn4yxWLX7hfAkL_TeQdTQgpI2Y8Vxx6a6mrgRnSIHdFi7Caqtr7/w640-h640/Todaydb_full_banner.jpg";
    players.forEach(player => {
        const videoId = player.getAttribute('data-v-id');
        const cover = player.querySelector('.tdb__vp__cover');
        const thumbImg = player.querySelector('.tdb__vp__cover__thumbnail');
        const iframeContainer = player.querySelector('.tdb__m__vp__frame');
        const adBox = player.querySelector('.tdb__vp__floating__bx');
        const closeBtn = player.querySelector('.tdb__vp__floating__close');
        const playBtn = player.querySelector('.tdb__vp__play__btn');
        if (thumbImg) {
            let dataVP = thumbImg.getAttribute('data-i-vp');
            if (dataVP && dataVP !== "") {
                thumbImg.src = dataVP;
            } else if (videoId) {
                const ytThumb = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
                thumbImg.src = ytThumb;
                thumbImg.setAttribute('data-i-vp', ytThumb);
                thumbImg.onerror = () => { 
                    thumbImg.src = backupImage;
                    thumbImg.setAttribute('data-i-vp', backupImage);
                };
            } else {
                thumbImg.src = backupImage;
                thumbImg.setAttribute('data-i-vp', backupImage);
            }
        }
        const playVideo = (e) => {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            if (videoId && cover && iframeContainer) {
                cover.style.display = 'none';
                iframeContainer.style.display = 'block';
                iframeContainer.innerHTML = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="position: absolute; top: 0; left: 0;"></iframe>`;
            }
        };
        if (cover) cover.addEventListener('click', playVideo);
        if (playBtn) playBtn.addEventListener('click', playVideo);
        if (adBox && closeBtn) {
            let autoTimer;
            const showAd = () => {
                clearTimeout(autoTimer);
                adBox.classList.add('is-active');
                closeBtn.setAttribute('title', 'Close');
            };
            const hideAd = () => {
                adBox.classList.remove('is-active');
                closeBtn.setAttribute('title', 'Open');
                autoTimer = setTimeout(showAd, 60000);
            };
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                adBox.classList.contains('is-active') ? hideAd() : showAd();
            });
            new IntersectionObserver((entries, observer) => {
                if (entries[0].isIntersecting) {
                    setTimeout(showAd, 3000);
                    observer.unobserve(player);
                }
            }, { threshold: 0.5 }).observe(player);
        }
    });
});
