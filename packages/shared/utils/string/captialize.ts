export function capitalize(str: undefined): undefined;
export function capitalize(str: string): string;
export function capitalize(str?: string): string | undefined;
export function capitalize(str?: string): string | undefined {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}
