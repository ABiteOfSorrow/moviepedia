export default async function getReviews({order = 'createdAt', offset = 0, limit = 6}) {
    const query = `order=${order}&offset=${offset}&limit=${limit}`;
    const rawResponse = await fetch(`https://learn.codeit.kr/9026/film-reviews?${query}`);

    if (!rawResponse.ok) {
        throw new Error('리뷰를 불러오는데 실패했습니다!');
    }

    const response = await rawResponse.json();
    return response;
}