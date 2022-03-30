using System.Collections.Generic;
using System.Threading.Tasks;
using Corretaje.Repository;
using Corretaje.Service.IServices.ITarjetaProp;
using System.Linq;

namespace Corretaje.Service.Services.TarjetaProp
{
    public class TarjetaPropServices : Repository<Domain.TarjetaProp>, ITarjetaPropService
    {
        private readonly IRepository<Domain.TarjetaProp> _repositoryTarjetaProp;
        private readonly ITarjetaPropQueryFiltro _tarjetaPropQueryFiltro;


        public TarjetaPropServices(string connectionString, 
            ITarjetaPropQueryFiltro tarjetaPropQueryFiltro ) : base(connectionString)
        {
            _tarjetaPropQueryFiltro = tarjetaPropQueryFiltro;
            _repositoryTarjetaProp = new Repository<Domain.TarjetaProp>(connectionString);
        }

        public async Task<IEnumerable<Domain.TarjetaProp>> Buscar(Domain.Busqueda parametrosBusqueda)
        {
            parametrosBusqueda.SortPrecioDesc = false;

            var propiedades = await _repositoryTarjetaProp.Pagination(
                _tarjetaPropQueryFiltro.FindByBusquedaUsuario(parametrosBusqueda), parametrosBusqueda.Limit,
                parametrosBusqueda.Skip, _tarjetaPropQueryFiltro.SortbyPrecio(parametrosBusqueda.SortPrecioDesc));
            return propiedades;
        }

        public async Task<Domain.TarjetaProp> Add(Domain.TarjetaProp tarjetaProp)
        {
            return await _repositoryTarjetaProp.Insert(tarjetaProp);
        }

        public async Task<Domain.TarjetaProp> GetByCodigoPropiedad(string codigoPropiedad)
        {
            var tarjetasProp = await _repositoryTarjetaProp.SearchFor(_tarjetaPropQueryFiltro.FindByCodPRopiedad(codigoPropiedad));
            return tarjetasProp.FirstOrDefault();
        }

    }
}