using System.Collections.Generic;
namespace coursesmanagement.Dtos
{
    public class PagedResponseDto<TDto>
    {
        public int Page { get; set; }
        public int Limit { get; set; }
        public int TotalItems { get; set; }
        public int TotalPages { get; set; }
        public IList<TDto> Items { get; set; }

        public PagedResponseDto()
        {
            Items = new List<TDto>();
        }
    }
}