using Microsoft.EntityFrameworkCore.Migrations;

namespace coursesmanagement.Migrations
{
    public partial class FourthMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "38e1c044-bcc4-42ff-bba4-f5583c7a5377");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6f916250-e480-40f3-86ee-574e0d19e821");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b38ad656-ffab-44a0-8bab-1927f62d3560");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "519650be-39b2-4267-aea7-f0a9fd4fdc65", "0c7bdf98-b651-4e9a-beda-4f9a9db55e58", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "be262196-0067-405b-b5b8-5976d98dd475", "a23c5964-cddf-4891-994b-f37d3be98818", "Teacher", "TEACHER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "50b789d4-15eb-4e78-832a-84e89d6b6186", "d27e3b79-4ba0-496d-b629-3c5da7472bbe", "Student", "STUDENT" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "50b789d4-15eb-4e78-832a-84e89d6b6186");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "519650be-39b2-4267-aea7-f0a9fd4fdc65");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "be262196-0067-405b-b5b8-5976d98dd475");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "38e1c044-bcc4-42ff-bba4-f5583c7a5377", "95569409-2890-4226-a7e9-ab6ea0507f6d", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "6f916250-e480-40f3-86ee-574e0d19e821", "77bc497d-ccd3-48c5-b2f8-1547ff7f477a", "Teacher", "TEACHER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "b38ad656-ffab-44a0-8bab-1927f62d3560", "cdd6bc8f-bf2a-4332-a780-5c0df918a8a0", "Student", "STUDENT" });
        }
    }
}
