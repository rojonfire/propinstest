using System.Net.Http;
using System.Text;

namespace Corretaje.Api.Commons.Tasacion
{
    public class TasacionContent : StringContent
    {
        public TasacionContent(string content) : base(content, Encoding.UTF8, "application/json")
        {

        }
    }
}
