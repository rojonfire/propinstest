using Corretaje.Domain.PropiedadesPI;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Service.IServices.IPropiedadesPI.IPropiedadesPINatural
{
    public interface IPIPropiedadNaturalService : IPIPropiedadService<PIPropiedadNatural>
    {
        Task<IEnumerable<PIPropiedadNatural>> UploadFile(string fileLocation);

        Task<IEnumerable<PIPropiedadNatural>> BuscarCoincidencias(Domain.Suscripcion suscripcion);
    }
}
