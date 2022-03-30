using Corretaje.Domain;
using Corretaje.Service.IServices.IValidador;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Corretaje.Service.Services.OrdenCompra.Validador
{
    public class OrdenCompraValidadorServicioAdicionalUnico : IValidador<OrdenDeCompra>
    {
        public IEnumerable<string> Errores(OrdenDeCompra ordenCompra)
        {
            var mensajesError = new List<string>();

            var serviciosAdicionalesDuplicados = GetServiciosAdicionalesDuplicados(ordenCompra);

            foreach (var servicioAdicionalDuplicado in serviciosAdicionalesDuplicados)
            {
                mensajesError.Add($"El servicio {servicioAdicionalDuplicado.Nombre} ya esta contenido en la orden de compra");
            }

            return mensajesError;
        }

        public Task<bool> EsValido(OrdenDeCompra ordenCompra)
        {
            var serviciosAdicionalesDuplicados = GetServiciosAdicionalesDuplicados(ordenCompra);

            return Task.FromResult(serviciosAdicionalesDuplicados.Count() == 0);
        }

        private List<ServicioAdicional> GetServiciosAdicionalesDuplicados(OrdenDeCompra ordenCompra)
        {
            // Los servicios adicionales son los único servicios que se pueden agregar n-veces, si ya han sido utilizados.
            RemoveTasacionExitosa(ordenCompra.ServiciosAdicionales);

            return ordenCompra.ServiciosAdicionales
                .GroupBy(servicioAdicional => servicioAdicional.Id)
                .Where(g => g.Count() > 1)
                .Select(g => g.FirstOrDefault())
                .ToList();
        }

        private void RemoveTasacionExitosa(IEnumerable<ServicioAdicional> serviciosAdicionales)
        {
            serviciosAdicionales.ToList().RemoveAll(x => x.Nombre == "Tasacion" && x.Estado == Estados.Transaccion.Exitosa);
        }
    }
}
