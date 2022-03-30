using Corretaje.Api.Dto.Evaluar;
using FluentValidation;

namespace Corretaje.Api.Validations
{
    public class EvaluarProyectoInmobiliarioValidator : AbstractValidator<EvaluarProyectoInmobiliarioDto>
    {
        private static readonly int evaluacionMinimoValor = 1;
        private static readonly int evaluacionMaximoValor = 5;

        public EvaluarProyectoInmobiliarioValidator()
        {
            RuleFor(evaluarProyectoInmobiliario => evaluarProyectoInmobiliario.EvaluacionConectividad).NotEmpty().InclusiveBetween(evaluacionMinimoValor, evaluacionMaximoValor);
            RuleFor(evaluarProyectoInmobiliario => evaluarProyectoInmobiliario.EvaluacionEquipamiento).NotEmpty().InclusiveBetween(evaluacionMinimoValor, evaluacionMaximoValor);
            RuleFor(evaluarProyectoInmobiliario => evaluarProyectoInmobiliario.EvaluacionPlusvalia).NotEmpty().InclusiveBetween(evaluacionMinimoValor, evaluacionMaximoValor);
            RuleFor(evaluarProyectoInmobiliario => evaluarProyectoInmobiliario.EvaluacionRentabilidad).NotEmpty().InclusiveBetween(evaluacionMinimoValor, evaluacionMaximoValor);
            RuleFor(evaluarProyectoInmobiliario => evaluarProyectoInmobiliario.EvaluacionTerminaciones).NotEmpty().InclusiveBetween(evaluacionMinimoValor, evaluacionMaximoValor);
            RuleFor(evaluarProyectoInmobiliario => evaluarProyectoInmobiliario.EvaluadorId).NotEmpty();
        }
    }
}
