using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Corretaje.Domain;
using Corretaje.Repository;
using Corretaje.Service.IServices;
using Corretaje.Service.IServices.IProper;
using MongoDB.Bson;

namespace Corretaje.Service.Services.Proper
{
    public class ProperService : IProperService
    {
        private readonly IRepository<Propers> _properRepository;
        private readonly IRepository<Referidos> _referidoRepository;
        private readonly IProperQueryFiltro _properQueryFiltro;
        private readonly IRespuestaDelServicio _respuestaDelServicio;

        public ProperService(IRepository<Propers> properRepository, IProperQueryFiltro properQueryFiltro,
            IRespuestaDelServicio respuestaDelServicio, IRepository<Referidos> referidoRepository)
        {
            _properRepository = properRepository;
            _properQueryFiltro = properQueryFiltro;
            _respuestaDelServicio = respuestaDelServicio;
            _referidoRepository = referidoRepository;
        }

        public async Task<Propers> AddProper(Propers proper)
        {
            proper.Referidos = new List<ReferidoProper>();
            return await Insert(proper);
        }

        public async Task<ResultadoDelProceso> Validar(Propers proper)
        {
            var properByEmail = await GetByEmail(proper.Email);

            if (properByEmail != null)
            {
                return _respuestaDelServicio.RetornarValidacion(null, $"El mail {proper.Email} ya ha sido utilizado");
            }

            return _respuestaDelServicio.RetornarOk("", "");
        }

        public async Task<Propers> GetByEmail(string email)
        {
            var proper = (await _properRepository.SearchFor(_properQueryFiltro.FindByEmail(email))).FirstOrDefault();
            return proper;
        }

        public async Task<Propers> Get(ObjectId properId)
        {
            var prop = await _properRepository.Get(properId);

            return prop;
        }

        public ReferidoProper GetReferidoByEmail(string mail, Propers proper)
        {
            var referido = proper.Referidos.Find(refe => refe.Email == mail);
            return referido;
        }

        public async Task<Propers> AgregarReferido(ObjectId properId, ReferidoProper referidoProper)
        {
            var refe = new Referidos
            {
                Nombre = referidoProper.Nombres, Apellido = referidoProper.Apellido, Mail = referidoProper.Email,
                Referencias = referidoProper.Referencias, IdProper = properId
            };

            var refeProp = await _referidoRepository.Insert(refe);
            var proper = await _properRepository.Get(properId);
            referidoProper.Id = refeProp.Id;
            proper.Referidos.Add(referidoProper);

            var result = await _properRepository.Update(proper);

            return result;
        }

        public async Task<Propers> GetByLogin(string password, string email)
        {
            return (await _properRepository.SearchFor(_properQueryFiltro.FindByLogin(password, email)))
                .FirstOrDefault();
        }

        public async Task<Propers> Update(Propers proper)
        {
            return await _properRepository.Update(proper);
        }

        public async Task<Propers> ReferirProps(string properId, string mail, List<string> referencias)
        {
            var prop = await _properRepository.Get(ObjectId.Parse(properId));

            var referido = await _referidoRepository.Get(prop.Referidos.FirstOrDefault(x => x.Email == mail).Id);

            referido.Referencias = referencias;

            await _referidoRepository.Update(referido);

            prop.Referidos?.FirstOrDefault(refe => refe.Email == mail)?.Referencias.AddRange(referencias);

            var result = await _properRepository.Update(prop);

            return result;
        }

        public void Delete(ObjectId id)
        {
            _properRepository.Delete(id);
        }

        public async Task<Propers> ActualizarPasoReferido(Referidos referido)
        {
            var prop = await _properRepository.Get(referido.IdProper);

            prop.Referidos.Find(p => p.Id == referido.Id).Paso2 = true;

            var resul = await _properRepository.Update(prop);

            return resul;
        }

        private async Task<Propers> Insert(Propers proper)
        {
            return await _properRepository.Insert(proper);
        }
    }
}