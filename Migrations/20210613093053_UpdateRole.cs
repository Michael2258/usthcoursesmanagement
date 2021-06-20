using Microsoft.EntityFrameworkCore.Migrations;

namespace coursesmanagement.Migrations
{
    public partial class UpdateRole : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "206eb7bb-4fe3-4e54-b6e0-bfdb234e594c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "943a2058-bea9-4bfe-9638-1913e29c1e63");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "bbd703d2-e2ac-4135-a827-8d04f56ee46d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f1b1082d-ba21-4b21-86ba-3b75aef00685");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "69aefaa4-ddf1-4dfb-ab8c-18ef9a3582de", "4ca5490d-2528-4aef-aa46-668c9c8995cc", "Admin", "ADMIN" },
                    { "d9d45437-cbb8-4f6d-b257-c1bd6acc6c81", "f2a076ca-6bbe-44e3-a53c-8ccc702c4e0a", "Teacher", "TEACHER" },
                    { "676d0f1d-818b-469c-af2b-494322d96c76", "53d597ef-3e8d-411d-9edd-8d6246822cdf", "Assistant", "ASSISTANT" },
                    { "d2a38e46-b2e4-40f3-a4dd-3b68a9e98579", "5af323d5-3685-414e-936e-00d63cb8ba62", "Student", "STUDENT" },
                    { "fde5b84c-ab5b-4b05-b2bc-6a15062da176", "c1495958-840b-4659-86cb-d9085c5010ea", "Parent", "PARENT" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "676d0f1d-818b-469c-af2b-494322d96c76");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "69aefaa4-ddf1-4dfb-ab8c-18ef9a3582de");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d2a38e46-b2e4-40f3-a4dd-3b68a9e98579");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d9d45437-cbb8-4f6d-b257-c1bd6acc6c81");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "fde5b84c-ab5b-4b05-b2bc-6a15062da176");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "bbd703d2-e2ac-4135-a827-8d04f56ee46d", "f3eb269b-5461-49e4-a1ba-4140aba375e0", "Admin", "ADMIN" },
                    { "943a2058-bea9-4bfe-9638-1913e29c1e63", "2f1379a0-76a2-4a40-9c48-fbf43edbe3e9", "Teacher", "TEACHER" },
                    { "206eb7bb-4fe3-4e54-b6e0-bfdb234e594c", "6e6d4869-3a3b-4bb9-bf2f-de6ee61e7ff5", "Student", "STUDENT" },
                    { "f1b1082d-ba21-4b21-86ba-3b75aef00685", "e64f770e-397a-4dca-9093-c9be511a12ab", "SuperAdmin", "SUPERADMIN" }
                });
        }
    }
}
