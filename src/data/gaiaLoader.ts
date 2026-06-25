import Papa from "papaparse";
import raw from "./gaia/gaia_mag8.csv?raw";

type GaiaStar = {
    id: number,
    ra: number,
    dec: number,
    magnitude: number,
    parallax: number
}

type GaiaRow = {
    source_id?: number,
    ra?: number,
    dec?: number,
    phot_g_mean_mag?: number,
    parallax?: number
}

const parsed = Papa.parse<GaiaRow>(raw, {
    header: true,
    dynamicTyping: true
})

const GaiaStars: GaiaStar[] = parsed.data
    .filter((s): s is Required<GaiaRow> =>
        s.source_id != null &&
        s.ra != null &&
        s.dec != null &&
        s.phot_g_mean_mag != null)
    .map((s) => ({
        id: s.source_id,
        ra: s.ra,
        dec: s.dec,
        magnitude: s.phot_g_mean_mag,
        parallax: s.parallax
    }))


export const GaiaCatalog = {
    stars: GaiaStars,
    getStarById(id: number): GaiaStar | undefined{
        return this.stars.find((star) => star.id === id);
    },
}

type StarName = {
    id: number,
    name: string
}

const NameCatalog = [{id: 123, name: "sigma"}, {id: 456, name: "beta"}, {id: 789, name: "alpha"}];

function getNameById(id: number): StarName | undefined{
        return NameCatalog.find((star) => star.id === id);
    }   