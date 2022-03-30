using Corretaje.Repository;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace Corretaje.Domain
{
    [BsonIgnoreExtraElements]
    public class Plan : Entity
    {
        [BsonElement("Precio")]
        public decimal Precio { get; set; }

        [BsonElement("PrecioString")]
        public string PrecioString { get; set; }

        [BsonElement("TipoDePlan")]
        public Estados.TipoDePlan TipoDePlan { get; set; }

        [BsonElement("ServiciosBase")]
        public ICollection<ServicioBase> ServiciosBase { get; set; }

        [BsonElement("ServiciosAdicionales")]
        public ICollection<ServicioAdicional> ServiciosAdicionales { get; set; }

        [BsonElement("Descripcion")]
        public string Descripcion { get; set; }

        [BsonElement("Nombre")]
        public string Nombre { get; set; }

        [BsonElement("Descuento")]
        public bool Descuento { get; set; }

        [BsonElement("TextoDescuento")]
        public string TextoDescuento { get; set; }

        [BsonElement("Fast")]
        public bool Fast { get; set; }

        [BsonElement("EsVenta")]
        public bool EsVenta { get; set; }

        public Plan()
        {
            ServiciosBase = new List<ServicioBase>();
            ServiciosAdicionales = new List<ServicioAdicional>();
        }
    }
}
