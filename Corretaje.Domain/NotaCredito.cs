using Corretaje.Repository;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace Corretaje.Domain
{
    public class NotaCredito : Entity
    {
        [BsonElement("Fecha")]
        public DateTime FechaEmision { get; set; }

        [BsonElement("Monto")]
        public decimal Monto { get; set; }

        [BsonElement("OrdenCompraId")]
        public string OrdenCompraId { get; set; }
    }
}
