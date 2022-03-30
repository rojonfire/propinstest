using System.Threading.Tasks;

namespace Corretaje.Service.IServices.ILogin.IProvider.IFacebook
{
    public interface IFacebookToken
    {
        Task<bool> TokenUsuarioEsValido(string token);
    }
}
