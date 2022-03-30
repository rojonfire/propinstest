using Corretaje.Domain;
using Corretaje.Repository;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Corretaje.Domain.Estados;

namespace Corretaje.Service.IServices.IPropiedad
{
    public interface IPropiedadService : IRepository<Propiedad>
    {
        Task<IEnumerable<object>> GetPropiedadesCliente();

        Task<IEnumerable<Propiedad>> Buscar(Busqueda parametrosBusqueda);

        Task<Dictionary<string, IEnumerable<Propiedad>>> GetRecomendacionesUsuario(IEnumerable<IGrouping<string, Busqueda>> busquedasUsuarios);

        Task<Propiedad> SetDisponible(ObjectId id, bool estaDisponible);

        Task<Propiedad> Actualizar(Propiedad propiedad);

        Task<Propiedad> Add(Propiedad propiedad);

        void NotificarPropiedadesPorExpirar();

        Task<IEnumerable<object>> GetPropiedadesByClienteId(string ClienteId);

        Task<Page<Propiedad>> GetAllPropiedades(int pageSize, int page, string estado, string idBroker);

        Task<IEnumerable<object>> GetPropiedadesByEstado(EstadoPropiedad estadoPropiedad);

        Task<IEnumerable<Propiedad>> BuscarConContrato();

        Task<IEnumerable<Propiedad>> GetPropiedadesByIdBroker(string IdBroker);

        Task<IEnumerable<Propiedad>> BuscarCoincidencias(Domain.Suscripcion suscripcion, double factorSuperficieInferior, double factorSuperficieSuperior, int sumaEstacionamientos, EstadoPropiedad estadoPropiedad);

        void SendEmailNotificacionNuevaPropiedadFast(string html, List<string> destinatarios);

        void SendEmailNotificacionNuevaPropiedadSubidaPorBroker(string html, List<string> destinatarios);
    }
}
