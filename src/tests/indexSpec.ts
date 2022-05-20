import supertest, { SuperTest, Test, Response } from 'supertest';
import path from 'path';
import { promises as fs } from 'fs';
import app from './../index';
import { thumbDir } from '../setImage';

const request: SuperTest<Test> = supertest(app);

describe('test responses from endpoints', (): void => {
  describe('endpoint: /image', (): void => {
    it('returns 404 (invalid endpoint)', async (): Promise<void> => {
      const response: Response = await request.get('/image');
      expect(response.status).toBe(404);
    });
  });

  describe('endpoint: /', (): void => {
    it('gets /', async (): Promise<void> => {
      const response: Response = await request.get('/');
      expect(response.status).toBe(200);
    });
  });

  describe('endpoint: /api/image', (): void => {
    it('returns 404 (image not found)', async (): Promise<void> => {
      const response: Response = await request.get('/api/image?name=hamada');
      expect(response.status).toBe(404);
    });

    it('gets original image with name=fjord', async (): Promise<void> => {
      const response: Response = await request.get('/api/image?name=fjord');
      expect(response.status).toBe(200);
    });

    it('gets thumbnail with name=fjord&width=400&height=400', async (): Promise<void> => {
      const response: Response = await request.get(
        '/api/image?name=fjord&width=400&height=400'
      );
      expect(response.status).toBe(200);
    });

    it('gets /api/image (no arguments)', async (): Promise<void> => {
      const response: Response = await request.get('/api/image');
      expect(response.status).toBe(200);
    });
  });
});

afterAll(async (): Promise<void> => {
  const cached: string = path.resolve(thumbDir, 'fjord-400400.jpg');
  try {
    await fs.unlink(cached);
  } catch (err) {
    console.error(err);
  }
});
