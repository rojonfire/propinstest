using Corretaje.Domain;
using Corretaje.Repository;
using Corretaje.Service.IServices;
using Corretaje.Service.IServices.IServicio;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Service.Services.Servicio
{
    public class ServicioService<T> : IServicioService<T> where T : Entity
    {
        private readonly IRepository<T> _servicioRepository;
        private readonly IRespuestaDelServicio _respuestaDelServicio;
        private readonly IServicioQueryFiltro<T> _servicioQueryFiltro;

        public ServicioService(IRepository<T> servicioRepository, IRespuestaDelServicio respuestaDelServicio, IServicioQueryFiltro<T> servicioQueryFiltro)
        {
            _servicioRepository = servicioRepository;
            _respuestaDelServicio = respuestaDelServicio;
            _servicioQueryFiltro = servicioQueryFiltro;
        }

        public async Task<T> AgregarServicio(T servicio)
        {
            return await _servicioRepository.Insert(servicio);
        }

        public async Task<IEnumerable<T>> AgregarServicios(IEnumerable<T> servicios)
        {
            var serviciosAgregados = new List<T>();

            foreach (var servicio in servicios)
            {
                serviciosAgregados.Add(await AgregarServicio(servicio));
            }

            return serviciosAgregados;
        }

        public async Task<ResultadoDelProceso> DeleteServicio(ObjectId servicioId)
        {
            await _servicioRepository.Delete(servicioId);

            return _respuestaDelServicio.RetornarOk(null, $"servicio base id: {servicioId.ToString()} eliminado");
        }

        public async Task<T> GetServicioById(ObjectId servicioId)
        {
            return await _servicioRepository.Get(servicioId);
        }

        public async Task<T> UpdateServicio(T servicio)
        {
            return await _servicioRepository.Update(servicio);
        }

        public virtual async Task<IEnumerable<T>> GetTodosLosServicios()
        {
            return await _servicioRepository.GetAll();
        }

        public Task<IEnumerable<T>> GetServiciosAdicionalesById(IEnumerable<ObjectId> serviciosAdicionalesId)
        {
            return _servicioRepository.SearchFor(_servicioQueryFiltro.FindServiciosAdicionalesById(serviciosAdicionalesId));
        }
    }
}
