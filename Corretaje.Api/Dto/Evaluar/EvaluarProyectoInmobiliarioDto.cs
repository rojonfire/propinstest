namespace Corretaje.Api.Dto.Evaluar
{
    public class EvaluarProyectoInmobiliarioDto : EvaluarAbstractoDto
    {
        public int EvaluacionConectividad { get; set; }
        public int EvaluacionEquipamiento { get; set; }
        public int EvaluacionPlusvalia { get; set; }
        public int EvaluacionRentabilidad { get; set; }
        public int EvaluacionTerminaciones { get; set; }
        public string Duracion { get; set; }
        public string ProyectoInmobiliarioId { get; set; }
    }
}
