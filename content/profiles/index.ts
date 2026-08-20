import type { WineProfile } from "../types";

import RED_01 from "./RED_01.json";
import RED_02 from "./RED_02.json";
import RED_03 from "./RED_03.json";
import RED_04 from "./RED_04.json";
import WHITE_01 from "./WHITE_01.json";
import WHITE_02 from "./WHITE_02.json";
import WHITE_03 from "./WHITE_03.json";
import ROSE_01 from "./ROSE_01.json";
import SPARK_01 from "./SPARK_01.json";
import SPARK_02 from "./SPARK_02.json";
import SPARK_03 from "./SPARK_03.json";

// O JSON importado tem `category: string`; o cast para WineProfile aqui é só
// para restaurar o literal type (WineCategory), sem tocar nos dados.
const rawProfiles = [
  RED_01,
  RED_02,
  RED_03,
  RED_04,
  WHITE_01,
  WHITE_02,
  WHITE_03,
  ROSE_01,
  SPARK_01,
  SPARK_02,
  SPARK_03,
];

/** Todos os perfis de vinho, na ordem em que foram definidos. */
export const wineProfiles: WineProfile[] = rawProfiles as WineProfile[];

export function getWineProfileById(id: string): WineProfile | undefined {
  return wineProfiles.find((profile) => profile.id === id);
}
