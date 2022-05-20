import path from 'path';
import Metadata from './utilities/Metadata';
import ImageEditor from './utilities/ImageEditor';

export const fullDir = path.resolve(__dirname, './../images/full');
export const thumbDir = path.resolve(__dirname, './../images/thumbnail');

const setImage = async (query: Metadata): Promise<string | null> => {
  if (!query.name || !query.width || !query.height) {
    return null;
  }

  const width = parseInt(query.width);
  const height = parseInt(query.height);

  const source = path.resolve(fullDir, `${query.name}.jpg`);
  const target = path.resolve(thumbDir, `${query.name}-${width}${height}.jpg`);

  const imageInstance = new ImageEditor(source, target, width, height);

  const saved = await imageInstance.resizeImage();
  if (saved) {
    return target;
  }
  return null;
};

export default setImage;
