using AutoMapper;
using AutoMapper.QueryableExtensions;
using DatingAppProject.DTOs;
using DatingAppProject.Entities;
using DatingAppProject.Helpers;
using DatingAppProject.Interfaces;
using Microsoft.EntityFrameworkCore;

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

        async Task<IEnumerable<MessageDto>> IMessageRepository.GetMessageThread(string currentUsername, string recipientUsername)
        {
            var messages = await _context.Messages
           .Include(u => u.Sender).ThenInclude(p => p.Photos)
           .Include(u => u.Recipient).ThenInclude(p => p.Photos)
           .Where(
               m => m.RecipientUsername == currentUsername && m.RecipientDeleted == false &&
               m.SenderUsername == recipientUsername ||
               m.RecipientUsername == recipientUsername &&
               m.SenderUsername == currentUsername && m.SenderDeleted == false
           )
           .OrderBy(m => m.MessageSent)
           .ToListAsync();

            var unreadMessages = messages.Where(m => m.DateRead == null
                && m.RecipientUsername == currentUsername).ToList();

            if (unreadMessages.Any())
            {
                foreach (var message in unreadMessages)
                {
                    message.DateRead = DateTime.UtcNow;
                }

                await _context.SaveChangesAsync();
            }

            return _mapper.Map<IEnumerable<MessageDto>>(messages);
        }

        async Task<bool> IMessageRepository.SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }



    }
}
