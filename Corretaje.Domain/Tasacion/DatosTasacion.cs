using Corretaje.Repository;
using MongoDB.Bson.Serialization.Attributes;

namespace Corretaje.Domain.Tasacion
{
    [BsonIgnoreExtraElements]
    public class DatosTasacion : Entity
    {
        public DatosTasacion() { }

        [BsonElement("Comuna")]
        public string Comuna { get; set; }

        [BsonElement("Barrio")]
        public string Barrio { get; set; }

        [BsonElement("Precio")]
        public int Precio { get; set; }

        [BsonElement("SuperficieTotal")]
        public int SuperficieTotal { get; set; }

        [BsonElement("SuperficieUtil")]
        public int SuperficieUtil { get; set; }

        [BsonElement("Dormitorios")]
        public int Dormitorios { get; set; }

        [BsonElement("TipoPropiedad")]
        public string TipoPropiedad { get; set; }

        [BsonElement("Link")]
        public string Link { get; set; }

        [BsonElement("UF_m2")]
        public double UF_m2 { get; set; }

        [BsonElement("Estacionamientos")]
        public int Estacionamientos { get; set; }
    }
}
