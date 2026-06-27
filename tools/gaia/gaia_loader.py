import csv
from tools.simbad.pipeline import get_star
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[2]
csv_path = BASE_DIR / "data" / "gaia" / "gaia_mag8.csv"

def id_parser(value):
    if value is None: return None
    return int(value);

def float_parser(value):
    if value is None: return None
    return float(value);

stars = []
rows = []
batch_size = 50

with open(csv_path, "r") as file:
    reader = csv.DictReader(file)
    for row in reader:
        rows.append(row)

for i in range(0,len(rows), batch_size):
    batch = rows[i: i + batch_size]
    for row in batch:
        source_id = id_parser(row['source_id'])
        simbad_data = get_star(source_id)

        if simbad_data is None: continue

        star = {
            'source_id': source_id,
            'name': simbad_data['name'],
            'ra': float_parser(row['ra']),
            'dec': float_parser(row['dec']),
            'magnitude': float_parser(row['phot_g_mean_mag']),
            'spectral': simbad_data['spectral'],
            'parallax': float_parser(row['parallax'])
            }

        stars.append(star)
        
