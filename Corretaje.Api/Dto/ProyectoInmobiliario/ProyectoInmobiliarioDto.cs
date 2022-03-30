using System.Collections.Generic;
using Corretaje.Domain;
using MongoDB.Driver.GeoJsonObjectModel;

namespace Corretaje.Api.Dto
{
    public class ProyectoInmobiliarioDto : EntityDto
    {
        public bool Delete { get; set; }

        public string MeetingNumber { get; set; }

        public string MeetingPassword { get; set; }

        public string ApiKey { get; set; }

        public string ApiSecret { get; set; }

        public string UrlProyecto { get; set; }

        public bool Destacar { get; set; }

        public double SuperficieUtilDesde { get; set; }

        public Coodenadas Loc { get; set; }

        public GeoJsonPoint<GeoJson2DGeographicCoordinates> Location { get; set; }

        public double SuperficieTotalesDesde { get; set; }

        public double ValorDesde { get; set; }

        public string Entrega { get; set; }
        
        public int IdRegion { get; set; }

        public int Numero { get; set; }

        public List<Imagen> Imagenes { get; set; }

        public List<Modelo> Modelos { get; set; }

        public ProyectoCarCom CarCom { get; set; }

        public ProyectoCaracteristicas ProyCar { get; set; }

        public string Comuna { get; set; }

        public string NombreCalle { get; set; }

        public string ObservacionesPublicas { get; set; }

        public string DireccionSalaVenta { get; set; }

        public string TelefonoSalaVenta { get; set; }

        public string EmailSalaVenta { get; set; }

        public string TipoPrecio { get; set; }

        public string TipoProyecto { get; set; }        

        public string TipoVia { get; set; }

        public Estados.ProyectoInmobiliario Estado { get; set; }

        public string InmobiliariaId { get; set; }

        public string NombreInmobiliaria { get; set; }

        public string Nombre { get; set; }
        
        public string Operacion { get; set; }

        public bool Rentabilidad { get; set; }

        public bool Conectividad { get; set; }

        public bool Terminaciones { get; set; }

        public bool Equipamiento { get; set; }

        public int EvaluacionConectividad { get; set; }

        public int EvaluacionEquipamiento { get; set; }

        public int EvaluacionRentabilidad { get; set; }

        public int EvaluacionTerminaciones { get; set; }

        public string HtmlbuttonLink { get; set; }

        public string UrlMattePort { get; set; }

        public bool HabilitarLive { get; set; }
    }
}
