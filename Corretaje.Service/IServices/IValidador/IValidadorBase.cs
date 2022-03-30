using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Service.IServices.IValidador
{
    /// <summary>
    /// Se debe implementar en la clase que contiene el listado de validaciones
    /// </summary>
    /// <typeparam name="T">Tipo de entidad que contiena la validación</typeparam>
    public interface IValidadorBase<T>
    {
        /// <summary>
        /// Contiene el listado de errores luego de aplicar el conjunto de validaciones para "x" proceso
        /// </summary>
        List<string> Errores { get; set; }

        /// <summary>
        /// Gatilla la validación de las clases que contienen las reglas de negocio
        /// </summary>
        /// <param name="entity"></param>
        Task<bool> Validar(T entity);
    }
}
