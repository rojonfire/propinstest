using Corretaje.Domain.PropiedadesPI;
using Corretaje.Service.IServices.IPropiedadesPI;
using MongoDB.Driver;
using System.Collections.Generic;

namespace Corretaje.Service.Services.PropiedadesPI
{
    public class PIPropiedadQueryFiltro<T> : IPIPropiedadQueryFiltro<T> where T : PIPropiedad
    {
        public FilterDefinition<T> Filtrar(Domain.Suscripcion suscripcion, double factorSuperficieInferior, double factorSuperficieSuperior, int sumaEstacionamientos)
        {
            FilterDefinition<T> filter = FilterDefinition<T>.Empty;
            if (suscripcion.ComunaUno != null)
            {
                List<string> comunasList = new List<string>();
                comunasList.Add(suscripcion.ComunaUno);
                if (suscripcion.ComunaDos != null)
                {
                    comunasList.Add(suscripcion.ComunaDos);
                    if (suscripcion.ComunaTres != null)
                    {
                        comunasList.Add(suscripcion.ComunaTres);
                    }
                }

                filter &= GetPropiedadesByComunaList(comunasList);
            }
            
            if (suscripcion.CantidadDormitoriosDesde != 0 && suscripcion.CantidadDormitoriosHasta != 0)
            {
                filter &= GetPropiedadesByRangoDormitorios(suscripcion.CantidadDormitoriosDesde, suscripcion.CantidadDormitoriosHasta);
            }

            if (suscripcion.CantidadBanosDesde != 0 && suscripcion.CantidadBanosHasta != 0)
            {
                filter &= GetPropiedadesByRangoBanios(suscripcion.CantidadBanosDesde, suscripcion.CantidadBanosHasta);
            }

            if (suscripcion.MetrosUtilesDesde != 0 && suscripcion.MetrosUtilesHasta != 0)
            {
                filter &= GetPropiedadesByRangoSuperficieUtil(suscripcion.MetrosUtilesDesde, suscripcion.MetrosUtilesHasta, factorSuperficieInferior, factorSuperficieSuperior);
            }

            if (suscripcion.MetrosTotalesDesde != 0 && suscripcion.MetrosTotalesHasta != 0)
            {
                filter &= GetPropiedadesByRangoSuperficieTotal(suscripcion.MetrosTotalesDesde, suscripcion.MetrosTotalesHasta, factorSuperficieInferior, factorSuperficieSuperior);
            }

            if (suscripcion.CantidadEstacionamientos != 0)
            {
                filter &= GetPropiedadesByCantidadEstacionamientos(suscripcion.CantidadEstacionamientos, sumaEstacionamientos);
            }

            if (suscripcion.ValorDesde != 0 && suscripcion.ValorHasta != 0)
            {
                filter &= GetPropiedadesByRangoPrecio(suscripcion.ValorDesde, suscripcion.ValorHasta);
            }

            if (suscripcion.TipoPropiedad != null)
            {
                filter &= GetPropiedadesByTipoPropiedad(suscripcion.TipoPropiedad);
            }

            return filter;
        }

        private FilterDefinition<T> GetPropiedadesByComunaList(List<string> comunasList)
        {
            return Builders<T>.Filter.In("Comuna", comunasList);
        }

        private FilterDefinition<T> GetPropiedadesByRangoDormitorios(int minDormitorios, int maxDormitorios)
        {
            return Builders<T>.Filter.Where(t => t.Dormitorios >= minDormitorios && t.Dormitorios <= maxDormitorios);
        }

        private FilterDefinition<T> GetPropiedadesByRangoBanios(int minBanios, int maxBanios)
        {
            return Builders<T>.Filter.Where(t => t.Banios >= minBanios && t.Banios <= maxBanios);
        }

        private FilterDefinition<T> GetPropiedadesByRangoSuperficieUtil(double minSuperficieUtil, double maxSuperficieUtil, double factorSuperficieInferior, double factorSuperficieSuperior)
        {
            return Builders<T>.Filter.Where(t => t.SuperficieUtil >= minSuperficieUtil*factorSuperficieInferior && t.SuperficieUtil <= maxSuperficieUtil*factorSuperficieSuperior);
        }

        private FilterDefinition<T> GetPropiedadesByRangoSuperficieTotal(double minSuperficieTotal, double maxSuperficieTotal, double factorSuperficieInferior, double factorSuperficieSuperior)
        {
            return Builders<T>.Filter.Where(t => t.SuperficieTotal >= minSuperficieTotal*factorSuperficieInferior && t.SuperficieTotal <= maxSuperficieTotal*factorSuperficieSuperior);
        }

        private FilterDefinition<T> GetPropiedadesByCantidadEstacionamientos(int estacionamientos, int sumaEstacionamientos)
        {
            return Builders<T>.Filter.Where(t => t.Estacionamientos <= (estacionamientos + sumaEstacionamientos));
        }

        private FilterDefinition<T> GetPropiedadesByRangoPrecio(double minPrecio, double maxPrecio)
        {
            return Builders<T>.Filter.Where(t => t.Precio >= minPrecio && t.Precio <= maxPrecio);
        }

        private FilterDefinition<T> GetPropiedadesByTipoPropiedad(string tipoPropiedad)
        {
            return Builders<T>.Filter.Where(t => t.TipoPropiedad.ToLower() == tipoPropiedad.ToLower());
        }

        public SortDefinition<T> SortByFechaCreacion()
        {
            return Builders<T>.Sort.Descending(t => t.CreatedAt);
        }
    }
}
