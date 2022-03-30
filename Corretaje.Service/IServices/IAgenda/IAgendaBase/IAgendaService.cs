using Corretaje.Domain.Agenda;
using System.Collections.Generic;

namespace Corretaje.Service.IServices.IAgenda.IAgendaBase
{
    public interface IAgendaService
    {
        Agenda Get(string id, List<Bloque> bloques);
    }
}
