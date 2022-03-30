using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Corretaje.Service.IServices.IEmbajador
{
    public interface IEmbajadorService
    {
        Task<Domain.Embajador> Get(ObjectId referidoId);

        Task<Domain.Embajador> Add(Domain.Embajador embajador);
    }
}
