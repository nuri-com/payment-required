#!/usr/bin/env python3
"""Save public agent-readiness evidence. Never translate errors into passes."""
import argparse
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
import json
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.error import HTTPError
from urllib.parse import urlencode, urlsplit

p = argparse.ArgumentParser()
p.add_argument('--url', required=True)
p.add_argument('--out', required=True)
a = p.parse_args()
out = Path(a.out)
out.mkdir(parents=True, exist_ok=True)
started = datetime.now(timezone.utc).isoformat()
ua = {'User-Agent': 'PaymentRequired-V2-Readiness/1.0'}

def request(name, url, data=None, form=False, timeout=150):
    headers = dict(ua)
    if data is not None:
        headers['Content-Type'] = 'application/x-www-form-urlencoded' if form else 'application/json'
        data = (urlencode(data) if form else json.dumps(data)).encode()
    req = Request(url, data=data, headers=headers)
    try:
        response = urlopen(req, timeout=timeout)
    except HTTPError as e:
        response = e
    except Exception as e:
        record = {'requested_url': url, 'target_url': a.url, 'scanned_at': started, 'error': str(e)}
        (out / f'{name}.json').write_text(json.dumps(record, indent=2))
        return {'name': name, 'error': str(e)}
    raw = response.read().decode('utf-8', errors='replace')
    try:
        body = json.loads(raw)
    except json.JSONDecodeError:
        body = raw
    record = {'requested_url': url, 'target_url': a.url, 'scanned_at': started, 'final_url': response.url,
              'status': response.status, 'headers': dict(response.headers), 'body': body}
    (out / f'{name}.json').write_text(json.dumps(record, indent=2, ensure_ascii=False))
    brief = {'name': name, 'http': response.status, 'artifact': str(out / f'{name}.json')}
    if isinstance(body, dict):
        brief['keys'] = list(body)
    return brief

jobs: list[tuple[str, str, dict | None, bool]] = [
    ('isitagentready', 'https://isitagentready.com/api/scan', {'url': a.url}, False),
    ('circle', 'https://agents.circle.com/sell/score/check', {'url': a.url}, False),
    ('is-agentic-submit', 'https://is-agentic.com/scan', {'url': a.url}, True),
]
for device in ('mobile', 'desktop'):
    params = [('url', a.url), ('strategy', device)] + [('category', c) for c in ('performance', 'accessibility', 'best-practices', 'seo')]
    jobs.append((f'psi-{device}', 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed?' + urlencode(params), None, False))
with ThreadPoolExecutor(max_workers=5) as pool:
    results = list(pool.map(lambda job: request(*job), jobs))
results.append(request('is-agentic-report', 'https://is-agentic.com/api/v1/report?' + urlencode({'url': a.url})))
(out / 'manifest.json').write_text(json.dumps({'target': a.url, 'started': started, 'results': results}, indent=2))
print(json.dumps(results, indent=2))
