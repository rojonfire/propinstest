namespace Corretaje.Api.Dto.Agenda
{
    public class VisitaBrokerSuscriptorEmailDto
    {
        public string Direccion { get; set; }
        public string Fecha { get; set; }
        public string TelefonoSuscriptor { get; set; }
        public string EmailSuscriptor { get; set; }
        public string NombreSuscriptor { get; set; }
        public string TelefonoBroker { get; set; }
        public string EmailBroker { get; set; }
        public string NombreBroker { get; set; }
        public string HoraInicio { get; set; }
        public string NombrePropietario { get; set; }
        public string RutPropietario { get; set; }
        public string TelefonoPropietario { get; set; }
        public string EmailPropietario { get; set; }
        public string LinkAgregarEventoAGoogleCalendar { get; set; }
        public string LinkAgregarEventoAOutlookCalendar { get; set; }
    }
}
