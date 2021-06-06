using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace coursesmanagement.Models
{
    public class ApplicationUser : IdentityUser, IBaseModel
    {
        public bool IsDeleted { get; set; }
        public DateTime DeletedAt { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get; set; }
        public string Gender { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string Avatar { get; set; }
        public virtual ICollection<IdentityUserRole<string>> Roles { get; }
    }
}