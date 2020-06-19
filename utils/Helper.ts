export default class Helper {
  static validateProps<T extends K, K>(props: T, sample: Array<keyof K>) {
    const errors: Array<keyof K> = [];
    sample.forEach((key) => {
      if (key === 'id') return;
      if (!props[key]) errors.push(key);
    });
    return errors;
  }
}
