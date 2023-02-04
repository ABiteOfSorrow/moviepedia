const BASE_URL = "https://learn.codeit.kr/9027/"

export async function getReviews({order = 'createdAt', offset = 0, limit = 6}) {
    const query = `order=${order}&offset=${offset}&limit=${limit}`;
    const rawResponse = await fetch(`${BASE_URL}/film-reviews?${query}`);

    if (!rawResponse.ok) {
        throw new Error('리뷰를 불러오는데 실패했습니다!');
    }

    const response = await rawResponse.json();
    return response;
}

export async function createReview(formData) {
    const rawResponse = await fetch(`${BASE_URL}film-reviews`, {
        method: 'POST',
        body: formData,
    });

    if (!rawResponse.ok) {
        throw new Error('리뷰를 작성하는데 실패했습니다!');
    }

    const response = await rawResponse.json();
    return response;
}

export async function updateReview(id, formData) {
    const rawResponse = await fetch(`${BASE_URL}film-reviews/${id}`, {
        method: 'PUT',
        body: formData,
    });
    if (!rawResponse.ok) {
        throw new Error('리뷰를 업데이트하는데 실패했습니다!');
    }

    const response = await rawResponse.json();
    return response;
}

export async function deleteReview(id) {
    const rawResponse = await fetch(`${BASE_URL}film-reviews/${id}`, {
        method: 'DELETE',
    });

    if (!rawResponse.ok) {
        throw new Error('리뷰를 삭제하는데 실패했습니다!');
    }

    const response = await rawResponse.json();
    return response;
}