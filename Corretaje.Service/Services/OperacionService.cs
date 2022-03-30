using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Corretaje.Domain;
using Corretaje.Repository;
using Corretaje.Service.IServices;
using LinqKit;

namespace Corretaje.Service.Services
{
    public class OperacionService : Repository<Operacion>, IOperacionService
    {
        private readonly IRepository<Operacion> _operacionRepository;

        public OperacionService(string connectionstring) : base(connectionstring)
        {
            _operacionRepository = new Repository<Operacion>(connectionstring);
        }

        public async Task<List<Operacion>> BusquedaOperacion(Operacion operacion)
        {
            var result = await _operacionRepository.GetAll();
            var operaciones = result.AsQueryable().Where(CreatExpression(operacion)).ToList();

            return operaciones;
        }

        private static System.Linq.Expressions.Expression<Func<Operacion, bool>> CreatExpression(Operacion operacion)
        {
            var predicate = PredicateBuilder.New<Operacion>();

            if (!string.IsNullOrEmpty(operacion.IdPropiedad))
            {
                predicate = predicate.And(i => i.IdPropiedad.StartsWith(operacion.IdPropiedad));
            }

            if (!string.IsNullOrEmpty(operacion.Tipo))
            {
                predicate = predicate.And(i => i.Tipo.StartsWith(operacion.Tipo));
            }

            if (!string.IsNullOrEmpty(operacion.Plan))
            {
                predicate = predicate.And(i => i.Plan.StartsWith(operacion.Plan));
            }

            if (operacion.ServiciosAdicionales == null) return predicate;
            {
            }

            return operacion.ServiciosAdicionales.Aggregate(predicate, (current, servicio) => current.And(i => i.ServiciosAdicionales.Contains(servicio)));
        }
    }
}
