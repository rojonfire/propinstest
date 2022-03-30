using Corretaje.Common.Excel;
using Corretaje.Domain.PropiedadesPI;
using Corretaje.Repository;
using Corretaje.Service.IServices.IPropiedadesPI;
using Corretaje.Service.IServices.IPropiedadesPI.IPropiedadesPIInmobiliaria;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Service.Services.PropiedadesPI.PropiedadesPIInmobiliaria
{
    public class PIPropiedadInmobiliariaService : PIPropiedadService<PIPropiedadInmobiliaria>, IPIPropiedadInmobiliariaService
    {
        private readonly IExcelToObjectList _excelToObjectList;

        public PIPropiedadInmobiliariaService(IExcelToObjectList excelToObjectList, 
            IPIPropiedadQueryFiltro<PIPropiedadInmobiliaria> propiedadQueryFiltro, 
            IRepository<PIPropiedadInmobiliaria> repositoryPropiedadInmobiliaria,
            IPIPropiedadInmobiliariaConfiguracion pIPropiedadInmobiliariaConfiguracion
            ) : base(repositoryPropiedadInmobiliaria, propiedadQueryFiltro, pIPropiedadInmobiliariaConfiguracion)
        {
            _excelToObjectList = excelToObjectList;
        }

        public async Task<IEnumerable<PIPropiedadInmobiliaria>> UploadFile(string fileLocation)
        {
            var list =  _excelToObjectList.ReadExcelFileToObjectList<PIPropiedadInmobiliaria>(fileLocation);
            return await AddMany(list);
        }

    }

}
