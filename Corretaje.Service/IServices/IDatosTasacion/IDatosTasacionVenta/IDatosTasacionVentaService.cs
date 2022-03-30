using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Service.IServices.IDatosTasacion.IDatosTasacionVenta
{
    public interface IDatosTasacionVentaService : IDatosTasacionService<Domain.Tasacion.DatosTasacionVenta>
    {
        Task<IEnumerable<Domain.Tasacion.DatosTasacionVenta>> UploadFile(string fileLocation);
    }
}
