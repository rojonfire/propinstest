using Corretaje.Service.IServices.IPropiedad;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using static Corretaje.Domain.Estados;

namespace Corretaje.Service.Services.Propiedad
{
    public class PropiedadQueryFiltro : IPropiedadQueryFiltro
    {
        public FilterDefinition<Domain.Propiedad> FindByBusquedaUsuario(Domain.Busqueda parametrosBusqueda)
        {
            FilterDefinition<Domain.Propiedad> filter = FilterDefinition<Domain.Propiedad>.Empty;

            filter &= FindByEstaDisponible();

            if (IncluirParametro(parametrosBusqueda.Amoblado))
            {
                filter &= FindByEsAmoblado();
            }

            if (IncluirParametro(parametrosBusqueda.Bodega))
            {
                filter &= FindByTieneBodega();
            }

            if (IncluirParametro(parametrosBusqueda.DormitoriosDes))
            {
                filter &= FindByDormitorioDesde(parametrosBusqueda.DormitoriosDes);
            }

            if (IncluirParametro(parametrosBusqueda.BanioDes))
            {
                filter &= FindByBanioDesde(parametrosBusqueda.BanioDes);
            }

            if (IncluirParametro(parametrosBusqueda.Estacionamiento))
            {
                filter &= FindByTieneEstacionamiento();
            }

            if (IncluirParametro(parametrosBusqueda.Comuna))
            {
                filter &= FindByDireccion(parametrosBusqueda.Comuna);
            }

            if (IncluirParametro(parametrosBusqueda.Lat))
            {
                filter = FindByCoordenadas(parametrosBusqueda.Lat, parametrosBusqueda.Lng);
            }

            if (IncluirParametro(parametrosBusqueda.SuperficieUtilDes))
            {
                filter &= FindBySuperficieUtilDesde(parametrosBusqueda.SuperficieUtilDes);
            }

            if (IncluirParametro(parametrosBusqueda.SuperficieUtilHas))
            {
                filter &= FindBySuperficieUtilHasta(parametrosBusqueda.SuperficieUtilHas);
            }

            if (IncluirParametro(parametrosBusqueda.TipoOperacion))
            {
                filter &= FindByTipoOperacion(parametrosBusqueda.TipoOperacion);
            }

            if (IncluirParametro(parametrosBusqueda.TipoPrecio))
            {
                filter &= FindByTipoPrecio(parametrosBusqueda.TipoPrecio);
            }

            if (IncluirParametro(parametrosBusqueda.TipoPropiedad))
            {
                filter &= FindByTipoPropiedad(parametrosBusqueda.TipoPropiedad);
            }

            if (IncluirParametro(parametrosBusqueda.ValorDesde))
            {
                filter &= FindByValorDesde(parametrosBusqueda.ValorDesde);
            }

            if (IncluirParametro(parametrosBusqueda.ValorHasta))
            {
                filter &= FindByValorHasta(parametrosBusqueda.ValorHasta);
            }

            return filter;
        }

        public FilterDefinition<Domain.Propiedad> Filtrar(Domain.Suscripcion suscripcion, double factorSuperficieInferior, double factorSuperficieSuperior, int sumaEstacionamientos, EstadoPropiedad estadoPropiedad)
        {
            FilterDefinition<Domain.Propiedad> filter = FilterDefinition<Domain.Propiedad>.Empty;
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

            if (suscripcion.CantidadDormitoriosDesde != 0)
            {
                filter &= FindByDormitorioDesde(suscripcion.CantidadDormitoriosDesde);
            }

            if (suscripcion.CantidadDormitoriosHasta != 0)
            {
                filter &= FindByDormitorioHasta(suscripcion.CantidadDormitoriosHasta);
            }

            if (suscripcion.CantidadBanosDesde != 0)
            {
                filter &= FindByBanioDesde(suscripcion.CantidadBanosDesde);
            }

            if (suscripcion.CantidadBanosHasta != 0)
            {
                filter &= FindByBanioHasta(suscripcion.CantidadBanosHasta);
            }

            if (suscripcion.MetrosUtilesDesde != 0)
            {
                filter &= FindBySuperficieUtilDesde(suscripcion.MetrosUtilesDesde, factorSuperficieInferior);
            }

            if (suscripcion.MetrosUtilesHasta != 0)
            {
                filter &= FindBySuperficieUtilHasta(suscripcion.MetrosUtilesHasta, factorSuperficieSuperior);
            }

            if (suscripcion.MetrosTotalesDesde != 0)
            {
                filter &= FindBySuperficieTotalDesde(suscripcion.MetrosTotalesDesde, factorSuperficieInferior);
            }

            if (suscripcion.MetrosTotalesHasta != 0)
            {
                filter &= FindBySuperficieTotalHasta(suscripcion.MetrosTotalesHasta, factorSuperficieSuperior);
            }

            if (suscripcion.CantidadEstacionamientos != 0)
            {
                filter &= FindByCantidadeEstacionamientos(suscripcion.CantidadEstacionamientos, sumaEstacionamientos);
            }

            if (suscripcion.ValorDesde != 0)
            {
                filter &= FindByValorDesde(suscripcion.ValorDesde);
            }

            if (suscripcion.ValorHasta != 0)
            {
                filter &= FindByValorHasta(suscripcion.ValorHasta);
            }

            if (suscripcion.TipoPropiedad != null)
            {
                filter &= FindByTipoPropiedad(suscripcion.TipoPropiedad);
            }

            filter &= FindPropiedadesByEstado(estadoPropiedad);

            return filter;
        }

