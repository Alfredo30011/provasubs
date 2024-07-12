using StudentRegistrationApi.Data;
using StudentRegistrationApi.Models;

namespace StudentRegistrationApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        
        public DbSet<Student> Students { get; set; }
    }

    public class DbSet<T>
    {
        internal async Task<bool> AnyAsync(Func<object, bool> value)
        {
            throw new NotImplementedException();
        }

        internal async Task FindAsync(object studentId)
        {
            throw new NotImplementedException();
        }

        internal IEnumerable<object> Include(Func<object, object> value)
        {
            throw new NotImplementedException();
        }

        internal async Task<object?> ToListAsync()
        {
            throw new NotImplementedException();
        }

        internal IEnumerable<object> Where(Func<object, bool> value)
        {
            throw new NotImplementedException();
        }
    }

    public class DbContextOptions<T>
    {
    }

    public class DbContext
    {
        private DbContextOptions<AppDbContext> options;
        private DbContextOptions<global::AppDbContext> options1;

        public DbContext(DbContextOptions<AppDbContext> options)
        {
            this.options = options;
        }

        public DbContext(DbContextOptions<global::AppDbContext> options1)
        {
            this.options1 = options1;
        }
    }
}
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    
    public DbSet<Student> Students { get; set; }
    public DbSet<ImcRecord > ImcRecords { get; set; }

    internal async Task SaveChangesAsync()
    {
        throw new NotImplementedException();
    }
}
