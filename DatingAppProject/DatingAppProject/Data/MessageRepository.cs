using AutoMapper;
using AutoMapper.QueryableExtensions;
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

        async Task<PagedList<MessageDto>> IMessageRepository.GetMessagesForUser(MessageParams messageParams)
        {
            var query = _context.Messages
          .OrderByDescending(x => x.MessageSent)
          .AsQueryable();

            query = messageParams.Container switch
            {
                "Inbox" => query.Where(u => u.Recipient.UserName == messageParams.Username &&
                 u.RecipientDeleted == false),
                "Outbox" => query.Where(u => u.Sender.UserName == messageParams.Username &&
                    u.SenderDeleted == false),
                _ => query.Where(u => u.Recipient.UserName == messageParams.Username
                    && u.RecipientDeleted == false && u.DateRead == null)
            };

            var messages = query.ProjectTo<MessageDto>(_mapper.ConfigurationProvider);

            return await PagedList<MessageDto>.CreateAsync(messages, messageParams.PageNumber, messageParams.PageSize);
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