        /// <summary>
        /// Todas las propiedades deben estar ordenadas en función de las destacadas y la fecha de creacion
        /// </summary>
        /// <returns></returns>
        private SortDefinition<Domain.Propiedad> SortByDestacadasFechaCreacion()
        {
            return Builders<Domain.Propiedad>.Sort.Descending(propiedad => propiedad.Destacar).Descending(propiedad => propiedad.CreatedAt);
        }

        private FilterDefinition<Domain.Propiedad> GetPropiedadesByComunaList(List<string> comunasList)
        {
            return Builders<Domain.Propiedad>.Filter.In("Comuna", comunasList);
        }

        public SortDefinition<Domain.Propiedad> SortByFechaCreacion()
        {
            return Builders<Domain.Propiedad>.Sort.Descending(propiedad => propiedad.CreatedAt);
        }

        public FilterDefinition<Domain.Propiedad> FindPropiedadPorExpirar(DateTime fechaPorExpirar)
        {
            return Builders<Domain.Propiedad>.Filter.Where(propiedad => propiedad.FechaTermino <= fechaPorExpirar);
        }

        public SortDefinition<Domain.Propiedad> SortByPrecio(bool desc)
        {
            return desc ?
                Builders<Domain.Propiedad>.Sort.Descending(propiedad => propiedad.Valor) :
                Builders<Domain.Propiedad>.Sort.Ascending(propiedad => propiedad.Valor);
        }

        public SortDefinition<Domain.Propiedad> SortByPropiedadDestacada()
        {
            return Builders<Domain.Propiedad>.Sort.Descending(propiedad => propiedad.Destacar);
        }

        private FilterDefinition<Domain.Propiedad> FindByBanioDesde(int banioCantidad)
        {
            return Builders<Domain.Propiedad>.Filter.Where(propiedad => propiedad.Banio >= banioCantidad);
        }

        private FilterDefinition<Domain.Propiedad> FindByBanioHasta(int banioCantidad)
        {
            return Builders<Domain.Propiedad>.Filter.Where(propiedad => propiedad.Banio <= banioCantidad);
        }

        private FilterDefinition<Domain.Propiedad> FindByCoordenadas(string latitud, string longitud)
        {
            string query = "{Location : {$near: {$geometry: { type : 'Point', coordinates : [" + latitud + "," + longitud + "]}, $maxDistance : 8000 }}}";

            return MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(query);
        }

        private FilterDefinition<Domain.Propiedad> FindByDireccion(string direccion)
        {
            return Builders<Domain.Propiedad>.Filter.Where(propiedad => propiedad.Comuna.ToLower() == direccion.ToLower());
        }

        private FilterDefinition<Domain.Propiedad> FindByDormitorioDesde(int dormitorioCantidad)
        {
            return Builders<Domain.Propiedad>.Filter.Where(propiedad => propiedad.Dormitorios >= dormitorioCantidad);
        }

        private FilterDefinition<Domain.Propiedad> FindByDormitorioHasta(int dormitorioCantidad)
        {
            return Builders<Domain.Propiedad>.Filter.Where(propiedad => propiedad.Dormitorios <= dormitorioCantidad);
        }

        private FilterDefinition<Domain.Propiedad> FindByEsAmoblado()
        {
            return Builders<Domain.Propiedad>.Filter.Where(propiedad => propiedad.Amoblado);
        }

        private FilterDefinition<Domain.Propiedad> FindByEstaDisponible()
        {
            return Builders<Domain.Propiedad>.Filter.Where(propiedad => propiedad.Disponible == true);
        }

        private FilterDefinition<Domain.Propiedad> FindBySuperficieUtilDesde(double superficie, double factorRangoInferior = 1)
        {
            return Builders<Domain.Propiedad>.Filter.Where(propiedad => propiedad.SuperficieUtil >= superficie * factorRangoInferior);
        }

        private FilterDefinition<Domain.Propiedad> FindBySuperficieUtilHasta(double superficie, double factorRangoSuperior = 1)
        {
            return Builders<Domain.Propiedad>.Filter.Where(propiedad => propiedad.SuperficieUtil <= superficie * factorRangoSuperior);
        }

