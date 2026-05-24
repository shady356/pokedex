export const toMeter = (value: number): string => {
  return new Intl.NumberFormat("en-UK", {
    style: "unit",
    unit: "meter",
    unitDisplay: "short",
    minimumSignificantDigits: 2,
    maximumSignificantDigits: 2,
  }).format(value / 10);
}

export const toKilogram = (value: number): string => {
  return new Intl.NumberFormat("en-UK", {
    style: "unit",
    unit: "kilogram",
    unitDisplay: "short",
    minimumSignificantDigits: 2,
    maximumSignificantDigits: 2,
  }).format(value / 10);
}