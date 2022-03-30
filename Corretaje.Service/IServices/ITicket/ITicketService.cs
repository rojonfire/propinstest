using System.Collections.Generic;
using System.Threading.Tasks;
using Corretaje.Domain;

namespace Corretaje.Service.IServices.ITicket
{
    public interface ITicketService
    {
        Task<Ticket> AddTicket(Ticket ticketToAdd);

        Task<List<Ticket>> GetAllTicketsEnEstadoAbierto();

        Task<Ticket> GetById(MongoDB.Bson.ObjectId ticketId);

        Task<Ticket> CerrarTicket(Ticket ticketParaCerrar);

        void ResponderTicket(Ticket ticket);
    }
}
