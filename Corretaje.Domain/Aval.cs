using Corretaje.Repository;
using MongoDB.Bson.Serialization.Attributes;

namespace Corretaje.Domain
{
    public class Aval : Entity
    {
        [BsonElement("CedulaIdentidad")]
        public string CedulaIdentidad { get; set; }

        [BsonElement("CorreoElectronico")]
        public string CorreoElectronico { get; set; }

        [BsonElement("Domicilio")]
        public string Domicilio { get; set; }

        [BsonElement("EstadoCivil")]
        public string EstadoCivil { get; set; }

        [BsonElement("Nombre")]
        public string Nombre { get; set; }

        [BsonElement("Nacionalidad")]
        public string Nacionalidad { get; set; }

        [BsonElement("ProfesionOficio")]
        public string ProfesionOficio { get; set; }
    }
}
