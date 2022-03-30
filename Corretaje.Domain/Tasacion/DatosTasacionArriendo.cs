using MongoDB.Bson.Serialization.Attributes;

namespace Corretaje.Domain.Tasacion
{
    public class DatosTasacionArriendo : DatosTasacion
    {
        public DatosTasacionArriendo() : base() { }

        [BsonElement("PrecioUF")]
        public string PrecioUF { get; set; }
    }
}
