using Corretaje.Service.IServices.IBusqueda;
using Corretaje.Service.IServices.IPropiedad;
using Corretaje.Service.IServices.IRecomendacion;
using Corretaje.Service.IServices.ISuscripcion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Corretaje.Service.Services.Recomendacion
{
    public class RecomendacionService : IRecomendacionService
    {
        private readonly IBusquedaService _busquedaService;
        private readonly IPropiedadService _propiedadService;
        private readonly IRecomendacionEmail _recomendacionEmail;
        private readonly ISuscripcionService _suscripcionService;

        public RecomendacionService(IBusquedaService busquedaService, IPropiedadService propiedadService, IRecomendacionEmail recomendacionEmail, ISuscripcionService suscripcionService)
        {
            _busquedaService = busquedaService;
            _propiedadService = propiedadService;
            _recomendacionEmail = recomendacionEmail;
            _suscripcionService = suscripcionService;
        }
        /*
        public async void EnviarRecomendaciones()
        {
            var recomendacionesSuscriptores = await GetRecomendacionesSuscriptor();

            var recomendacionesUsuarios = await GetRecomendacionesUsuarios();

            EnviarRecomendaciones(recomendacionesSuscriptores);

            EnviarRecomendaciones(recomendacionesUsuarios);
        }
        
        public async Task<Dictionary<string, IEnumerable<Domain.Propiedad>>> GetRecomendacionesSuscriptor()
        {
            var recomendacionesPorSuscriptor = new Dictionary<string, IEnumerable<Domain.Propiedad>>();

            var suscripciones = await _suscripcionService.GetByEstado(Domain.Estados.Suscripcion.Vigente);

            foreach (var suscripcion in suscripciones)
            {
                var propiedades = await _propiedadService.Buscar(suscripcion.Busqueda);

                recomendacionesPorSuscriptor.Add(suscripcion.Email, propiedades);
            }

            return recomendacionesPorSuscriptor;
        }
        */

        public async Task<Dictionary<string, IEnumerable<Domain.Propiedad>>> GetRecomendacionesUsuarios()
        {
            int dias = -5;

            var fechaBusqueda = DateTime.Now.AddDays(dias);

            var busquedasHechasPorUsuarios = (await _busquedaService.GetBusquedasByFechaMayorA(fechaBusqueda)).GroupBy(busqueda => busqueda.Mail);

            return await _propiedadService.GetRecomendacionesUsuario(busquedasHechasPorUsuarios);
        }

        private void EnviarRecomendaciones(Dictionary<string, IEnumerable<Domain.Propiedad>> recomendaciones)
        {
            foreach (var recomendacion in recomendaciones)
            {
                _recomendacionEmail.EnviarRecomendaciones(recomendacion.Key, recomendacion.Value);
            }
        }
    }
}
