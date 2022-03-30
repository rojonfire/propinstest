using System.Threading.Tasks;
using Corretaje.Domain;
using Corretaje.Repository;
using Corretaje.Service.IServices;
using Corretaje.Service.IServices.IProvider;
using MongoDB.Bson;

namespace Corretaje.Service.Services
{
    public class InmobiliariaService : IInmobiliariaService
    {
        private readonly IRepository<Inmobiliaria> _inmobiliariaRepository;
        private readonly ILiveConfiguracion _liveConfiguracion;

        public InmobiliariaService(IRepository<Inmobiliaria> inmobiliariaRepository,
            ILiveConfiguracion liveConfiguracion)
        {
            _inmobiliariaRepository = inmobiliariaRepository;
            _liveConfiguracion = liveConfiguracion;
        }

        public async Task<Inmobiliaria> GetById(ObjectId id)
        {
            return await _inmobiliariaRepository.Get(id);
        }

        public async Task<Inmobiliaria> Update(Inmobiliaria inmobiliaria, Inmobiliaria update)
        {
            inmobiliaria.Update(update);

            return await _inmobiliariaRepository.Update(inmobiliaria);
        }

        public string AddLink(string inmobiliariaId)
        {
            return $"<a href='{_liveConfiguracion.UrlLive}/live/{inmobiliariaId}' title='Vive la experiencia Live'>  <img src='{_liveConfiguracion.UrlLive}/static/media/logo-plive.a7be8159.svg' alt='' width='90px' height='40px'></img></a>";

        }
    }
}