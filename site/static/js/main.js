// Theme toggle
(function() {
    const THEME_KEY = 'meshsat-theme';

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(THEME_KEY, theme);
    }

    document.addEventListener('DOMContentLoaded', function() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', function() {
                const current = document.documentElement.getAttribute('data-theme');
                applyTheme(current === 'light' ? 'dark' : 'light');
            });
        }
    });
})();

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const isOpen = navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isOpen);
        });

        document.querySelectorAll('.nav-links a').forEach(function(item) {
            item.addEventListener('click', function() {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });

        document.addEventListener('click', function(e) {
            if (navLinks.classList.contains('active') &&
                !menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.focus();
            }
        });

        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        var href = this.getAttribute('href');
        if (href === '#' || href === '') return;
        var target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Hero slideshow — CSS-only crossfade, no controls
(function() {
    var slides = document.querySelectorAll('.hero-slide');
    if (slides.length < 2) return;
    var current = 0;
    setInterval(function() {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
    }, 6000);
})();

// Copy to clipboard
function copyToClipboard(text, btn) {
    navigator.clipboard.writeText(text).then(function() {
        var orig = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(function() { btn.textContent = orig; }, 2000);
    });
}

// Intro video — the poster facade opens a centred modal at double the inline
// size; nothing loads from YouTube until this click. Falls back to the old
// in-place swap if the dialog is unavailable.
function playIntroVideo(btn) {
    var frame = document.createElement('iframe');
    frame.src = btn.getAttribute('data-embed');
    frame.title = btn.getAttribute('aria-label');
    frame.allow = 'autoplay; encrypted-media; picture-in-picture';
    frame.setAttribute('allowfullscreen', '');

    var dlg = document.getElementById('video-dialog');
    var media = document.getElementById('video-dialog-media');
    if (dlg && media && typeof dlg.showModal === 'function') {
        media.innerHTML = '';
        media.appendChild(frame);
        dlg.showModal();
    } else {
        btn.parentNode.replaceChild(frame, btn);
    }
}

// Screenshot lightbox — one dialog, filled from the clicked thumbnail
function openShot(btn) {
    var dlg = document.getElementById('shot-dialog');
    if (!dlg) return;
    var img = btn.querySelector('img');
    var cap = btn.parentNode.querySelector('p');
    var big = document.getElementById('shot-img');
    big.src = img.currentSrc || img.src;
    big.alt = img.alt;
    document.getElementById('shot-caption').textContent = cap ? cap.textContent : img.alt;
    dlg.showModal();
}
function closeShot() {
    var dlg = document.getElementById('shot-dialog');
    if (dlg) dlg.close();
}
// Any modal closes on a backdrop click (clicks on ::backdrop target the
// dialog element itself; clicks inside land on its children).
document.addEventListener('click', function(e) {
    if (e.target && e.target.tagName === 'DIALOG' && e.target.open) e.target.close();
});

// Closing the video modal removes the iframe so playback actually stops,
// whichever close path was used (Esc, backdrop, the button).
(function() {
    var dlg = document.getElementById('video-dialog');
    if (!dlg) return;
    dlg.addEventListener('close', function() {
        var media = document.getElementById('video-dialog-media');
        if (media) media.innerHTML = '';
    });
})();
