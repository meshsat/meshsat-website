// Theme toggle
(function() {
    const THEME_KEY = 'meshsat-theme';

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
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

        // Close the open menu once the layout no longer shows the toggle; the
        // breakpoint is the CSS's (768px, 1100px for Greek), not a number here.
        window.addEventListener('resize', function() {
            if (getComputedStyle(menuToggle).display === 'none' && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
});

// In-page anchors: scroll (plainly under reduced motion), move focus to the
// target so keyboard and screen-reader users land where they scrolled, and
// keep the hash in the URL. The skip link is left to the browser: intercepting
// it used to scroll without moving focus, so the next Tab landed in the nav
// (MESHSAT-1611).
document.querySelectorAll('a[href*="#"]:not(.skip-link)').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        // Same page only: "/#islands" on /install/ is a real navigation.
        if (anchor.pathname !== location.pathname || !anchor.hash || anchor.hash === '#') return;
        var target = document.getElementById(anchor.hash.slice(1));
        if (!target) return;
        e.preventDefault();
        var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
        if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
        if (window.history && history.pushState) history.pushState(null, '', anchor.hash);
    });
});

// Hero slideshow: CSS crossfade, no controls. The first photo is inline CSS;
// slides 2 to 4 carry theirs in data-bg and are attached here after load, so
// the first paint fetches one photo, not four. The cycle never starts under
// prefers-reduced-motion (the first photo stays) and pauses while the tab is
// hidden (MESHSAT-1610).
(function() {
    var slides = document.querySelectorAll('.hero-slide');
    if (slides.length < 2) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var current = 0;
    var timer = null;
    function attach() {
        slides.forEach(function(s) {
            var bg = s.getAttribute('data-bg');
            if (bg) {
                s.style.backgroundImage = "url('" + bg + "')";
                s.removeAttribute('data-bg');
            }
        });
    }
    function step() {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
    }
    function start() { if (!timer) timer = setInterval(step, 6000); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    function begin() { attach(); if (!document.hidden) start(); }
    if (document.readyState === 'complete') begin();
    else window.addEventListener('load', begin, { once: true });
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) stop(); else start();
    });
})();

// Copy a code block's command. Lives here, not in a per-page scripts block:
// the home page's copy button and /install/'s share it. Without the clipboard
// API (http, old browsers) the button does nothing rather than throwing.
function copyCode(btn) {
    var block = btn.closest('.code-block');
    if (!block || !navigator.clipboard) return;
    var code = block.querySelector('code').textContent;
    navigator.clipboard.writeText(code).then(function() {
        var text = btn.querySelector('.copy-text');
        if (!text) return;
        var original = text.dataset.original || text.textContent;
        text.dataset.original = original;
        text.textContent = btn.dataset.copied || 'Copied';
        setTimeout(function() { text.textContent = original; }, 2000);
    }).catch(function() {});
}

// Films — each poster facade opens one shared, centred modal at double the
// inline size, named after the film it plays; nothing loads from YouTube until
// this click. Falls back to an in-place swap if the dialog is unavailable.
function playVideo(btn) {
    var frame = document.createElement('iframe');
    frame.src = btn.getAttribute('data-embed');
    frame.title = btn.getAttribute('aria-label');
    frame.allow = 'autoplay; encrypted-media; picture-in-picture';
    frame.setAttribute('allowfullscreen', '');

    var dlg = document.getElementById('video-dialog');
    var media = document.getElementById('video-dialog-media');
    if (dlg && media && typeof dlg.showModal === 'function') {
        var name = document.getElementById('video-dialog-name');
        var time = document.getElementById('video-dialog-time');
        if (name) name.textContent = btn.getAttribute('data-name') || '';
        if (time) time.textContent = btn.getAttribute('data-time') || '';
        media.innerHTML = '';
        media.appendChild(frame);
        dlg.showModal();
    } else {
        btn.parentNode.replaceChild(frame, btn);
    }
}

