export const getLoggedInHeaders = (token: string) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    };
    return headers;
};