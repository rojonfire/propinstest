using Corretaje.Repository;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace Corretaje.Domain
{
    public class Uf : Entity
    {
        [BsonElement("Fecha")]
        public DateTime Fecha { get; set; }

        [BsonElement("Valor")]
        public string Valor { get; set; }
    }

    public class Ufs
    {
        public List<Uf> UFs { get; set; }
    }
}
