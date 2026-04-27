import { test, expect } from '@playwright/test';

test.describe('API Testing Basics', () => {
  const baseUrl = 'https://jsonplaceholder.typicode.com';

  test('GET Request - Verify list of posts', async ({ request }) => {
    // 1. Send the GET request
    const response = await request.get(`${baseUrl}/posts/1`);

    // 2. Verify Status Code (200 is Success)
    expect(response.status()).toBe(200);

    // 3. Verify Response Body
    const body = await response.json();
    expect(body.id).toBe(1);
    expect(body.title).not.toBeNull();
    
    console.log(body);
  });

  test('POST Request - Create a new post', async ({ request }) => {
    // 1. Send POST with data
    const response = await request.post(`${baseUrl}/posts`, {
      data: {
        title: 'Learning Playwright API',
        body: 'This is an SDET framework',
        userId: 1,
      }
    });

    // 2. Verify Creation Status (201 is Created)
    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body.title).toBe('Learning Playwright API');
    expect(body.id).toBeDefined(); // The API generates a new ID
  });
});