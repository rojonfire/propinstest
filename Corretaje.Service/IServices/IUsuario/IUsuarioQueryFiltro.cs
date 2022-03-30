using Corretaje.Domain;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Collections.Generic;

namespace Corretaje.Service.IServices.IUsuario
{
    public interface IUsuarioQueryFiltro
    {
        FilterDefinition<Usuario> Filtrar(int tipoCuentaInt, string referidoPor, bool soloEmbajadores);

        FilterDefinition<Usuario> FindByEmail(string email);

        FilterDefinition<Usuario> FindByLogin(string password, string email);

        FilterDefinition<Usuario> FindByRut(string rut);

        FilterDefinition<Usuario> FindAdministradores();

        FilterDefinition<Usuario> FindUsuarios();

        FilterDefinition<Usuario> FindUsuariosByOficio(string oficio);

        FilterDefinition<Usuario> FindUsuariosById(IEnumerable<ObjectId> usuariosId);

        FilterDefinition<Usuario> FindByTipoCuenta(Estados.TipoCuenta tipoCuenta);

        FilterDefinition<Usuario> FindByEmailAndRut(string email, string rut);

        FilterDefinition<Usuario> FindByEsVendedor(bool esVendedor);

        FilterDefinition<Usuario> FindByReferidoPor(string referidoPor);

        FilterDefinition<Usuario> FindByEsEmbajador(bool esEmbajador);

        SortDefinition<Usuario> SortByFechaCreacion();
    }
}
