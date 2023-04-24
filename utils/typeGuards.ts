export function isUser(arg: unknown): arg is User {
  return (arg as User).gender !== undefined;
}
