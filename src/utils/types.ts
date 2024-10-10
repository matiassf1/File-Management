export type ParsedFormData = {
    files: { [key: string]: string };
    fields: { [key: string]: string };
};

export enum ImageFileExtensions {
    JPEG = 'jpeg',
    PNG = 'png',
    GIF = 'gif',
    WEBP = 'webp',
    BMP = 'bmp',
    TIFF = 'tiff',
}

export enum VideoFileExtensions {
    MP4 = 'mp4',
    QUICKTIME = 'mov',
    WEBM = 'webm',
    AVI = 'avi',
    MKV = 'mkv',
}

export enum LogoFileExtensions {
    JPEG = 'jpeg',
    PNG = 'png',
    SVG = 'svg+xml',
    GIF = 'gif',
    WEBP = 'webp',
}

export const acceptedImageMimeTypes = Object.values(ImageFileExtensions).map(ext => `image/${ext}`);
export const acceptedVideoMimeTypes = Object.values(VideoFileExtensions).map(ext => `video/${ext}`);
export const acceptedLogoMimeTypes = Object.values(LogoFileExtensions).map(ext => `image/${ext}`);
