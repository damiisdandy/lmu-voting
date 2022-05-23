import { buildUrl, extractPublicId, setConfig } from "cloudinary-build-url";
import config from "../config";

setConfig({
  cloudName: config.cloudinaryCloudName,
});

export const cloudinaryBuildUrl = (type: ImageTypes, url: string) => {
  if (url?.startsWith("https://res.cloudinary.com/")) {
    const publicId = extractPublicId(url);
    switch (type) {
      case "BACKDROP":
        return buildUrl(publicId, {
          transformations: {
            gravity: "face",
            resize: {
              height: 500,
              type: "fill",
            },
            effect: "blur:500",
            format: "webp",
            quality: 30,
          },
        });
      case "TINY":
        return buildUrl(publicId, {
          transformations: {
            gravity: "face",
            resize: {
              width: 200,
              height: 200,
              type: "thumb",
            },
            format: "webp",
            quality: 50,
          },
        });
      case "SMALL":
        return buildUrl(publicId, {
          transformations: {
            gravity: "face",
            resize: {
              width: 150,
              height: 150,
              type: "fill",
            },
            format: "webp",
            quality: 60,
          },
        });
      case "MEDIUM":
        return buildUrl(publicId, {
          transformations: {
            gravity: "face",
            resize: {
              width: 500,
              height: 500,
              type: "fill",
            },
            format: "webp",
            quality: 80,
          },
        });
      case "LARGE":
        return buildUrl(publicId, {
          transformations: {
            gravity: "face",
            resize: {
              width: 700,
              height: 700,
              type: "fill",
            },
            format: "webp",
            quality: 80,
          },
        });
      case "PLACEHOLDER":
        return buildUrl(publicId, {
          transformations: {
            gravity: "face",
            resize: {
              width: 200,
              height: 200,
              type: "fill",
            },
            format: "webp",
            effect: "blur:1000",
            quality: 1,
          },
        });
      case "HUGE":
        return buildUrl(publicId, {
          transformations: {
            gravity: "face",
            resize: {
              height: 2000,
              type: "fill",
            },
            format: "webp",
            quality: 100,
          },
        });
      case "OPTIMIZED_WIDTH":
        return buildUrl(publicId, {
          transformations: {
            gravity: "face",
            resize: {
              width: 800,
              type: "fill",
            },
            format: "webp",
            quality: 80,
          },
        });
      default:
        return url;
    }
  } else {
    return url;
  }
};
