using Corretaje.Domain;
using System;
using System.Threading.Tasks;

namespace Corretaje.Service.IServices.ISBIF
{
    public interface ISBIFService
    {
        Task<Uf> GetUf();

        Task<Uf> GetLastUf();

        Task<Uf> GetUf(DateTime fecha);

        /// <summary>
        /// El servicio de uf es actualizado todos los meses.
        /// </summary>
        /// <returns>El último valor almacenado de la uf</returns>
        Task<Uf> GetUfUltimoPeriodo();

        void UpdateUf();
    }
}
