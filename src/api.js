const BASE_URL = "https://learn.codeit.kr/9026/film-reviews?"

export async function getReviews({order = 'createdAt', offset = 0, limit = 6}) {
    const query = `order=${order}&offset=${offset}&limit=${limit}`;
    const rawResponse = await fetch(`${BASE_URL}${query}`);

    if (!rawResponse.ok) {
        throw new Error('리뷰를 불러오는데 실패했습니다!');
    }

    const response = await rawResponse.json();
    return response;
}

export async function createReviews(formData) {
    const rawResponse = await fetch(`${BASE_URL}`, {
        method: 'POST',
        body: formData,
    });

    if (!rawResponse.ok) {
        throw new Error('리뷰를 작성하는데 실패했습니다!');
    }

    const response = await rawResponse.json();
    return response;
}

