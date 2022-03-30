using Corretaje.Repository;
using Corretaje.Service.IServices.IOferta;
using Corretaje.Service.IServices.IPropiedad;
using Corretaje.Service.IServices.IVisita.IVisitaFotografo;
using Corretaje.Service.IServices.IVisita.IVisitaUsuario;

namespace Corretaje.Service.Services.Propiedad
{
    public class PropiedadPropietario : IPropiedadPropietario
    {
        private readonly IVisitaUsuarioService _visitaUsuarioService;
        private readonly IVisitaFotografoService _visitaFotografoService;
        private readonly IOfertaService _ofertaService;
        private readonly IRepository<Domain.Propiedad> _repositoryPropiedad;

        public PropiedadPropietario(IVisitaFotografoService visitaFotografoService, IVisitaUsuarioService visitaUsuarioService, IOfertaService ofertaService, IRepository<Domain.Propiedad> repositoryPropiedad)
        {
            _visitaFotografoService = visitaFotografoService;
            _visitaUsuarioService = visitaUsuarioService;
            _ofertaService = ofertaService;
            _repositoryPropiedad = repositoryPropiedad;
        }

        public bool CambioPropietario(Domain.Propiedad propiedadDb, Domain.Propiedad propiedadActualizada)
        {
            return propiedadDb.IdCliente != propiedadActualizada.IdCliente;
        }

        public async void HandleCambioPropietario(Domain.Propiedad propiedadActualizar)
        {
            var propiedadBd = await _repositoryPropiedad.Get(propiedadActualizar.Id);

            if (!CambioPropietario(propiedadBd, propiedadActualizar))
            {
                return;
            }

            EliminarOfertas(propiedadActualizar);
            EliminarVisitasUsuario(propiedadActualizar);
            EliminarVisitasFotografo(propiedadActualizar);
        }

        private async void EliminarOfertas(Domain.Propiedad propiedad)
        {
            var ofertas = await _ofertaService.GetOfertasByPublicacionId(propiedad.Id.ToString());

            foreach (var oferta in ofertas)
            {
                _ofertaService.EliminarOferta(oferta.Id);
            }
        }

        private async void EliminarVisitasUsuario(Domain.Propiedad propiedad)
        {
            var visitas = await _visitaUsuarioService.GetByPropiedadId(propiedad.Id.ToString());

            foreach (var visita in visitas)
            {
                _visitaUsuarioService.Delete(visita.Id);
            }
        }

        private async void EliminarVisitasFotografo(Domain.Propiedad propiedad)
        {
            var visitas = await _visitaFotografoService.GetByPropiedadId(propiedad.Id.ToString());

            foreach (var visita in visitas)
            {
                _visitaFotografoService.Delete(visita.Id);
            }
        }
    }
}
