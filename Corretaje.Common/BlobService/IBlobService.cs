using System.IO;
using System.Threading.Tasks;

namespace Corretaje.Common.BlobService
{
    public interface IBlobService
    {
        /// <summary>
        /// Este médoto permite conectarse con una cuenta de AzureBlobStorage para dejar un archivo Blob.
        /// </summary>
        /// <param name="filename">Nombre del archivo</param>
        /// <param name="cnnStorageString">Cadena de conexión al Azure Blob Storage</param>
        /// <param name="containerName">Nombre del contenedor para el archivo</param>
        /// <param name="imageBuffer">Archivo como arreglo de byte</param>
        /// <param name="stream">Archivo como stream de datos</param>
        /// <returns></returns>
        Task<string> UploadToBlob(string filename, string cnnStorageString, string containerName, byte[] imageBuffer = null, Stream stream = null);
    }
}