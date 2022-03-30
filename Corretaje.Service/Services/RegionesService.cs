using Corretaje.Service.IServices;
using Corretaje.Domain;
using Corretaje.Repository;


namespace Corretaje.Service.Services
{
    public class RegionesService : Repository<Regiones>,IRegionesService
    {
        private readonly IRepository<Regiones> _regionRepository;


        public RegionesService(string connectionstring) : base(connectionstring)
        {
            _regionRepository = new Repository<Regiones>(connectionstring);

        }
    }
}
