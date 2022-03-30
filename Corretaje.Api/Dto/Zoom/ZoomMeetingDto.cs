using System;
using System.Collections.Generic;

namespace Corretaje.Api.Dto.Zoom
{
    public class ZoomMeetingDto : EntityDto
    {
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public List<ZoomMeetingEventDto> Events { get; set; }

        public ZoomMeetingDto()
        {
            Events = new List<ZoomMeetingEventDto>();
        }
    }
}
