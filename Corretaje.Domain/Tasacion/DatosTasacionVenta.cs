using Corretaje.Repository.CustomAttributes;

namespace Corretaje.Domain.Tasacion
{
    [BsonCollection("DatosTasacion")]
    public class DatosTasacionVenta : DatosTasacion
    {
        public DatosTasacionVenta() : base() { }
    }
}