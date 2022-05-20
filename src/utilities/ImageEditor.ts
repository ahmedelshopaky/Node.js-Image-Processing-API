import sharp from 'sharp';
import { promises as fs } from 'fs';
import { thumbDir } from './../setImage';

class ImageEditor {
  source: string;
  target: string;
  width: number;
  height: number;

  constructor(source: string, target: string, width: number, height: number) {
    this.source = source;
    this.target = target;
    this.width = width;
    this.height = height;
  }

  createThumbDir = async (): Promise<void> => {
    try {
      await fs.access(thumbDir);
    } catch {
      fs.mkdir(thumbDir);
    }
  };

  resizeImage = async (): Promise<boolean> => {
    try {
      await this.createThumbDir();
      await sharp(this.source)
        .resize(this.width, this.height)
        .toFormat('jpg')
        .toFile(this.target);
      return true;
    } catch {
      return false;
    }
  };
}

export default ImageEditor;
