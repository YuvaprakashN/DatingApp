using DatingAppProject.Entities;
using Microsoft.EntityFrameworkCore;

namespace DatingAppProject.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options):base(options) { 
        
        }

        public DbSet<AppUser> Users { get; set; }

    }
}
