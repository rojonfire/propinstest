using Corretaje.Domain.Agenda;
using Corretaje.Service.IServices.IVisita.IVisitaBase;
using MongoDB.Driver;
using System;
using System.Collections.Generic;

namespace Corretaje.Service.IServices.IVisita.IVisitaUsuario
{
    public interface IVisitaUsuarioQueryFiltro : IVisitaQueryFiltro<VisitaUsuario>
    {
        FilterDefinition<VisitaUsuario> FindByUsuarioIdAndFecha(string id, DateTime fecha);

        FilterDefinition<VisitaUsuario> FindByClientesId(IEnumerable<string> clientesId);

        FilterDefinition<VisitaUsuario> Filter(string fechaInicial, string fechaFinal, string idBroker = null, string idSuscripcion = null, bool mostrarSoloSinConfirmar = false, bool incluirTodasLasVisitasPasadas = false, bool incluirTodasLasVisitasFuturas = false);
    }
}
