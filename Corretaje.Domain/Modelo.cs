
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace Corretaje.Domain
{
    public class Modelo
    {
        [BsonElement("Nombre")]
        public string Nombre { get; set; }

        [BsonElement("Banio")]
        public int Banio { get; set; }

        [BsonElement("Dormitorio")]
        public int Dormitorio { get; set; }

        [BsonElement("SuperficieDesde")]
        public double SuperficieDesde { get; set; }

        [BsonElement("ValorDesde")]
        public double ValorDesde { get; set; }

        [BsonElement("Descripcion")]
        public string Descripcion { get; set; }

        [BsonElement("Imagenes")]
        public List<Imagen> Imagenes { get; set; }

        [BsonElement("UrlMattePort")]
        public string UrlMattePort { get; set; }
    }
}
