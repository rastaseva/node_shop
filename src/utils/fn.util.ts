export const roundedRandom = (a: number, b: number): number =>
  Math.round(a - 0.5 + Math.random() * (b - a + 1));

export const generateToken = (length: number): string => {
  let token = '';
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  while (token.length < length) {
    token += chars[roundedRandom(0, chars.length - 1)];
  }
  return token;
};

export const getFieldDescriptionString = (fieldName: string, message: string) =>
  `${fieldName}: ${message}`;
