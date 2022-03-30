using Corretaje.Domain;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Service.IServices.IBusqueda
{
    public interface IBusquedaService
    {
        Task<Busqueda> Add(Busqueda busqueda);

        Task<IEnumerable<Busqueda>> GetBusquedasByFechaMayorA(DateTime fecha);

        Task<Dictionary<string, IEnumerable<Propiedad>>> GetRecomendacionesPorUsuario();
    }
}
