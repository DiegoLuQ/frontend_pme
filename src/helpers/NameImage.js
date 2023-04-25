function getFileNameWithNewExtension(file, newExtension) {
    const fileName = file.name;
    const dotIndex = fileName.lastIndexOf(".");
    const fileNameWithoutExtension = fileName.substring(0, dotIndex);
    return `${fileNameWithoutExtension}.${newExtension}`;
  }

export default getFileNameWithNewExtension