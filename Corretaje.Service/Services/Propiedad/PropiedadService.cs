using Corretaje.Domain;
using Corretaje.Repository;
using Corretaje.Service.IServices.IPropiedad;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Corretaje.Domain.Estados;

namespace Corretaje.Service.Services.Propiedad
{
    public class PropiedadService : Repository<Domain.Propiedad>, IPropiedadService
    {
        private readonly IPropiedadEmail _propiedadEmail;
        private readonly IPropiedadFecha _propiedadFecha;
        private readonly IPropiedadQueryFiltro _propiedadQueryFiltro;
        private readonly IPropiedadPropietario _propiedadPropietario;
        private readonly IRepository<Domain.Cliente> _repositoryCliente;
        private readonly IRepository<Domain.Propiedad> _repositoryPropiedad;

        public PropiedadService(IPropiedadEmail propiedadEmail, IPropiedadQueryFiltro propiedadQueryFiltro, IPropiedadFecha propiedadFecha, IPropiedadPropietario propiedadPropietario, string connectionstring) : base(connectionstring)
        {
            _propiedadEmail = propiedadEmail;
            _propiedadFecha = propiedadFecha;
            _propiedadQueryFiltro = propiedadQueryFiltro;
            _propiedadPropietario = propiedadPropietario;
            _repositoryCliente = new Repository<Domain.Cliente>(connectionstring);
            _repositoryPropiedad = new Repository<Domain.Propiedad>(connectionstring);
        }

        public PropiedadService(IPropiedadQueryFiltro propiedadQueryFiltro, string connectionstring) : base(connectionstring)
        {
            _propiedadQueryFiltro = propiedadQueryFiltro;
        }

        public async Task<IEnumerable<object>> GetPropiedadesCliente()
        {
            var clientes = await _repositoryCliente.GetAll();
            var propiedades = await _repositoryPropiedad.GetAll();

            var query = from c in clientes
                        join p in propiedades on c.Id.ToString() equals p.IdCliente into propiedadesRep
                        select new Propiedades
                        {
                            NombresCliente = c.Nombres,
                            ApellidosCliente = c.Apellidos,
                            Propiedad = propiedadesRep
                        };
            return query.ToList();
        }

        public async Task<Page<Domain.Propiedad>> GetAllPropiedades(int pageSize, int page, string estado, string idBroker)
        {
            FilterDefinition<Domain.Propiedad> filter = FilterDefinition<Domain.Propiedad>.Empty;
            bool tieneFiltro = false;
            if (estado != null && estado != "" && estado != "-1")
            {
                EstadoPropiedad estadoPropiedad = (EstadoPropiedad)int.Parse(estado);
                filter &= _propiedadQueryFiltro.FindPropiedadesByEstado(estadoPropiedad);
                tieneFiltro = true;
            }
            if (idBroker != null && idBroker != "")
            {
                filter &= _propiedadQueryFiltro.FindPropiedadesByIdBroker(idBroker);
                tieneFiltro = true;
            }

            if (!tieneFiltro)
            {
                filter = _propiedadQueryFiltro.FindAll();
            }
            var allPropiedadesFiltered = await _repositoryPropiedad.SearchFor(filter);

            var sort = _propiedadQueryFiltro.SortByFechaCreacion();

            int totalPropiedades = allPropiedadesFiltered.Count();

            var propiedades = await _repositoryPropiedad.Pagination(filter, page, pageSize, sort);

            Page<Domain.Propiedad> paginated = new Page<Domain.Propiedad>();
            paginated.CurrentPage = page;
            paginated.Results = propiedades;
            paginated.TotalResults = totalPropiedades;
            Double totalPagesRatio = Double.Parse(totalPropiedades.ToString()) / Double.Parse(pageSize.ToString());
            paginated.TotalPages = int.Parse(Math.Ceiling(totalPagesRatio).ToString());

            return paginated;
        }

        public async Task<IEnumerable<object>> GetPropiedadesByClienteId(string ClienteId)
        {
            var propiedades = await _repositoryPropiedad.SearchFor(_propiedadQueryFiltro.FindByClienteId(ClienteId));
            return propiedades;
        }

        public async Task<IEnumerable<object>> GetPropiedadesByEstado(EstadoPropiedad estadoPropiedad)
        {
            var propiedades = await _repositoryPropiedad.SearchFor(_propiedadQueryFiltro.FindPropiedadesByEstado(estadoPropiedad));
            return propiedades;
        }

