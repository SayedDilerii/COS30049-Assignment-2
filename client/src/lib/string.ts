export const maxCharacters = (input: string, length: number) => {
  let newString = input;
  if (input.length > length) {
    newString = input.substring(0, length) + "...";
  }
  return newString;
};
