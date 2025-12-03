export function getFileName(fileName: string) {
  const filename = fileName.split("//").pop()!;
  return fileName.substring(filename.indexOf(".") + 1);
}