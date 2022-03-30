using Corretaje.Repository;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Corretaje.Domain.Zoom
{
    public class ZoomMeeting : Entity
    {
        public DateTime Start { get; private set; }
        public DateTime End { get; private set; }
        public List<ZoomMeetingEvent> Events { get; private set; }

        public ZoomMeeting()
        {
            Events = new List<ZoomMeetingEvent>();
        }

        public void SetEvent(ZoomMeetingEvent zoomMeetingEvent) => Events.Add(zoomMeetingEvent);

        public void UpdateEvent(ZoomMeetingEvent update)
        {
            var eventToUpdate = Events.FirstOrDefault(ev => ev.UserId == update.UserId);

            if (eventToUpdate == null)
            {
                throw new Exception($"evento a actualizar no existe, userId {update.UserId}");
            }

            eventToUpdate.Update(update);
        }
    }
}
