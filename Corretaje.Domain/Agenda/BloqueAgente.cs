using MongoDB.Bson.Serialization.Attributes;

namespace Corretaje.Domain.Agenda
{
    public class BloqueAgente : Bloque
    {
        [BsonElement("AgenteId")] public string AgenteId { get; set; }

        [BsonElement("ProyectoId")] public string ProyectoId { get; set; }
    }
}