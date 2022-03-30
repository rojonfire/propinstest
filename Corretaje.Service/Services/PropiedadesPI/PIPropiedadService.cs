using Corretaje.Domain.PropiedadesPI;
using Corretaje.Repository;
using Corretaje.Service.IServices.IPropiedadesPI;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Service.Services.PropiedadesPI
{
    public abstract class PIPropiedadService<T> : IPIPropiedadService<T> where T : PIPropiedad
    {
        protected readonly IRepository<T> _repository;
        protected readonly IPIPropiedadQueryFiltro<T> _propiedadQueryFiltro;
        private readonly IPIPropiedadConfiguracion _propiedadPIConfiguracion;

        public PIPropiedadService(IRepository<T> repository, IPIPropiedadQueryFiltro<T> propiedadQueryFiltro, IPIPropiedadConfiguracion propiedadPIConfiguracion)
        {
            _repository = repository;
            _propiedadQueryFiltro = propiedadQueryFiltro;
            _propiedadPIConfiguracion = propiedadPIConfiguracion;
        }

        public async Task<T> Add(T propiedad)
        {
            return await _repository.Insert(propiedad);
        }

        public async Task<IEnumerable<T>> AddMany(IEnumerable<T> propiedades)
        {
            List<T> propiedadesAgregadas = new List<T>();

            foreach (var prop in propiedades)
            {
                propiedadesAgregadas.Add(await Add(prop));
            }

            return propiedadesAgregadas;
        }

        public async Task<IEnumerable<T>> BuscarCoincidencias(Domain.Suscripcion suscripcion)
        {
            return await _repository.SearchFor(_propiedadQueryFiltro.Filtrar(suscripcion, _propiedadPIConfiguracion.FactorSuperficieInferior, _propiedadPIConfiguracion.FactorSuperficieSuperior, _propiedadPIConfiguracion.SumaEstacionamientos));
        }

    }
}
