using Corretaje.Domain.Agenda;
using Corretaje.Service.IServices.IBloqueService.IBloqueBase;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Service.IServices.IVisita.IVisitaBase
{
    public interface IVisitaService<T> : IBloqueService<T> where T : Visita
    {
        Task<IEnumerable<T>> GetByClienteId(string id);

        Task<IEnumerable<T>> GetByClienteIdAndFecha(string id, DateTime fecha);

        Task<IEnumerable<T>> GetByPropiedadId(string id);

        Task<IEnumerable<T>> GetByFecha(DateTime fecha);

        Task<IEnumerable<T>> GetByFechaAndPropiedadIdAndTramo(DateTime fecha, string id, string tramo);

        Task<bool> ValidarVisita(DateTime fecha, string id, string tramo);
    }
}
