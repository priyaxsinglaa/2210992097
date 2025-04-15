const { default: axios } = require('axios');
const fetch = require('node-fetch');

const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ0NzAxNzA4LCJpYXQiOjE3NDQ3MDE0MDgsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjNkNGRmZTRhLTllODktNGQwNS1iZWRmLWYwN2Q5MTFjYTA3OSIsInN1YiI6InByYXR5dXNoMjA4Mi5iZTIyQGNoaXRrYXJhLmVkdS5pbiJ9LCJlbWFpbCI6InByYXR5dXNoMjA4Mi5iZTIyQGNoaXRrYXJhLmVkdS5pbiIsIm5hbWUiOiJwcmF0eXVzaCBrdW1hciIsInJvbGxObyI6IjIyMTA5OTIwODIiLCJhY2Nlc3NDb2RlIjoiUHd6dWZHIiwiY2xpZW50SUQiOiIzZDRkZmU0YS05ZTg5LTRkMDUtYmVkZi1mMDdkOTExY2EwNzkiLCJjbGllbnRTZWNyZXQiOiJLeHdkZ1hhUGR4ZmdxbVlCIn0.fuMHeRn9tPkJ_3rE8HjZ3_zIc_K8NUllHuXYZ3RomY8';

module.exports = async function fetchWithTimeout(url, options = {}, timeout = 500) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${AUTH_TOKEN}`
      },
      signal: controller.signal
    });

    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    return response;
  } catch (error) {
    console.log('❌ Error fetching:', url, error.message);
    return null;
  } finally {
    clearTimeout(id);
  }
};