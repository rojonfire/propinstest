using System.Collections.Generic;
using System.Linq;
using Corretaje.Api.Dto.Agenda;
using Corretaje.Domain;
using Corretaje.Domain.Agenda;

namespace Corretaje.Api.Commons.Agenda
{
    public class AgendaHelper : IAgendaHelper
    {
        public bool AsisteAnfitiron(Anfitrion anfitrion)
        {
            return anfitrion != null;
        }

        public IEnumerable<BloqueClienteAgregarDto> GenerarBloquesCliente(IEnumerable<BloqueUsuarioAgregarDto> bloquesUsuario, string id)
        {
            return bloquesUsuario.Select(bloque => new BloqueClienteAgregarDto()
            {
                ClienteId = id,
                Dia = bloque.Dia,
                Tramo = bloque.Tramo
            });
        }

        public string GetDireccionPropiedad(Domain.Propiedad propiedad)
        {
            return $"{propiedad.NombreCalle} #{propiedad.Numero}, {propiedad.Comuna}";
        }

        public string GetUsuarioId(BloqueUsuarioAgregarDto bloqueUsuario)
        {
            return bloqueUsuario.UsuarioId;
        }

        public void MapUsuarioVisitaAgente(Domain.Usuario origen, VisitaAgenteDto destino)
        {
            destino.Cliente.Nombres = origen.Nombres;
            destino.Cliente.Mail = origen.Email;
            destino.Cliente.Telefono = origen.Telefono;
        }

        public void MapClienteVisitaAgente(Cliente origen, VisitaAgenteDto destino)
        {
            destino.Cliente.Nombres = origen.Nombres;
            destino.Cliente.Mail = origen.Mail;
            destino.Cliente.Telefono = origen.Telefono;
        }

        public void MapClienteVisitaFotografo(Cliente origen, VisitaFotografoDto destino)
        {
            destino.Cliente.Nombres = origen.Nombres;
            destino.Cliente.Mail = origen.Mail;
            destino.Cliente.Telefono = origen.Telefono;
        }

        public void MapUsuarioVisitaFotografo(Domain.Usuario origen, VisitaFotografoDto destino)
        {
            destino.Cliente.Nombres = origen.Nombres;
            destino.Cliente.Mail = origen.Email;
            destino.Cliente.Telefono = origen.Telefono;
        }

        public void MapAgenteVisitaAgente(Domain.Usuario origen, VisitaAgente destino)
        {
            destino.Apellidos = origen.Apellidos;

            destino.Rut = origen.Rut;

            destino.Nombre = origen.Nombres;

            destino.Email = origen.Email;

            destino.Telefono = origen.Telefono;
        }

        public void MapFotografoVisitaFotografo(Domain.Usuario origen, VisitaFotografo destino)
        {
            destino.Apellidos = origen.Apellidos;

            destino.Rut = origen.Rut;

            destino.Nombre = origen.Nombres;

            destino.Email = origen.Email;

            destino.Telefono = origen.Telefono;
        }

        public void MapClienteVisitaAgente(Domain.Usuario origen, VisitaAgente destino)
        {
            destino.Apellidos = origen.Apellidos;

            destino.Nombre = origen.Nombres;

            destino.Email = origen.Email;

            destino.Telefono = origen.Telefono;
        }

        public void MapClienteVisitaAgente(Cliente origen, VisitaAgente destino)
        {
            destino.Apellidos = origen.Apellidos;

            destino.Nombre = origen.Nombres;

            destino.Email = origen.Mail;

            destino.Telefono = origen.Telefono;
        }

        public VisitaUsuarioEmailDto MapToEmailDto(VisitaUsuarioDto visitaUsuario, Domain.Usuario usuario, Domain.Propiedad propiedad, Domain.Cliente cliente)
        {
            string horaInicioTramo = visitaUsuario.Tramo.Split("-")[0];
            return new VisitaUsuarioEmailDto()
            {
                Anfitrion = visitaUsuario.Anfitrion,
                ClienteId = visitaUsuario.ClienteId,
                PropiedadId = visitaUsuario.PropiedadId,
                Dia = visitaUsuario.Dia,
                Direccion = string.Format("Dirección: {0}, Número: {1}", propiedad.NombreCalle, propiedad.Numero),
                Email = usuario.Email,
                Fecha = visitaUsuario.Fecha.Split(" ")[0],
                Id = visitaUsuario.Id,
                Rut = usuario.Rut,
                Telefono = usuario.Telefono,
                Tramo = visitaUsuario.Tramo,
                HoraInicio = horaInicioTramo,
                UsuarioId = visitaUsuario.UsuarioId,
                NombreUsuario = string.Format("{0} {1}", usuario.Nombres, usuario.Apellidos),
                LinkAgregarEventoAGoogleCalendar = visitaUsuario.LinkAgregarEventoAGoogleCalendar,
                LinkAgregarEventoAOutlookCalendar = visitaUsuario.LinkAgregarEventoAOutlookCalendar,
                NombreCliente = string.Format("{0} {1}", cliente.Nombres, cliente.Apellidos),
                RutCliente = cliente.Rut,
                TelefonoCliente = cliente.Telefono,
                EmailCliente = cliente.Mail
            };
        }

