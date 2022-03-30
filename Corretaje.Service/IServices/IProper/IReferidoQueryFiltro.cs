using Corretaje.Domain;
using MongoDB.Driver;

namespace Corretaje.Service.IServices.IProper
{
    public interface IReferidoQueryFiltro
    {
        FilterDefinition<Referidos> FindByEmail(string mail);
    }
}