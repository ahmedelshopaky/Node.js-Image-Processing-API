import express from 'express';
import setImage from '../../setImage';
import { getImage, getThumb } from '../../getImage';

const image = express.Router();

const validate = (width: number, height: number): boolean => {
  if (Number.isNaN(width) || Number.isNaN(height) || width < 1 || height < 1) {
    return false;
  }
  return true;
};

const handleApiRequest = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  // validate image name
  if (req.query.name) {
    // if height or width sent in url
    if (req.query.height || req.query.width) {
      // validate dimensions
      const validated = validate(
        parseInt(req.query.width as string),
        parseInt(req.query.height as string)
      );

      if (validated) {
        let thumb = await getThumb(req.query);
        if (thumb) {
          // if thumb available, return it
          res.sendFile(thumb);
        } else {
          // otherwise, create new one
          thumb = await setImage(req.query);
          if (thumb) {
            // if thumb created successfully, return it
            res.sendFile(thumb);
          } else {
            // otherwise, return error msg
            res.status(200).json({
              response:
                'The original image or the thumbnail directory may not be found!',
            });
          }
        }
      } else {
        res.status(200).json({ response: 'Invalid width or height!' });
      }
    } else {
      // if only the name is sent in the url
      const image = await getImage(req.query.name as string);
      if (image) {
        // if image available, return it
        res.sendFile(image);
      } else {
        // otherwise, return error msg
        res.status(404).json({ response: 'Image not found!' });
      }
    }
  } else {
    res.status(200).json({ response: 'Invalid image name!' });
  }
};

image.get('/', handleApiRequest);

export default image;
