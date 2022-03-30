using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Corretaje.Common.FTP;
using Corretaje.Domain;
using Corretaje.Service.IServices;
using Corretaje.Service.IServices.IPropiedad;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using NPOI.HSSF.UserModel;

namespace Corretaje.Api.Cron
{
    public class DelayedJobs
    {
        private readonly IPropiedadService _propiedadService;
        private readonly IPortalInmobiliarioService _portalInmobiliarioService;
        private readonly IFtpService _ftpService;
        private IConfigurationRoot Configuration { get; }
        private readonly IHostingEnvironment _environment;

        public DelayedJobs(IHostingEnvironment env, IPropiedadService propiedadService, IFtpService ftpService,
            IPortalInmobiliarioService portalInmobiliarioService)
        {
            _propiedadService = propiedadService;
            _ftpService = ftpService;
            _portalInmobiliarioService = portalInmobiliarioService;
            _environment = env;
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", false, true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public async Task PublicarPropiedadesFtp()
        {
            const string fileName = "propiedades.xls";
            var ftpUri = Configuration.GetSection("FTPService:Uri").Value;
            var ftpUser = Configuration.GetSection("FTPService:User").Value;
            var ftpPassword = Configuration.GetSection("FTPService:Password").Value;
            var url = $"{ftpUri}/{fileName}";
            var resultArray = _ftpService.DownloadFile(fileName, url, ftpUser, ftpPassword);

            var filter = Builders<Propiedad>.Filter.Where(propiedad =>
                !propiedad.PublicadaPortalInmobiliario && propiedad.Disponible);

            var filterPublicadas = Builders<Propiedad>.Filter.Where(propiedad =>
                propiedad.PublicadaPortalInmobiliario);

            var propiedadesAPublicar = await _propiedadService.SearchFor(filter);
            var propiedadesPublicasdas = await _propiedadService.SearchFor(filterPublicadas);

            var aPublicar = propiedadesAPublicar.ToList();
            if (aPublicar.Any())
            {
                if (resultArray == null || resultArray.Length == 0)
                {
                    resultArray = CrearArchivoExcel(fileName, aPublicar);
                    if(resultArray != null && resultArray.Length > 0)
                        _ftpService.UploadFile(url, ftpUser, ftpPassword, resultArray, true);
                }
                else
                {
                    resultArray = AgregarPropiedades(fileName, aPublicar, resultArray,
                        propiedadesPublicasdas.Count() + 1);
                    if (resultArray != null && resultArray.Length > 0)
                        _ftpService.UploadFile(url, ftpUser, ftpPassword, resultArray, true);
                }
            }

            var path = @"C:\" + fileName;
            File.WriteAllBytes(path, resultArray);
        }

        public byte[] CrearArchivoExcel(string fileName, IEnumerable<Propiedad> propiedadesAPublicar)
        {
            return AddRows(propiedadesAPublicar, 1);
        }

        public byte[] AgregarPropiedades(string fileName, IEnumerable<Propiedad> propiedadesAPublicar, byte[] file,
            int index)
        {
            return AddRows(propiedadesAPublicar, index, file);
        }

        public byte[] AddRows(IEnumerable<Propiedad> propiedadesAPublicar, int indexRowStart, byte[] file = null)
        {
            var ftpUri = Configuration.GetSection("FTPService:Uri").Value;
            var ftpUser = Configuration.GetSection("FTPService:User").Value;
            var ftpPassword = Configuration.GetSection("FTPService:Password").Value;
            var portalInmobiliarioVendeId = Configuration.GetSection("PortalInmobiliario:VendeId").Value;
            var comlumHeadrs = new[]
            {
                "CODIGO", "OBJETIVO", "TIPO", "COMUNA", "UBICACIÓN", "TIPO MONEDA", "VALOR", "MT2 CONST", "MT2 TERRENO",
                "DORMITORIOS", "BAÑOS", "LATITUD", "LONGITUD", "AMOBLADO", "OBSERVACIONES", "IMAGEN1", "IMAGEN2",
                "IMAGEN3", "IMAGEN4", "IMAGEN5", "IMAGEN6", "IMAGEN7", "IMAGEN8", "IMAGEN9", "IMAGEN10", "IMAGEN11",
                "IMAGEN12", "IMAGEN13", "IMAGEN14", "IMAGEN15", "IMAGEN16", "IMAGEN17", "IMAGEN18", "IMAGEN19",
                "IMAGEN20", "IMAGEN21", "IMAGEN22", "IMAGEN23", "IMAGEN24", "IMAGEN25", "IMAGEN26", "IMAGEN27",
                "IMAGEN28", "IMAGEN29", "IMAGEN30", "IMAGEN31", "IMAGEN32", "IMAGEN33", "IMAGEN34", "IMAGEN35",
                "IMAGEN36", "IMAGEN37", "IMAGEN38", "IMAGEN39", "IMAGEN40", "IMAGEN41", "IMAGEN42", "IMAGEN43",
                "IMAGEN44", "IMAGEN45", "IMAGEN46", "IMAGEN47", "IMAGEN48", "IMAGEN49", "IMAGEN50", "Servicios",
                "VendeID"
            };

            var imgIndex = new[]
            {
                "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Z", "AA", "AB", "AC", "AD", "AE", "AF", "AG", "AH", "AI",
                "AJ", "AK", "AL", "AM", "AN", "AO", "AP", "AQ", "AR", "AS", "AT", "AU", "AV", "AW", "AX", "AY", "AZ",
                "BA", "BB", "BC", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BK", "BL", "BM"
            };

            var fsInicial = file != null ? new MemoryStream(file) : new MemoryStream();
            var workbook = indexRowStart != 1 ? new HSSFWorkbook(fsInicial) : new HSSFWorkbook();
            var excelSheet = indexRowStart != 1 ? workbook.GetSheetAt(0) : workbook.CreateSheet("Propiedades");

            if (indexRowStart == 1)
            {
                var row = excelSheet.CreateRow(0);
                for (var i = 0; i < comlumHeadrs.Length; i++) row.CreateCell(i).SetCellValue(comlumHeadrs[i]);
            }

            var aPublicar = propiedadesAPublicar.ToList();

            foreach (var t in aPublicar)
            {
                var cellIndex = 0;
                var newRow = excelSheet.CreateRow(indexRowStart);
                var indicePropiedad = int.Parse(t.CodigoPropiedad.Split('_').Last());
                newRow.CreateCell(cellIndex).SetCellValue(indicePropiedad);
                cellIndex++;
                newRow.CreateCell(cellIndex).SetCellValue(t.Operacion);
                cellIndex++;
                newRow.CreateCell(cellIndex).SetCellValue(t.TipoPropiedad);
                cellIndex++;
                newRow.CreateCell(cellIndex).SetCellValue(_portalInmobiliarioService.GetComuna(t.Comuna).Result);
                cellIndex++;
                newRow.CreateCell(cellIndex).SetCellValue(t.Glosa);
                cellIndex++;
                newRow.CreateCell(cellIndex).SetCellValue(t.TipoPrecio);
                cellIndex++;
                newRow.CreateCell(cellIndex).SetCellValue(t.Valor);
                cellIndex++;
                newRow.CreateCell(cellIndex).SetCellValue(t.SuperficieUtil);
                cellIndex++;
                newRow.CreateCell(cellIndex).SetCellValue(t.SuperficieTotales);
                cellIndex++;
                newRow.CreateCell(cellIndex).SetCellValue(t.Dormitorios);
                cellIndex++;
                newRow.CreateCell(cellIndex).SetCellValue(t.Banio);
                cellIndex++;
                newRow.CreateCell(cellIndex).SetCellValue(t.Loc.x);
                cellIndex++;
                newRow.CreateCell(cellIndex).SetCellValue(t.Loc.y);
                cellIndex++;
                newRow.CreateCell(cellIndex).SetCellValue(t.Amoblado ? 1 : 0);
                cellIndex++;
                newRow.CreateCell(cellIndex).SetCellValue(t.ObservacionesPublicas);
                cellIndex++;

                var images = t.Imagenes.ToArray();
                for (var z = 0; z <= imgIndex.Length; z++)
                {
                    if (images.Length > z)
                        newRow.CreateCell(cellIndex).SetCellValue($"{indicePropiedad}_{images[z].Name}");

                    cellIndex++;
                }

                newRow.CreateCell(cellIndex).SetCellValue(t.Amoblado ? 1 : 0);
                cellIndex++;
                newRow.CreateCell(cellIndex).SetCellValue(portalInmobiliarioVendeId);

                foreach (var imagen in t.Imagenes)
                {
                    var webClient = new WebClient();
                    var imageBytes = webClient.DownloadData(imagen.DownloadLink);
                    var url = $"{ftpUri}/{indicePropiedad}_{imagen.Name}";
                    _ftpService.UploadFile(url, ftpUser, ftpPassword, imageBytes, true);
                }

                t.PublicadaPortalInmobiliario = true;
                _propiedadService.Update(t);
                indexRowStart++;
            }

            var newExcel = new MemoryStream();
            workbook.Write(newExcel);
            return newExcel.ToArray();
        }
    }
}