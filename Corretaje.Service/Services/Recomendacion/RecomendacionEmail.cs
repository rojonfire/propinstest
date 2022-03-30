using Corretaje.Common.EMail;
using Corretaje.Common.Extension;
using Corretaje.Service.IServices.IRecomendacion;
using System.Collections.Generic;
using System.IO;

namespace Corretaje.Service.Services.Recomendacion
{
    public class RecomendacionEmail : IRecomendacionEmail
    {
        private readonly IEMailService _emailService;
        private readonly IRecomendacionConfiguracion _recomendacionConfiguracion;

        public RecomendacionEmail(IEMailService emailService, IRecomendacionConfiguracion recomendacionConfiguracion)
        {
            _emailService = emailService;
            _recomendacionConfiguracion = recomendacionConfiguracion;
        }

        public void EnviarRecomendaciones(string direccionElectronica, IEnumerable<Domain.Propiedad> recomendaciones)
        {
            var email = GenerarEmail(direccionElectronica, recomendaciones);

            _emailService.Send(email);
        }

        private EMail GenerarEmail(string email, IEnumerable<Domain.Propiedad> recomendaciones)
        {
            return new EMail()
            {
                Content = GetEmailContent(recomendaciones),
                FromAddress = _recomendacionConfiguracion.EmailEmisor,
                Subject = _recomendacionConfiguracion.EmailAsunto,
                ToAddresses = new List<string>() { email }
            };
        }

        private List<Dictionary<string, string>> GetComodines(IEnumerable<Domain.Propiedad> recomendaciones)
        {
            var comodines = new List<Dictionary<string, string>>();

            foreach (var recomendacion in recomendaciones)
            {
                var comodin = new Dictionary<string, string>
                {
                    { "[propiedad-imagen]", recomendacion.Imagenes.Count > 0 ? recomendacion.Imagenes[0].DownloadLink : "" },
                    { "[propiedad-titulo]", recomendacion.Glosa },
                    { "[propiedad-precio]", recomendacion.Valor.ToString() },
                    { "[propiedad-link]", GetEmailLink(recomendacion.Id.ToString()) }
                };

                comodines.Add(comodin);
            }

            return comodines;
        }

        private string GetEmailContent(IEnumerable<Domain.Propiedad> recomendaciones)
        {
            string nombreArchivo = @"./Template/Recomendaciones.cshtml";
            string mailHtml = File.ReadAllText(nombreArchivo);
            string htmlRecomendacionesInicio = "[propiedades-recomendaciones-inicio]";
            string htmlRecomendacionesFin = "[propiedades-recomendaciones-fin]";
            string textoParaReemplazar = mailHtml.Between(htmlRecomendacionesInicio, htmlRecomendacionesFin);
            var comodines = GetComodines(recomendaciones);
            var trozoHtmlProcesado = ReemplazarComodines(comodines, textoParaReemplazar);
            mailHtml = mailHtml.Replace(htmlRecomendacionesInicio, "");
            mailHtml = mailHtml.Replace(htmlRecomendacionesFin, "");
            return mailHtml.Replace(textoParaReemplazar, trozoHtmlProcesado);
        }

        private string GetEmailLink(string propiedadId)
        {
            return $"{_recomendacionConfiguracion.PropiedadLinkDomain}?idprop={propiedadId}";
        }

        private string ReemplazarComodines(List<Dictionary<string, string>> comodines, string email)
        {
            string recomendaciones = "";

            foreach (var comodin in comodines)
            {
                string copiaEmail = email;

                foreach (var item in comodin)
                {
                    copiaEmail = copiaEmail.Replace(item.Key, item.Value);
                }

                recomendaciones += copiaEmail;
            }

            return recomendaciones;
        }
    }
}
