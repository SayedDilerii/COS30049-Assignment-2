export function fetchFromServer() {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(
        () =>
          resolve({
            timezone: "Australia/Melbourne",
            notification: ["email", "text"],
            message: "Welcome back sir!",
          }),
        3000
      );
    } catch (error) {
      reject(error);
    }
  });
}
