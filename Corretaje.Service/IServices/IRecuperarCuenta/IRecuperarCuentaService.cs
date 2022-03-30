using Corretaje.Domain;
using MongoDB.Bson;
using System.Threading.Tasks;

namespace Corretaje.Service.IServices.IRecuperarCuenta
{
    public interface IRecuperarCuentaService
    {
        Task<RecuperarCuenta> Actualizar(RecuperarCuenta recuperarCuenta);

        Task<RecuperarCuenta> Add(RecuperarCuenta recuperarCuenta);

        Task<RecuperarCuenta> Expirar(ObjectId id);

        Task<RecuperarCuenta> Expirar(RecuperarCuenta recuperarCuenta);

        Task<RecuperarCuenta> GetByGuid(string guid);

        Task<ResultadoDelProceso> Validar(RecuperarCuenta recuperarCuenta);

        void Delete(ObjectId id);

        void SendMail(RecuperarCuenta recuperarCuenta, string mailHtml);
    }
}
