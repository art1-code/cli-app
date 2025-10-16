import { writeFileSync } from 'fs';

export function saver(path, list) {
  return writeFileSync(path, JSON.stringify(list, null, 2));
}
