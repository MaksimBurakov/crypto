export const fakeRequest = async (success?: boolean) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve('Success');
      } else {
        reject(new Error('Error'));
      }
    }, 1000);
  });
