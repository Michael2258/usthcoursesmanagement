using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using coursesmanagement.Configuration;

using coursesmanagement.Models;


namespace coursesmanagement.Data
{
    public class USTHCourseDbContext : IdentityDbContext<ApplicationUser>
    {
        public USTHCourseDbContext(DbContextOptions<USTHCourseDbContext> options) : base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }

        public DbSet<SchoolYear> SchoolYears { get; set; }
        public DbSet<Course> Courses { get; set; }
        // public DbSet<FileModel> Files { get; set; }
        public DbSet<CourseDetail> CourseDetails { get; set; }
        public DbSet<Attachment> Attachments { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            RegisterCoreModels(builder);
            builder.ApplyConfiguration(new RoleConfiguration());

            builder.Entity<SchoolYearCourse>()
            .HasKey(t => new { t.SchoolYearId, t.CourseId });

            builder.Entity<CourseDetail>()
                .HasOne(i => i.Course)
                .WithOne(i => i.CourseDetail)
                .HasForeignKey<CourseDetail>(i => i.CourseId);

            builder.Entity<Attachment>()
                .HasOne(i => i.CourseDetail)
                .WithMany(i => i.Attachments)
                .HasForeignKey(i => i.CourseDetailId);
        }

        public static void RegisterCoreModels(ModelBuilder builder)
        {
            builder.Entity<ApplicationUser>()
                .HasMany(e => e.Roles)
                .WithOne()
                .HasForeignKey(e => e.UserId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
            builder.Entity<ApplicationUser>()
                .Property(u => u.FullName)
                .HasComputedColumnSql("[FirstName] + ' ' + [LastName]");
        }
    }
}