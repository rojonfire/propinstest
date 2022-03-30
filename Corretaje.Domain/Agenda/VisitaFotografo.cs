using MongoDB.Bson.Serialization.Attributes;

namespace Corretaje.Domain.Agenda
{
    public class VisitaFotografo : Visita
    {
        /// <summary>
        /// Corresponde al apellido del fotógrafo
        /// </summary>
        [BsonElement("Apellidos")]
        public string Apellidos { get; set; }

        [BsonElement("Direccion")]
        public string Direccion { get; set; }

        [BsonElement("Email")]
        public string Email { get; set; }

        [BsonElement("FotografoId")]
        public string FotografoId { get; set; }

        [BsonElement("Nombre")]
        public string Nombre { get; set; }

        [BsonElement("Rut")]
        public string Rut { get; set; }

        [BsonElement("Telefono")]
        public string Telefono { get; set; }
    }
}
