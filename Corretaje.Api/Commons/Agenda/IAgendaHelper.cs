using Corretaje.Api.Dto.Agenda;
using Corretaje.Domain;
using Corretaje.Domain.Agenda;
using System.Collections.Generic;

namespace Corretaje.Api.Commons.Agenda
{
    public interface IAgendaHelper
    {
        bool AsisteAnfitiron(Anfitrion anfitrion);

        IEnumerable<BloqueClienteAgregarDto> GenerarBloquesCliente(IEnumerable<BloqueUsuarioAgregarDto> bloquesUsuario, string id);

        string GetDireccionPropiedad(Domain.Propiedad propiedad);

        string GetUsuarioId(BloqueUsuarioAgregarDto bloqueUsuario);

        VisitaUsuarioEmailDto MapToEmailDto(VisitaUsuarioDto visitaUsuario, Domain.Usuario usuario, Domain.Propiedad propiedad, Cliente cliente);

        void MapAgenteVisitaAgente(Domain.Usuario origen, VisitaAgente destino);

        void MapUsuarioVisitaAgente(Domain.Usuario origen, VisitaAgenteDto destino);

        void MapFotografoVisitaFotografo(Domain.Usuario origen, VisitaFotografo destino);

        void MapClienteVisitaFotografo(Cliente origen, VisitaFotografoDto destino);

        void MapUsuarioVisitaFotografo(Domain.Usuario origen, VisitaFotografoDto destino);

        void MapClienteVisitaAgente(Domain.Usuario origen, VisitaAgente destino);
        
        void MapClienteVisitaAgente(Cliente origen, VisitaAgente destino);

        void MapClienteVisitaAgente(Cliente origen, VisitaAgenteDto destino);

        VisitaUsuarioEmailDto MapToEmailDto(VisitaUsuario visitaUsuario, Domain.Usuario usuario, Cliente cliente);

        VisitaUsuarioEmailDto MapToEmailDto(VisitaFotografo visitaFotografo, Domain.Usuario usuario, Cliente cliente);

        VisitaUsuarioEmailDto MapToEmailDto(VisitaFotografo visitaFotografo, Domain.Usuario fotografo, Domain.Usuario cliente);

        VisitaBrokerSuscriptorEmailDto MapVisitaBrokerSuscriptorToEmailDto(VisitaBrokerSuscriptor visita, Cliente propietario, Domain.Usuario broker, Suscripcion suscripcion);
        
    }
}
