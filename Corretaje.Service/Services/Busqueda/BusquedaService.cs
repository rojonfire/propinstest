using Corretaje.Repository;
using Corretaje.Service.IServices.IBusqueda;
using Corretaje.Service.IServices.IPropiedad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Corretaje.Service.Services.Busqueda
{
    public class BusquedaService : IBusquedaService
    {
        private readonly IBusquedaQueryFiltro _busquedaQueryFiltro;
        private readonly IPropiedadService _propiedadService;
        private readonly IRepository<Domain.Busqueda> _busquedaRepository;

        public BusquedaService(
            IBusquedaQueryFiltro busquedaQueryFiltro,
            IPropiedadService propiedadService,
            IRepository<Domain.Busqueda> busquedaRepository)
        {
            _busquedaQueryFiltro = busquedaQueryFiltro;
            _busquedaRepository = busquedaRepository;
            _propiedadService = propiedadService;
        }

        public async Task<Dictionary<string, IEnumerable<Domain.Propiedad>>> GetRecomendacionesPorUsuario()
        {
            int dias = -5;

            var fechaBusqueda = DateTime.Now.AddDays(dias);

            var busquedasHechasPorUsuarios = (await GetBusquedasByFechaMayorA(fechaBusqueda)).GroupBy(busqueda => busqueda.UsuarioId);

            return await _propiedadService.GetRecomendacionesUsuario(busquedasHechasPorUsuarios);
        }

        public async Task<Domain.Busqueda> Add(Domain.Busqueda busqueda)
        {
            return await _busquedaRepository.Insert(busqueda);
        }

        public async Task<IEnumerable<Domain.Busqueda>> GetBusquedasByFechaMayorA(DateTime fecha)
        {
            return await _busquedaRepository.SearchFor(_busquedaQueryFiltro.FindBusquedasByFechaMayorA(fecha));
        }
    }
}
