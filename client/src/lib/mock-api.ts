export function fetchFromServer() {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(
        () =>
          resolve({
            timezone: "Australia/Melbourne",
            notification: [
              { value: "email", name: "Email" },
              { value: "text", name: "Text" },
            ],
            message: "Welcome back Sayed Dileri!",
          }),
        3000
      );
    } catch (error) {
      reject(error);
    }
  });
}
