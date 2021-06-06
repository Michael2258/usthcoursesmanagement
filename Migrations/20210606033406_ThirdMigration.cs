using Microsoft.EntityFrameworkCore.Migrations;

namespace coursesmanagement.Migrations
{
    public partial class ThirdMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1443bcb4-c331-4c30-90df-af82ed4108bb");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1b1fcf1e-eefe-481e-9dd3-10375a132417");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "cee427d6-1427-4d09-ba02-fad5119da2cf");

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

        protected override void Down(MigrationBuilder migrationBuilder)
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
                values: new object[] { "1b1fcf1e-eefe-481e-9dd3-10375a132417", "8eeac7e3-f077-49e0-b428-beef85b5caac", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "1443bcb4-c331-4c30-90df-af82ed4108bb", "fd1e9dd7-6c19-4a45-bcf5-7d96655854d1", "Teacher", "TEACHER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "cee427d6-1427-4d09-ba02-fad5119da2cf", "ef4243ca-4bd4-4b5f-a2fc-a6d28248c4a5", "Student", "STUDENT" });
        }
    }
}
