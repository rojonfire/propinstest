using Corretaje.Repository;
using MongoDB.Bson.Serialization.Attributes;

namespace Corretaje.Domain
{
    public class ServicioAdicional : Entity
    {
        [BsonElement("ExcluidoCalculoPrecioOrdenCompra")]
        public bool ExcluidoCalculoPrecioOrdenCompra { get; set; }

        [BsonElement("Imagen")]
        public string Imagen { get; set; }

        [BsonElement("ImagenUrl")]
        public string ImagenUrl { get; set; }

        [BsonElement("Nombre")]
        public string Nombre { get; set; }

        [BsonElement("Precio")]
        public decimal Precio { get; set; }

        [BsonElement("Subtitulo")]
        public string Subtitulo { get; set; }

        [BsonElement("TipoMoneda")]
        public string TipoMoneda { get; set; }

        [BsonElement("Estado")]
        public Estados.Transaccion Estado { get; set; }
    }
}
