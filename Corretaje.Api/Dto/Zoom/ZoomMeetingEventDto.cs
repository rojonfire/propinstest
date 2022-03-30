using System;

namespace Corretaje.Api.Dto.Zoom
{
    public class ZoomMeetingEventDto
    {
        public DateTime EntryDateTime { get; set; }
        public DateTime LeaveDateTime { get; set; }
        public bool IsProyectRated { get; set; }
        public string UserId { get; set; }
        public int UserRol { get; set; }
    }
}
