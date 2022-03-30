using Corretaje.Api.Dto.Evaluar;
using FluentValidation;

namespace Corretaje.Api.Validations
{
    public class EvaluarAnfitrionValidator : AbstractValidator<EvaluarAnfitrionDto>
    {
        private static readonly int evaluacionMinimoValor = 1;
        private static readonly int evaluacionMaximoValor = 5;

        public EvaluarAnfitrionValidator()
        {
            RuleFor(evaluarAnfitrion => evaluarAnfitrion.Evaluacion).NotEmpty();
            RuleFor(evaluarAnfitrion => evaluarAnfitrion.Evaluacion).InclusiveBetween(evaluacionMinimoValor, evaluacionMaximoValor);
        }
    }
}
