using System.Threading.Tasks;

namespace Corretaje.Service.IServices.ILogin.IProvider.IGoogle
{
    public interface IGoogleToken
    {
        Task<bool> TokenUsuarioEsValido(string token);
    }
}
