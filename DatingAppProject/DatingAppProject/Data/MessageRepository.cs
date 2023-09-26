using AutoMapper;
using DatingAppProject.DTOs;
using DatingAppProject.Entities;
using DatingAppProject.Helpers;
using DatingAppProject.Interfaces;

namespace DatingAppProject.Data
{
    public class MessageRepository : IMessageRepository

    {

        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public MessageRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        void IMessageRepository.AddMessage(Message message)
        {
            _context.Messages.Add(message);
        }

        async void IMessageRepository.DeleteMessage(Message message)
        {
            _context.Messages.Remove(message);
        }

        async Task<Message> IMessageRepository.GetMessage(int id)
        {
            return await _context.Messages.FindAsync(id);
        }

        Task<PagedList<MessageDto>> IMessageRepository.GetMessagesForUser()
        {
            throw new NotImplementedException();
        }

        Task<IEnumerable<MessageDto>> IMessageRepository.GetMessageThread(int currentUserId, int recipientId)
        {
            throw new NotImplementedException();
        }

        async Task<bool> IMessageRepository.SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
