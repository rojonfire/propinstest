using Corretaje.Domain;
using Corretaje.Service.IServices.IOrdenCompra;
using Corretaje.Service.IServices.IValidador;
using Corretaje.Service.Services.Validador;
using System.Collections.Generic;

namespace Corretaje.Service.Services.OrdenCompra
{
    public class OrdenCompraValidador : Validador<OrdenDeCompra>, IOrdenCompraValidador
    {
        public OrdenCompraValidador(List<IValidador<OrdenDeCompra>> validadores) : base(validadores)
        {

        }
    }
}
