using System.Threading.Tasks;

namespace Corretaje.Service.IServices.IConversionMoneda
{
    public interface IConversionMoneda
    {
        Task<decimal> ConvertirUfAPesoChileno(decimal PrecioUf);
    }
}
