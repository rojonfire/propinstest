using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Corretaje.Common.EMail;
using Corretaje.Domain;
using MongoDB.Bson;

namespace Corretaje.Service.IServices.IReporte
{
    public interface IReporteService
    {
        Task<Reporte> Create(ObjectId proyectoInmobiliarioId, DateTime inicioPeriodo, DateTime terminoPeriodo);
        Task<IEnumerable<Reporte>> GetReporteByQuery(ReporteQueryString query);
        void SendEmail(ObjectId inmobiliariaId, string html, string fromAddress, List<string> toAddresses, string subject, List<Archivo> attachmentsByte);
        Task<Reporte> GeneraReportes();
    }
}