using Corretaje.Api.Dto.Aval;

namespace Corretaje.Api.Dto.Contrato
{
    public class ContratoArrendamientoAgregarDto : ContratoAgregarDto
    {
        public AvalAgregarDto Aval { get; set; }
    }
}
