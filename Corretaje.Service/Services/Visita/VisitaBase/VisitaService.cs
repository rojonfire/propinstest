using Corretaje.Repository;
using Corretaje.Service.IServices.IVisita.IVisitaBase;
using Corretaje.Service.Services.BloqueService.BloqueBase;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace Corretaje.Service.Services.Visita.VisitaBase
{
    public abstract class VisitaService<T> : BloqueService<T>, IVisitaService<T> where T : Domain.Agenda.Visita
    {
        private readonly IRepository<T> _repositoryVisita;
        private readonly IVisitaQueryFiltro<T> _visitaQueryFiltro;

        public VisitaService(IRepository<T> repositoryVisita, IVisitaQueryFiltro<T> visitaQueryFiltro) : base(repositoryVisita)
        {
            _repositoryVisita = repositoryVisita;
            _visitaQueryFiltro = visitaQueryFiltro;
        }

        public async Task<IEnumerable<T>> GetByClienteId(string id)
        {
            return await _repository.SearchFor(_visitaQueryFiltro.FindByClienteId(id));
        }

        public async Task<IEnumerable<T>> GetByClienteIdAndFecha(string id, DateTime fecha)
        {
            return await _repository.SearchFor(_visitaQueryFiltro.FindByClienteIdAndFecha(id, fecha));
        }

        public async Task<IEnumerable<T>> GetByPropiedadId(string id)
        {
            return await _repository.SearchFor(_visitaQueryFiltro.FindByPropiedadId(id));
        }

        public async Task<IEnumerable<T>> GetByFecha(DateTime fecha)
        {
            return await _repository.SearchFor(_visitaQueryFiltro.FindByFecha(fecha));
        }

        public async Task<IEnumerable<T>> GetByFechaAndPropiedadIdAndTramo(DateTime fecha, string id, string tramo)
        {
            return await _repository.SearchFor(_visitaQueryFiltro.FindByFechaAndPropiedadIdAndTramo(fecha, id, tramo));
        }

        public async Task<bool> ValidarVisita(DateTime fecha, string id, string tramo)
        {
            var visitas = await GetByFechaAndPropiedadIdAndTramo(fecha, id, tramo);
            if (visitas != null && visitas.Count() > 0)
            {
                return false;
            }
            return true;
        }
    }
}
