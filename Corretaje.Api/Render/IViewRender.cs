using System.Threading.Tasks;

namespace Corretaje.Api.Render
{
    public interface IViewRender
    {
        Task<string> RenderToStringAsync(string viewName, object model);
    }
}
