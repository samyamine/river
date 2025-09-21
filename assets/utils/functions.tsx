
async function postAPI({endpoint, body}: {endpoint: string, body?: Record<string, any>}) {
    const response = await fetch(`http://51.83.79.164:8000/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined,
    });

    return await response.json();
}

export {
    postAPI,
};