import supertest, { SuperTest, Test, Response } from 'supertest';
import app from './../index';

const request: SuperTest<Test> = supertest(app);

describe('test responses from endpoints', (): void => {
  describe('endpoint: /', (): void => {
    it('gets /', async (): Promise<void> => {
      const response: Response = await request.get('/');
      expect(response.status).toBe(200);
    });
  });

  describe('endpoint: /image', (): void => {
    it('returns 404 (invalid endpoint)', async (): Promise<void> => {
      const response: Response = await request.get('/image');
      expect(response.status).toBe(404);
    });
  });

  describe('endpoint: /api/image', (): void => {
    it('gets original image with filename=fjord', async (): Promise<void> => {
      const response: Response = await request.get('/api/image?name=fjord');
      expect(response.status).toBe(200);
    });

    it('gets thumbnail with name=fjord&width=400&height=400', async (): Promise<void> => {
      const response: Response = await request.get(
        '/api/image?filename=fjord&width=400&height=400'
      );
      expect(response.status).toBe(200);
    });

    it('gets /api/image (no arguments)', async (): Promise<void> => {
      const response: Response = await request.get('/api/image');
      expect(response.status).toBe(200);
    });
  });
});
