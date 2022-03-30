using Corretaje.Domain;
using Corretaje.Domain.Zoom;
using Corretaje.Repository;
using Corretaje.Service.IServices.IZoom;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Corretaje.Service.Services.Zoom
{
    public class ZoomService : IZoomService
    {
        private readonly IRepository<ZoomMeeting> _zoomMeetingRepository;

        public ZoomService(IRepository<ZoomMeeting> zoomMeetingRepository)
        {
            _zoomMeetingRepository = zoomMeetingRepository;
        }

        public async Task<ZoomMeeting> AddMeetingEvents(ZoomMeeting zoomMeeting, IEnumerable<ZoomMeetingEvent> zoomMeetingEvents)
        {
            foreach (var zoomMeetingEvent in zoomMeetingEvents)
            {
                zoomMeeting.SetEvent(zoomMeetingEvent);
            }

            await _zoomMeetingRepository.Update(zoomMeeting);

            return zoomMeeting;
        }

        public string GetAPIToken(string key, string secret)
        {
            return TokenZoomApi.Generate(key, secret);
        }

        public string GetMeetingConnectionSignature(string key, string meetingNumber, string role, string secret, DateTime connectionDateTime)
        {
            return TokenSDKJoinMeeting.Generate(key, meetingNumber, role, secret, connectionDateTime);
        }

        public async Task<ZoomMeeting> UpdateMeetingEvent(ZoomMeeting zoomMeeting, ZoomMeetingEvent zoomMeetingEvent)
        {
            zoomMeeting.UpdateEvent(zoomMeetingEvent);

            await _zoomMeetingRepository.Update(zoomMeeting);

            return zoomMeeting;
        }
    }
}
