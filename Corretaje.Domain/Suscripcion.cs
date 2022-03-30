using Corretaje.Repository;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace Corretaje.Domain
{
    [BsonIgnoreExtraElements]
    public class Suscripcion : Entity
    {
        [BsonElement("NombreUsuario")]
        public string NombreUsuario { get; set; }

        [BsonElement("EmailUsuario")]
        public string EmailUsuario { get; set; }

        [BsonElement("Telefono")]
        public string Telefono { get; set; }

        [BsonElement("IdUsuario")]
        public string IdUsuario { get; set; }

        [BsonElement("IdCliente")]
        public string IdCliente { get; set; }

        [BsonElement("ComunaUno")]
        public string ComunaUno { get; set; }

        [BsonElement("ComunaDos")]
        public string ComunaDos { get; set; }

        [BsonElement("ComunaTres")]
        public string ComunaTres { get; set; }

        [BsonElement("TipoPropiedad")]
        public string TipoPropiedad { get; set; }

        [BsonElement("CantidadDormitoriosDesde")]
        public int CantidadDormitoriosDesde { get; set; }

        [BsonElement("CantidadDormitoriosHasta")]
        public int CantidadDormitoriosHasta { get; set; }

        [BsonElement("CantidadBanosDesde")]
        public int CantidadBanosDesde { get; set; }

        [BsonElement("CantidadBanosHasta")]
        public int CantidadBanosHasta { get; set; }

        [BsonElement("CantidadEstacionamientos")]
        public int CantidadEstacionamientos { get; set; }

        [BsonElement("ValorDesde")]
        public double ValorDesde { get; set; }

        [BsonElement("ValorHasta")]
        public double ValorHasta { get; set; }

        [BsonElement("MetrosTotalesDesde")]
        public double MetrosTotalesDesde { get; set; }

        [BsonElement("MetrosTotalesHasta")]
        public double MetrosTotalesHasta { get; set; }

        [BsonElement("MetrosUtilesDesde")]
        public double MetrosUtilesDesde { get; set; }

        [BsonElement("MetrosUtilesHasta")]
        public double MetrosUtilesHasta { get; set; }

        [BsonElement("EsVenta")]
        public bool EsVenta { get; set; }

        [BsonElement("Puntaje")]
        public double Puntaje { get; set; }

        [BsonElement("RecomendacionesUno")]
        public ICollection<string> RecomendacionesUno { get; set; }

        [BsonElement("RecomendacionesDos")]
        public ICollection<string> RecomendacionesDos { get; set; }

        [BsonElement("RecomendacionesTres")]
        public ICollection<string> RecomendacionesTres { get; set; }

    }
}
