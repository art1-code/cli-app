import fs from "fs";

export function reader(path) {
  const content = fs.readFileSync(path, 'utf-8');
  return JSON.parse(content);
};
