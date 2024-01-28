export function enumKeys(myEnum: any): string[] {
  return Object.values(myEnum).filter((o) => typeof o == "string") as string[];
}
