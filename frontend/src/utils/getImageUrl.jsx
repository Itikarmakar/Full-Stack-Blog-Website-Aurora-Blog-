export const getImageUrl = (image) => {
    if (!image) return "";
  
    // If Cloudinary already gives a full link, return it
    if (image.startsWith("http")) return image;
  
    // If somehow there is an old /uploads path, handle safely
    return image;
  };
  