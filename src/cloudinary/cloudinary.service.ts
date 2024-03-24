import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const streamifier = require('streamifier');

@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
    maxSize: number = 2 * 1024 * 1024,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    if (file.size > maxSize) {
      throw new Error('File size exceeds the maximum allowable size');
    }

    return new Promise((resolve, reject) => {
      v2.uploader
        .upload_stream(
          {
            resource_type: 'image',
          },
          (error, result) => {
            if (error) return reject(error);
            if (result) {
              resolve(result);
            } else {
              reject(new Error('No result returned'));
            }
          },
        )
        .end(file.buffer);
    });
  }

  async uploadImages(
    files: Express.Multer.File[],
    maxSize: number = 2 * 1024 * 1024,
  ): Promise<UploadApiResponse[] | UploadApiErrorResponse[]> {
    const promises = files.map((file) => this.uploadImage(file, maxSize));

    return Promise.all(promises) as Promise<UploadApiResponse[]>;
  }

  async uplaodPdf(
    file: Express.Multer.File,
    maxSize: number = 5 * 1024 * 1024,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    if (file.size > maxSize) {
      throw new Error('File size exceeds the maximum allowable size');
    }

    return new Promise((resolve, reject) => {
      v2.uploader
        .upload_stream((error, result) => {
          if (error) return reject(error);
          if (result) {
            resolve(result);
          } else {
            reject(new Error('No result returned'));
          }
        })
        .end(file.buffer);
    });
  }

  async uploadPdfs(
    files: Express.Multer.File[],
    maxSize: number = 5 * 1024 * 1024,
  ): Promise<UploadApiResponse[] | UploadApiErrorResponse[]> {
    const promises = files.map((file) => this.uplaodPdf(file, maxSize));

    return Promise.all(promises) as Promise<UploadApiResponse[]>;
  }
}
