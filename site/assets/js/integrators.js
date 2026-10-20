(() => {
    'use strict';
    const root = document.querySelector('[data-configurator]');
    if (!root) return;
    const { radios, copy } = JSON.parse(document.getElementById('ig-radio-data').textContent);
    const fill = (template, values) => template.replace(/\{(\w+)\}/g, (_, key) => values[key]);
    const first = document.getElementById('ig-radio-one');
    const second = document.getElementById('ig-radio-two');
    const contact = document.getElementById('ig-contact');
    const status = () => {
        const badge = document.createElement('span');
        badge.className = 'badge badge-token badge-plan';
        badge.textContent = 'FUTURE PLAN';
        return badge;
    };
    function update() {
        if (second.value === first.value) second.value = '';
        for (const option of second.options) option.disabled = option.value === first.value;
        // Family order makes the same pair produce the same name in either slot.
        const selected = radios.filter(radio => radio.code === first.value || radio.code === second.value);
        const name = 'MSC-3' + selected.map(radio => radio.code).join('');
        document.getElementById('ig-model').textContent = name;
        document.getElementById('ig-bridges').textContent = selected.length === 2
            ? fill(copy.bridgeTwo, { first: selected[0].name, second: selected[1].name })
            : fill(copy.bridgeOne, { first: selected[0].name });
        document.getElementById('ig-radio-limits').replaceChildren(...selected.map(radio => {
            const item = document.createElement('li');
            const title = document.createElement('strong');
            title.append(radio.name + ' ', status());
            const modules = document.createElement('span');
            modules.textContent = radio.modules + ': ' + copy.evaluation + '.';
            const limit = document.createElement('p');
            limit.textContent = radio.limit;
            item.append(title, modules, limit);
            return item;
        }));
        document.getElementById('ig-route-local').replaceChildren(...selected.map(radio => {
            const node = document.createElement('span');
            node.textContent = radio.name;
            return node;
        }));
        const subject = name + ' ' + copy.subject;
        const body = name + ' / FUTURE PLAN\n' + fill(copy.body, { radios: selected.map(radio => radio.name).join(' + ') });
        contact.href = `mailto:${contact.dataset.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
    first.addEventListener('change', update);
    second.addEventListener('change', update);
    update();
    document.getElementById('ig-radio-fields').disabled = false;
})();
