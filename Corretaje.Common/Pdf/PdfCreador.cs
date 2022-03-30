using DinkToPdf;

namespace Corretaje.Common.Pdf
{
    public class PdfCreador : IPdfCreador
    {
        private readonly SynchronizedConverter Convertidor;

        public PdfCreador()
        {
            Convertidor = new SynchronizedConverter(new PdfTools());
        }

        public byte[] ConvertirHtmlAPdf(string html)
        {
            return Convertidor.Convert(ConvertirUsandoConfiguracionContrato(html));
        }

        private HtmlToPdfDocument ConvertirUsandoConfiguracionContrato(string html)
        {
            return new HtmlToPdfDocument
            {
                GlobalSettings =
                {
                    ColorMode = ColorMode.Color,
                    Orientation = Orientation.Portrait,
                    PaperSize = PaperKind.A4,
                    Margins =
                             {
                             Left = 0.5,
                             Unit = Unit.Centimeters
                             }
                },
                Objects =
                {
                    new ObjectSettings
                    {
                        HtmlContent = html,
                        WebSettings = { DefaultEncoding = "utf-8" }
                    }
                }
            };
        }
    }
}
