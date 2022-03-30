using Corretaje.Service.IServices.IBackoffice;
using Corretaje.Service.IServices.IValidador;
using System.Collections.Generic;

namespace Corretaje.Service.Services.Backoffice
{
    public class BackofficeLoginValidador : Validador.Validador<Domain.Usuario>, IBackofficeLoginValidador
    {
        public BackofficeLoginValidador(List<IValidador<Domain.Usuario>> validadores) : base(validadores)
        {

        }
    }
}
