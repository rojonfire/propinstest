namespace Corretaje.Common.Pdf
{
    public interface IPdfCreador
    {
        byte[] ConvertirHtmlAPdf(string html);
    }
}
