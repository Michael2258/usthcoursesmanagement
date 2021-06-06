using Microsoft.EntityFrameworkCore.Migrations;

namespace coursesmanagement.Migrations
{
    public partial class FifthMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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
                values: new object[] { "d51511ef-51e6-4fba-89bb-06cea735fc91", "61d62fcb-1226-4af9-8104-2b30c23308c0", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "79e60143-2eb6-40bf-99f5-384dfc9b49ee", "c8b61189-aa81-48c2-97a2-77b3f9d4d258", "Teacher", "TEACHER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "d89b5c46-43ce-4914-a153-aa51dfecb27d", "8f2658fb-338b-42b0-ad5b-6d081bfb984d", "Student", "STUDENT" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "79e60143-2eb6-40bf-99f5-384dfc9b49ee");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d51511ef-51e6-4fba-89bb-06cea735fc91");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d89b5c46-43ce-4914-a153-aa51dfecb27d");

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
    }
}
