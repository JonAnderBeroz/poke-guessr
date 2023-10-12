export default function padEnd<Type>(array: Type[], minLength: number, fillValue: Type) {
  return Object.assign(new Array(minLength).fill(fillValue), array);
}
