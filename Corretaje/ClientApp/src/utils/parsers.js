import { UPLOAD_IMAGE_MIME_TYPES } from "./constants";

export const fileToBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

export const fileValidator = file => {
  let { type, size } = file;
  size = size / 1024;
  if (!UPLOAD_IMAGE_MIME_TYPES.includes(type)) {
    return "Tipo de archivo no valido!";
  } else if (size > 5000) {
    return "El archivo excede el máximo establecido!";
  }
  return null;
};
