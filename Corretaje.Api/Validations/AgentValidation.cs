using Corretaje.Api.Dto;
using FluentValidation;

namespace Corretaje.Api.Validations
{
    public class AgentValidation : AbstractValidator<AgentDto>
    {
        public AgentValidation()
        {
            RuleFor(agent => agent.Apellidos).NotEmpty().MaximumLength(500);
            RuleFor(agent => agent.InmobiliariaId).NotEmpty();
            RuleFor(agent => agent.Mail).NotEmpty().EmailAddress();
            RuleFor(agent => agent.Nombres).NotEmpty().MaximumLength(500);
            RuleFor(agent => agent.Password).NotEmpty();
        }
    }
}
