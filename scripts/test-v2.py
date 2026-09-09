#!/usr/bin/env python3
"""Static acceptance checks for every generated locale (no dependencies)."""
import json
import re
import unittest
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = json.loads((ROOT / 'v2/content.json').read_text())

class Doc(HTMLParser):
    def __init__(self, value):
        super().__init__()
        self.tags = []
        self.feed(value)
    def handle_starttag(self, tag, attrs):
        self.tags.append((tag, dict(attrs)))

class V2Tests(unittest.TestCase):
    def test_translation_coverage(self):
        self.assertEqual(set(DATA), {'en','de','es','fr','sw'})
        for lang,d in DATA.items():
            with self.subTest(lang=lang):
                self.assertEqual(set(d), set(DATA['en']))
                self.assertTrue(all(value for value in d.values()))
                self.assertEqual(len(d['examples']), 6)
                self.assertEqual(len(d['features']), 6)
                self.assertEqual(len(d['faqs']), 5)

    def test_static_pages_and_discovery(self):
        for lang in DATA:
            with self.subTest(lang=lang):
                route = ROOT / 'v2' / ('' if lang=='en' else lang)
                raw = (route/'index.html').read_text()
                doc = Doc(raw)
                self.assertEqual(sum(tag=='h1' for tag,attrs in doc.tags), 1)
                self.assertIn(('html',{'lang':lang}), doc.tags)
                links = [attrs for tag,attrs in doc.tags if tag=='link']
                self.assertEqual(sum(a.get('rel')=='canonical' for a in links),1)
                self.assertEqual({a.get('hreflang') for a in links if a.get('hreflang')}, {'en','de','es','fr','sw','x-default'})
                self.assertEqual(sum('data-prompt' in a for tag,a in doc.tags if tag=='button'),6)
                self.assertTrue((route/'index.md').read_text().startswith('# '))
                self.assertNotIn('<iframe',raw)
                self.assertNotIn('wa.me/message/nuri',raw)
                self.assertNotIn('https://t.me/nuri',raw)
                self.assertIn('https://wirex.nuri.com/mcp',raw)
                ids = [attrs['id'] for tag,attrs in doc.tags if 'id' in attrs]
                self.assertEqual(len(ids),len(set(ids)), 'IDs must be unique')

    def test_font_floor(self):
        css = (ROOT/'v2/site.css').read_text()
        values = [float(x) for x in re.findall(r'font-size:\s*(\d+(?:\.\d+)?)px',css)]
        values += [float(x) for x in re.findall(r'font-size:\s*clamp\((\d+(?:\.\d+)?)px',css)]
        self.assertTrue(values)
        self.assertGreaterEqual(min(values),17)
        self.assertIn('prefers-reduced-motion',css)

    def test_no_unsafe_dom_rendering(self):
        js = (ROOT/'v2/app.mjs').read_text()
        self.assertNotIn('.innerHTML',js)
        self.assertNotIn('window.open(',js)
        self.assertNotIn("fetch('https://openrouter",js)
        self.assertIn('noopener noreferrer',js)
        self.assertIn('textContent',js)
        self.assertNotIn('setInterval',js)

if __name__=='__main__':
    unittest.main(verbosity=2)
