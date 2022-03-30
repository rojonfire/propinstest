using Corretaje.Common.ApiClient;
using Corretaje.Domain;
using Corretaje.Repository;
using Corretaje.Service.IServices.ISBIF;
using MongoDB.Driver;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Corretaje.Service.Services.SBIF
{
    public class SBIFService : ISBIFService
    {
        private readonly IApiClient _apiClient;
        private readonly IRepository<Uf> _repositoryUf;
        private readonly ISBIFConfiguration _sBIFConfiguration;

        public SBIFService(IApiClient apiClient, ISBIFConfiguration sBIFConfiguration, IRepository<Uf> repositoryUf)
        {
            _apiClient = apiClient;
            _sBIFConfiguration = sBIFConfiguration;
            _repositoryUf = repositoryUf;
        }

        public async void UpdateUf()
        {
            var uf = await GetUf();
            await GuardarUf(uf);
        }

        /// <summary>
        /// Obtiene el valor de la uf desde el servicio de la super intendencia de valores e instituciones financieras.
        /// </summary>
        /// <returns>Entidad de dominio Uf</returns>
        public async Task<Uf> GetUf()
        {
            var serviceResponse = await _apiClient.GetAsync<Ufs>(new Uri(_sBIFConfiguration.UfServiceRequestUrl));
            return serviceResponse.UFs.FirstOrDefault();
        }

        public async Task<Uf> GetLastUf()
        {
            var ufs = await _repositoryUf.GetAll();
            return ufs.OrderByDescending(u => u.Fecha).FirstOrDefault();
        }

        /// <summary>
        /// Obtiene la uf desde el repositorio, el valor ha sido previamente guardado ya que se realiza una consulta mensual a SBIF para mantener el valor actualizado.
        /// </summary>
        /// <param name="fecha">Fecha de la uf</param>
        /// <returns>Entidad de dominio Uf</returns>
        public async Task<Uf> GetUf(DateTime fecha)
        {
            var queryFiltroPorFecha = GetqueryFiltroPorFecha(fecha);

            try
            {
                var ufs = await _repositoryUf.SearchFor(queryFiltroPorFecha);
                return ufs.FirstOrDefault();
            }
            catch (Exception exception)
            {
                throw exception;
            }
        }

        private async Task<Uf> GuardarUf(Uf uf)
        {
            return await _repositoryUf.Insert(uf);
        }

        private FilterDefinition<Uf> GetqueryFiltroPorFecha(DateTime fecha)
        {
            int oneDay = 1;
            var fechaInicio = fecha.Date;
            var fechaFin = fecha.Date.AddDays(oneDay);

            return Builders<Uf>.Filter.Where(uf => uf.Fecha >= fechaInicio && uf.Fecha < fechaFin);
        }

        private FilterDefinition<Uf> GetqueryFiltroPorUltimoPeriodo()
        {
            int diaNueve = 9;
            int unMes = 1;

            var finPeriodo = new DateTime(DateTime.Now.Year, DateTime.Now.AddMonths(unMes).Month, diaNueve);
            var hoy = DateTime.Now.Date;

            return Builders<Uf>.Filter.Where(uf => uf.Fecha >= hoy && uf.Fecha < finPeriodo);
        }

        public async Task<Uf> GetUfUltimoPeriodo()
        {
            //var queryFiltroPorUltimoPeriodo = GetqueryFiltroPorUltimoPeriodo();
            var ufUltimoPeriodo = await _repositoryUf.GetAll(); //SearchFor(queryFiltroPorUltimoPeriodo);
            return ufUltimoPeriodo.OrderByDescending(u => u.Id).FirstOrDefault();
        }


    }
}
