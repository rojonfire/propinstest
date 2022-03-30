using Corretaje.Repository;
using MongoDB.Bson.Serialization.Attributes;

namespace Corretaje.Domain
{
    public class LandingInmobiliaria : Entity
    {
        [BsonElement("IdInmobiliaria")]
        public string IdInmobiliaria { get; set; }

        [BsonElement("Nombre")]
        public string Nombre { get; set; }

        [BsonElement("Pathname")]
        public string Pathname { get; set; }

        [BsonElement("LetterColor")]
        public string LetterColor { get; set; }

        [BsonElement("BackgroundColor")]
        public string BackgroundColor { get; set; }

        [BsonElement("ButtonColor")]
        public string ButtonColor { get; set; }
    }
}