import Papa from "papaparse";
import raw from "./hyg/hygdata_v41.csv?raw";

type HYGRow = {
  proper?: string;
  ra?: number;
  dec?: number;
  mag?: number;
  hip?: number;
};

export type Star = {
  name: string;
  ra: number;
  dec: number;
  magnitude: number;
  hip?: number;
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
      s.mag != null
  )
  .filter((s) => s.mag <= MAX_MAG)
  .map((s) => ({
    name: s.proper ?? `HIP ${s.hip}`,

    ra: s.ra * 15,
    dec: s.dec,
    magnitude: s.mag,
  }));