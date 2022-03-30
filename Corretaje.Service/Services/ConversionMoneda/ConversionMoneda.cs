using Corretaje.Service.IServices.IConversionMoneda;
using Corretaje.Service.IServices.ISBIF;
using System;
using System.Threading.Tasks;

namespace Corretaje.Service.Services.ConversionMoneda
{
    public class ConversionMoneda : IConversionMoneda
    {
        private readonly ISBIFService _sBIFService;

        public ConversionMoneda(ISBIFService sBIFService)
        {
            _sBIFService = sBIFService;
        }

        public async Task<decimal> ConvertirUfAPesoChileno(decimal precioUf)
        {
            var uf = await _sBIFService.GetUfUltimoPeriodo();
            try
            {
                //TODO: @mauricio revisar pq el dato almacenado no puede ser pasado a decimal...
                var tryParse = decimal.TryParse(uf.Valor, out var uftoDecimal);
                if (tryParse)
                {
                    return Math.Ceiling(precioUf * uftoDecimal);
                }
                return Math.Ceiling(precioUf * 27600);
            }
            catch (Exception)
            {
                return Math.Ceiling(precioUf * 27600);
            }

            
        }
    }
}
