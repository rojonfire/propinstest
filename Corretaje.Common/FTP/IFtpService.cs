namespace Corretaje.Common.FTP
{
    public interface IFtpService
    {
        /// <summary>
        /// Este método permite conectarse con un FTP para realizar alguna acción del tipo WebRequestMethods.Ftp.*.
        /// </summary>
        /// <param name="uri">Uri del FTP a conectarse</param>
        /// <param name="username">Username de la cuenta FTP</param>
        /// <param name="password">Password de la cuenta</param>
        /// <param name="requestBody">Arreglo de Bytes corresponde al archivo</param>
        /// <param name="usePassive">Usa método de transferencia pasiva</param> 
        byte[] UploadFile(string uri, string username, string password, byte[] requestBody = null,
            bool usePassive = false);

        /// <summary>
        /// Este método permite conectarse con un FTP para descargar algun archivo.
        /// </summary>
        /// <param name="fileName">Nombre del archivo a descargar con extensión</param>
        /// <param name="uri">Uri del FTP a conectarse</param>
        /// <param name="username">Username de la cuenta FTP</param>
        /// <param name="password">Password de la cuenta</param>
        
        /// <param name="usePassive">Usa método de transferencia pasiva</param> 
        byte[] DownloadFile(string fileName, string uri, string username, string password, bool usePassive = true);
    }
}