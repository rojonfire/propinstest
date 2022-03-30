using Corretaje.Common.Excel;
using Corretaje.Domain.PropiedadesPI;
using Corretaje.Repository;
using Corretaje.Service.IServices.IPropiedadesPI;
using Corretaje.Service.IServices.IPropiedadesPI.IPropiedadesPINatural;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Corretaje.Service.Services.PropiedadesPI.PropiedadesPINatural
{
    public class PIPropiedadNaturalService : PIPropiedadService<PIPropiedadNatural>, IPIPropiedadNaturalService
    { 
        private readonly IExcelToObjectList _excelToObjectList;

        public PIPropiedadNaturalService(IExcelToObjectList excelToObjectList, 
            IPIPropiedadQueryFiltro<Domain.PropiedadesPI.PIPropiedadNatural> propiedadQueryFiltro, 
            IRepository<Domain.PropiedadesPI.PIPropiedadNatural> repositoryPropiedadNatural,
            IPIPropiedadNaturalConfiguracion pIPropiedadNaturalConfiguracion

            ) : base(repositoryPropiedadNatural, propiedadQueryFiltro, pIPropiedadNaturalConfiguracion)
        {
            _excelToObjectList = excelToObjectList;
        }
        public async Task<IEnumerable<PIPropiedadNatural>> UploadFile(string fileLocation)
        {
            List<PIPropiedadNatural> list = _excelToObjectList.ReadExcelFileToObjectList<PIPropiedadNatural>(fileLocation);
            return await AddMany(list);
        }


    }
}
