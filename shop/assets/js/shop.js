// shop.meshsat.net: theme toggle, menu, the film facade. No third-party script.
(function() {
    var KEY = 'meshsat-theme';
    document.addEventListener('DOMContentLoaded', function() {
        var t = document.getElementById('theme-toggle');
        if (!t) return;
        t.addEventListener('click', function() {
            var next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', next);
            try { localStorage.setItem(KEY, next); } catch (e) {}
        });
    });
})();

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
