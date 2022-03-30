using Corretaje.Domain;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Service.IServices
{
    public interface IContratoService
    {
        Task<List<Contrato>> PostBuscarContrato(Contrato contrato);

        Task<IEnumerable<Contrato>> GetAll();

        Task<Contrato> Insert(Contrato contrato);

        Task<Contrato> Update(Contrato contrato);

        Task<Contrato> Get(ObjectId contratoId);

        Task<IEnumerable<Contrato>> GetForQuery(Contrato contrato);
    }
}
