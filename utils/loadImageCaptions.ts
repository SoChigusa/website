import fs from 'fs';
import path from 'path';
import exifReader from 'exif-reader';
import sharp from 'sharp';

export type ImageCaptionLocale = 'en' | 'ja';

export interface LocalizedImageCaption {
  fileName: string;
  src: string;
  alt: string;
  comment: string;
}

interface ImageCaptionRecord {
  fileName: string;
  alt: Record<ImageCaptionLocale, string>;
  comment: Record<ImageCaptionLocale, string>;
}

interface ParsedExif {
  exif?: {
    DateTimeOriginal?: Date;
  };
}

const dataPath = path.join(process.cwd(), 'data', 'image-captions.json');
const imageDirectory = path.join(process.cwd(), 'public', 'image-captions');
const supportedImageExtensions = /\.(avif|gif|jpe?g|png|svg|webp)$/i;

const isNonEmptyString = (value: unknown): value is string => (
  typeof value === 'string' && value.trim().length > 0
);

const parseImageCaptionRecord = (value: unknown, index: number): ImageCaptionRecord => {
  if (typeof value !== 'object' || value === null) {
    throw new Error(`image-captions.json: item ${index + 1} must be an object.`);
  }

  const record = value as Partial<ImageCaptionRecord>;
  if (!isNonEmptyString(record.fileName)) {
    throw new Error(`image-captions.json: item ${index + 1} needs a fileName.`);
  }
  if (path.basename(record.fileName) !== record.fileName || !supportedImageExtensions.test(record.fileName)) {
    throw new Error(`image-captions.json: "${record.fileName}" must be a supported image file name without a directory.`);
  }
  if (
    typeof record.alt !== 'object'
    || record.alt === null
    || !isNonEmptyString(record.alt.en)
    || !isNonEmptyString(record.alt.ja)
  ) {
    throw new Error(`image-captions.json: "${record.fileName}" needs both English and Japanese alt text.`);
  }
  if (
    typeof record.comment !== 'object'
    || record.comment === null
    || !isNonEmptyString(record.comment.en)
    || !isNonEmptyString(record.comment.ja)
  ) {
    throw new Error(`image-captions.json: "${record.fileName}" needs both English and Japanese comments.`);
  }

  return {
    fileName: record.fileName,
    alt: {
      en: record.alt.en.trim(),
      ja: record.alt.ja.trim(),
    },
    comment: {
      en: record.comment.en.trim(),
      ja: record.comment.ja.trim(),
    },
  };
};

const readCapturedAt = async (imagePath: string): Promise<number | null> => {
  try {
    const metadata = await sharp(imagePath).metadata();
    if (!metadata.exif) return null;

    const capturedAt = (exifReader(metadata.exif) as ParsedExif).exif?.DateTimeOriginal;
    return capturedAt instanceof Date && !Number.isNaN(capturedAt.getTime())
      ? capturedAt.getTime()
      : null;
  } catch {
    return null;
  }
};

const readFileSequence = (fileName: string): number | null => {
  const match = fileName.match(/(\d+)(?=\.[^.]+$)/);
  return match ? Number.parseInt(match[1], 10) : null;
};

export default async function loadImageCaptions(locale: ImageCaptionLocale): Promise<LocalizedImageCaption[]> {
  const rawData: unknown = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  if (!Array.isArray(rawData)) {
    throw new Error('image-captions.json: the top-level value must be an array.');
  }

  const seenFileNames = new Set<string>();
  const records = await Promise.all(rawData.map(async (value, index) => {
    const record = parseImageCaptionRecord(value, index);
    if (seenFileNames.has(record.fileName)) {
      throw new Error(`image-captions.json: duplicate fileName "${record.fileName}".`);
    }
    seenFileNames.add(record.fileName);

    const imagePath = path.join(imageDirectory, record.fileName);
    if (!fs.existsSync(imagePath) || !fs.statSync(imagePath).isFile()) {
      throw new Error(`image-captions.json: image "public/image-captions/${record.fileName}" does not exist.`);
    }

    return {
      record,
      originalIndex: index,
      capturedAt: await readCapturedAt(imagePath),
      fileSequence: readFileSequence(record.fileName),
    };
  }));

  const allImagesHaveCapturedAt = records.every(({ capturedAt }) => capturedAt !== null);

  return records
    .sort((left, right) => (
      (allImagesHaveCapturedAt
        ? (right.capturedAt as number) - (left.capturedAt as number)
        : (right.fileSequence ?? Number.NEGATIVE_INFINITY) - (left.fileSequence ?? Number.NEGATIVE_INFINITY))
      || left.originalIndex - right.originalIndex
    ))
    .map(({ record }) => ({
      fileName: record.fileName,
      src: `/image-captions/${encodeURIComponent(record.fileName)}`,
      alt: record.alt[locale],
      comment: record.comment[locale],
    }));
}
