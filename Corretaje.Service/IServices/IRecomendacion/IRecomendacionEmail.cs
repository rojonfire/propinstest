using Corretaje.Domain;
using System.Collections.Generic;

namespace Corretaje.Service.IServices.IRecomendacion
{
    public interface IRecomendacionEmail
    {
        void EnviarRecomendaciones(string direccionElectronica, IEnumerable<Propiedad> recomendaciones);
    }
}
