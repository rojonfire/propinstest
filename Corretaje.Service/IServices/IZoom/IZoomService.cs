using Corretaje.Domain.Zoom;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Service.IServices.IZoom
{
    public interface IZoomService
    {
        Task<ZoomMeeting> AddMeetingEvents(ZoomMeeting zoomMeeting, IEnumerable<ZoomMeetingEvent> zoomMeetingEvents);
        string GetAPIToken(string key, string secret);
        string GetMeetingConnectionSignature(string key, string meetingNumber, string role, string secret, DateTime connectionDateTime);
        Task<ZoomMeeting> UpdateMeetingEvent(ZoomMeeting zoomMeeting, ZoomMeetingEvent zoomMeetingEvent);
    }
}
