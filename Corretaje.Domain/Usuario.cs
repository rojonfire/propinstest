using Corretaje.Repository;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using MongoDB.Bson;

namespace Corretaje.Domain
{
    public class Usuario : Entity
    {
        [BsonElement("FechaNacimiento")]
        public DateTime FechaNacimiento { get; set; }

        [BsonElement("TipoCuenta")]
        public Estados.TipoCuenta TipoCuenta { get; set; }

        [BsonElement("Apellidos")]
        public string Apellidos { get; set; }

        [BsonElement("Direccion")]
        public string Direccion { get; set; }

        [BsonElement("EstadoCivil")]
        public string EstadoCivil { get; set; }

        [BsonElement("ClienteId")]
        public string ClienteId { get; set; }

        [BsonElement("InmobiliariaId")]
        public string InmobiliariaId { get; set; }

        [BsonElement("ProyectosInmobiliariosId")]
        public List<string> ProyectosInmobiliariosId { get; set; }

        [BsonElement("Mail")]
        public string Email { get; set; }

        [BsonElement("Nacionalidad")]
        public string Nacionalidad { get; set; }

        [BsonElement("Nombres")]
        public string Nombres { get; set; }

        [BsonElement("Oficio")]
        public string Oficio { get; set; }

        [BsonElement("Password")]
        public string Password { get; set; }

        [BsonElement("Rut")]
        public string Rut { get; set; }

        [BsonElement("Telefono")]
        public string Telefono { get; set; }

        [BsonElement("VerificacionCedula")]
        public bool VerificacionCedula { get; set; }
        [BsonElement("TextoApiVision")]
        public string TextoApiVision { get; set; }
        
        [BsonElement("ProperId")]
        public ObjectId ProperId { get; set; }

        [BsonElement("Propiedades")]
        public ICollection<Propiedad> Propiedades { get; set; }

        [BsonElement("EsEmbajador")]
        public bool EsEmbajador { get; set; }

        [BsonElement("EsVendedor")]
        public bool EsVendedor { get; set; }

        [BsonElement("RegistroCompletado")]
        public bool RegistroCompletado { get; set; }

        [BsonElement("Contactado")]
        public bool Contactado { get; set; }

        [BsonElement("Comuna")]
        public string Comuna { get; set; }

        [BsonElement("ReferidoPor")]
        public string ReferidoPor { get; set; }

        [BsonElement("DatosBancarios")]
        public DatosBancarios DatosBancarios { get; set; }

        [BsonElement("IdInmobiliaria")]
        public string IdInmobiliaria { get; set; }

        [BsonIgnore]
        public string LinkRegistro { get; set; }
    }
}