        public async Task<IEnumerable<Domain.Propiedad>> Buscar(Domain.Busqueda parametrosBusqueda)
        {
            parametrosBusqueda.SortPrecioDesc = false;
            return await _repositoryPropiedad.Pagination(_propiedadQueryFiltro.FindByBusquedaUsuario(parametrosBusqueda), parametrosBusqueda.Limit, parametrosBusqueda.Skip, _propiedadQueryFiltro.SortByPrecio(parametrosBusqueda.SortPrecioDesc));
        }

        public async Task<IEnumerable<Domain.Propiedad>> BuscarById(List<string> ids)
        {
            var props = new List<Domain.Propiedad>();

            foreach (var id in ids)
            {
                props.Add(await _repositoryPropiedad.Get(ObjectId.Parse(id)));
            }
            return props;
        }

        public async Task<Domain.Propiedad> SetDisponible(ObjectId id, bool estaDisponible)
        {
            var propiedad = await Get(id);

            propiedad.Disponible = estaDisponible;

            return await Update(propiedad);
        }

        public Task<Domain.Propiedad> Actualizar(Domain.Propiedad propiedad)
        {
            _propiedadPropietario.HandleCambioPropietario(propiedad);

            return _repositoryPropiedad.Update(propiedad);
        }

        public async Task<Domain.Propiedad> Add(Domain.Propiedad propiedad)
        {
            propiedad.Disponible = false;

            return await _repositoryPropiedad.Insert(propiedad);
        }

        public async void NotificarPropiedadesPorExpirar()
        {
            var propiedadesPorExpirar = await _repositoryPropiedad.SearchFor(_propiedadQueryFiltro.FindPropiedadPorExpirar(_propiedadFecha.GetNotificacionExpiracion()));

            _propiedadEmail.GenerarYEnviarEmail(propiedadesPorExpirar);
        }

        public async Task<Dictionary<string, IEnumerable<Domain.Propiedad>>> GetRecomendacionesUsuario(IEnumerable<IGrouping<string, Domain.Busqueda>> busquedasUsuarios)
        {
            var recomendacionesPorUsuario = new Dictionary<string, IEnumerable<Domain.Propiedad>>();

            foreach (var busquedaPorUsuario in busquedasUsuarios)
            {
                int cantidadDeRecomendaciones = 10;

                var recomendaciones = (await _repositoryPropiedad
                    .SearchFor(_propiedadQueryFiltro.FindByTipoOperacionTipoPropiedad(busquedaPorUsuario)))
                    .OrderBy(propiedad => propiedad.Valor)
                    .ThenByDescending(propiedad => propiedad.CreatedAt)
                    .Take(cantidadDeRecomendaciones);

                recomendacionesPorUsuario.Add(busquedaPorUsuario.Key, recomendaciones);
            }

            return recomendacionesPorUsuario;
        }

        public async Task<IEnumerable<Domain.Propiedad>> BuscarConContrato()
        {
            var propiedades = await _repositoryPropiedad.SearchFor(_propiedadQueryFiltro.FindPropiedadesByTieneContrato());
            return propiedades;
        }

        public async Task<IEnumerable<Domain.Propiedad>> GetPropiedadesByIdBroker(string IdBroker)
        {
            var propiedades = await _repositoryPropiedad.SearchFor(_propiedadQueryFiltro.FindPropiedadesByIdBroker(IdBroker));
            return propiedades;
        }

        public async Task<IEnumerable<Domain.Propiedad>> BuscarCoincidencias(Domain.Suscripcion suscripcion, double factorSuperficieInferior, double factorSuperficieSuperior, int sumaEstacionamientos, EstadoPropiedad estadoPropiedad)
        {
            return await _repositoryPropiedad.SearchFor(_propiedadQueryFiltro.Filtrar(suscripcion, factorSuperficieInferior, factorSuperficieSuperior, sumaEstacionamientos, estadoPropiedad));
        }

        public void SendEmailNotificacionNuevaPropiedadFast(string html, List<string> destinatarios)
        {
            _propiedadEmail.SendEmailNotificacionNuevaPropiedadFast(html, destinatarios);
        }

        public void SendEmailNotificacionNuevaPropiedadSubidaPorBroker(string html, List<string> destinatarios)
        {
            _propiedadEmail.SendEmailNotificacionNuevaPropiedadSubidaPorBroker(html, destinatarios);
        }

    }
}