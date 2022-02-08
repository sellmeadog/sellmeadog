declare const __PATH_PREFIX__: string;

declare module '*.scss' {
  const content: { [className: string]: string };
  export = content;
}

declare module '*.svg' {
  const content: unknown;
  export default content;
}
