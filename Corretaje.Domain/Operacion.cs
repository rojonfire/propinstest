using System.Collections.Generic;
using Corretaje.Repository;
using MongoDB.Bson.Serialization.Attributes;

namespace Corretaje.Domain
{
    [BsonIgnoreExtraElements]
    public class Operacion : Entity
    {
        public string IdPropiedad { get; set; }
        public string Tipo { get; set; }
        public string Plan { get; set; }
        public List<string> ServiciosAdicionales { get; set; }
        public bool Delete { get; set; }
    }
}
