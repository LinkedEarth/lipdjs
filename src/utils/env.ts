/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore - window may not exist in Node types
declare const window: any;

export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

export function isNode(): boolean {
  return typeof process !== 'undefined' && process.versions != null && process.versions.node != null;
} 