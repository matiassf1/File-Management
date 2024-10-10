import { acceptedImageMimeTypes, acceptedLogoMimeTypes, acceptedVideoMimeTypes } from "./types";

export const getFileExtensionFromMimeType = (mimeType: string): string => {
    if (acceptedImageMimeTypes.includes(mimeType)) {
      return mimeType.split('/')[1];  // e.g., 'jpeg', 'png'
    }
    if (acceptedVideoMimeTypes.includes(mimeType)) {
      return mimeType.split('/')[1];  // e.g., 'mp4', 'mov'
    }
    if (acceptedLogoMimeTypes.includes(mimeType)) {
      return mimeType.split('/')[1];  // e.g., 'jpeg', 'svg+xml'
    }
    throw new Error(`Unsupported file type: ${mimeType}`);
  };
  