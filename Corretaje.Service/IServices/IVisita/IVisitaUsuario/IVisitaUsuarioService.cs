using Corretaje.Domain.Agenda;
using Corretaje.Service.IServices.IVisita.IVisitaBase;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Service.IServices.IVisita.IVisitaUsuario
{
    public interface IVisitaUsuarioService : IVisitaService<VisitaUsuario>
    {
        Task<IEnumerable<VisitaUsuario>> GetByUsuarioIdAndFecha(string id, DateTime fecha);

        Task<IEnumerable<VisitaUsuario>> GetHorarioClientesConServicioAnfitrion();

        Task<IEnumerable<VisitaUsuario>> Filtrar(string fechaInicial, string fechaFinal, string brokerId, string suscripcionId, bool mostrarSoloSinConfirmar, bool incluirFechasPasadas, bool incluirFechasFuturas);

        void SendEmailVisitaAgendada(string html, List<string> destinatarios);

        void SendEmailVisitaCancelada(string html, List<string> destinatarios);

        void SendEmailAnfitrionAsiste(string html, List<string> destinatarios);

        void SendEmailVisitaAgendadaCopiaJefeVentas(string html);

        void SendEmailVisitaCanceladaCopiaJefeVentas(string html);
    }
}
