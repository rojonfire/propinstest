using System.Collections.Generic;
using System.Threading.Tasks;
using Corretaje.Domain;
using MongoDB.Bson;

namespace Corretaje.Service.IServices.IProyectoInmobiliario
{
    public interface IProyectoInmobiliarioService
    {
        Task<ProyectoInmobiliario> Create(ObjectId inmobiliariaId, ProyectoInmobiliario proyectoInmobiliario);
        Task<ProyectoInmobiliario> Update(ObjectId inmobiliariaId, ProyectoInmobiliario proyectoInmobiliario);
        Task<IEnumerable<ProyectoInmobiliario>> GetProyectosInmobiliariosByQuery(ProyectoInmobiliarioQueryString query);
        Task<ProyectoInmobiliario> Get(ObjectId proyectoId);
        string AddLink(string proyectoId, string inmobiliariaId);
    }
}