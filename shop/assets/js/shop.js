// shop.meshsat.net: theme toggle, menu, the film facade, and the Turnstile
// widget on the sign-up form (the one third-party script, the owner's choice).
(function() {
    var KEY = 'meshsat-theme';
    document.addEventListener('DOMContentLoaded', function() {
        var t = document.getElementById('theme-toggle');
        if (!t) return;
        t.addEventListener('click', function() {
            var next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', next);
            try { localStorage.setItem(KEY, next); } catch (e) {}
            if (window.meshsatTurnstile) window.meshsatTurnstile();
        });
    });
})();

// Cloudflare Turnstile, rendered explicitly so it follows the page's theme
// (the toggle re-renders it; a solved widget simply solves again). Called by
// the api.js onload callback; a no-op until the script and the mount exist.
(function() {
    var widget = null, token = '', pending = false;
    function form() { var m = document.querySelector('.turnstile'); return m ? m.closest('form') : null; }
    window.meshsatTurnstile = function() {
        var mount = document.querySelector('.turnstile');
        if (!mount || !window.turnstile) return;
        if (widget !== null) { try { window.turnstile.remove(widget); } catch (e) {} widget = null; mount.innerHTML = ''; token = ''; }
        var light = document.documentElement.getAttribute('data-theme') === 'light';
        widget = window.turnstile.render(mount, {
            sitekey: mount.getAttribute('data-sitekey'),
            theme: light ? 'light' : 'dark',
            size: 'flexible',
            action: 'notify',
            callback: function(t) { token = t; var f = form(); if (pending && f) { pending = false; f.submit(); } },
            'expired-callback': function() { token = ''; },
            'error-callback': function() { token = ''; return true; }
        });
    };
    // Pressed before the check finished: hold the form and send it the moment
    // the token arrives, so nobody is told "the check did not pass" for being quick.
    document.addEventListener('submit', function(e) {
        var f = form();
        if (!f || e.target !== f || token || !window.turnstile || widget === null) return;
        e.preventDefault();
        pending = true;
        var mount = document.querySelector('.turnstile');
        if (mount && mount.scrollIntoView) mount.scrollIntoView({ block: 'center' });
    });
})();

// The one call to action, wherever it stands (nav, closing ask): scroll to the
// field or the country select and focus it. The anchor works without script.
document.addEventListener('click', function(e) {
    var t = e.target.closest ? e.target.closest('[data-jump]') : null;
    if (!t) return;
    var el = document.getElementById(t.getAttribute('data-jump'));
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ block: 'center' });
    el.focus({ preventScroll: true });
    var navLinks = document.querySelector('.nav-links');
    if (navLinks && navLinks.classList.contains('active')) navLinks.classList.remove('active');
});

document.addEventListener('DOMContentLoaded', function() {
    var menuToggle = document.querySelector('.menu-toggle');
    var navLinks = document.querySelector('.nav-links');
    if (!menuToggle || !navLinks) return;
    function close() {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
    }
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        var open = navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active', open);
        menuToggle.setAttribute('aria-expanded', open);
    });
    document.addEventListener('click', function(e) {
        if (navLinks.classList.contains('active') && !menuToggle.contains(e.target) && !navLinks.contains(e.target)) close();
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) { close(); menuToggle.focus(); }
    });
    window.addEventListener('resize', function() { if (window.innerWidth > 768) close(); });
});

// The film: a poster facade, nothing from YouTube until a press. Opens the
// shared modal; falls back to an in-place swap if dialogs are unavailable.
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
document.addEventListener('click', function(e) {
    if (e.target && e.target.tagName === 'DIALOG' && e.target.open) e.target.close();
});
(function() {
    var dlg = document.getElementById('video-dialog');
    if (!dlg) return;
    dlg.addEventListener('close', function() {
        var media = document.getElementById('video-dialog-media');
        if (media) media.innerHTML = '';
    });
})();
