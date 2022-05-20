import { promises as fs } from 'fs';
import path from 'path';
import { thumbDir, fullDir } from './setImage';
import Metadata from './utilities/Metadata';

const fetchImage = async (path: string): Promise<string | null> => {
  try {
    await fs.access(path);
    return path;
  } catch {
    return null;
  }
};

export const getImage = async (name: string): Promise<string | null> => {
  const imagePath = path.resolve(fullDir, `${name}.jpg`);
  return await fetchImage(imagePath);
};

export const getThumb = async (query: Metadata): Promise<string | null> => {
  const thumbPath = path.resolve(
    thumbDir,
    `${query.name}-${query.width}${query.height}.jpg`
  );
  return await fetchImage(thumbPath);
};
