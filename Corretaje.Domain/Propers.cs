using System.Collections.Generic;
using Corretaje.Repository;
using MongoDB.Bson.Serialization.Attributes;

namespace Corretaje.Domain
{
    public class Propers : Entity
    {
        [BsonElement("Nombres")] public string Nombres { get; set; }

        [BsonElement("Apellidos")] public string Apellidos { get; set; }

        [BsonElement("Rut")] public string Rut { get; set; }

        [BsonElement("Mail")] 
        public string Email { get; set; }

        [BsonElement("Telefono")] public string Telefono { get; set; }

        [BsonElement("Edad")] public int Edad { get; set; }

        [BsonElement("Direccion")] public string Direccion { get; set; }

        [BsonElement("Password")] public string Password { get; set; }

        [BsonElement("TipoCuenta")] public string TipoCuenta { get; set; }

        [BsonElement("Banco")] public string Banco { get; set; }

        [BsonElement("MedioPago")] public string MedioPago { get; set; }

        [BsonElement("Datos_Bancarios")] public DatosBancarios DatosBancarios { get; set; }

        [BsonElement("Referidos")] public List<ReferidoProper> Referidos { get; set; }
        

        [BsonElement("NumeroCuenta")] public long NumeroCuenta { get; set; }
    }
}