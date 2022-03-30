using Corretaje.Service.IServices.IDatosTasacion;
using MongoDB.Driver;

namespace Corretaje.Service.Services.DatosTasacion
{
    public class DatosTasacionQueryFiltro<T> : IDatosTasacionQueryFiltro<T> where T : Domain.Tasacion.DatosTasacion
    {
        public FilterDefinition<T> FiltrarParaTasacion(
            Domain.Tasacion.TasacionPropiedad datosTasacion, 
            double factorRangoInferiorSuperficieUtil, 
            double factorRangoSuperiorSuperficieUtil, 
            double factorRangoInferiorSuperficieTotal, 
            double factorRangoSuperiorSuperficieTotal
            )
        {
            FilterDefinition<T> filter = FilterDefinition<T>.Empty;

            //si la tasacion es para arriendo
            if (typeof(T) == typeof(Domain.Tasacion.DatosTasacionArriendo))
            {
                if (datosTasacion.MetrosUtiles != 0)
                {
                    filter &= GetDatosTasacionByRangoSuperficieUtil(datosTasacion.MetrosUtiles, factorRangoInferiorSuperficieUtil, factorRangoSuperiorSuperficieUtil);
                }
            } else //si la tasacion es para venta
            {
                if (datosTasacion.Comuna != null && datosTasacion.Comuna != "")
                {
                    filter &= GetDatosTasacionByComuna(datosTasacion.Comuna);
                }
                if (datosTasacion.NumeroEstacionamientos != 0)
                {
                    filter &= GetDatosTasacionByCantidadEstacionamientos(datosTasacion.NumeroEstacionamientos);
                }
            }
            
            if (datosTasacion.Sector != null && datosTasacion.Sector != "")
            {
                filter &= GetDatosTasacionByBarrio(datosTasacion.Sector);
            }
            if (datosTasacion.MetrosTotales != 0)
            {
                filter &= GetDatosTasacionByRangoSuperficieTotal(datosTasacion.MetrosTotales, factorRangoInferiorSuperficieTotal, factorRangoSuperiorSuperficieTotal);
            }
            if (datosTasacion.NumeroDormitorios != 0)
            {
                filter &= GetDatosTasacionByCantidadDormitorios(datosTasacion.NumeroDormitorios);
            }
           
            if (datosTasacion.TipoVivienda != null && datosTasacion.TipoVivienda != "")
            {
                filter &= GetDatosTasacionByTipoVivienda(datosTasacion.TipoVivienda);
            }

            return filter;
        }

        private FilterDefinition<T> GetDatosTasacionByTipoVivienda(string tipoVivienda)
        {
            return Builders<T>.Filter.Where(t => t.TipoPropiedad == tipoVivienda);
        }

        private FilterDefinition<T> GetDatosTasacionByCantidadDormitorios(int cantidadDormitorios)
        {
            return Builders<T>.Filter.Where(t => t.Dormitorios == cantidadDormitorios);
        }

        private FilterDefinition<T> GetDatosTasacionByCantidadEstacionamientos(int cantidadEstacionamientos)
        {
            return Builders<T>.Filter.Where(t => t.Estacionamientos == cantidadEstacionamientos);
        }

        private FilterDefinition<T> GetDatosTasacionByBarrio(string barrio)
        {
            return Builders<T>.Filter.Where(t => t.Barrio == barrio);
        }

        private FilterDefinition<T> GetDatosTasacionByComuna(string comuna)
        {
            return Builders<T>.Filter.Where(t => t.Comuna == comuna);
        }

        private FilterDefinition<T> GetDatosTasacionByRangoSuperficieTotal(int metrosTotales, double factorRangoInferiorSuperficieTotal, double factorRangoSuperiorSuperficieTotal)
        {
            return Builders<T>.Filter.Where(t => t.SuperficieTotal >= metrosTotales*factorRangoInferiorSuperficieTotal && t.SuperficieTotal <= metrosTotales*factorRangoSuperiorSuperficieTotal);
        }

        private FilterDefinition<T> GetDatosTasacionByRangoSuperficieUtil(int metrosUtiles, double factorRangoInferiorSuperficieUtil, double factorRangoSuperiorSuperficieUtil)
        {
            return Builders<T>.Filter.Where(t => t.SuperficieTotal >= metrosUtiles * factorRangoInferiorSuperficieUtil && t.SuperficieTotal <= metrosUtiles * factorRangoSuperiorSuperficieUtil);
        }

        public SortDefinition<T> SortByFechaCreacion()
        {
            return Builders<T>.Sort.Descending(t => t.CreatedAt);
        }
    }
}
