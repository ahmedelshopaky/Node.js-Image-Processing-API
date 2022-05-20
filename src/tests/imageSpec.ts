import path from 'path';
import { promises as fs } from 'fs';
import { thumbDir, fullDir } from '../setImage';
import ImageEditor from './../utilities/ImageEditor';

const source = path.resolve(fullDir, 'fjord.jpg');
const target = path.resolve(thumbDir, 'fjord-700700.jpg');
let imageInstance: ImageEditor = new ImageEditor(source, target, 700, 700);

describe('test image processing', (): void => {
  it('tests image resizing function', async (): Promise<void> => {
    expect(async () => {
      await imageInstance.resizeImage();
    }).not.toThrow();
  });

  it('returns true (vaild image and dimensions)', async (): Promise<void> => {
    expect(await imageInstance.resizeImage()).toBe(true);
  });

  it('returns false (invaild target path)', async (): Promise<void> => {
    const invalid = path.resolve('invalid path', 'fjord-700700.jpg');
    imageInstance = new ImageEditor(source, invalid, 700, 700);
    expect(await imageInstance.resizeImage()).toBe(false);
  });

  it('returns false (invaild source path)', async (): Promise<void> => {
    const invalid = path.resolve(fullDir, 'hamada.jpg');
    imageInstance = new ImageEditor(invalid, target, 700, 700);
    expect(await imageInstance.resizeImage()).toBe(false);
  });

  it('returns false (invaild dimensions)', async (): Promise<void> => {
    imageInstance = new ImageEditor(source, target, -1, 0);
    expect(await imageInstance.resizeImage()).toBe(false);
  });
});

afterAll(async (): Promise<void> => {
  const cached: string = path.resolve(thumbDir, 'fjord-700700.jpg');
  try {
    await fs.unlink(cached);
  } catch (err) {
    console.error(err);
  }
});
