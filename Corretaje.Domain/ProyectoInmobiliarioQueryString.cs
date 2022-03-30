using Corretaje.Repository;
using MongoDB.Bson.Serialization.Attributes;

namespace Corretaje.Domain
{
    public class ProyectoInmobiliarioQueryString : Entity
    {
        [BsonElement("InmobiliariaId")]
        public string InmobiliariaId { get; set; }

        [BsonElement("Estado")]
        public Estados.ProyectoInmobiliario Estado { get; set; }

        [BsonElement("TipoProyecto")]
        public string TipoProyecto { get; set; }

        [BsonElement("IdRegion")]
        public int IdRegion { get; set; }

        [BsonElement("Comuna")]
        public string Comuna { get; set; }

        [BsonElement("Operacion")]
        public string Operacion { get; set; }

        [BsonElement("Rentabilidad")]
        public int Rentabilidad { get; set; }

        [BsonElement("Conectividad")]
        public int Conectividad { get; set; }

        [BsonElement("Terminaciones")]
        public int Terminaciones { get; set; }

        [BsonElement("Equipamiento")]
        public int Equipamiento { get; set; }
    }
}
