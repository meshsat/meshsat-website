#!/usr/bin/env python3
"""Check built HTML, fragments, responsive sources and CSS at every depth.

Usage: verify-built-links.py SITE_DIR [DOCS_DIR]
No network requests: only the two build trees are authoritative here.
"""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlsplit, unquote
import re
import sys

roots = {'meshsat.net': Path(sys.argv[1]).resolve()}
if len(sys.argv) > 2:
    roots['docs.meshsat.net'] = Path(sys.argv[2]).resolve()
errors, references, ids = [], [], {}
css_url = re.compile(r'url\(\s*[\'"]?([^\s\)\'"]+)')

class Document(HTMLParser):
    def __init__(self, url):
        super().__init__(convert_charrefs=True)
        self.url = url
        ids[url] = set()
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if a.get('id'): ids[self.url].add(a['id'])
        if tag == 'a' and a.get('name'): ids[self.url].add(a['name'])
        if tag == 'img' and 'alt' not in a: errors.append(f'{self.url}: image without alt')
        for key in ['href', 'src', 'poster', 'data-full']:
            if a.get(key): references.append((self.url, a[key]))
        for candidate in a.get('srcset', '').split(','):
            if candidate.strip(): references.append((self.url, candidate.split()[0]))
        for target in css_url.findall(a.get('style', '')): references.append((self.url, target))

def url_for(host, root, file):
    return f'https://{host}/' + file.relative_to(root).as_posix()

for host, root in roots.items():
    if not root.is_dir(): errors.append(f'Missing build: {root}'); continue
    for file in root.rglob('*.html'):
        url = url_for(host, root, file)
        Document(url).feed(file.read_text())
    for file in root.rglob('*.css'):
        base = url_for(host, root, file)
        references.extend((base, u) for u in css_url.findall(file.read_text()))

checked=set()
for base, target in references:
    url=urlsplit(urljoin(base, target))
    if url.hostname not in roots or url.scheme not in ['http','https']: continue
    root=roots[url.hostname]
    relative=unquote(url.path).lstrip('/')
    file=root/relative
    candidates=[file, file/'index.html', root/(relative.rstrip('/')+'.html')]
    file=next((f for f in candidates if f.is_file()),None)
    if file is None:
        errors.append(f'{base}: missing {target}'); continue
    checked.add(str(file))
    # Media fragments (#t=) and SVG view fragments are not HTML anchors.
    fragment=unquote(url.fragment)
    if fragment and file.suffix=='.html' and not fragment.startswith(':~:'):
        canonical=url_for(url.hostname,root,file)
        fragment=fragment.split(':~:')[0]
        if fragment and fragment not in ids.get(canonical,set()):
            errors.append(f'{base}: missing fragment {target}')

for error in sorted(set(errors)): print(error)
print(f'Built links: {len(ids)} HTML pages, {len(checked)} targets, {len(set(errors))} errors')
sys.exit(bool(errors))
