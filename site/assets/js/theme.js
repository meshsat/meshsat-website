// Applies the stored or preferred theme before first paint, so there is no
// flash of the wrong theme, and marks the document as scripted (has-js) for
// the CSS that offers a no-JS fallback. Loaded synchronously from the head as
// an external file: the site's CSP allows no inline script (MESHSAT-1612).
(function() {
    document.documentElement.classList.add('has-js');
    var stored = null;
    try { stored = localStorage.getItem('meshsat-theme'); } catch (e) {}
    if (stored) {
        document.documentElement.setAttribute('data-theme', stored);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        document.documentElement.setAttribute('data-theme', 'light');
    }
})();
