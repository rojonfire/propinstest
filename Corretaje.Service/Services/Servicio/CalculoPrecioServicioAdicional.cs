using Corretaje.Common;
using Corretaje.Domain;
using Corretaje.Service.IServices.IConversionMoneda;
using Corretaje.Service.IServices.IServicio;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Corretaje.Service.Services.Servicio
{
    public class CalculoPrecioServicioAdicional : ICalculoPrecioServicioAdicional
    {
        private readonly IConversionMoneda _conversionMoneda;

        public CalculoPrecioServicioAdicional(IConversionMoneda conversionMoneda)
        {
            _conversionMoneda = conversionMoneda;
        }

        public async Task<decimal> CalcularPrecioTotalServiciosAdicionales(IEnumerable<ServicioAdicional> serviciosAdicionales)
        {
            var serviciosAdicionalesNoExcluidosCalculoPrecioOrdenCompra = GetServiciosAdicionalesNoExcluidosCalculoPrecioOrdenCompra(serviciosAdicionales);

            decimal precioTotalServiciosAdicionales = await CalcularTotalEnUf(serviciosAdicionalesNoExcluidosCalculoPrecioOrdenCompra);

            return await _conversionMoneda.ConvertirUfAPesoChileno(precioTotalServiciosAdicionales);
        }

        public async Task<decimal> CalcularPrecioTotalServiciosAdicionalesConIVA(IEnumerable<ServicioAdicional> serviciosAdicionales)
        {
            var serviciosAdicionalesNoExcluidosCalculoPrecioOrdenCompra = GetServiciosAdicionalesNoExcluidosCalculoPrecioOrdenCompra(serviciosAdicionales);

            return (1 + (IVA.Valor / 100)) * await CalcularPrecioTotalServiciosAdicionales(serviciosAdicionalesNoExcluidosCalculoPrecioOrdenCompra);
        }

        public Task<decimal> CalcularTotalEnUf(IEnumerable<ServicioAdicional> serviciosAdicionales)
        {
            var serviciosAdicionalesNoExcluidosCalculoPrecioOrdenCompra = GetServiciosAdicionalesNoExcluidosCalculoPrecioOrdenCompra(serviciosAdicionales);

            return Task.FromResult(serviciosAdicionalesNoExcluidosCalculoPrecioOrdenCompra.Sum(servicioAdicional => servicioAdicional.Precio));
        }

        private IEnumerable<ServicioAdicional> GetServiciosAdicionalesNoExcluidosCalculoPrecioOrdenCompra(IEnumerable<ServicioAdicional> serviciosAdicionales)
        {
            return serviciosAdicionales.Where(servicioAdicional => !servicioAdicional.ExcluidoCalculoPrecioOrdenCompra);
        }
    }
}