// Screenshot lightbox: one dialog for every thumbnail (MESHSAT-1101). A click
// shows the thumbnail at once (it is already loaded) and swaps in the @2x file
// named in data-full as soon as that has loaded; Left / Right and the head-bar
// buttons step through the thumbnail's own set (the nearest [data-shots]: the
// Bridge, the Hub, the phone; MESHSAT-1251) and wrap; a set of one hides the
// stepping; the neighbours are fetched ahead so a step is instant; closing puts
// focus back on the thumbnail last shown. A portrait screen gets a narrow frame.
(function() {
    var dlg = document.getElementById('shot-dialog');
    var all = Array.prototype.slice.call(document.querySelectorAll('.shot-open'));
    if (!dlg || !all.length || typeof dlg.showModal !== 'function') return;
    var big = document.getElementById('shot-img');
    var caption = document.getElementById('shot-caption');
    var count = document.getElementById('shot-count');
    var steps = Array.prototype.slice.call(dlg.querySelectorAll('[data-step]'));
    var full = {};
    var set = all;
    var current = 0;

    function setOf(btn) {
        var group = btn.closest('[data-shots]');
        return group ? Array.prototype.slice.call(group.querySelectorAll('.shot-open')) : [btn];
    }

    function fetchFull(i) {
        var url = set[i].getAttribute('data-full');
        if (url && !full[url]) {
            full[url] = new Image();
            full[url].src = url;
        }
        return url;
    }

    function show(i) {
        var n = set.length;
        current = ((i % n) + n) % n;
        var btn = set[current];
        var thumb = btn.querySelector('img');
        var fig = btn.closest('figure');
        var cap = fig ? fig.querySelector('figcaption') : null;
        var text = cap ? cap.textContent : '';
        // The declared size, not naturalWidth: a lazy thumbnail clicked as it
        // scrolls into view has not loaded yet and reports 0 x 0.
        var tw = Number(thumb.getAttribute('width')) || thumb.naturalWidth;
        var th = Number(thumb.getAttribute('height')) || thumb.naturalHeight;
        dlg.classList.toggle('is-portrait', th > tw);
        if (tw && th) dlg.style.setProperty('--shot-ratio', String(tw / th));
        big.src = thumb.currentSrc || thumb.src;
        big.alt = text;
        caption.textContent = text;
        if (count) count.textContent = (current + 1) + ' / ' + n;
        var url = fetchFull(current);
        if (url) {
            var want = url;
            var im = full[url];
            var swap = function() { if (set[current].getAttribute('data-full') === want) big.src = url; };
            if (im.complete && im.naturalWidth) swap();
            else im.addEventListener('load', swap, { once: true });
        }
        if (n > 1) {
            fetchFull((current + 1) % n);
            fetchFull((current + n - 1) % n);
        }
    }

    all.forEach(function(btn) {
        btn.addEventListener('click', function() {
            set = setOf(btn);
            // Before showModal, so autofocus never lands on a button that is
            // about to disappear; a set of one opens on the close button.
            var single = set.length < 2;
            steps.forEach(function(b) { b.hidden = single; });
            if (count) count.hidden = single;
            if (!dlg.open) dlg.showModal();
            if (single) dlg.querySelector('.shot-close:not([data-step])').focus();
            show(set.indexOf(btn));
        });
    });
    steps.forEach(function(b) {
        b.addEventListener('click', function() { show(current + Number(b.getAttribute('data-step'))); });
    });
    dlg.addEventListener('keydown', function(e) {
        if (e.altKey || e.ctrlKey || e.metaKey || set.length < 2) return;
        if (e.key === 'ArrowRight') { e.preventDefault(); show(current + 1); }
        else if (e.key === 'ArrowLeft') { e.preventDefault(); show(current - 1); }
    });
    dlg.addEventListener('close', function() { set[current].focus(); });
})();
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

// Language switcher: the menu opens on hover and focus-within in CSS; the
// button also toggles it on click and tap, says so in aria-expanded, and
// Escape or a click elsewhere closes it (MESHSAT-1611).
(function() {
    var sw = document.querySelector('.lang-switch');
    var btn = sw && sw.querySelector('.lang-btn');
    if (!btn) return;
    function set(open) {
        sw.classList.toggle('is-open', open);
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    btn.addEventListener('click', function() { set(!sw.classList.contains('is-open')); });
    document.addEventListener('click', function(e) { if (!sw.contains(e.target)) set(false); });
    sw.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sw.classList.contains('is-open')) { set(false); btn.focus(); }
    });
})();
