using System;

namespace Corretaje.Domain.Zoom
{
    public class ZoomMeetingEvent
    {
        public DateTime EntryDateTime { get; private set; }
        public DateTime LeaveDateTime { get; private set; }
        public bool IsProyectRated { get; private set; }
        public string UserId { get; private set; }
        public int UserRol { get; private set; }

        public void Update(ZoomMeetingEvent update)
        {
            EntryDateTime = update.EntryDateTime;
            LeaveDateTime = update.LeaveDateTime;
            IsProyectRated = update.IsProyectRated;
            UserRol = update.UserRol;
        }
    }
}
