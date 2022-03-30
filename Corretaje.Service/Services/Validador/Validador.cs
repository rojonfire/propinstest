using Corretaje.Service.IServices.IValidador;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Service.Services.Validador
{
    public abstract class Validador<T> : IValidadorBase<T>
    {
        private readonly List<IValidador<T>> Validadores;

        public List<string> Errores { get; set; }

        protected Validador(List<IValidador<T>> validadores)
        {
            Validadores = validadores;
            Errores = new List<string>();
        }

        public async Task<bool> Validar(T entity)
        {
            bool esValido = true;

            foreach (var validador in Validadores)
            {
                if (!await validador.EsValido(entity))
                {
                    Errores.AddRange(validador.Errores(entity));

                    esValido = false;
                }
            }

            return esValido;
        }
    }
}
