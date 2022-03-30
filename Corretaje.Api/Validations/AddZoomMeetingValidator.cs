using Corretaje.Api.Dto.Zoom;
using FluentValidation;

namespace Corretaje.Api.Validations
{
    public class AddZoomMeetingValidator : AbstractValidator<ZoomMeetingDto>
    {
        public AddZoomMeetingValidator()
        {
            RuleFor(zoomMeeting => zoomMeeting.Start).NotEmpty();
        }
    }
}
