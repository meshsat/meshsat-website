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

    // The message journey: two paths (with the app, from the mesh), three steps each. The
    // diagram, its accessible title and description, the counter and the explanation change
    // together; a path change resets to step 1; the explanation is announced politely; the
    // pressed button keeps focus. Nothing advances by itself.
    var journeys = {
        app: {
            label: 'App-led message journey / illustrative', origin: 'Phone + app', link: 'Bluetooth',
            title: 'The MeshSat app connects to a satellite-equipped node',
            description: 'Intended MSC-2 path: phone to node over Bluetooth, node to Iridium, then satellite provider and configured MeshSat Hub. The phone itself does not transmit to satellites.',
            stages: [
                { heading: 'Pair. Write. Send.', summary: 'Connect the app to your node by Bluetooth.', title: '“Basecamp reached.” From your phone.', description: 'Pair the MeshSat app with a supported node over Bluetooth. Compose your message and select its route. The node carries the satellite modem; your phone is the interface.', tag: 'App + Bluetooth' },
                { heading: 'See what is happening', summary: 'Follow the queue and check satellite passes.', title: 'Queued is different from sent.', description: 'Follow waiting, sent and failed states in the app. Check predicted passes while the modem waits for a usable link. A sent indicator is not a recipient delivery or read receipt.', tag: 'Queue + passes' },
                { heading: 'Bring the reply back', summary: 'Through the provider and your configured Hub.', title: 'A reply finds its way back.', description: 'Configured Hub routing handles the remote side. A reply waits with the satellite provider until a later session brings it back to the app. The full MSC-2 exchange still needs testing.', tag: 'Intended reply' }
            ]
        },
        mesh: {
            label: 'Mesh-led message journey / illustrative', origin: 'Local mesh', link: 'Configured LoRa',
            title: 'A local mesh uses one shared satellite gateway',
            description: 'Intended standalone path: compatible local mesh radios to MSC-2, then Iridium, the satellite provider and a configured MeshSat Hub. The return route brings selected replies back to the mesh.',
            stages: [
                { heading: 'Send from the mesh', summary: 'A message starts with your team.', title: '“Basecamp reached.” From the mesh.', description: 'A team member sends on the configured Meshtastic channel. Compatible radio settings, a usable mesh path and routing rules determine what reaches the gateway.', tag: 'Local mesh' },
                { heading: 'Pass through MSC-2', summary: 'The gateway bridges the two radios.', title: 'One gateway, a shared satellite path.', description: 'MSC-2 is designed to pass selected mesh messages into its Iridium modem without a phone. That route has bench evidence; the complete satellite exchange remains a test milestone.', tag: 'Standalone route' },
                { heading: 'Bring the reply back', summary: 'The intended return path to the mesh.', title: 'A reply, back to the team.', description: 'The configured provider and Hub route handles the remote reply. The intended return path is satellite to MSC-2 to the selected local mesh destination. Delivery is not guaranteed.', tag: 'Intended reply' }
            ]
        }
    };
    var journeyMode = 'app';
    var journeySteps = document.querySelectorAll('[data-step]');
    var journeyModes = document.querySelectorAll('[data-journey-mode]');
    var journeyDisplay = document.getElementById('journey-display');
    function setText(id, text) { var el = document.getElementById(id); if (el) el.textContent = text; }
    function renderJourney(stage) {
        var path = journeys[journeyMode];
        var message = path.stages[stage - 1];
        journeySteps.forEach(function (item, index) {
            var active = index === stage - 1;
            item.classList.toggle('is-active', active);
            item.setAttribute('aria-pressed', String(active));
            item.querySelector('strong').textContent = path.stages[index].heading;
            item.querySelector('small').textContent = path.stages[index].summary;
        });
        journeyModes.forEach(function (item) { item.setAttribute('aria-pressed', String(item.getAttribute('data-journey-mode') === journeyMode)); });
        journeyDisplay.setAttribute('data-mode', journeyMode);
        journeyDisplay.setAttribute('data-stage', String(stage));
        setText('diagram-mode-label', path.label);
        setText('diagram-counter', '0' + stage + ' / 03');
        setText('journey-origin-label', path.origin);
        setText('journey-link-label', path.link);
        setText('network-title', path.title);
        setText('network-desc', path.description);
        setText('message-title', message.title);
        setText('message-description', message.description);
        setText('message-tag', message.tag);
    }
    if (journeyDisplay && journeySteps.length === 3) {
        journeySteps.forEach(function (button) { button.addEventListener('click', function () { renderJourney(Number(button.getAttribute('data-step'))); }); });
        journeyModes.forEach(function (button) { button.addEventListener('click', function () { journeyMode = button.getAttribute('data-journey-mode'); renderJourney(1); }); });
    }

    // The team calculator (the R4 brief of 11 Oct 2026): a fixed MSC-2 basis of EUR 1.800 plus
    // the visitor's own quotes, in integer cents. No competitor price, conversion or subscription
    // count is built in; a missing input is unknown, never zero; a changed team size holds the
    // comparison until the quotes are confirmed; invalid inputs hide stale results.
    var teamSize = document.getElementById('team-size');
    if (teamSize) {
        var gatewayCents = 180000;
        var teamRadios = document.getElementById('team-radios');
        var teamError = document.getElementById('team-input-error');
        var radioPrice = document.getElementById('radio-unit-price');
        var meshPeriod = document.getElementById('mesh-period-quote');
        var otherHardware = document.getElementById('other-hardware-quote');
        var otherPeriod = document.getElementById('other-period-quote');
        var quoteReview = document.getElementById('quote-review');
        var comparisonMonths = 0;
        var previousTeamSize = teamSize.valueAsNumber;
        var quotesNeedReview = false;
        var euros = new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        var eur = function (cents) { return '€' + euros.format(cents / 100); };
        var validMoney = function (value) { return Number.isInteger(value) && value >= 0 && value <= 100000000; };
        function readMoney(input) {
            if (input.value.trim() === '') return null;
            var value = input.valueAsNumber;
            var cents = Math.round(value * 100);
            return input.validity.valid && Math.abs(value * 100 - cents) < 0.000001 && validMoney(cents) ? cents : null;
        }
        function calculateTeamCosts(i) {
            if (!Number.isInteger(i.people) || i.people < 1 || i.people > 10
                || !Number.isInteger(i.radios) || i.radios < 0 || i.radios > i.people
                || (i.months !== 0 && i.months !== 24)) return null;
            var meshHardware = i.radios === 0 ? gatewayCents : validMoney(i.radioCents) ? gatewayCents + i.radios * i.radioCents : null;
            var meshTotal = meshHardware === null ? null : i.months === 0 ? meshHardware : validMoney(i.meshPeriodCents) ? meshHardware + i.meshPeriodCents : null;
            var otherHardwareCents = validMoney(i.otherHardwareCents) ? i.otherHardwareCents : null;
            var otherTotal = otherHardwareCents === null ? null : i.months === 0 ? otherHardwareCents : validMoney(i.otherPeriodCents) ? otherHardwareCents + i.otherPeriodCents : null;
            return { meshHardware: meshHardware, meshTotal: meshTotal, otherHardware: otherHardwareCents, otherTotal: otherTotal };
        }
        function renderTeamCosts() {
            var people = teamSize.valueAsNumber;
            var radios = teamRadios.valueAsNumber;
            if ([meshPeriod, otherHardware, otherPeriod].every(function (input) { return input.value.trim() === ''; })) quotesNeedReview = false;
            setText('team-size-value', String(people));
            document.getElementById('radio-price-field').hidden = radios === 0;
            document.getElementById('mesh-period-field').hidden = comparisonMonths === 0;
            document.getElementById('other-period-field').hidden = comparisonMonths === 0;
            radioPrice.disabled = radios === 0;
            meshPeriod.disabled = otherPeriod.disabled = comparisonMonths === 0;
            var radioCents = readMoney(radioPrice);
            var meshPeriodCents = readMoney(meshPeriod);
            var otherHardwareCents = readMoney(otherHardware);
            var otherPeriodCents = readMoney(otherPeriod);
            var costs = calculateTeamCosts({ people: people, radios: radios, radioCents: radioCents, months: comparisonMonths, meshPeriodCents: meshPeriodCents, otherHardwareCents: otherHardwareCents, otherPeriodCents: otherPeriodCents });
            var moneyFields = [radioPrice, meshPeriod, otherHardware, otherPeriod].filter(function (input) { return !input.disabled; });
            var invalidMoney = moneyFields.some(function (input) { return input.value.trim() !== '' && readMoney(input) === null; });
            moneyFields.forEach(function (input) {
                if (input.value.trim() !== '' && readMoney(input) === null) input.setAttribute('aria-invalid', 'true');
                else input.removeAttribute('aria-invalid');
            });
            teamError.hidden = Boolean(costs) && !invalidMoney;
            teamError.textContent = !costs ? 'Use a whole number of new radios between zero and your team size.'
                : invalidMoney ? 'Use an amount from €0 to €1.000.000, with no more than two decimal places.' : '';
            if (!costs) teamRadios.setAttribute('aria-invalid', 'true');
            else teamRadios.removeAttribute('aria-invalid');
            document.getElementById('team-results').hidden = !costs || invalidMoney;
            quoteReview.hidden = !quotesNeedReview;
            setText('quote-review-note', 'Your team is now ' + people + ' people. Check that the entered whole-team quotes still cover this setup.');
            setText('quote-review-confirm', 'Quotes cover ' + people + ' people');
            setText('cost-heading', comparisonMonths ? 'Selected 24-month subtotals' : 'Hardware subtotals');
            setText('cost-scope', comparisonMonths
                ? 'Includes only the costs you enter for the selected period. Check applicable tax, activation, plan commitments, usage, accessories and shipping. This is not a verified market saving or an equivalence claim.'
                : 'Hardware only. Service, activation, accessories and shipping are excluded. These are selected costs, not an all-in offer or a claim of equivalent capability.');
            if (!costs || invalidMoney) {
                setText('cost-reading', 'Correct the marked input to calculate. Previous results are hidden.');
                return;
            }
            setText('mesh-setup-label', '1 gateway + ' + radios + ' new mesh ' + (radios === 1 ? 'radio' : 'radios') + (comparisonMonths ? ' + your quoted period costs' : ''));
            setText('other-setup-label', 'Your quote for ' + people + ' people' + (comparisonMonths ? ' over 24 months' : ''));
            var meshIncomplete = costs.meshTotal === null || (quotesNeedReview && comparisonMonths);
            setText('mesh-total', meshIncomplete ? 'Incomplete' : eur(costs.meshTotal));
            setText('mesh-hardware', costs.meshHardware === null ? 'Needed' : eur(costs.meshHardware));
            setText('mesh-airtime', comparisonMonths ? (meshPeriodCents === null ? 'Needed' : eur(meshPeriodCents)) : 'Not included');
            var comparable = costs.meshTotal !== null && costs.otherTotal !== null && !quotesNeedReview;
            document.getElementById('other-cost-row').hidden = !comparable;
            var scale = Math.max(costs.meshTotal || 0, comparable ? costs.otherTotal : 0, 1);
            document.getElementById('mesh-cost-bar').style.width = meshIncomplete ? '0%' : (costs.meshTotal / scale * 100) + '%';
            if (comparable) {
                setText('other-total', eur(costs.otherTotal));
                setText('other-hardware', eur(costs.otherHardware));
                setText('other-airtime', comparisonMonths ? eur(otherPeriodCents) : 'Not included');
                document.getElementById('other-cost-bar').style.width = (costs.otherTotal / scale * 100) + '%';
            }
            var reading;
            if (quotesNeedReview) reading = 'Check and confirm your entered quotes for the new team size before comparing.';
            else if (costs.meshHardware === null) reading = 'Enter your price per additional radio to calculate the MSC-2 hardware subtotal.';
            else if (comparisonMonths && meshPeriodCents === null) reading = 'Enter the complete quoted period costs for MSC-2. Missing costs are not treated as zero.';
            else if (otherHardwareCents === null) reading = 'Add another whole-team hardware quote to compare. No competitor price is assumed.';
            else if (comparisonMonths && otherPeriodCents === null) reading = 'Enter the other setup’s quoted period costs before comparing 24-month subtotals.';
            else {
                var difference = costs.otherTotal - costs.meshTotal;
                reading = difference === 0 ? 'The entered subtotals are equal.'
                    : 'Using your inputs, the MSC-2 subtotal is ' + eur(Math.abs(difference)) + ' ' + (difference > 0 ? 'lower' : 'higher') + '.';
                reading += ' This compares entered costs, not equivalent services or a verified saving against a named product.';
            }
            setText('cost-reading', reading);
        }
        teamSize.addEventListener('input', function () {
            var people = teamSize.valueAsNumber;
            var radios = teamRadios.valueAsNumber;
            teamRadios.max = String(people);
            if (radios === previousTeamSize || radios > people) teamRadios.value = String(people);
            if ([meshPeriod, otherHardware, otherPeriod].some(function (input) { return input.value.trim() !== ''; })) quotesNeedReview = true;
            previousTeamSize = people;
            renderTeamCosts();
        });
        [teamRadios, radioPrice, meshPeriod, otherHardware, otherPeriod].forEach(function (input) { input.addEventListener('input', renderTeamCosts); });
        document.getElementById('quote-review-confirm').addEventListener('click', function () { quotesNeedReview = false; renderTeamCosts(); });
        document.querySelectorAll('[data-cost-months]').forEach(function (button) {
            button.addEventListener('click', function () {
                comparisonMonths = Number(button.getAttribute('data-cost-months'));
                document.querySelectorAll('[data-cost-months]').forEach(function (item) { item.setAttribute('aria-pressed', String(item === button)); });
                renderTeamCosts();
            });
        });
        renderTeamCosts();
    }

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
