export const fetcher = async (url: string, data: object) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response;
};

export const getFetcher = async (url: string) => {
  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();
  if (response.status === 400 || !result) {
    console.log("error");
  }
  return result;
};
