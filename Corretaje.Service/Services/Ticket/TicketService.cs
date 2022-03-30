using Corretaje.Common.EMail;
using Corretaje.Repository;
using Corretaje.Service.IServices.ITicket;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Corretaje.Service.Services.Ticket
{
    public class TicketService : ITicketService
    {
        private const string _ticketEstadoAbierto = "Abierto";
        private const string _ticketEstadoCerrado = "Cerrado";
        private readonly IRepository<Domain.Usuario> _repositoryUsuario;
        private readonly IRepository<Domain.Ticket> _repositoryTicket;
        private readonly IEMailService _eMailService;
        private readonly ITicketConfiguracion _ticketConfiguracion;

        public TicketService(IEMailService eMailService, IRepository<Domain.Usuario> repositoryUsuario, IRepository<Domain.Ticket> repositoryTicket, ITicketConfiguracion ticketConfiguracion)
        {
            _eMailService = eMailService;
            _repositoryUsuario = repositoryUsuario;
            _repositoryTicket = repositoryTicket;
            _ticketConfiguracion = ticketConfiguracion;
        }

        public async Task<Domain.Ticket> AddTicket(Domain.Ticket ticket)
        {
            return await _repositoryTicket.Insert(ticket);
        }

        public async Task<Domain.Ticket> CerrarTicket(Domain.Ticket ticket)
        {
            ticket.Estado = _ticketEstadoCerrado;

            return await _repositoryTicket.Update(ticket);
        }

        public async Task<Domain.Ticket> GetById(ObjectId ticketId)
        {
            return await _repositoryTicket.Get(ticketId);
        }

        public async Task<List<Domain.Ticket>> GetAllTicketsEnEstadoAbierto()
        {
            var ticketQueryFiltroEstadoAbierto = GetQueryTicketFiltroEstadoAbierto();
            var ticketsEnEstadoAbierto = await _repositoryTicket.SearchFor(ticketQueryFiltroEstadoAbierto);
            return ticketsEnEstadoAbierto.ToList();
        }

        public async void ResponderTicket(Domain.Ticket ticket)
        {
            await SetFechaDeRespuesta(ticket);

            SendEMail(ticket);
        }

        private async Task<string> GetUsuarioEMail(string usuarioId)
        {
            var usuario = await _repositoryUsuario.Get(new ObjectId(usuarioId));
            return usuario?.Email;
        }

        private async Task<Domain.Ticket> SetFechaDeRespuesta(Domain.Ticket ticket)
        {
            ticket.FechaDeRespuesta = System.DateTime.Now;
            return await _repositoryTicket.Update(ticket);
        }

        private async void SendEMail(Domain.Ticket ticket)
        {
            string emisorTicketEMail = await GetUsuarioEMail(ticket.UsuarioId);

            var eMail = new EMail()
            {
                Content = ticket.Respuesta,
                FromAddress = _ticketConfiguracion.EmailEmisor,
                Subject = $"Respuesta a ticket {ticket.Asunto}",
                ToAddresses = new List<string>() { emisorTicketEMail }
            };

            _eMailService.Send(eMail);
        }

        private FilterDefinition<Domain.Ticket> GetQueryTicketFiltroEstadoAbierto()
        {
            return Builders<Domain.Ticket>.Filter.Where(ticket => ticket.Estado == _ticketEstadoAbierto);
        }
    }
}
