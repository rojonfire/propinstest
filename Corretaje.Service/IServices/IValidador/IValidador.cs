using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Service.IServices.IValidador
{
    /// <summary>
    /// Se debe implementar en la clase que contiene la regla de negocio
    /// </summary>
    /// <typeparam name="T">Entidad a Validar</typeparam>
    public interface IValidador<T>
    {
        Task<bool> EsValido(T entity);

        IEnumerable<string> Errores(T entity);
    }
}
