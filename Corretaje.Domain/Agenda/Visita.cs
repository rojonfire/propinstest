using MongoDB.Bson.Serialization.Attributes;
using System;

namespace Corretaje.Domain.Agenda
{
    public abstract class Visita : Bloque
    {
        [BsonElement("Fecha")]
        public DateTime Fecha { get; set; }

        [BsonElement("ClienteId")]
        public string ClienteId { get; set; }

        [BsonElement("PropiedadId")]
        public string PropiedadId { get; set; }

        [BsonElement("LinkAgregarEventoAGoogleCalendar")]
        public string LinkAgregarEventoAGoogleCalendar { get; set; }

        [BsonElement("LinkAgregarEventoAOutlookCalendar")]
        public string LinkAgregarEventoAOutlookCalendar { get; set; }

        [BsonElement("VisitaVerificada")]
        public bool VisitaVerificada { get; set; }

        [BsonElement("VisitaRealizada")]
        public bool VisitaRealizada { get; set; }

        [BsonElement("NombrePropietario")]
        public string NombrePropietario { get; set; }
    }
}
