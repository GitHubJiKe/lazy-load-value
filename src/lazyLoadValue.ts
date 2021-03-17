interface LazyLoadValueConfig<T, P> {
  /** 默认值 */
  value: T | (() => T);
  /** 可选择的值 */
  optionalValue?: P | (() => P);
  /** 返回可选择的值得条件 */
  condition: boolean | (() => boolean);
}

export default function lazyLoadValue<T, P>({
  value,
  optionalValue,
  condition,
}: LazyLoadValueConfig<T, P>): T | P {
  const defaultValue = isFunc(value) ? value() : value;

  if (optionalValue === undefined) {
    return defaultValue;
  }

  const isReal = isFunc(condition) ? condition() : condition;

  if (isReal) {
    return isFunc(optionalValue) ? optionalValue() : optionalValue;
  }

  return defaultValue;
}

function isFunc(params: any): params is () => void {
  return typeof params === "function";
}
