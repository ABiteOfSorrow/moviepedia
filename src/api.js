export default async function getReviews({order = 'createdAt', offset = 0, limit = 6}) {
    const query = `order=${order}&offset=${offset}&limit=${limit}`;
    const rawResponse = await fetch(`https://learn.codeit.kr/api/film-reviews?${query}`);
    const response = await rawResponse.json();
    return response;
}