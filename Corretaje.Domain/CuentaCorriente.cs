using MongoDB.Bson.Serialization.Attributes;

namespace Corretaje.Domain
{
    public class CuentaCorriente
    {
        [BsonElement("Numero")]
        public string Numero { get; set; }

        [BsonElement("BancoNombre")]
        public string BancoNombre { get; set; }

        [BsonElement("TitularNombre")]
        public string TitularNombre { get; set; }

        [BsonElement("TitularCedulaIdentidad")]
        public string TitularCedulaIdentidad { get; set; }

        [BsonElement("TitularCorreoElectronico")]
        public string TitularCorreoElectronico { get; set; }
    }
}
