export const notifyError = (error: Error) => {
  if (error.message === "NEXT_REDIRECT") {
    return;
  }
  alert(error.message);
};
