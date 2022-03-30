using Corretaje.Domain;
using Corretaje.Service.IServices.IProyectoInmobiliario;
using MongoDB.Driver;
using System;

namespace Corretaje.Service.Services.ProyectosInmobiliario
{
    public class ProyectoInmobiliarioQueryFiltro : IProyectoInmobiliarioQueryFiltro
    {    

        public FilterDefinition<Domain.ProyectoInmobiliario> FiltroProyectoInmobiliarioByInmobiliariaId(Domain.ProyectoInmobiliarioQueryString query)
        {

            var filter = Builders<Domain.ProyectoInmobiliario>.Filter.Where(proyecto => proyecto.Id != null);

            if (!String.IsNullOrEmpty(query.InmobiliariaId))
            {
                filter = filter & (Builders<Domain.ProyectoInmobiliario>.Filter.Where(proyecto => proyecto.InmobiliariaId == query.InmobiliariaId));
            }
            if (!String.IsNullOrEmpty(query.Operacion))
            {
                filter = filter & (Builders<Domain.ProyectoInmobiliario>.Filter.Where(proyecto => proyecto.Operacion.ToUpper() == query.Operacion.ToUpper()));
            }

            if (!String.IsNullOrEmpty(query.TipoProyecto))
            {
                filter = filter & (Builders<Domain.ProyectoInmobiliario>.Filter.Where(proyecto => proyecto.TipoProyecto.ToUpper() == query.TipoProyecto.ToUpper()));
            }

            if (query.Estado != Estados.ProyectoInmobiliario.Todos)
            {
                filter = filter & (Builders<Domain.ProyectoInmobiliario>.Filter.Where(proyecto => proyecto.Estado == query.Estado));
            }

            if (query.IdRegion > 0)
            {
                filter = filter & (Builders<Domain.ProyectoInmobiliario>.Filter.Where(proyecto => proyecto.IdRegion == query.IdRegion));
            }

            if (!String.IsNullOrEmpty(query.Comuna))
            {
                filter = filter & (Builders<Domain.ProyectoInmobiliario>.Filter.Where(proyecto => proyecto.Comuna.ToUpper() == query.Comuna.ToUpper()));
            }

            //TODO: Se debe incorporar el filtro de las búsquedas por valoración de las evaluaciones por proyecto 

            return filter;
        }
    }
}
