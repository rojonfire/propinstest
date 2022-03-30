using Corretaje.Repository;
using Corretaje.Service.IServices;
using Corretaje.Service.IServices.IServicio;

namespace Corretaje.Service.Services.Servicio
{
    public class ServicioBaseService<T> : ServicioService<T> where T : Entity
    {
        public ServicioBaseService(
            IRepository<T> repositoryServicioBase,
            IRespuestaDelServicio respuestaDelServicio,
            IServicioQueryFiltro<T> servicioQueryFiltro) : base(repositoryServicioBase, respuestaDelServicio, servicioQueryFiltro)
        {

        }
    }
}
