using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Service.IServices.IDatosTasacion.IDatosTasacionArriendo
{
    public interface IDatosTasacionArriendoService : IDatosTasacionService<Domain.Tasacion.DatosTasacionArriendo>
    {
        Task<IEnumerable<Domain.Tasacion.DatosTasacionArriendo>> UploadFile(string fileLocation);
    }
}
