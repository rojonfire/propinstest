using System.Linq;
using System.Threading.Tasks;
using Corretaje.Domain;
using Corretaje.Repository;
using Corretaje.Service.IServices.IProper;
using MongoDB.Bson;

namespace Corretaje.Service.Services.Proper
{
    public class ReferidoService : IReferidoService
    {
        private readonly IRepository<ReferidoProper> _referidoProperRepository;
        private readonly IRepository<Referidos> _referidoRepository;
        private readonly IReferidoQueryFiltro _referidoQueryFiltro;

        public ReferidoService(IRepository<ReferidoProper> referidoRepository, IReferidoQueryFiltro referidoQueryFiltro, IRepository<Referidos> referidoRepository1)
        {
            _referidoProperRepository = referidoRepository;
            _referidoQueryFiltro = referidoQueryFiltro;
            _referidoRepository = referidoRepository1;
        }

        public Task<ReferidoProper> AddReferido(ReferidoProper referidoProper)
        {
            var refe = _referidoProperRepository.Insert(referidoProper);
            return refe;
        }

        public async Task<Referidos> Get(ObjectId referidoId)
        {
            var refe = await _referidoRepository.Get(referidoId);
            return refe;
        }

        public async Task<Referidos> GetByEmail(string mail)
        {
            var referido =
                (await _referidoRepository.SearchFor(_referidoQueryFiltro.FindByEmail(mail))).FirstOrDefault();
            return referido;
        }

        public async Task<Referidos> Update(Referidos referidos)
        {
            return await _referidoRepository.Update(referidos);
        }
    }
}