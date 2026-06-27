import os, json
from astroquery.simbad import Simbad

Simbad.add_votable_fields("ids")
Simbad.add_votable_fields("sp_type")

os.makedirs("cache", exist_ok=True)

def convert_simbad(result):
    return {
        "id_raw": result["ids"][0],
        "name": result["main_id"][0],
        "spectral": result["sp_type"][0],
        }

def save_cache(source_id, data):
    path = f"cache/{source_id}.json"
    with open(path, "w") as file:
        json.dump(data,file,indent=2)

def get_cache(source_id):
    path = f"cache/{source_id}.json"
    if os.path.exists(path):
        with open(path, "r") as file:
            return json.load(file)
    return None

def get_star(source_id):
    cached = get_cache(source_id)
    if cached is not None:
        return cached   
    
    result = Simbad.query_object(f"Gaia DR3 {source_id}")
    if result is None: 
        return None
    
    star = convert_simbad(result)
    save_cache(source_id, star)
    return star
