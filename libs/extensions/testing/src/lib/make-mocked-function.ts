export function makeMockedFunction<T extends (...args: any[]) => any>(
  fn: T
): jest.MockedFunction<T> {
  return fn as jest.MockedFunction<T>;
}
