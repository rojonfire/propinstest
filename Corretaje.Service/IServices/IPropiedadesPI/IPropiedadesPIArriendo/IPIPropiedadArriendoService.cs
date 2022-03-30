using Corretaje.Domain.PropiedadesPI;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Service.IServices.IPropiedadesPI.IPropiedadesPIArriendo
{
    public interface IPIPropiedadArriendoService : IPIPropiedadService<PIPropiedadArriendo>
    {
        Task<IEnumerable<PIPropiedadArriendo>> UploadFile(string fileLocation);

        Task<IEnumerable<PIPropiedadArriendo>> BuscarCoincidencias(Domain.Suscripcion suscripcion);
    }
}
