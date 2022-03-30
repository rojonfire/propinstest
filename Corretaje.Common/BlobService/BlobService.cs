using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System.IO;
using System.Threading.Tasks;

namespace Corretaje.Common.BlobService
{
    public class BlobService : IBlobService
    {
        public async Task<string> UploadToBlob(string filename, string cnnStorageString, string containerName, byte[] imageBuffer = null, Stream stream = null)
        {
            var storageConnectionString = cnnStorageString;
            if (!CloudStorageAccount.TryParse(storageConnectionString, out var storageAccount)) return "";
            try
            {
                var cloudBlobClient = storageAccount.CreateCloudBlobClient();
                var cloudBlobContainer = cloudBlobClient.GetContainerReference(containerName);
                if (!await cloudBlobContainer.ExistsAsync())
                {
                    await cloudBlobContainer.CreateAsync();
                }

                var permissions = new BlobContainerPermissions
                {
                    PublicAccess = BlobContainerPublicAccessType.Blob
                };
                await cloudBlobContainer.SetPermissionsAsync(permissions);
                var cloudBlockBlob = cloudBlobContainer.GetBlockBlobReference(filename);

                if (imageBuffer != null)
                {
                    await cloudBlockBlob.UploadFromByteArrayAsync(imageBuffer, 0, imageBuffer.Length);
                }
                else if (stream != null)
                {
                    await cloudBlockBlob.UploadFromStreamAsync(stream);
                }
                else
                {
                    return "";
                }

                return cloudBlockBlob.SnapshotQualifiedStorageUri.PrimaryUri.OriginalString;
            }
            catch (StorageException)
            {
                return "";
            }
        }
    }
}