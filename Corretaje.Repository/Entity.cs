using System;
using System.Collections.Generic;
using MongoDB.Bson;

namespace Corretaje.Repository
{
    public class Entity : IEntity
    {
        public string IdString { get; set; }
        public ObjectId Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public long Version { get; set; }
        public IDictionary<string, object> Metadata { get; set; }

        protected Entity(string idString)
        {
            IdString = idString;
        }

        protected Entity()
        {
            
        }
    }
}
