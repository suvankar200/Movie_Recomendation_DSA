const API_URL = 'http://localhost:3000/api';

export async function getComments(movieId) {
  try {
    const response = await fetch(`${API_URL}/comments/${movieId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
}

export async function addComment(movieId, comment) {
  try {
    const response = await fetch(`${API_URL}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ movieId, comment })
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return true;
  } catch (error) {
    console.error('Error posting comment:', error);
    return false;
  }
}