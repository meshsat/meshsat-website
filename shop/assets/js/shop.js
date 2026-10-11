// shop.meshsat.net: theme, menu, the one call to action, the message journey, the photo
// views, the film dialog, the sign-up form's feedback and the Turnstile widget. Ported from
// the owner's detailed mock of 11 Oct 2026 (MESHSAT-1517); the preview controls are gone.
(function () {
    'use strict';
    var root = document.documentElement;
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Theme: the inline script in baseof sets the attribute before paint; the toggle stores the choice.
    var themeButton = document.getElementById('theme-toggle');
    function labelTheme() {
        if (themeButton) themeButton.setAttribute('aria-label', root.getAttribute('data-theme') === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
    }
    labelTheme();
    if (themeButton) themeButton.addEventListener('click', function () {
        var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        root.setAttribute('data-theme', next);
        try { localStorage.setItem('meshsat-theme', next); } catch (e) {}
        labelTheme();
    });

    // Menu (phone and tablet).
    var menuButton = document.getElementById('menu-toggle');
    var navigation = document.getElementById('main-nav');
    function closeMenu() {
        if (!navigation || !menuButton) return;
        navigation.setAttribute('data-open', 'false');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Open navigation');
    }
    if (menuButton && navigation) {
        menuButton.addEventListener('click', function () {
            var open = menuButton.getAttribute('aria-expanded') !== 'true';
            navigation.setAttribute('data-open', String(open));
            menuButton.setAttribute('aria-expanded', String(open));
            menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
        });
        navigation.querySelectorAll('a').forEach(function (link) { link.addEventListener('click', closeMenu); });
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') { closeMenu(); menuButton.focus(); }
        });
    }

    // The one call to action: scroll to the offer and focus the visible main control
    // (the country select once ordering is open, the e-mail field until then).
    document.querySelectorAll('[data-primary-jump]').forEach(function (link) {
        link.addEventListener('click', function (event) {
            var offer = document.getElementById('offer');
            var target = document.getElementById('shipping-country') || document.getElementById('notify-email');
            if (!offer || !target) return;
            event.preventDefault();
            closeMenu();
            offer.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
            target.focus({ preventScroll: true });
        });
    });

    // The message journey: three steps, one highlighted route, one explanation.
    var journey = {
        1: { title: '“Basecamp reached.”', description: 'A team member sends a message on the configured Meshtastic channel.', tag: 'Local mesh' },
        2: { title: 'One gateway, a shared satellite path.', description: 'MSC-2 is designed to route selected mesh messages into its Iridium modem. The complete satellite leg still needs testing.', tag: 'Satellite path' },
        3: { title: 'A reply, back to the team.', description: 'The intended return path brings a satellite reply into the local mesh. This is an explanation of the design, not a live message.', tag: 'Intended reply' }
    };
    document.querySelectorAll('[data-step]').forEach(function (button) {
        button.addEventListener('click', function () {
            var stage = button.getAttribute('data-step');
            document.querySelectorAll('[data-step]').forEach(function (item) {
                var active = item === button;
                item.classList.toggle('is-active', active);
                item.setAttribute('aria-pressed', String(active));
            });
            var display = document.getElementById('journey-display');
            if (display) display.setAttribute('data-stage', stage);
            var set = function (id, text) { var el = document.getElementById(id); if (el) el.textContent = text; };
            set('diagram-counter', '0' + stage + ' / 03');
            set('message-title', journey[stage].title);
            set('message-description', journey[stage].description);
            set('message-tag', journey[stage].tag);
        });
    });

    // The photo views: real files, alt text per view, a stable panel.
    var gallery = {
        tbeam: {
            front: ['/images/tbeam-supreme-front.webp', 953, 752, 'Front of the LILYGO T-Beam Supreme with its display, modules and long LoRa antenna.'],
            back: ['/images/tbeam-supreme-back.webp', 936, 312, 'Back of the LILYGO T-Beam Supreme with its 18650 battery holder and the antenna socket.']
        },
        rockblock: {
            front: ['/images/rockblock-9704-sma-front.webp', 1024, 584, 'RockBLOCK 9704-SMA board with the Iridium 9704 modem and its SMA antenna socket.'],
            back: ['/images/rockblock-9704-sma-back.webp', 1024, 584, 'Back of the RockBLOCK 9704-SMA board with its capacitors, header and USB-C socket.']
        }
    };
    document.querySelectorAll('[data-gallery]').forEach(function (button) {
        button.addEventListener('click', function () {
            var name = button.getAttribute('data-gallery'), view = button.getAttribute('data-view');
            var photo = document.getElementById(name + '-photo'), entry = gallery[name] && gallery[name][view];
            if (!photo || !entry) return;
            photo.width = entry[1]; photo.height = entry[2]; photo.alt = entry[3]; photo.src = entry[0];
            document.querySelectorAll('[data-gallery="' + name + '"]').forEach(function (item) { item.setAttribute('aria-pressed', String(item === button)); });
        });
    });

    // The film: nothing from YouTube until the press; the player leaves with the dialog.
    var filmDialog = document.getElementById('film-dialog');
    var filmButton = document.getElementById('film-open');
    if (filmDialog && filmButton && typeof filmDialog.showModal === 'function') {
        filmButton.addEventListener('click', function () {
            var frame = document.createElement('iframe');
            frame.src = filmButton.getAttribute('data-embed');
            frame.title = 'MeshSat project introduction';
            frame.allow = 'autoplay; encrypted-media; picture-in-picture';
            frame.allowFullscreen = true;
            frame.referrerPolicy = 'strict-origin-when-cross-origin';
            document.getElementById('video-mount').replaceChildren(frame);
            filmDialog.showModal();
        });
        filmDialog.addEventListener('close', function () { document.getElementById('video-mount').replaceChildren(); filmButton.focus(); });
        filmDialog.addEventListener('click', function (event) { if (event.target === filmDialog) filmDialog.close(); });
        filmDialog.querySelectorAll('[data-close-dialog]').forEach(function (b) { b.addEventListener('click', function () { filmDialog.close(); }); });
    }

    // The sign-up form: feedback in place (the brief's table), then the real submission to the
    // service, which answers with its own pages. The Turnstile token is required when the widget
    // is on the page; a press before it exists holds the form and sends it when it arrives.
    var form = document.getElementById('launch-form');
    var email = document.getElementById('notify-email');
    var error = document.getElementById('signup-error');
    var submit = document.getElementById('signup-submit');
    var mount = document.querySelector('.turnstile');
    var widget = null, token = '', pending = false;
    function showError(text) {
        if (!error) return;
        error.textContent = text; error.hidden = false;
    }
    function clearError() {
        if (!error) return;
        error.hidden = true; error.textContent = '';
        if (email) email.removeAttribute('aria-invalid');
    }
    function send() {
        if (!form) return;
        if (submit) { submit.disabled = true; submit.textContent = 'Sending confirmation...'; }
        form.submit();
    }
    if (form && email) {
        email.addEventListener('input', function () { if (error && !error.hidden) clearError(); });
        form.addEventListener('submit', function (event) {
            email.value = email.value.trim();
            if (!email.validity.valid) {
                event.preventDefault();
                email.setAttribute('aria-invalid', 'true');
                showError('Enter a valid e-mail address, such as you@example.org.');
                email.focus();
                return;
            }
            clearError();
            if (mount && window.turnstile) {
                event.preventDefault();
                if (token) { send(); return; }
                pending = true;
                showError('Complete the verification check to continue.');
                mount.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
                return;
            }
            if (submit) { submit.disabled = true; submit.textContent = 'Sending confirmation...'; }
        });
    }
    // Called by Turnstile's API once it has loaded (onload=meshsatTurnstile, deferred after this
    // script in baseof). Dark widget on the dark hero; invisible unless Cloudflare needs a click.
    window.meshsatTurnstile = function () {
        if (!mount || !window.turnstile) return;
        if (widget !== null) { try { window.turnstile.remove(widget); } catch (e) {} widget = null; token = ''; }
        widget = window.turnstile.render(mount, {
            sitekey: mount.getAttribute('data-sitekey'),
            theme: 'dark',
            size: 'flexible',
            appearance: 'interaction-only',
            action: 'notify',
            callback: function (t) { token = t; if (pending) { pending = false; clearError(); send(); } },
            'expired-callback': function () { token = ''; if (submit) { submit.disabled = false; } },
            'error-callback': function () { token = ''; return true; }
        });
    };
    if (window.turnstile && mount) window.meshsatTurnstile();
})();
