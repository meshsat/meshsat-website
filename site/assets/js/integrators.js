(() => {
    'use strict';
    const root = document.querySelector('[data-configurator]');
    if (!root) return;
    const radios = JSON.parse(document.getElementById('ig-radio-data').textContent);
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
            ? `Intended bridge: ${selected[0].name} and ${selected[1].name} to each other, and both to Iridium. Return messages follow the same paths where message formats and routing policy permit.`
            : `Intended bridge: ${selected[0].name} to Iridium and back, where message formats and routing policy permit.`;
        document.getElementById('ig-radio-limits').replaceChildren(...selected.map(radio => {
            const item = document.createElement('li');
            const title = document.createElement('strong');
            title.append(radio.name + ' ', status());
            const modules = document.createElement('span');
            modules.textContent = radio.modules + ': under evaluation.';
            const limit = document.createElement('p');
            limit.textContent = radio.limit;
            item.append(title, modules, limit);
            return item;
        }));
        const subject = name + ' integration discussion';
        const body = `${name} / FUTURE PLAN\nLocal radios: ${selected.map(radio => radio.name).join(' + ')}\nAlways fitted: Iridium / RockBLOCK 9704 (module under evaluation)\n\nRadio models and message types:\nDeployment country and site:\nIntegration endpoint:\n`;
        contact.href = `mailto:${contact.dataset.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
    first.addEventListener('change', update);
    second.addEventListener('change', update);
    update();
    document.getElementById('ig-radio-fields').disabled = false;
})();
