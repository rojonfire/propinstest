using Corretaje.Repository;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace Corretaje.Domain.Tasacion
{
    public class TasacionResult : Entity
    {
        public Estados.RequestStatus Estado { get; set; }

        [BsonElement("IdPropiedad")]
        public string IdPropiedad { get; set; }

        [BsonElement("ValorMedio")]
        public int ValorMedio { get; set; } = 0;

        [BsonElement("ValorMinimo")]
        public int ValorMinimo { get; set; } = 0;

        [BsonElement("ValorMaximo")]
        public int ValorMaximo { get; set; } = 0;

        [BsonElement("ValorFast")]
        public int ValorFast { get; set; } = 0;

        [BsonElement("ValorFastMinimo")]
        public int ValorFastMinimo { get; set; } = 0;

        [BsonElement("PropiedadesSimilares")]
        public IEnumerable<DatosTasacion> PropiedadesSimilares { get; set; }
    }
}