        private FilterDefinition<Domain.Propiedad> FindBySuperficieTotalDesde(double superficie, double factorRangoInferior = 1)
        {
            return Builders<Domain.Propiedad>.Filter.Where(propiedad => propiedad.SuperficieTotales >= superficie * factorRangoInferior);
        }

        private FilterDefinition<Domain.Propiedad> FindBySuperficieTotalHasta(double superficie, double factorRangoSuperior = 1)
        {
            return Builders<Domain.Propiedad>.Filter.Where(propiedad => propiedad.SuperficieTotales <= superficie * factorRangoSuperior);
        }

        public FilterDefinition<Domain.Propiedad> FindAll()
        {
            return Builders<Domain.Propiedad>.Filter.Exists(propiedad => propiedad.Id, true);
        }

        private FilterDefinition<Domain.Propiedad> FindByTieneBodega()
        {
            return Builders<Domain.Propiedad>.Filter.Where(propiedad => propiedad.Bodega > 0);
        }

        private FilterDefinition<Domain.Propiedad> FindByTieneEstacionamiento()
        {
            return Builders<Domain.Propiedad>.Filter.Where(propiedad => propiedad.CantEstacionamiento > 0);
        }

        private FilterDefinition<Domain.Propiedad> FindByCantidadeEstacionamientos(int cantidadEstacionamientos, int valorCorreccion = 0)
        {
            return Builders<Domain.Propiedad>.Filter.Where(propiedad => propiedad.CantEstacionamiento <= (cantidadEstacionamientos + valorCorreccion));
        }

        private FilterDefinition<Domain.Propiedad> FindByTipoOperacion(string operacion)
        {
            return Builders<Domain.Propiedad>.Filter.Where(propiedad => propiedad.Operacion.ToLower() == operacion.ToLower());
        }

        private FilterDefinition<Domain.Propiedad> FindByCodPRopiedad(string codpropiedad)
        {
            return Builders<Domain.Propiedad>.Filter.Where(propiedad =>
                propiedad.CodigoPropiedad.ToLower() == codpropiedad.ToLower());
        }

        private FilterDefinition<Domain.Propiedad> FindByTipoPrecio(string tipoPrecio)
        {
            return Builders<Domain.Propiedad>.Filter.Where(propiedad => propiedad.TipoPrecio.ToLower() == tipoPrecio.ToLower());
        }

        private FilterDefinition<Domain.Propiedad> FindByTipoPropiedad(string tipoPropiedad)
        {
            return Builders<Domain.Propiedad>.Filter.Where(propiedad => propiedad.TipoPropiedad.ToLower() == tipoPropiedad.ToLower());
        }

        private FilterDefinition<Domain.Propiedad> FindByValorDesde(double valor)
        {
            return Builders<Domain.Propiedad>.Filter.Where(propiedad => propiedad.Valor >= valor);
        }

        private FilterDefinition<Domain.Propiedad> FindByValorHasta(double valor)
        {
            return Builders<Domain.Propiedad>.Filter.Where(propiedad => propiedad.Valor <= valor);
        }

        public FilterDefinition<Domain.Propiedad> FindByClienteId(string ClienteId)
        {
            return Builders<Domain.Propiedad>.Filter.Where(propiedad => propiedad.IdCliente == ClienteId);
        }

        public FilterDefinition<Domain.Propiedad> FindPropiedadesByEstado(EstadoPropiedad estadoPropiedad)
        {
            return Builders<Domain.Propiedad>.Filter.Where(propiedad => propiedad.EstadoPropiedad == estadoPropiedad);
        }

        public FilterDefinition<Domain.Propiedad> FindPropiedadesByIdBroker(string idBroker)
        {
            return Builders<Domain.Propiedad>.Filter.Where(propiedad => propiedad.IdBroker == idBroker);
        }

        public FilterDefinition<Domain.Propiedad> FindPropiedadesByTieneContrato()
        {
            return Builders<Domain.Propiedad>.Filter.Where(propiedad => propiedad.PlanContratado != null);
        }

        public FilterDefinition<Domain.Propiedad> FindByTipoOperacionTipoPropiedad(IGrouping<string, Domain.Busqueda> busquedasPorUsuario)
        {
            var tiposOperaciones = busquedasPorUsuario.Select(busqueda => busqueda.TipoOperacion);
            var tiposViviendas = busquedasPorUsuario.Select(busqueda => busqueda.TipoPropiedad);

            return Builders<Domain.Propiedad>
                .Filter
                .Where(busqueda => tiposOperaciones
                .Contains(busqueda.Operacion) && tiposViviendas
                .Contains(busqueda.TipoPropiedad));
        }

        private bool IncluirParametro(bool parametro)
        {
            return parametro;
        }

        private bool IncluirParametro(double parametro)
        {
            return parametro != 0;
        }

        private bool IncluirParametro(int parametro)
        {
            return parametro != 0;
        }

        private bool IncluirParametro(string parametro)
        {
            return !string.IsNullOrEmpty(parametro);
        }
    }
}
