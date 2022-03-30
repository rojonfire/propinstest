using Corretaje.Service.IServices.IVisita.IVisitaAgente;
using Corretaje.Service.Services.Visita.VisitaBase;
using MongoDB.Driver;
using System;

namespace Corretaje.Service.Services.Visita.VisitaAgente
{
    public class VisitaAgenteQueryFiltro : VisitaQueryFiltro<Domain.Agenda.VisitaAgente>, IVisitaAgenteQueryFiltro
    {
        public FilterDefinition<Domain.Agenda.VisitaAgente> FindByAgenteIdAndProyectoId(string id, string proyectoId)
        {
            throw new NotImplementedException();
        }
        public FilterDefinition<Domain.Agenda.VisitaAgente> FindByAgenteId(string id)
        {
            return Builders<Domain.Agenda.VisitaAgente>.Filter.Where(visita => visita.AgenteId == id);
        }

        public FilterDefinition<Domain.Agenda.VisitaAgente> FindByUsuarioIdAndProyectoId(string usuarioId, string proyectoId)
        {
           return Builders<Domain.Agenda.VisitaAgente>.Filter.Where(visita => visita.UsuarioId == usuarioId && visita.ProyectoId == proyectoId);         
        }

        public FilterDefinition<Domain.Agenda.VisitaAgente> FindByProyectoId( string proyectoId)
        {
            return Builders<Domain.Agenda.VisitaAgente>.Filter.Where(visita => visita.ProyectoId == proyectoId);
        }
    }
}
