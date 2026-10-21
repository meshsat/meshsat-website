#!/usr/bin/env python3
"""Ensure the link gate detects regressions outside the first two directories."""
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest

GATE = Path(__file__).with_name('verify-built-links.py')
class Links(unittest.TestCase):
    def test_nested_fragments_responsive_images_and_css(self):
        with tempfile.TemporaryDirectory() as d:
            root=Path(d)
            nested=root/'a/b/c'; nested.mkdir(parents=True)
            (root/'index.html').write_text('<h1 id="home">Home</h1>')
            (nested/'index.html').write_text('<a href="/#home">Home</a><img alt="" srcset="/photo.webp 640w"><link rel="stylesheet" href="/style.css">')
            (root/'photo.webp').touch()
            (root/'font.woff2').touch()
            (root/'style.css').write_text('@font-face{src:url(/font.woff2)}')
            def run(): return subprocess.run([sys.executable,str(GATE),d],capture_output=True,text=True)
            self.assertEqual(run().returncode,0)
            (root/'index.html').write_text('<h1>No anchor</h1>')
            self.assertIn('missing fragment',run().stdout)
            (root/'photo.webp').unlink()
            self.assertIn('missing /photo.webp',run().stdout)
            (root/'font.woff2').unlink()
            self.assertIn('missing /font.woff2',run().stdout)
if __name__=='__main__': unittest.main()
