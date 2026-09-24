declare module 'sharp' {
  interface SharpMetadata {
    exif?: Buffer;
  }

  interface SharpInstance {
    metadata(): Promise<SharpMetadata>;
  }

  const sharp: (input: string) => SharpInstance;
  export default sharp;
}
