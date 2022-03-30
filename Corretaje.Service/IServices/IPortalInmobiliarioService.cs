using System.Threading.Tasks;

namespace Corretaje.Service.IServices
{
    public interface IPortalInmobiliarioService
    {
        Task<string> GetComuna(string comuna);
    }
}
