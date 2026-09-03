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

// Copy a code block's command. Lives here, not in a per-page scripts block:
// the home page has two copy buttons (hero + the closing terminal) and defines
// no scripts block, so the page-local definition on /install/ left both dead.
function copyCode(btn) {
    var block = btn.closest('.code-block');
    if (!block) return;
    var code = block.querySelector('code').textContent;
    navigator.clipboard.writeText(code).then(function() {
        var text = btn.querySelector('.copy-text');
        if (!text) return;
        text.textContent = 'Copied';
        setTimeout(function() { text.textContent = 'Copy'; }, 2000);
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

// Live star count on the hero repo button. Progressive enhancement: the
// count chip only appears if the GitHub API answers (CSP allows the origin).
// One formatter for both hero count chips (stars, visitors), so they can never
// drift apart: below 1000 the plain integer, from 1000 up two decimals with a
// dot and a k suffix ("2.08k"), the format the owner asked for (MESHSAT-782).
function formatCount(n) {
    return n >= 1000 ? (n / 1000).toFixed(2) + 'k' : String(n);
}
(function() {
    var el = document.querySelector('[data-gh-stars]');
    if (!el || typeof fetch !== 'function') return;
    fetch('https://api.github.com/repos/meshsat/meshsat')
        .then(function(r) { return r.ok ? r.json() : null; })
        .then(function(d) {
            if (!d || typeof d.stargazers_count !== 'number') return;
            var n = d.stargazers_count;
            el.textContent = formatCount(n);
            var chip = el.closest('.gh-star-count');
            if (chip) chip.hidden = false;
        })
        .catch(function() {});
})();

// Live visitor count beside the star button, from our own Umami. Same
// progressive-enhancement contract as the star chip: the chip ships hidden and
// is unhidden only once a real number arrives, so there is no broken state when
// analytics is down, blocked by an extension, or the share token has been
// rotated away. One plain GET with no custom headers and no query string: the
// analytics proxy injects the read-only share token server-side and pins the
// range to all-time, so nothing secret reaches the browser, the request needs
// no CORS preflight, and the response is cacheable (5 min at the proxy and in
// the browser). The endpoint comes from the umami_url param, so a
// non-production build simply leaves the chip hidden.
(function() {
    var el = document.querySelector('[data-visitor-count]');
    if (!el || typeof fetch !== 'function') return;
    var chip = el.closest('.visitors-chip');
    var url = chip && chip.getAttribute('data-visitors-endpoint');
    if (!url) return;
    fetch(url)
        .then(function(r) { return r.ok ? r.json() : null; })
        .then(function(d) {
            if (!d) return;
            // Umami has shipped both {visitors: 2079} and {visitors: {value:
            // 2079}} across versions. Accept either shape, reject everything
            // else rather than render "undefined" or "[object Object]".
            var v = d.visitors;
            if (v && typeof v === 'object') v = v.value;
            if (typeof v !== 'number' || !isFinite(v) || v < 0) return;
            el.textContent = formatCount(v);
            chip.hidden = false;
        })
        .catch(function() {});
})();
