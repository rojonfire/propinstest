namespace Corretaje.Api.Dto.Evaluar
{
    public class EvaluarAnfitrionDto : EvaluarAbstractoDto
    {
        public int Evaluacion { get; set; }

        public string ProyectoInmobiliarioId { get; set; }

        public string AgenteId { get; set; }
    }
}
