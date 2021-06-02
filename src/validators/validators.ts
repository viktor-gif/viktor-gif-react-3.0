export type validatorsType = (value: string) => string | undefined;

export const required: validatorsType = (value) => {
  return value ? undefined : "Field is required";
};

export const maxLengthCreator = (maxLength: number): validatorsType => (
  value
) => {
  return value.length <= maxLength
    ? undefined
    : `Max length is ${maxLength} symbols`;
};
export const minLengthCreator = (minLength: number): validatorsType => (
  value
) => {
  return value.length >= minLength
    ? undefined
    : `Min length is ${minLength} symbols`;
};
