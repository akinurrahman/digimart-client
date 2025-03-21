export function getCloudinaryThumbnail(url: string) {
  if (!url) return null;

  if (url.includes("/video/upload/")) {
    // Video → Generate thumbnail
    return url
      .replace(
        "/video/upload/",
        "/video/upload/w_300,h_200,c_fill,f_auto,q_auto/"
      )
      .replace(/\.\w+$/, ".jpg");
  } else if (
    url.includes("/upload/") &&
    !url.match(/\.(jpg|jpeg|png|gif|webp)$/i)
  ) {
    // PDF, Word, Excel → Get first-page thumbnail
    return url
      .replace("/upload/", "/upload/w_300,h_200,c_fill,f_auto,q_auto,pg_1/")
      .replace(/\.\w+$/, ".jpg");
  }

  // If it's already an image, return as is
  return url;
}
