using Corretaje.Domain;
using Corretaje.Repository;
using Corretaje.Service.IServices.IOferta;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Corretaje.Service.Services.Oferta
{
    public class OfertaService : IOfertaService
    {
        private readonly IOfertaConfiguration _ofertaConfiguracion;
        private readonly IOfertaCriterioVisualizacion _ofertaCriterioVisualizacion;
        private readonly IOfertaEmision _ofertaEmision;
        private readonly IOfertaEstado _ofertaEstado;
        private readonly IOfertaQueryFiltro _ofertaQueryFiltro;
        private readonly IOfertaMonto _ofertaMonto;
        private readonly IOfertaSendEMail _ofertaSendEMail;
        private readonly IRepository<Domain.Oferta> _ofertaRepository;

        public OfertaService(IOfertaConfiguration ofertaConfiguracion, IOfertaCriterioVisualizacion ofertaCriterioVisualizacion, IOfertaEmision ofertaEmision, IOfertaEstado ofertaEstado, IOfertaQueryFiltro ofertaQueryFiltro, IRepository<Domain.Oferta> ofertaRepository, IOfertaMonto ofertaMonto, IOfertaSendEMail ofertaSendEMail)
        {
            _ofertaConfiguracion = ofertaConfiguracion;
            _ofertaCriterioVisualizacion = ofertaCriterioVisualizacion;
            _ofertaEmision = ofertaEmision;
            _ofertaQueryFiltro = ofertaQueryFiltro;
            _ofertaSendEMail = ofertaSendEMail;
            _ofertaEstado = ofertaEstado;
            _ofertaMonto = ofertaMonto;
            _ofertaRepository = ofertaRepository;
        }

        private async Task<Domain.Oferta> SetOfertaAceptada(Domain.Oferta oferta)
        {
            _ofertaEstado.SetOfertaEstadoAceptada(oferta);

            return await _ofertaRepository.Update(oferta);
        }

        private async Task<IEnumerable<Domain.Oferta>> DeclinarOfertasByPublicacionId(string publicacionId)
        {
            var ofertasParaDeclinar = await _ofertaRepository.SearchFor(_ofertaQueryFiltro.FiltroOfertasParaDeclinarByPublicacionId(publicacionId));

            foreach (var oferta in ofertasParaDeclinar)
            {
                await DeclinarOferta(oferta);
            }

            return ofertasParaDeclinar;
        }

        private DateTime GetFechaCaducidad()
        {
            return DateTime.Now.AddHours(_ofertaConfiguracion.OfertaVigencia * -1);
        }

        public async Task<IEnumerable<Domain.Oferta>> GetTodasLasOfertasVigentes()
        {
            var ofertasVigentes = await _ofertaRepository.SearchFor(_ofertaQueryFiltro.FiltroOfertasVigentes());

            return _ofertaCriterioVisualizacion.GetOfertasOrdenadasByPrecioFechaPublicacion(ofertasVigentes);
        }

        public async Task<IEnumerable<Domain.Oferta>> GetOfertasByPublicacionId(string publicacionId)
        {
            var ofertas = await _ofertaRepository.SearchFor(_ofertaQueryFiltro.FiltroOfertaByPublicacionId(publicacionId));

            return _ofertaCriterioVisualizacion.GetOfertasOrdenadasByPrecioFechaPublicacion(ofertas);
        }

        public async Task<IEnumerable<Domain.Oferta>> GetOfertaByPropietarioId(string propietarioId)
        {
            var ofertas = await _ofertaRepository.SearchFor(_ofertaQueryFiltro.FiltroOfertasByPropietarioId(propietarioId));

            return _ofertaCriterioVisualizacion.GetOfertasOrdenadasByPrecioFechaPublicacion(ofertas);
        }

        public async Task<IEnumerable<Domain.Oferta>> GetOfertasVigentesByPropietarioId(string propietarioId)
        {
            var ofertas = await _ofertaRepository.SearchFor(_ofertaQueryFiltro.FiltroOfertasVigentesByPropietarioId(propietarioId));

            return _ofertaCriterioVisualizacion.GetOfertasOrdenadasByPrecioFechaPublicacion(ofertas);
        }

        public async Task<IEnumerable<Domain.Oferta>> GetOfertasByOfertador(string ofertadorId)
        {
            var ofertas = await _ofertaRepository.SearchFor(_ofertaQueryFiltro.FiltroOfertasByOfertadorId(ofertadorId));

            return _ofertaCriterioVisualizacion.GetOfertasOrdenadasByPrecioFechaPublicacion(ofertas);
        }

        public async Task<Domain.Oferta> AceptarOferta(Domain.Oferta oferta)
        {
            await SetOfertaAceptada(oferta);

            //await DeclinarOfertasByPublicacionId(oferta.PublicacionId);

            return oferta;
        }

        public async Task<Domain.Oferta> UpdateOferta(Domain.Oferta oferta)
        {
            await _ofertaRepository.Update(oferta);
            return oferta;
        }

        public async Task<Domain.Oferta> AceptarOferta(ObjectId ofertaId)
        {
            var oferta = await _ofertaRepository.Get(ofertaId);

            return await AceptarOferta(oferta);
        }

        public async Task<Domain.Oferta> AgregarOferta(Domain.Oferta oferta)
        {
            _ofertaEstado.SetOfertaSinEstado(oferta);

            _ofertaEmision.SetEmitidaPorUsuario(oferta);

            _ofertaMonto.SetMontoMaximo(oferta, oferta.MontoDePublicacion);

            _ofertaMonto.SetMontoMinimo(oferta, oferta.MontoDeOferta);

            return await _ofertaRepository.Insert(oferta);
        }

        public async Task<Domain.Oferta> AgregarMensajeAOferta(ObjectId ofertaId, MensajeOferta mensaje)
        {
            var oferta = await _ofertaRepository.Get(ofertaId);

            oferta.Mensajes.Add(mensaje);

            var result = await _ofertaRepository.Update(oferta);

            return result;
        }

        public async Task<Domain.Oferta> DeclinarOferta(Domain.Oferta oferta)
        {
            _ofertaEstado.SetOfertaEstadoDeclinada(oferta);

            return await _ofertaRepository.Update(oferta);
        }

        public async Task<Domain.Oferta> DeclinarOferta(ObjectId ofertaId)
        {
            var oferta = await _ofertaRepository.Get(ofertaId);

            return await DeclinarOferta(oferta);
        }

        public async void EliminarOferta(ObjectId ofertaId)
        {
            await _ofertaRepository.Delete(ofertaId);
        }

        public async Task<Domain.Oferta> GetOfertaById(ObjectId ofertaId)
        {
            return await _ofertaRepository.Get(ofertaId);
        }

        public async Task<Domain.Oferta> GetOfertaByOfertaIdAndOfertadorId(ObjectId ofertaId, string ofertadorId)
        {
            var oferta = await _ofertaRepository.SearchFor(_ofertaQueryFiltro.FiltroOfertaByOfertaIdAndOfertadorId(ofertaId, ofertadorId));

            return oferta.SingleOrDefault();
        }

        public async Task<Domain.Oferta> GetOfertaByOfertaIdAndPropietarioId(ObjectId ofertaId, string propietarioId)
        {
            var oferta = await _ofertaRepository.SearchFor(_ofertaQueryFiltro.FiltroOfertaByOfertaIdAndPropietarioId(ofertaId, propietarioId));

            return oferta.SingleOrDefault();
        }

        public async Task<Domain.Oferta> RechazarOferta(Domain.Oferta oferta, Estados.OfertaEmision emitidaPor)
        {
            _ofertaEstado.SetOfertaEstadoRechazada(oferta);

            oferta.EmitidaPor = emitidaPor;

            await _ofertaRepository.Update(oferta);

            return oferta;
        }

        public async Task<Domain.Oferta> RechazarOferta(ObjectId ofertaId, Estados.OfertaEmision emitidaPor)
        {
            var oferta = await _ofertaRepository.Get(ofertaId);

            return await RechazarOferta(oferta, emitidaPor);
        }

        public async Task<Domain.Oferta> SetOfertaEstadoContratoBorrador(ObjectId ofertaId)
        {
            var oferta = await GetOfertaById(ofertaId);

            return await SetOfertaEstadoContratoBorrador(oferta);
        }

        public async Task<Domain.Oferta> SetOfertaEstadoContratoBorrador(Domain.Oferta oferta)
        {
            _ofertaEstado.SetOfertaEstadoContratoBorrador(oferta);

            return await UpdateOferta(oferta);
        }

        public async Task<Domain.Oferta> SetOfertaEstadoContratoFinalizado(ObjectId ofertaId)
        {
            var oferta = await GetOfertaById(ofertaId);

            return await SetOfertaEstadoContratoFinalizado(oferta);
        }

        public async Task<Domain.Oferta> SetOfertaEstadoContratoFinalizado(Domain.Oferta oferta)
        {
            _ofertaEstado.SetOfertaEstadoContratoFinalizado(oferta);

            return await UpdateOferta(oferta);
        }

        public async void EliminarOfertasCaducadas()
        {
            var fechaCaducidad = GetFechaCaducidad();

            var ofertasCaducadas = await _ofertaRepository.SearchFor(_ofertaQueryFiltro.FiltroOfertasParaEliminar());

            foreach (var oferta in ofertasCaducadas)
            {
                await _ofertaRepository.Delete(oferta.Id);
            }
        }

        public async void DeclinarOfertasCaducadas()
        {
            var ofertasCaducadas = await _ofertaRepository.SearchFor(_ofertaQueryFiltro.FiltroOfertasCaducadas());

            foreach (var oferta in ofertasCaducadas)
            {
                await DeclinarOferta(oferta.Id);
            }
        }

        public void OfertaSendEMailOfertaAceptadaComprador(Domain.Oferta oferta, string html)
        {
            _ofertaSendEMail.OfertaSendEMailOfertaAceptadaComprador(oferta, html);
        }

        public void OfertaSendEMailOfertaAceptadaVendedor(Domain.Oferta oferta, string html)
        {
            _ofertaSendEMail.OfertaSendEMailOfertaAceptadaVendedor(oferta, html);
        }

        public void OfertaSendEMailOfertaDeclinadaComprador(Domain.Oferta oferta, string html)
        {
            _ofertaSendEMail.OfertaSendEMailOfertaDeclinadaComprador(oferta, html);
        }

        public void OfertaSendEMailOfertaDeclinadaVendedor(Domain.Oferta oferta, string html)
        {
            _ofertaSendEMail.OfertaSendEMailOfertaDeclinadaVendedor(oferta, html);
        }

        public void OfertaSendEMailOfertaRechazadaComprador(Domain.Oferta oferta, string html)
        {
            _ofertaSendEMail.OfertaSendEMailOfertaRechazadaComprador(oferta, html);
        }

        public void OfertaSendEMailOfertaRechazadaVendedor(Domain.Oferta oferta, string html)
        {
            _ofertaSendEMail.OfertaSendEMailOfertaRechazadaVendedor(oferta, html);
        }

        public void OfertaSendEmailOfertaEmitidaVendedor(Domain.Oferta oferta, string html)
        {
            _ofertaSendEMail.OfertaSendEmailOfertaEmitidaVendedor(oferta, html);
        }

        public void OfertaSendEmailOfertaEmitidaComprador(Domain.Oferta oferta, string html)
        {
            _ofertaSendEMail.OfertaSendEmailOfertaEmitidaComprador(oferta, html);
        }

        public void OfertaSendEmailOfertaEmitidaCopiaAdministrador(string html)
        {
            _ofertaSendEMail.OfertaSendEmailOfertaEmitidaCopiaAdministrador(html);
        }
    }
}
