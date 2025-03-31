export const getLoggedInHeaders = (token: string) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    };
    return headers;
};

export const getLoggedInHeadersWithFile = (token: string) => {
  const headers = {
    Authorization: `${token}`,
  };
  return headers;
};