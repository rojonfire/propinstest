namespace Corretaje.Domain
{
    public class ErrorDetails
    {
        public int Estado { get; set; }
        public int StatusCode { get; set; }
        public string Exception { get; set; }
        public string Message { get; set; }
        public string StackTrace { get; set; }
    }
}