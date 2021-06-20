using Microsoft.EntityFrameworkCore.Migrations;

namespace coursesmanagement.Migrations
{
    public partial class UpdateAttachmentStructure : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UploadedFileType",
                table: "Attachments",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UploadedFileType",
                table: "Attachments");
        }
    }
}
