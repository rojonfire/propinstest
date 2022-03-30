using Corretaje.Domain;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Service.IServices.IServicio
{
    public interface ICalculoPrecioServicioAdicional
    {
        Task<decimal> CalcularPrecioTotalServiciosAdicionales(IEnumerable<ServicioAdicional> serviciosAdicionales);

        Task<decimal> CalcularPrecioTotalServiciosAdicionalesConIVA(IEnumerable<ServicioAdicional> serviciosAdicionales);

        Task<decimal> CalcularTotalEnUf(IEnumerable<ServicioAdicional> serviciosAdicionales);
    }
}
