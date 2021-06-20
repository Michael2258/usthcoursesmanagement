using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

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

            builder.Entity<IdentityRole>()
                .HasData(new List<IdentityRole>
                {
                    new IdentityRole
                    {
                        Id = "69aefaa4-ddf1-4dfb-ab8c-18ef9a3582de", Name = "Admin", NormalizedName = "Admin".ToUpper(),
                        ConcurrencyStamp = "4ca5490d-2528-4aef-aa46-668c9c8995cc"
                    },
                    new IdentityRole
                    {
                        Id = "d9d45437-cbb8-4f6d-b257-c1bd6acc6c81", Name = "Teacher",
                        NormalizedName = "Teacher".ToUpper(), ConcurrencyStamp = "f2a076ca-6bbe-44e3-a53c-8ccc702c4e0a"
                    },
                    new IdentityRole
                    {
                        Id = "676d0f1d-818b-469c-af2b-494322d96c76", Name = "SuperAdmin",
                        NormalizedName = "SuperAdmin".ToUpper(),
                        ConcurrencyStamp = "53d597ef-3e8d-411d-9edd-8d6246822cdf"
                    },
                    new IdentityRole
                    {
                        Id = "d2a38e46-b2e4-40f3-a4dd-3b68a9e98579", Name = "Student",
                        NormalizedName = "Student".ToUpper(), ConcurrencyStamp = "5af323d5-3685-414e-936e-00d63cb8ba62"
                    },
                });

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