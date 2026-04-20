import { POST } from '@/app/api/properties/ai-content/route';
import connectDB from '@/config/database';
import { getSessionUser } from '@/utils/getSessionUser';

jest.mock('@/config/database', () => jest.fn());
jest.mock('@/utils/getSessionUser', () => ({
  getSessionUser: jest.fn(),
}));

describe('POST /api/properties/ai-content', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.OPENAI_API_KEY = 'test-key';
    global.fetch = jest.fn();
  });

  it('returns 401 when user is unauthenticated', async () => {
    getSessionUser.mockResolvedValue(null);

    const request = new Request('http://localhost/api/properties/ai-content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });

    const response = await POST(request);
    const payload = await response.json();

    expect(connectDB).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(401);
    expect(payload.error.code).toBe('UNAUTHORIZED');
  });

  it('returns 400 for invalid request payload', async () => {
    getSessionUser.mockResolvedValue({
      user: { id: 'user-1' },
      userId: 'user-1',
    });

    const request = new Request('http://localhost/api/properties/ai-content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        propertyType: '',
        location: 'Austin, TX',
        beds: 2,
        baths: 1,
        amenities: [],
      }),
    });

    const response = await POST(request);
    const payload = await response.json();

    expect(response.status).toBe(400);
    expect(payload.error.code).toBe('INVALID_REQUEST');
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('returns generated content when AI response is valid', async () => {
    getSessionUser.mockResolvedValue({
      user: { id: 'user-1' },
      userId: 'user-1',
    });

    global.fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({
        choices: [
          {
            message: {
              content: JSON.stringify({
                title: 'Modern Downtown Loft',
                shortDescription:
                  'Bright two-bedroom loft with city views and updated finishes.',
              }),
            },
          },
        ],
      }),
    });

    const request = new Request('http://localhost/api/properties/ai-content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        propertyType: 'Apartment',
        location: 'Austin, TX',
        beds: 2,
        baths: 2,
        amenities: ['Pool', 'Gym'],
        rawNotes: 'Close to public transit',
      }),
    });

    const response = await POST(request);
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.success).toBe(true);
    expect(payload.data).toEqual({
      title: 'Modern Downtown Loft',
      shortDescription:
        'Bright two-bedroom loft with city views and updated finishes.',
    });
  });
});
