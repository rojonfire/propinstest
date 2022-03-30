using Corretaje.Domain;
using System;
using System.Collections.Generic;

namespace Corretaje.Api.Dto.Propiedad
{
    public class PropiedadActualizarDto
    {
        public bool Amoblado { get; set; }

        public bool Delete { get; set; }

        public bool Destacar { get; set; }

        public bool Estacionamiento { get; set; }

        public bool Exclusividad { get; set; }

        public string Id { get; set; }

        public bool PublicadaPortalInmobiliario { get; set; }

        public Coodenadas Loc { get; set; }

        public double SuperficieUtil { get; set; }

        public double superficieTotales { get; set; }

        public double Valor { get; set; }

        public DateTime FechaTermino { get; set; }

        public DateTime Disponibilidad { get; set; }

        //public GeoJsonPoint<GeoJson2DGeographicCoordinates> Location { get; set; }

        public int AnioConstruccion { get; set; }

        public int AñoRegistro { get; set; }

        public int Ap { get; set; }

        public int Banio { get; set; }

        public int CantEstacionamiento { get; set; }

        public int Dormitorios { get; set; }

        public int IdComuna { get; set; }

        public int IdRegion { get; set; }

        public int Numero { get; set; }

        public int PisoNumero { get; set; }

        public List<Imagen> Imagenes { get; set; }

        public PropiedadCarCom CarCom { get; set; }

        public PropiedadCaracteristicas PropCar { get; set; }

        public int Bodega { get; set; }
        
        public bool TieneBodega { get; set; }

        public string CodigoPropiedad { get; set; }

        public string Comuna { get; set; }

        public string Barrio { get; set; }

        public string Condominio { get; set; }

        public string Contribuciones { get; set; }

        public string DireccionReferencial { get; set; }

        public string ForjasNombre { get; set; }

        public string ForjasNumero { get; set; }

        public string GastosComunes { get; set; }

        public string Glosa { get; set; }

        public string IdCliente { get; set; }

        public string ImageContainerName { get; set; }

        public string IdPropiedad { get; set; }

        public string NombreCalle { get; set; }

        public string ObservacionesInternas { get; set; }

        public string ObservacionesPublicas { get; set; }

        public string Operacion { get; set; }

        public string Orientacion { get; set; }

        public string Region { get; set; }

        public string ReferenciaCalle { get; set; }

        public string ReferenciaCalleA { get; set; }

        public string ReferenciaCalleB { get; set; }

        public string Rol { get; set; }

        public string TipoPrecio { get; set; }

        public string TipoPropiedad { get; set; }

        public string TipoPropiedadInt { get; set; }

        public string UrlMattePort { get; set; }

        public string Via { get; set; }

        public string MostrarCalle { get; set; }

        public string IdPlan { get; set; }

        public string FechaVisitaFotografoString { get; set; }

        public string HoraVisitaFotografo { get; set; }

        public string IdFotografo { get; set; }
    }
}
