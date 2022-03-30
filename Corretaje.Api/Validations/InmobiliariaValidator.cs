using Corretaje.Api.Dto;
using FluentValidation;

namespace Corretaje.Api.Validations
{
    public class InmobiliariaValidator : AbstractValidator<InmobiliariaDto>
    {
        public InmobiliariaValidator()
        {
            RuleFor(inmobiliaria => inmobiliaria.Direccion).NotEmpty();
            RuleFor(inmobiliaria => inmobiliaria.Mail).NotEmpty().EmailAddress();
            RuleFor(inmobiliaria => inmobiliaria.Nombre).NotEmpty();
            RuleFor(inmobiliaria => inmobiliaria.Telefono).NotEmpty();
        }
    }
}
