using MongoDB.Bson;

namespace Corretaje.Domain.Extension
{
    public static class ObjectIdExtension
    {
        public static bool IsValid(this ObjectId objectId)
        {
            return ObjectId.Empty != objectId;
        }
    }
}