        public VisitaUsuarioEmailDto MapToEmailDto(VisitaUsuario visitaUsuario, Domain.Usuario usuario, Cliente cliente)
        {
            string horaInicioTramo = visitaUsuario.Tramo.Split("-")[0];
            return new VisitaUsuarioEmailDto()
            {
                ClienteId = visitaUsuario.ClienteId,
                PropiedadId = visitaUsuario.PropiedadId,
                Dia = visitaUsuario.Dia,
                Direccion = string.Format("Dirección: {0}", visitaUsuario.PropiedadDireccion),
                Email = usuario.Email,
                Fecha = visitaUsuario.Fecha.ToString().Split(" ")[0],
                Rut = usuario.Rut,
                Telefono = usuario.Telefono,
                Tramo = visitaUsuario.Tramo,
                HoraInicio = horaInicioTramo,
                NombreUsuario = string.Format("{0} {1}", usuario.Nombres, usuario.Apellidos),
                NombreCliente = string.Format("{0} {1}", cliente.Nombres, cliente.Apellidos),
                RutCliente = cliente.Rut,
                TelefonoCliente = cliente.Telefono,
                EmailCliente = cliente.Mail
            };
        }

        public VisitaUsuarioEmailDto MapToEmailDto(VisitaFotografo visitaFotografo, Domain.Usuario usuario, Cliente cliente)
        {
            string horaInicioTramo = visitaFotografo.Tramo.Split("-")[0];
            return new VisitaUsuarioEmailDto()
            {
                ClienteId = visitaFotografo.ClienteId,
                PropiedadId = visitaFotografo.PropiedadId,
                Dia = visitaFotografo.Dia,
                Direccion = string.Format("Dirección: {0}", visitaFotografo.Direccion),
                Email = usuario.Email,
                Fecha = visitaFotografo.Fecha.ToString().Split(" ")[0],
                Rut = usuario.Rut,
                Telefono = usuario.Telefono,
                Tramo = visitaFotografo.Tramo,
                HoraInicio = horaInicioTramo,
                NombreUsuario = string.Format("{0} {1}", usuario.Nombres, usuario.Apellidos),
                NombreCliente = string.Format("{0} {1}", cliente.Nombres, cliente.Apellidos),
                RutCliente = cliente.Rut,
                TelefonoCliente = cliente.Telefono,
                EmailCliente = cliente.Mail
            };
        }

        public VisitaUsuarioEmailDto MapToEmailDto(VisitaFotografo visitaFotografo, Domain.Usuario fotografo, Domain.Usuario cliente)
        {
            string horaInicioTramo = visitaFotografo.Tramo.Split("-")[0];
            return new VisitaUsuarioEmailDto()
            {
                ClienteId = visitaFotografo.ClienteId,
                PropiedadId = visitaFotografo.PropiedadId,
                Dia = visitaFotografo.Dia,
                Direccion = string.Format("Dirección: {0}", visitaFotografo.Direccion),
                Email = fotografo.Email,
                Fecha = visitaFotografo.Fecha.ToString().Split(" ")[0],
                Rut = fotografo.Rut,
                Telefono = fotografo.Telefono,
                Tramo = visitaFotografo.Tramo,
                HoraInicio = horaInicioTramo,
                NombreUsuario = string.Format("{0} {1}", fotografo.Nombres, fotografo.Apellidos),
                NombreCliente = string.Format("{0} {1}", cliente.Nombres, cliente.Apellidos),
                RutCliente = cliente.Rut,
                TelefonoCliente = cliente.Telefono,
                EmailCliente = cliente.Email
            };
        }

        public VisitaBrokerSuscriptorEmailDto MapVisitaBrokerSuscriptorToEmailDto(VisitaBrokerSuscriptor visita, Cliente propietario, Domain.Usuario broker, Suscripcion suscripcion)
        {
            string horaInicioTramo = visita.Tramo.Split("-")[0];
            return new VisitaBrokerSuscriptorEmailDto()
            {
                Direccion = visita.PropiedadDireccion,
                Fecha = visita.Fecha.ToString().Split(" ")[0],
                HoraInicio = horaInicioTramo,
                EmailBroker = broker.Email,
                TelefonoBroker = broker.Telefono,
                NombreBroker = $"{broker.Nombres} {broker.Apellidos}",
                EmailPropietario = propietario.Mail,
                TelefonoPropietario = propietario.Telefono,
                NombrePropietario = $"{propietario.Nombres} {propietario.Apellidos}",
                RutPropietario = propietario.Rut,
                EmailSuscriptor = suscripcion.EmailUsuario,
                NombreSuscriptor = suscripcion.NombreUsuario,
                TelefonoSuscriptor = suscripcion.Telefono,
                LinkAgregarEventoAGoogleCalendar = visita.LinkAgregarEventoAGoogleCalendar,
                LinkAgregarEventoAOutlookCalendar = visita.LinkAgregarEventoAOutlookCalendar,
            };
        }
    }
}
