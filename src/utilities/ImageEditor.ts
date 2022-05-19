import sharp from 'sharp';

class ImageEditor {
  source: string;
  output: string;
  width: number;
  height: number;

  constructor(source: string, output: string, width: number, height: number) {
    this.source = source;
    this.output = output;
    this.width = width;
    this.height = height;
  }

  resizeImage = async (): Promise<boolean> => {
    try {
      await sharp(this.source)
        .resize(this.width, this.height)
        .toFormat('jpg')
        .toFile(this.output);
      return true;
    } catch (error) {
      return false;
    }
  };
}

export default ImageEditor;
