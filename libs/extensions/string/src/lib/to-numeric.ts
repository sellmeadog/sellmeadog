import { Double, Long } from 'mongodb';

export const to_double = (value?: number | string | null) => {
  if (value !== null || value !== undefined) {
    const numeric = Number(
      typeof value === 'string' ? value.replace(/\D/gi, '') : value
    );

    return new Double(isNaN(numeric) ? 0 : numeric) as unknown as number;
  }

  return null;
};

export const to_long = (value?: number | string | null) => {
  if (value === null || value === undefined) {
    return null;
  }

  const numeric = Number(
    typeof value === 'string' ? value.replace(/\D/gi, '') : value
  );
  return new Long(isNaN(numeric) ? 0 : numeric) as unknown as number;
};
