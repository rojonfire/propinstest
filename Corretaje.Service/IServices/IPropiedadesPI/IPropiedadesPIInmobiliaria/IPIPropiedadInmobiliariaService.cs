using Corretaje.Domain.PropiedadesPI;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Service.IServices.IPropiedadesPI.IPropiedadesPIInmobiliaria
{
    public interface IPIPropiedadInmobiliariaService : IPIPropiedadService<PIPropiedadInmobiliaria>
    {
        Task<IEnumerable<PIPropiedadInmobiliaria>> UploadFile(string fileLocation);

        Task<IEnumerable<PIPropiedadInmobiliaria>> BuscarCoincidencias(Domain.Suscripcion suscripcion);
    }
}
