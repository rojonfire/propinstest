using MongoDB.Bson.Serialization.Attributes;

namespace Corretaje.Domain.Agenda
{
    public class VisitaVirtual : Visita
    {
        [BsonElement("CantidadVisitas")]
        public int CantidadVisitas { get; set; } = 1;

        [BsonElement("MesAnioVisita")]
        public string MesAnioVisita { get; set; }
    }
}
