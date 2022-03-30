using Corretaje.Domain;
using Corretaje.Repository;
using Corretaje.Service.IServices;
using Corretaje.Service.IServices.IOferta;
using LinqKit;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Corretaje.Service.Services
{
    public class ContratoService : IContratoService
    {
        private readonly IOfertaService _ofertaService;
        private readonly IRepository<Contrato> _contratoRepository;

        public ContratoService(IOfertaService ofertaService, IRepository<Contrato> contratoRepository)
        {
            _contratoRepository = contratoRepository;
            _ofertaService = ofertaService;
        }

        public async Task<List<Contrato>> PostBuscarContrato(Contrato contrato)
        {
            var result = await _contratoRepository.GetAll();
            var contratos = result.AsQueryable().Where(CreatExpression(contrato)).ToList();

            return contratos;
        }

        public Task<IEnumerable<Contrato>> GetForQuery(Contrato contrato)
        {
            return _contratoRepository.SearchFor(new ExpressionFilterDefinition<Contrato>(c => c.IdOferta == contrato.IdOferta));

        }

        private static System.Linq.Expressions.Expression<Func<Contrato, bool>> CreatExpression(Contrato contrato)
        {
            var predicate = PredicateBuilder.New<Contrato>();

            if (!string.IsNullOrEmpty(contrato.IdCliente))
            {
                predicate = predicate.And(i => i.IdCliente.StartsWith(contrato.IdCliente));
            }

            if (!string.IsNullOrEmpty(contrato.IdUsuario))
            {
                predicate = predicate.And(i => i.IdUsuario.StartsWith(contrato.IdUsuario));
            }

            if (!string.IsNullOrEmpty(contrato.IdPropiedad))
            {
                predicate = predicate.And(i => i.IdPropiedad.StartsWith(contrato.IdPropiedad));
            }

            if (!string.IsNullOrEmpty(contrato.IdTipoContrato))
            {
                predicate = predicate.And(i => i.IdTipoContrato.StartsWith(contrato.IdTipoContrato));
            }

            if (contrato.FechaInicio != DateTime.MinValue)
            {
                predicate = predicate.And(i => i.FechaInicio.Date >= contrato.FechaInicio.Date);
            }

            if (contrato.FechaTermino != DateTime.MinValue)
            {
                predicate = predicate.And(i => i.FechaTermino.Date <= contrato.FechaTermino.Date);
            }

            return predicate;
        }

        public async Task<IEnumerable<Contrato>> GetAll()
        {
            return await _contratoRepository.GetAll();
        }

        public async Task<Contrato> Insert(Contrato contrato)
        {
            SetEstado(contrato);
            return await _contratoRepository.Insert(contrato);
        }

        public async Task<Contrato> Update(Contrato contrato)
        {
            SetEstado(contrato);
            return await _contratoRepository.Update(contrato);
        }

        public async Task<Contrato> Get(ObjectId contratoId)
        {
            return await _contratoRepository.Get(contratoId);
        }

        private void SetEstado(Contrato contrato)
        {
            if (contrato.Aval == null)
            {
                contrato.Estado = Estados.Contrato.Borrador;
                _ofertaService.SetOfertaEstadoContratoBorrador(new ObjectId(contrato.IdOferta));
            }
            else
            {
                contrato.Estado = Estados.Contrato.Finalizado;
                _ofertaService.SetOfertaEstadoContratoFinalizado(new ObjectId(contrato.IdOferta));
            }
        }
    }
}
