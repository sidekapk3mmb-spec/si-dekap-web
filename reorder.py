import re

with open('hazards.html', 'r', encoding='utf-8') as f:
    content = f.read()

match = re.search(r'(<div class="hazards-grid reveal">)(.*?)(</section>)', content, re.DOTALL)
if not match:
    print('Not found')
    exit()

grid_start = match.group(1)
grid_content = match.group(2)
section_end = match.group(3)

# The grid_content ends with '</div>\n      </div>\n    ' before the </section>
grid_inner_match = re.search(r'(.*?)(        </div>\n      </div>\n    )', grid_content, re.DOTALL)
if not grid_inner_match:
    print('Inner grid not found')
    exit()

cards_raw = grid_inner_match.group(1)
suffix = grid_inner_match.group(2)

# Split by '<div class="hazard-card'
cards = []
for part in cards_raw.split('<div class="hazard-card'):
    if part.strip():
        cards.append('<div class="hazard-card' + part)

order = [
    'Glassware Pecah',
    'Tumpahan Bahan Korosif',
    'Paparan Uap Beracun',
    'Tergelincir / Tersandung',
    'Postur & Repetisi Kerja',
    'Kontaminasi Mikroba',
    'Temperatur Ekstrem',
    'Kebisingan Mesin',
    'Sengatan & Korsleting Listrik',
    'Gas Bertekanan Tinggi',
    'Potensi Kebakaran'
]

def get_title(card):
    m = re.search(r'<h3 class="hazard-title">(.*?)</h3>', card)
    if m:
        # replace any possible html entities if needed, but here just direct string match
        title = m.group(1).strip()
        return title.replace('&amp;', '&')
    return ''

sorted_cards = []
for title in order:
    for c in cards:
        if get_title(c) == title or get_title(c).replace('&amp;', '&') == title.replace('&amp;', '&'):
            sorted_cards.append(c)
            break

if len(sorted_cards) != len(cards):
    print(f'Mismatch! Expected {len(cards)}, got {len(sorted_cards)}')
    print('Found titles:', [get_title(c) for c in cards])
    exit()

new_grid_content = ''.join(sorted_cards) + suffix
new_content = content[:match.start(2)] + '\n' + new_grid_content + content[match.end(2):]

with open('hazards.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print('Success!')
