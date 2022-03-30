using AutoMapper;
using MongoDB.Bson;

namespace Corretaje.Api.Mapper
{
    public class MongoIdConverter : ITypeConverter<string, ObjectId>
    {
        public ObjectId Convert(string source, ObjectId destination, ResolutionContext context)
        {
            return string.IsNullOrWhiteSpace(source) ? new ObjectId() : new ObjectId(source);
        }
    }
}
