import { promises as fs } from 'fs';

const getImage = async (imgPath: string): Promise<string | null> => {
  try {
    await fs.access(imgPath);
    return imgPath;
  } catch {
    return null;
  }
};

export default getImage;
