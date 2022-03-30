using Corretaje.Repository;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace Corretaje.Domain
{
    [BsonIgnoreExtraElements]
    public class Contrato : Entity
    {
        [BsonElement("Aval")]
        public Aval Aval { get; set; }

        public bool Delete { get; set; }

        [BsonElement("FechaInicio")]
        public DateTime FechaInicio { get; set; }

        [BsonElement("FechaTermino")]
        public DateTime FechaTermino { get; set; }

        [BsonElement("MontoGarantiaArriendo")]
        public decimal MontoGarantiaArriendo { get; set; }

        [BsonElement("MontoUf")]
        public decimal MontoUf { get; set; }

        [BsonElement("Estado")]
        public Estados.Contrato Estado { get; set; }

        [BsonElement("Cliente")]
        public string IdCliente { get; set; }

        [BsonElement("IdOferta")]
        public string IdOferta { get; set; }

        [BsonElement("Propiedad")]
        public string IdPropiedad { get; set; }

        [BsonElement("Usuario")]
        public string IdUsuario { get; set; }

        [BsonElement("TipoContrato")]
        public string IdTipoContrato { get; set; }

        [BsonElement("MesesPeriodoDeRenovacion")]
        public string MesesPeriodoDeRenovacion { get; set; }
    }
}
