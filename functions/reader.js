import { readFileSync } from "fs";

export function reader(path) {
  const content = readFileSync(path, 'utf-8');
  return JSON.parse(content);
};
