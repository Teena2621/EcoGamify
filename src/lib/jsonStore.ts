 // src/lib/jsonStore.ts (server)
import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const ensureDataDir = async () => {
  try { await fs.mkdir(DATA_DIR, { recursive: true }); } catch {}
};

export async function readJSON<T = any>(filename: string): Promise<T | null> {
  await ensureDataDir();
  const p = path.join(DATA_DIR, filename);
  try {
    const raw = await fs.readFile(p, "utf8");
    return JSON.parse(raw) as T;
  } catch (e) {
    return null;
  }
}

export async function writeJSON(filename: string, data: any) {
  await ensureDataDir();
  const p = path.join(DATA_DIR, filename);
  await fs.writeFile(p, JSON.stringify(data, null, 2), "utf8");
}
