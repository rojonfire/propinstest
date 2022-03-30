using Corretaje.Domain;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Service.IServices.IValoracionUsuario
{
    public interface IValoracionUsuarioService
    {
        Task<IEnumerable<ValoracionUsuario>> GetCasosDeExito();

        Task<ValoracionUsuario> AddValoracionUsuario(ValoracionUsuario valoracionUsuario);
    }
}
