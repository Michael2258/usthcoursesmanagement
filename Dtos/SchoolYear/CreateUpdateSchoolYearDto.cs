using System.Collections.Generic;
namespace coursesmanagement.Dtos.SchoolYear
{
    public class CreateUpdateSchoolYearDto : IRequestDto
    {
        public string Year { get; set; }
    }
}