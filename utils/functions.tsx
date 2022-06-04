export const toTitleCase = (text: string): string =>
  text.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
  });

export const monthParser = (month: number): string => {
  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];
  return months[month - 1];
};

export function staticImplements<T>() {
  return <U extends T>(constructor: U) => {
    constructor;
  };
}
