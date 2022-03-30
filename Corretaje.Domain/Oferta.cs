using Corretaje.Repository;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace Corretaje.Domain
{
    public class Oferta : Entity
    {
        [BsonElement("MontoDeOferta")]
        public decimal MontoDeOferta { get; set; }

        [BsonElement("MontoMaximo")]
        public decimal MontoMaximo { get; set; }

        [BsonElement("MontoMinimo")]
        public decimal MontoMinimo { get; set; }

        [BsonElement("MontoDePublicacion")]
        public decimal MontoDePublicacion { get; set; }

        [BsonElement("Estado")]
        public Estados.Oferta Estado { get; set; }

        [BsonElement("Evaluacion")]
        public int Evaluacion { get; set; }

        [BsonElement("Mensajes")]
        public List<MensajeOferta> Mensajes { get; set; }

        [BsonElement("Descripcion")]
        public string Descripcion { get; set; }

        [BsonElement("OfertadorId")]
        public string OfertadorId { get; set; }

        [BsonElement("OfertadorNombre")]
        public string OfertadorNombre { get; set; }

        [BsonElement("OfertadorRut")]
        public string OfertadorRut { get; set; }

        [BsonElement("PropiedadComuna")]
        public string PropiedadComuna { get; set; }

        [BsonElement("PropiedadGlosa")]
        public string PropiedadGlosa { get; set; }

        [BsonElement("PropietarioId")]
        public string PropietarioId { get; set; }

        [BsonElement("PropiedadOperacion")]
        public string PropiedadOperacion { get; set; }

        [BsonElement("PublicacionId")]
        public string PublicacionId { get; set; }

        [BsonElement("OferenteRut")]
        public string OferenteRut { get; set; }

        [BsonElement("OferenteNombre")]
        public string OferenteNombre { get; set; }

        [BsonElement("EmitidaPor")]
        public Estados.OfertaEmision EmitidaPor { get; set; }

        [BsonElement("FechaOferta")]
        public DateTime FechaOferta { get; set; }

        [BsonElement("FechaVencimiento")]
        public DateTime FechaVencimiento { get; set; }
    }
}
