using System.Collections.Generic;
using Corretaje.Repository;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Corretaje.Domain
{
    public class Referidos : Entity
    {
        [BsonElement("Nombres")]
        public string Nombre { get; set; }
        
        [BsonElement("Apellidos")]
        public string Apellido { get; set; }
        
        [BsonElement("Mail")]
        public string Mail { get; set; }
        
        [BsonElement("Telefono")]
        public string Telefono { get; set; }
        
        [BsonElement("Rut")]
        public string Rut { get; set; }
        
        [BsonElement("Edad")]
        public int Edad { get; set; }
        
        [BsonElement("Comuna")]
        public string Comuna { get; set; }
        
        [BsonElement("Password")]
        public string Password { get; set; }
        
        [BsonElement("id_broker")]
        public ObjectId IdProper { get; set; }
        
        [BsonElement("Paso1")]
        public bool Paso1 { get; set; }
        
        [BsonElement("Paso2")]
        public bool Paso2 { get; set; }
        
        [BsonElement("Paso3")]
        public bool Paso3 { get; set; }
        
        [BsonElement("Paso4")]
        public bool Paso4 { get; set; }
        
        [BsonElement("id_prop_sugeridas")]
        public List<string> Referencias { get; set; }
    }
}