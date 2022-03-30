using System.Collections.Generic;
using Corretaje.Repository;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver.GeoJsonObjectModel;

namespace Corretaje.Domain
{
    public class ProyectoInmobiliario : Entity
    {
        [BsonElement("Delete")]
        public bool Delete { get; set; }

        [BsonElement("MeetingNumber")]
        public string MeetingNumber { get; set; }

        [BsonElement("MeetingPassword")]
        public string MeetingPassword { get; set; }

        [BsonElement("ApiKey")]
        public string ApiKey { get; set; }

        [BsonElement("ApiSecret")]
        public string ApiSecret { get; set; }

        [BsonElement("UrlProyecto")]
        public string UrlProyecto { get; set; }

        [BsonElement("Destacar")]
        public bool Destacar { get; set; }

        [BsonElement("SuperficieUtilDesde")]
        public double SuperficieUtilDesde { get; set; }

        [BsonElement("loc")]
        public Coodenadas Loc { get; set; }

        [BsonElement("Location")]
        public GeoJsonPoint<GeoJson2DGeographicCoordinates> Location { get; set; }

        [BsonElement("SuperficieTotalesDesde")]
        public double SuperficieTotalesDesde { get; set; }

        [BsonElement("ValorDesde")]
        public double ValorDesde { get; set; }

        [BsonElement("Entrega")]
        public string Entrega { get; set; }

        [BsonElement("IdRegion")]
        public int IdRegion { get; set; }

        [BsonElement("Numero")]
        public int Numero { get; set; }

        [BsonElement("Imagenes")]
        public List<Imagen> Imagenes { get; set; }

        [BsonElement("Modelos")]
        public List<Modelo> Modelos { get; set; }

        [BsonElement("CarCom")]
        public ProyectoCarCom CarCom { get; set; }

        [BsonElement("ProyCar")]
        public ProyectoCaracteristicas ProyCar { get; set; }

        [BsonElement("Comuna")]
        public string Comuna { get; set; }

        [BsonElement("NombreCalle")]
        public string NombreCalle { get; set; }

        [BsonElement("ObservacionesPublicas")]
        public string ObservacionesPublicas { get; set; }

        [BsonElement("DireccionSalaVenta")]
        public string DireccionSalaVenta { get; set; }

        [BsonElement("TelefonoSalaVenta")]
        public string TelefonoSalaVenta { get; set; }

        [BsonElement("EmailSalaVenta")]
        public string EmailSalaVenta { get; set; }

        [BsonElement("TipoPrecio")]
        public string TipoPrecio { get; set; }

        [BsonElement("TipoProyecto")]
        public string TipoProyecto { get; set; }

        [BsonElement("UrlMattePort")]
        public string UrlMattePort { get; set; }

        [BsonElement("TipoVia")]
        public string TipoVia { get; set; }

        [BsonElement("Estado")]
        public Estados.ProyectoInmobiliario Estado { get; set; }

        [BsonElement("InmobiliariaId")]
        public string InmobiliariaId { get; set; }

        [BsonElement("NombreInmobiliaria")]
        public string NombreInmobiliaria { get; set; }

        [BsonElement("Nombre")]
        public string Nombre { get; set; }

        [BsonElement("Operacion")]
        public string Operacion { get; set; }

        [BsonElement("Rentabilidad")]
        public bool Rentabilidad { get; set; }

        [BsonElement("Conectividad")]
        public bool Conectividad { get; set; }

        [BsonElement("Terminaciones")]
        public bool Terminaciones { get; set; }

        [BsonElement("Equipamiento")]
        public bool Equipamiento { get; set; }
        
        [BsonElement("HabilitarLive")]
        public bool HabilitarLive { get; set; }

        [BsonElement("HtmlbuttonLink")]
        public string HtmlbuttonLink { get; set; }

        public void SetNombre(string nombre) => Nombre = nombre;        

        public void SetInmobiliariaId(string inmobiliariaId) => InmobiliariaId = inmobiliariaId;

        public void SetHtmlbuttonLink(string htmlbuttonLink) => HtmlbuttonLink = htmlbuttonLink;

        public void Update(ProyectoInmobiliario proyecto)
        {
            Destacar = proyecto.Destacar;

            MeetingNumber = proyecto.MeetingNumber;

            MeetingPassword = proyecto.MeetingPassword;

            ApiKey = proyecto.ApiKey;

            ApiSecret = proyecto.ApiSecret;

            UrlProyecto = proyecto.UrlProyecto;

            SuperficieUtilDesde = proyecto.SuperficieUtilDesde;

            SuperficieTotalesDesde = proyecto.SuperficieTotalesDesde;

            ValorDesde = proyecto.ValorDesde;

            Entrega = proyecto.Entrega;

            IdRegion = proyecto.IdRegion;

            Numero = proyecto.Numero;

            Imagenes = proyecto.Imagenes;

            Modelos = proyecto.Modelos;

            CarCom = proyecto.CarCom;

            ProyCar = proyecto.ProyCar;

            Comuna = proyecto.Comuna;

            NombreCalle = proyecto.NombreCalle;

            ObservacionesPublicas = proyecto.ObservacionesPublicas;

            DireccionSalaVenta = proyecto.DireccionSalaVenta;

            TelefonoSalaVenta = proyecto.TelefonoSalaVenta;

            EmailSalaVenta = proyecto.EmailSalaVenta;

            TipoPrecio = proyecto.TipoPrecio;

            TipoProyecto = proyecto.TipoProyecto;

            UrlMattePort = proyecto.UrlMattePort;

            TipoVia = proyecto.TipoVia;

            Estado = proyecto.Estado;

            NombreInmobiliaria = proyecto.NombreInmobiliaria;

            Nombre = proyecto.Nombre;

            Operacion = proyecto.Operacion;

            Rentabilidad = proyecto.Rentabilidad;

            Conectividad = proyecto.Conectividad;

            Terminaciones = proyecto.Terminaciones;

            Equipamiento = proyecto.Equipamiento;

            HabilitarLive = proyecto.HabilitarLive;

            HtmlbuttonLink = proyecto.HtmlbuttonLink;
    }
    }
}
