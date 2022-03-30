using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Corretaje.Domain;
using Corretaje.Repository;
using Corretaje.Service.IServices.IProvider;
using Corretaje.Service.IServices.IProyectoInmobiliario;
using MongoDB.Bson;

namespace Corretaje.Service.Services.ProyectosInmobiliario
{
    public class ProyectoInmobiliarioService : IProyectoInmobiliarioService
    {
        private readonly IRepository<Inmobiliaria> _inmobiliarioRepository;
        private readonly IRepository<ProyectoInmobiliario> _proyectoInmobiliarioRepository;
        private readonly IProyectoInmobiliarioQueryFiltro _proyectoInmobiliarioQueryFiltro;
        private readonly ILiveConfiguracion _liveConfiguracion;

        public ProyectoInmobiliarioService(
            IRepository<Inmobiliaria> inmobiliarioRepository,
            IRepository<ProyectoInmobiliario> proyectoInmobiliarioRepository,
            IProyectoInmobiliarioQueryFiltro proyectoInmobiliarioQueryFiltro,
            ILiveConfiguracion liveConfiguracion)
        {
            _inmobiliarioRepository = inmobiliarioRepository;
            _proyectoInmobiliarioRepository = proyectoInmobiliarioRepository;
            _proyectoInmobiliarioQueryFiltro = proyectoInmobiliarioQueryFiltro;
            _liveConfiguracion = liveConfiguracion;
        }

        public async Task<ProyectoInmobiliario> Create(ObjectId inmobiliariaId, ProyectoInmobiliario proyectoInmobiliario)
        {
            var inmobiliaria = await _inmobiliarioRepository.Get(inmobiliariaId);

            if (inmobiliaria == null)
            {
                throw new Exception($"{nameof(Inmobiliaria)} id {inmobiliariaId.ToString()} no encontrada");
            }
            
            proyectoInmobiliario.SetInmobiliariaId(inmobiliariaId.ToString());

            await _inmobiliarioRepository.Update(inmobiliaria);

            return await _proyectoInmobiliarioRepository.Insert(proyectoInmobiliario);
        }

        public async Task<ProyectoInmobiliario> Update(ObjectId inmobiliariaId, ProyectoInmobiliario proyectoInmobiliario)
        {
            var inmobiliaria = await _inmobiliarioRepository.Get(inmobiliariaId);

            if (inmobiliaria == null)
            {
                throw new Exception($"{nameof(Inmobiliaria)} id {inmobiliariaId.ToString()} no encontrada");
            }

            proyectoInmobiliario.SetInmobiliariaId(inmobiliariaId.ToString());

            var proyecto = await _proyectoInmobiliarioRepository.Get(proyectoInmobiliario.Id);

            if (proyecto == null)
            {
                throw new Exception($"{nameof(ProyectoInmobiliario)} id {proyectoInmobiliario.Id.ToString()} no encontrada");
            }

            proyecto.Update(proyectoInmobiliario);

            return await _proyectoInmobiliarioRepository.Update(proyecto);
        }

        public async Task<IEnumerable<ProyectoInmobiliario>> GetProyectosInmobiliariosByQuery(ProyectoInmobiliarioQueryString query)
        {
            var proyectos = (await _proyectoInmobiliarioRepository.SearchFor(_proyectoInmobiliarioQueryFiltro.FiltroProyectoInmobiliarioByInmobiliariaId(query))).OrderByDescending(p => p.CreatedAt);

            return proyectos;
        }

        public async Task<ProyectoInmobiliario> Get(ObjectId proyectoId)
        {
            return await _proyectoInmobiliarioRepository.Get(proyectoId);
        }

        public string AddLink(string proyectoId, string inmobiliariaId)
        {
            return $"<a href='{_liveConfiguracion.UrlLive}/live/reserva-usuario/{proyectoId}/{inmobiliariaId}' title='Vive la experiencia Live'>  <img src='{_liveConfiguracion.UrlLive}/static/media/logo-plive.a7be8159.svg' alt='' width='90px' height='40px'></img></a>";

        }
    }
}