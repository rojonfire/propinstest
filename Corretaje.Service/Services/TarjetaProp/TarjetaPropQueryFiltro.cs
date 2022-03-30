using Corretaje.Service.IServices.ITarjetaProp;
using MongoDB.Driver;

namespace Corretaje.Service.Services.TarjetaProp
{
    public class TarjetaPropQueryFiltro : ITarjetaPropQueryFiltro
    {
          public FilterDefinition<Domain.TarjetaProp> FindByBusquedaUsuario(Domain.Busqueda parametrosBusqueda)
        {
            FilterDefinition<Domain.TarjetaProp> filter = FilterDefinition<Domain.TarjetaProp>.Empty;

            filter &= FindByEstaDisponible();

            if (IncluirParametro(parametrosBusqueda.FiltrarUsada))
            {
                filter &= FindByUsado(parametrosBusqueda.Usada);
            }

            if (IncluirParametro(parametrosBusqueda.FiltrarAmoblado))
            {
                filter &= FindByEsAmoblado(parametrosBusqueda.Amoblado);
            }

            if (IncluirParametro(parametrosBusqueda.FiltrarBodega))
            {
                filter &= FindByTieneBodega(parametrosBusqueda.Bodega);
            }

            if (IncluirParametro(parametrosBusqueda.DormitoriosDes))
            {
                filter &= FindByDormitorioDesde(parametrosBusqueda.DormitoriosDes);
            }

            if (IncluirParametro(parametrosBusqueda.BanioDes))
            {
                filter &= FindByBanioDesde(parametrosBusqueda.BanioDes);
            }

            if (IncluirParametro(parametrosBusqueda.FiltrarEstacionamiento))
            {
                filter &= FindByTieneEstacionamiento(parametrosBusqueda.Estacionamiento);
            }

            if (IncluirParametro(parametrosBusqueda.SuperficieUtilDes))
            {
                filter &= FindBySuperficieUtilDesde(parametrosBusqueda.SuperficieUtilDes);
            }

            if (IncluirParametro(parametrosBusqueda.SuperficieUtilHas))
            {
                filter &= FindBySuperficieUtilHasta(parametrosBusqueda.SuperficieUtilHas);
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

            if (IncluirParametro(parametrosBusqueda.Comuna))
            {
                filter &= FindByComuna(parametrosBusqueda.Comuna);
            }

            if (IncluirParametro(parametrosBusqueda.TipoOperacion))
            {
                filter &= FindByTipoOperacion(parametrosBusqueda.TipoOperacion);
            }
            return filter;
        }

          public SortDefinition<Domain.TarjetaProp> SortbyPrecio(bool desc)
          {
              return desc
                  ? Builders<Domain.TarjetaProp>.Sort.Descending(tarjetaProp => tarjetaProp.Valor)
                  : Builders<Domain.TarjetaProp>.Sort.Ascending(tarjetaProp => tarjetaProp.Valor);
          }
          
          private FilterDefinition<Domain.TarjetaProp> FindByUsado(bool usado)
          {
           return Builders<Domain.TarjetaProp>.Filter.Where(tarjetaProp => tarjetaProp.Usado == usado);
              // return Builders<Domain.TarjetaProp>.Filter.Where(tarjetaProp => tarjetaProp.Usado);
          }

        public FilterDefinition<Domain.TarjetaProp> FindByCodPRopiedad(string codPropiedad)
        {
            return Builders<Domain.TarjetaProp>.Filter.Where(tarjetaProp =>
                tarjetaProp.CodPropiedad.ToLower() == codPropiedad.ToLower());
        }

        private FilterDefinition<Domain.TarjetaProp> FindByValorHasta(double valor)
        {
            return Builders<Domain.TarjetaProp>.Filter.Where(tarjetaProp => tarjetaProp.Valor <= valor);
        }

        private FilterDefinition<Domain.TarjetaProp> FindBySuperficieUtilHasta(double superficie)
        {
            return Builders<Domain.TarjetaProp>.Filter.Where(tarjetaProp => tarjetaProp.M2Utiles <= superficie);
        }

        private FilterDefinition<Domain.TarjetaProp> FindByValorDesde(double valor)
        {
            return Builders<Domain.TarjetaProp>.Filter.Where(tarjetaProp => tarjetaProp.Valor >= valor);
        }

        private FilterDefinition<Domain.TarjetaProp> FindByTipoPropiedad(string tipoPropiedad)
        {
            return Builders<Domain.TarjetaProp>.Filter.Where(tarjetaProp =>
                tarjetaProp.TipoPropiedad.ToLower() == tipoPropiedad.ToLower());
        }

        private FilterDefinition<Domain.TarjetaProp> FindByTipoOperacion(string tipoOperacion)
        {
            return Builders<Domain.TarjetaProp>.Filter.Where(tarjetaProp =>
                tarjetaProp.TipoOperacion.ToLower() == tipoOperacion.ToLower());
        }

        private FilterDefinition<Domain.TarjetaProp> FindBySuperficieUtilDesde(double superficie)
        {
            return Builders<Domain.TarjetaProp>.Filter.Where(tarjetaProp => tarjetaProp.M2Utiles >= superficie);
        }

        private FilterDefinition<Domain.TarjetaProp> FindByTieneEstacionamiento(bool estacionamiento)
        {
            return Builders<Domain.TarjetaProp>.Filter.Where(tarjetaProp => tarjetaProp.Estacionamiento == estacionamiento);
        }

        private FilterDefinition<Domain.TarjetaProp> FindByBanioDesde(int banioCantidad)
        {
            return Builders<Domain.TarjetaProp>.Filter.Where(tarjetaProp => tarjetaProp.Banos == banioCantidad);
        }

        private FilterDefinition<Domain.TarjetaProp> FindByDormitorioDesde(int dormitorioCantidad)
        {
            return Builders<Domain.TarjetaProp>.Filter.Where(
                tarjetaProp => tarjetaProp.Dormitorio == dormitorioCantidad);
        }

        private FilterDefinition<Domain.TarjetaProp> FindByTieneBodega(bool bodega)
        {
            if (bodega)
            {
                return Builders<Domain.TarjetaProp>.Filter.Where(tarjetaProp => tarjetaProp.Bodega > 0);
            }
            else
            {
                return Builders<Domain.TarjetaProp>.Filter.Where(tarjetaProp => tarjetaProp.Bodega <= 0);
            }
        }

        private FilterDefinition<Domain.TarjetaProp> FindByEsAmoblado(bool amoblado)
        {
            return Builders<Domain.TarjetaProp>.Filter.Where(tarjetaProp => tarjetaProp.Amoblado == amoblado);
        }

        private FilterDefinition<Domain.TarjetaProp> FindByComuna(string comuna)
        {
            return Builders<Domain.TarjetaProp>.Filter.Where(tarjetaProp => tarjetaProp.Comuna == comuna);
        }

        private bool IncluirParametro(double parametro)
        {
            return parametro != 0;
        }

        private bool IncluirParametro(bool parametro)
        {
            return parametro;
        }

        private bool IncluirParametro(string parametro)
        {
            return !string.IsNullOrEmpty(parametro);
        }

        private static FilterDefinition<Domain.TarjetaProp> FindByEstaDisponible()
        {
            return Builders<Domain.TarjetaProp>.Filter.Where(tarjetaProp => tarjetaProp.Disponible);
        }
    }
}