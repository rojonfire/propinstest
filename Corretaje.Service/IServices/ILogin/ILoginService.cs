using System.Threading.Tasks;

namespace Corretaje.Service.IServices.ILogin
{
    public interface ILoginService
    {
        Task<bool> FacebookTokenUsuarioEsValido(string token);
        Task<bool> GoogleTokenUsuarioEsValido(string token);
    }
}
