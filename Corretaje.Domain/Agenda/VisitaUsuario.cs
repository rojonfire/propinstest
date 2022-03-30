using MongoDB.Bson.Serialization.Attributes;

namespace Corretaje.Domain.Agenda
{
    public class VisitaUsuario : Visita
    {
        [BsonElement("Anfitrion")]
        public Anfitrion Anfitrion { get; set; }

        [BsonElement("Nombre")]
        public string Nombre { get; set; }

        [BsonElement("PropiedadDireccion")]
        public string PropiedadDireccion { get; set; }

        [BsonElement("Rut")]
        public string Rut { get; set; }

        [BsonElement("UsuarioId")]
        public string UsuarioId { get; set; }

        [BsonElement("IdBroker")]
        public string IdBroker { get; set; }

        [BsonElement("IdSuscripcion")]
        public string IdSuscripcion { get; set; }

        [BsonElement("EmailPropietario")]
        public string EmailPropietario { get; set; }

        [BsonElement("EmailBroker")]
        public string EmailBroker { get; set; }

        [BsonElement("EmailComprador")]
        public string EmailComprador { get; set; }
    }
}
