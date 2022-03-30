using Corretaje.Repository;
using Corretaje.Repository.CustomAttributes;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver.GeoJsonObjectModel;
using System;
using System.Collections.Generic;

namespace Corretaje.Domain
{
    [BsonCollection("Propiedades")]
    [BsonIgnoreExtraElements]
    public class Propiedad : Entity
    {
        [BsonElement("Amoblado")]
        public bool Amoblado { get; set; }

        public bool Delete { get; set; }

        [BsonElement("Disponible")]
        public bool Disponible { get; set; }

        [BsonElement("Destacar")]
        public bool Destacar { get; set; }

        [BsonElement("Estacionamiento")]
        public bool Estacionamiento { get; set; }

        [BsonElement("Exclusividad")]
        public bool Exclusividad { get; set; }

        [BsonElement("PublicadaPortalInmobiliario")]
        public bool PublicadaPortalInmobiliario { get; set; }

        [BsonElement("loc")]
        public Coodenadas Loc { get; set; }

        [BsonElement("SuperficieUtil")]
        public double SuperficieUtil { get; set; }

        [BsonElement("superficieTotales")]
        public double SuperficieTotales { get; set; }

        [BsonElement("Valor")]
        public double Valor { get; set; }

        [BsonElement("FechaVencimiento")]
        public DateTime FechaTermino { get; set; }

        [BsonElement("DisponibilidadPartir")]
        public DateTime Disponibilidad { get; set; }

        [BsonElement("Location")]
        public GeoJsonPoint<GeoJson2DGeographicCoordinates> Location { get; set; }

        [BsonElement("AnioConstruccion")]
        public int AnioConstruccion { get; set; }

        [BsonElement("AñoRegistro")]
        public int AñoRegistro { get; set; }

        [BsonElement("Ap")]
        public string Ap { get; set; }

        [BsonElement("Banio")]
        public int Banio { get; set; }

        [BsonElement("BanioServicio")]
        public bool BanioServicio { get; set; }

        [BsonElement("Bodega")]
        public int Bodega { get; set; }

        [BsonElement("CantEstacionamiento")]
        public int CantEstacionamiento { get; set; }

        [BsonElement("CantDormitorios")]
        public int Dormitorios { get; set; }

        [BsonElement("IdComuna")]
        public int IdComuna { get; set; }

        [BsonElement("IdRegion")]
        public int IdRegion { get; set; }

        [BsonElement("Numero")]
        public int Numero { get; set; }

        [BsonElement("PisoNumero")]
        public int PisoNumero { get; set; }

        [BsonElement("Imagenes")]
        public List<Imagen> Imagenes { get; set; }

        public PropiedadCarCom CarCom { get; set; }

        public PropiedadCaracteristicas PropCar { get; set; }

        [BsonElement("CodigoPropiedad")]
        public string CodigoPropiedad { get; set; }

        [BsonElement("Comuna")]
        public string Comuna { get; set; }

        [BsonElement("Barrio")]
        public string Barrio { get; set; }

        [BsonElement("Condominio")]
        public string Condominio { get; set; }

        [BsonElement("Contribuciones")]
        public string Contribuciones { get; set; }

        public string DireccionReferencial { get; set; }

        [BsonElement("ForjasNombre")]
        public string ForjasNombre { get; set; }

        [BsonElement("ForjasNumero")]
        public string ForjasNumero { get; set; }

        [BsonElement("GastosComunes")]
        public string GastosComunes { get; set; }

        [BsonElement("Glosa")]
        public string Glosa { get; set; }

        [BsonElement("ClienteId")]
        public string IdCliente { get; set; }

        [BsonElement("ImageContainerName")]
        public string ImageContainerName { get; set; }

        public string IdPropiedad { get; set; }

        [BsonElement("NombreCalle")]
        public string NombreCalle { get; set; }

        [BsonElement("ObservacionesInternas")]
        public string ObservacionesInternas { get; set; }

        [BsonElement("ObservacionesPublicas")]
        public string ObservacionesPublicas { get; set; }

        [BsonElement("Operacion")]
        public string Operacion { get; set; }

        [BsonElement("Orientacion")]
        public string Orientacion { get; set; }

        [BsonElement("Region")]
        public string Region { get; set; }

        [BsonElement("ReferenciaCalle")]
        public string ReferenciaCalle { get; set; }

        [BsonElement("ReferenciaCalleA")]
        public string ReferenciaCalleA { get; set; }

        [BsonElement("ReferenciaCalleB")]
        public string ReferenciaCalleB { get; set; }

        [BsonElement("Rol")]
        public string Rol { get; set; }

        [BsonElement("TipoPrecio")]
        public string TipoPrecio { get; set; }

        public string TipoPropiedad { get; set; }

        public string TipoPropiedadInt { get; set; }

        [BsonElement("UrlMattePort")]
        public string UrlMattePort { get; set; }

        [BsonElement("Via")]
        public string Via { get; set; }

        [BsonElement("MostrarCalle")]
        public string MostrarCalle { get; set; }

        [BsonElement("NombreCliente")]
        public string NombreCliente { get; set; }

        [BsonElement("RutCliente")]
        public string RutCliente { get; set; }

        //TODO: MOVER A DTO
        [BsonIgnore]
        public bool PuedeSerOfertada { get; set; }

        //TODO: MOVER A DTO
        [BsonIgnore]
        public DateTime FechaOferta { get; set; }

        [BsonElement("FechaContratacion")]
        public DateTime FechaContratacion { get; set; }

        [BsonIgnore]
        public string IdPlan { get; set; }

        [BsonElement("PlanContratado")]
        public Plan PlanContratado { get; set; }

        [BsonElement("EstadoPropiedad")]
        public Estados.EstadoPropiedad EstadoPropiedad { get; set; }

        [BsonElement("ServiciosAdicionalesContratados")]
        public ICollection<ServicioAdicional>  ServiciosAdicionalesContratados { get; set; }

        [BsonElement("NumeroDepartamento")]
        public int NumeroDepartamento { get; set; }

        public DateTime FechaVisitaFotografo { get; set; }

        public string FechaVisitaFotografoString { get; set; }

        public string HoraVisitaFotografo { get; set; }

        public List<string> HorarioVisitas { get; set; }

        [BsonElement("TieneBodega")]
        public bool TieneBodega { get; set; }

        [BsonElement("IdFotografo")]
        public string IdFotografo { get; set; }

        [BsonElement("IdBroker")]
        public string IdBroker { get; set; }

        [BsonElement("FechaCambioEstadoAPropiedadEntregada")]
        public DateTime FechaCambioEstadoAPropiedadEntregada { get; set; }

        [BsonElement("IdSuscripcionDelComprador")]
        public string IdSuscripcionDelComprador { get; set; }

        [BsonElement("ValorCompraPropiedad")]
        public decimal ValorCompraPropiedad { get; set; }
    }

    public class Propiedades
    {
        public dynamic Propiedad { get; set; }

        public string ApellidosCliente { get; set; }

        public string NombresCliente { get; set; }
    }

    public class Imagen
    {
        private const int IndiceImagenBase64 = 1;
        public string Name { get; set; }
        public string Value { get; set; }
        public string DownloadLink { get; set; }
        public bool EsPortada { get; set; }
        public string ContainerName { get; set; }

        public byte[] GetImageBase64()
        {
            return Convert.FromBase64String(Value.Split(',')[IndiceImagenBase64]);
        }

        public string CreateImageContainerName()
        {
            ContainerName = Guid.NewGuid().ToString();
            return ContainerName;
        }

        public void ClearImage() => Value = "";
    }
}
