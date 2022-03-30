using Corretaje.Domain;

namespace Corretaje.Api.Dto.Agenda
{
    public class BloqueAgregarDto
    {
        public Estados.Semana Dia { get; set; }

        public string Tramo { get; set; }
    }
}
