using Corretaje.Repository;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace Corretaje.Domain
{
    [BsonIgnoreExtraElements]
    public class Cliente : Entity
    {
        [BsonElement("Nombres")]
        public string Nombres { get; set; }
        [BsonElement("Apellidos")]
        public string Apellidos { get; set; }
        [BsonElement("Rut")]
        public string Rut { get; set; }
        [BsonElement("EstadoCivil")]
        public string EstadoCivil { get; set; }
        [BsonElement("Oficio")]
        public string Oficio { get; set; }
        [BsonElement("FechaNacimiento")]
        public DateTime FechaNacimiento { get; set; }
        [BsonElement("Password")]
        public string Password { get; set; }
        [BsonElement("Mail")]
        public string Mail { get; set; }
        [BsonElement("Telefono")]
        public string Telefono { get; set; }
        [BsonElement("Direccion")]
        public string Direccion { get; set; }
        [BsonElement("TarjetaDeCredito")]
        public string TarjetaDeCredito { get; set; }

        [BsonElement("CuentaCorriente")]
        public CuentaCorriente CuentaCorriente { get; set; }
    }
}
