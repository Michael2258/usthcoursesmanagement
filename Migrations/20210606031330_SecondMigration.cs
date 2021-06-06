using Microsoft.EntityFrameworkCore.Migrations;

namespace coursesmanagement.Migrations
{
    public partial class SecondMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "367ae7c0-932b-44a7-81b6-9e7193bccfe3");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4d34ad7e-a438-4cfa-b75e-abce3de18222");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "523bc608-c151-4221-bd32-5914f8a22b0f");

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

        protected override void Down(MigrationBuilder migrationBuilder)
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
                values: new object[] { "367ae7c0-932b-44a7-81b6-9e7193bccfe3", "218f13c7-87f4-40cc-8983-ab50e670cb90", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "4d34ad7e-a438-4cfa-b75e-abce3de18222", "cd7032f4-c15f-46e3-aa46-01698bbebd2b", "Teacher", "TEACHER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "523bc608-c151-4221-bd32-5914f8a22b0f", "6155677f-595a-4d85-a61b-bec894880b47", "Student", "STUDENT" });
        }
    }
}
