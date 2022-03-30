using Corretaje.Api.Dto.PdfContrato;
using Corretaje.Domain;

namespace Corretaje.Api.Commons
{
    public interface IContratoHelper
    {
        ContratoDeArrendamientoDto GetContratoDeArrendamiento(Cliente arrendador, Contrato contrato, Domain.Propiedad propiedad, Domain.Usuario arrendatario);

        PromesaDeCompraVentaDto GetPromesaDeCompraVenta(Cliente arrendador, Contrato contrato, Domain.Propiedad propiedad, Domain.Usuario arrendatario);

        string GetContratoArrendamientoTemplateName(Contrato contrato);

        string GetPromesaDeCompraVentaTemplateName(Contrato contrato);
    }
}
