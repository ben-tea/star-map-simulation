import Papa from "papaparse";
import raw from "./hyg/hygdata_v41.csv?raw";

type HYGRow = {
  id?: number;
  proper?: string;
  bf?: string;
  hip?: number;
  hd?: number;
  hr?: number;
  ra?: number;
  dec?: number;
  mag?: number;
  absmag?: number;
  dist?: number;
  spect?: string;
  con?: string;
  };

export type Star = {
  name: string;
  hip?: number;
  ra: number;
  dec: number;
  magnitude: number;
  absmag: number;
  dist: number;
  spectral: string;
  con: string;
};

const parsed = Papa.parse<HYGRow>(raw, {
  header: true,
  dynamicTyping: true,
});

const MAX_MAG = 6;

// FINAL CLEAN STAR ARRAY
export const stars: Star[] = parsed.data
  .filter(
    (s): s is Required<HYGRow> =>
      s.ra != null &&
      s.dec != null &&
      s.mag != null &&
      s.spect != null
  )
  .filter((s) => s.mag <= MAX_MAG)
  .map((s) => ({
    name: 
      s.proper
      ? s.proper
      : s.bf
        ? s.bf
        : s.hip 
          ? `HIP ${s.hip}` 
          : s.hd
            ? `HD ${s.hd}`
            : s.hr
              ? `HR ${s.hr}`
              : s.id
                ? `Star ${s.id}`
                : 'Unnamed Star',
    ra: s.ra * 15,
    dec: s.dec,
    magnitude: s.mag,
    absmag: s.absmag,
    dist: s.dist,
    spectral: s.spect,
    con: s.con
  }));