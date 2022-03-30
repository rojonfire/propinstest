using Corretaje.Domain;
using Corretaje.Repository;
using Corretaje.Service.IServices.ILandingInmobiliaria;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Corretaje.Service.Services.LandingInmobiliaria
{
    public class LandingInmobiliariaService : ILandingInmobiliariaService
    {
        private readonly IRepository<Domain.LandingInmobiliaria> _repository;
        private readonly ILandingInmobiliariaQueryFiltro _queryFiltro;

        public LandingInmobiliariaService(IRepository<Domain.LandingInmobiliaria> repository, ILandingInmobiliariaQueryFiltro queryFiltro)
        {
            _repository = repository;
            _queryFiltro = queryFiltro;
        }

        public async Task<Domain.LandingInmobiliaria> Add(Domain.LandingInmobiliaria landingInmobiliaria)
        {
            return await _repository.Insert(landingInmobiliaria);
        }

        public async Task<IEnumerable<Domain.LandingInmobiliaria>> GetAll()
        {
            return await _repository.GetAll();
        }

        public async Task<Page<Domain.LandingInmobiliaria>> GetAllPaginated(int pageSize, int page)
        {
            FilterDefinition<Domain.LandingInmobiliaria> filter = _queryFiltro.FindAll();
            var sort = _queryFiltro.SortByFechaCreacionDescending();

            var allSuscripcionesFiltered = await _repository.SearchFor(filter);
            int totalSuscripciones = allSuscripcionesFiltered.Count();

            var propiedades = await _repository.Pagination(filter, page, pageSize, sort);

            Page<Domain.LandingInmobiliaria> paginated = new Page<Domain.LandingInmobiliaria>();
            paginated.CurrentPage = page;
            paginated.Results = propiedades;
            paginated.TotalResults = totalSuscripciones;
            Double totalPagesRatio = Double.Parse(totalSuscripciones.ToString()) / Double.Parse(pageSize.ToString());
            paginated.TotalPages = int.Parse(Math.Ceiling(totalPagesRatio).ToString());

            return paginated;
        }

        public async Task<Domain.LandingInmobiliaria> Get(ObjectId id)
        {
            return await _repository.Get(id);
        }

        public async Task<Domain.LandingInmobiliaria> GetByPathname(string pathname)
        {
            var listResult = await _repository.SearchFor(_queryFiltro.FindByPathname(pathname));
            return listResult.FirstOrDefault();
        }

        public async Task<Domain.LandingInmobiliaria> Update(Domain.LandingInmobiliaria landingInmobiliaria)
        {
            return await _repository.Update(landingInmobiliaria);
        }
    }
}
