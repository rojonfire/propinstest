using Corretaje.Repository;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace Corretaje.Domain.Tasacion
{
    public class Tasacion : Entity
    {
        [BsonElement("DatosGenerales")]
        public DatosGenerales DatosGenerales { get; set; }

        [BsonElement("DetalleValorizacion")]
        public IEnumerable<DetalleValorizacion> DetalleValorizacion { get; set; }

        [BsonElement("SeguroIncendio")]
        public int SeguroIncendio { get; set; }

        [BsonElement("NumeroSolicitud")]
        public int NumeroSolicitud { get; set; }

        [BsonElement("ReferenciaDeMercado")]
        public ReferenciaDeMercado ReferenciaDeMercado { get; set; }

        [BsonElement("DescripcionPropiedad")]
        public string DescripcionPropiedad { get; set; }

        [BsonElement("UsoActualEspecifico")]
        public string UsoActualEspecifico { get; set; }

        [BsonElement("Valorizacion")]
        public Valorizacion Valorizacion { get; set; }
        [BsonElement("IdUser")]
        public string IdUser { get; set; }
        public string Glosa { get; set; }
        public string TipoPropiedad { get; set; }
        public string EstadoPropiedad { get; set; }
    }
}
