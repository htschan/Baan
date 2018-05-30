export class FileUpload {

  $key: string;
  name: string;
  url: string;
  file: File;
  progress: number;
  createAt: Date = new Date();

  constructor(file: File) {
    this.file = file;
  }
}