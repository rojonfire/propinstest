using Corretaje.Domain;
using Corretaje.Repository;
using Corretaje.Service.IServices;

namespace Corretaje.Service.Services
{
    public class TipoContratoService : Repository<TipoContrato>, ITipoContratoService
    {
        private readonly IRepository<TipoContrato> _tipoContratoRepository;

        public TipoContratoService(string connectionstring) : base(connectionstring)
        {
            _tipoContratoRepository = new Repository<TipoContrato>(connectionstring);
        }
    }
}
