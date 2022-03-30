using Corretaje.Service.IServices.IVisita.IVisitaBase;
using MongoDB.Driver;
using System;

namespace Corretaje.Service.Services.Visita.VisitaBase
{
    public abstract class VisitaQueryFiltro<T> : IVisitaQueryFiltro<T> where T : Domain.Agenda.Visita
    {
        public FilterDefinition<T> FindByClienteId(string id)
        {
            return Builders<T>.Filter.Where(visita => visita.ClienteId == id);
        }

        public FilterDefinition<T> FindByClienteIdAndFecha(string id, DateTime fecha)
        {
            return Builders<T>.Filter.Where(visita => visita.ClienteId == id && visita.Fecha >= fecha);
        }

        public FilterDefinition<T> FindByFecha(DateTime fecha)
        {
            return Builders<T>.Filter.Where(visita => visita.Fecha == fecha.Date);

            //return Builders<T>.Filter.Where(visita => visita.Fecha >= fecha.Date && visita.Fecha <= fecha.Date.AddDays(unDia));
        }

        public FilterDefinition<T> FindByPropiedadId(string id)
        {
            return Builders<T>.Filter.Where(visita => visita.PropiedadId == id);
        }

        public FilterDefinition<T> FindByOlderThanDate(DateTime fecha)
        {
            return Builders<T>.Filter.Where(visita => visita.Fecha < fecha);
        }

        public FilterDefinition<T> FindByNewerThanDate(DateTime fecha)
        {
            return Builders<T>.Filter.Where(visita => visita.Fecha > fecha);
        }

        public FilterDefinition<T> FindByRangoFechas(DateTime fechaRangoInicial, DateTime fechaRangoFinal)
        {
            return Builders<T>.Filter.Where(visita => visita.Fecha > fechaRangoInicial && visita.Fecha < fechaRangoFinal);
        }

        public FilterDefinition<T> FindByVisitaSinConfirmar()
        {
            return Builders<T>.Filter.Where(visita => !visita.VisitaVerificada);
        }

        public FilterDefinition<T> FindByFechaAndPropiedadIdAndTramo(DateTime fecha, string propiedadId, string tramo)
        {
            return Builders<T>.Filter.Where(visita => visita.PropiedadId == propiedadId && visita.Fecha == fecha && visita.Tramo == tramo);
        }
    }
}
