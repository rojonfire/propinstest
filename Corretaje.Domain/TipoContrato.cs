using Corretaje.Repository;
using MongoDB.Bson.Serialization.Attributes;

namespace Corretaje.Domain
{
    [BsonIgnoreExtraElements]
    public class TipoContrato : Entity
    {
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public bool Delete { get; set; }
    }
}
