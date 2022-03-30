using MongoDB.Bson.Serialization.Attributes;

namespace Corretaje.Domain.Agenda
{
    public class BloqueFotografo : Bloque
    {
        [BsonElement("FotografoId")]
        public string FotografoId { get; set; }
    }
}
