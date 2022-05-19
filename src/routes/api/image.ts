import express from 'express';
import path from 'path';
import Metadata from '../../utilities/Metadata';
import getImage from '../../getImage';
import setImage, { thumbDir, fullDir } from '../../setImage';

const image = express.Router();

// check if thumb already exists
const isThumbAvailable = async (query: Metadata): Promise<string | null> => {
  const thumbPath = path.resolve(
    thumbDir,
    `${query.name}-${query.width}${query.height}.jpg`
  );
  return await getImage(thumbPath);
};

// check if the image exists
const isImageAvailable = async (query: Metadata) => {
  const imagePath = path.resolve(fullDir, `${query.name}.jpg`);
  return await getImage(imagePath);
};

// validate dimensions
const validate = (width: number, height: number): boolean => {
  if (Number.isNaN(width) || Number.isNaN(height) || width < 1 || height < 1) {
    return false;
  }
  return true;
};

const handleApiRequest = async (
  req: express.Request,
  res: express.Response
) => {
  if (req.query.height && req.query.width) {
    const validated = validate(
      parseInt(req.query.width as string),
      parseInt(req.query.height as string)
    );

    if (validated) {
      let thumb: string | null = await isThumbAvailable(req.query);
      if (thumb) {
        // if thumb exists, return it
        res.sendFile(thumb);
      } else {
        // otherwise, check if the image availabe
        // then store it with new dimensions
        const image = await isImageAvailable(req.query);

        if (image) {
          thumb = await setImage(req.query);
          if (thumb) {
            res.sendFile(thumb);
          } else {
            res.send('Something broke!');
          }
        } else {
          res.send('Image not found!');
        }
      }
    } else {
      res.send('Invalid width or height!');
    }
  } else {
    const image = await isImageAvailable(req.query);
    if (image) {
      res.sendFile(image);
    } else {
      res.send('Image not found!');
    }
  }
};

image.get('/', handleApiRequest);

export default image;
