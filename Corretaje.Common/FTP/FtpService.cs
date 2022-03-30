using System;
using System.IO;
using System.Net;

namespace Corretaje.Common.FTP
{
    public class FtpService : IFtpService
    {      
        public byte[] UploadFile(string uri, string username, string password, byte[] requestBody = null, bool usePassive = false)
        {
            try
            {
                var request = (FtpWebRequest)WebRequest.Create(uri);
                request.Credentials = new NetworkCredential(username, password);
                request.Method = WebRequestMethods.Ftp.UploadFile;
                request.UsePassive = usePassive;

                if (requestBody != null)
                {
                    using (var requestMemStream = new MemoryStream(requestBody))
                    using (var requestStream = request.GetRequestStream())
                    {
                        requestMemStream.CopyTo(requestStream);
                    }
                }

                using (var response = (FtpWebResponse)request.GetResponse())
                using (var responseBody = new MemoryStream())
                {
                    response.GetResponseStream()?.CopyTo(responseBody);
                    return responseBody.ToArray();
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        public byte[] DownloadFile(string fileName, string uri, string username, string password, bool usePassive = true)
        {
            try
            {
                var request = (FtpWebRequest)WebRequest.Create(uri);
                request.Credentials = new NetworkCredential(username, password);
                request.Method = WebRequestMethods.Ftp.DownloadFile;
                request.UsePassive = usePassive;

                using (var response = (FtpWebResponse)request.GetResponse())
                using (var responseBody = new MemoryStream())
                {
                    response.GetResponseStream()?.CopyTo(responseBody);
                    return responseBody.ToArray();
                }
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}