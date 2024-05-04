import { useEffect, useRef } from 'react';

export function useFormValuesChanged<T extends Record<string, any>>(
  values: T,
  onChange: (values: T) => void
) {
  const prevValues = useRef(values);

  useEffect(() => {
    if (prevValues.current !== values) {
      onChange(values);
      prevValues.current = values;
    }
  }, [values, onChange]);
}
