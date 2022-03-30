using Corretaje.Domain;
using Corretaje.Service.IServices.IValidador;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Corretaje.Service.Services.Backoffice
{
    public class ValidadorAccederBackoffice : IValidador<Domain.Usuario>
    {
        private readonly Estados.TipoCuenta[] _cuentasPermitidas = new Estados.TipoCuenta[]
        {
            Estados.TipoCuenta.Administrador,
            Estados.TipoCuenta.Anfitrion,
            Estados.TipoCuenta.Fotografo,
            Estados.TipoCuenta.Agente,
            Estados.TipoCuenta.AdminInmobiliario,
            Estados.TipoCuenta.JefeDeVentas,
            Estados.TipoCuenta.Broker
        };

        public IEnumerable<string> Errores(Domain.Usuario usuario)
        {
            return new List<string>() { $"Su perfil {usuario.TipoCuenta} no tiene acceso a este sitio" };
        }

        public Task<bool> EsValido(Domain.Usuario usuario)
        {
            return Task.FromResult(_cuentasPermitidas.Contains(usuario.TipoCuenta));
        }
    }
}
