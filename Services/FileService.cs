using System;
using System.IO;
using Amazon;
using Amazon.S3;
using Amazon.S3.Transfer;
using Amazon.S3.Model;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

using coursesmanagement.Dtos.Files;
using coursesmanagement.Models;

namespace coursesmanagement.Services
{
    public interface IFileService
    {
        Task<FileDto.FileResult> UploadFile(string prefix, IFormFile file);
        Task<FileDto.DownloadObject> DownloadFile(string key);
        Task<bool> RemoveFile(string key);
    }

    public class FileService : IFileService
    {
        private const string BucketName = "usth-courses-management";
        private static readonly RegionEndpoint bucketRegion = RegionEndpoint.APNortheast2;

        /// <summary>Upload file to AWS S3</summary>
        public async Task<FileDto.FileResult> UploadFile(string prefix, IFormFile file)
        {
            using AmazonS3Client client = new AmazonS3Client("AKIA2FIGF6H7CEEYEZ7D", "ZtYTinuPGNo/KYkzT/fvD17Dn9B8QTtNwAxclhdG", bucketRegion);

            await using MemoryStream newMemoryStream = new MemoryStream();
            await file.CopyToAsync(newMemoryStream);

            String customKey = $"{prefix}/{file.FileName}";

            if (prefix == default)
            {
                customKey = file.FileName;
            }

            TransferUtilityUploadRequest uploadRequest = new TransferUtilityUploadRequest
            {
                InputStream = newMemoryStream,
                Key = customKey,
                BucketName = BucketName
            };

            TransferUtility fileTransferUtility = new TransferUtility(client);
            await fileTransferUtility.UploadAsync(uploadRequest);

            String type = FileHelpers.GetContentType(file.FileName);

            return new FileDto.FileResult()
            {
                Name = file.FileName,
                Key = customKey,
                Type = type
            };
        }

        /// <summary>Download file to local</summary>
        public async Task<FileDto.DownloadObject> DownloadFile(string key)
        {
            GetObjectRequest request = new GetObjectRequest
            {
                BucketName = BucketName,
                Key = key
            };

            using AmazonS3Client client = new AmazonS3Client("AKIA2FIGF6H7CEEYEZ7D", "ZtYTinuPGNo/KYkzT/fvD17Dn9B8QTtNwAxclhdG", bucketRegion);

            using GetObjectResponse response = await client.GetObjectAsync(request);

            MemoryStream memory = new MemoryStream();

            await using (Stream stream = response.ResponseStream)
            {
                await stream.CopyToAsync(memory);
            }

            memory.Position = 0;

            return new FileDto.DownloadObject
            {
                Memory = memory,
                ContentType = FileHelpers.GetContentType(key),
                Name = Path.GetFileName(key)
            };
        }

        public async Task<bool> RemoveFile(string key)
        {
            using AmazonS3Client client = new AmazonS3Client("AKIA2FIGF6H7CEEYEZ7D", "ZtYTinuPGNo/KYkzT/fvD17Dn9B8QTtNwAxclhdG", bucketRegion);

            await client.DeleteObjectAsync(BucketName, key);
            return true;
        }
    }
}