using Corretaje.Api.Dto.Usuario;
using System;

namespace Corretaje.Api.Dto.Agenda
{
    public class VisitaAgregarDto : BloqueAgregarDto
    {
        public VisitaAgregarDto()
        {
            Cliente = new UsuarioDto
            {
                TipoCuenta = Domain.Estados.TipoCuenta.Cliente
            };
        }

        public string Fecha { get; set; }

        public string ClienteId { get; set; }

        public UsuarioDto Cliente { get; set; }

        public string LinkAgregarEventoAGoogleCalendar { get; set; }

        public string LinkAgregarEventoAOutlookCalendar { get; set; }

        public string NombrePropietario { get; set; }

        public string TipoPropiedad { get; set; }
    }
}
