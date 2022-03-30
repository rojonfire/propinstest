using System.Security.Cryptography;
using System.Text;

namespace Corretaje.Api.Commons.SecurityHelper
{
    public class EncriptacionHelper : IEncriptacionHelper
    {
        public string GenerarMd5Hash(string texto)
        {
            using (var md5 = MD5.Create())
            {
                var result = md5.ComputeHash(Encoding.ASCII.GetBytes(texto));
                return Encoding.ASCII.GetString(result);
            }
        }
    }
}
