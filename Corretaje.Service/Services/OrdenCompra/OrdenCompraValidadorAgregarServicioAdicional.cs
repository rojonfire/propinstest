using Corretaje.Domain;
using Corretaje.Service.IServices.IOrdenCompra;
using Corretaje.Service.IServices.IValidador;
using Corretaje.Service.Services.Validador;
using System.Collections.Generic;

namespace Corretaje.Service.Services.OrdenCompra
{
    public class OrdenCompraValidadorAgregarServicioAdicional : Validador<OrdenDeCompra>, IOrdenCompraValidadorAgregarServicioAdicional
    {
        public OrdenCompraValidadorAgregarServicioAdicional(List<IValidador<OrdenDeCompra>> validadores) : base(validadores)
        {

        }
    }
}
