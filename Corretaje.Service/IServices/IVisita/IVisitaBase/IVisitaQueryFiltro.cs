using Corretaje.Domain.Agenda;
using MongoDB.Driver;
using System;

namespace Corretaje.Service.IServices.IVisita.IVisitaBase
{
    public interface IVisitaQueryFiltro<T> where T : Visita
    {
        FilterDefinition<T> FindByClienteId(string id);

        FilterDefinition<T> FindByClienteIdAndFecha(string id, DateTime fecha);

        FilterDefinition<T> FindByFecha(DateTime fecha);

        FilterDefinition<T> FindByPropiedadId(string id);

        FilterDefinition<T> FindByOlderThanDate(DateTime fecha);

        FilterDefinition<T> FindByNewerThanDate(DateTime fecha);

        FilterDefinition<T> FindByRangoFechas(DateTime fechaRangoInicial, DateTime fechaRangoFinal);

        FilterDefinition<T> FindByVisitaSinConfirmar();

        FilterDefinition<T> FindByFechaAndPropiedadIdAndTramo(DateTime fecha, string propiedadId, string tramo);
    }
}
