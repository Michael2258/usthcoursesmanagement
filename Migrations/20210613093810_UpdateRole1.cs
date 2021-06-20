using Microsoft.EntityFrameworkCore.Migrations;

namespace coursesmanagement.Migrations
{
    public partial class UpdateRole1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "fde5b84c-ab5b-4b05-b2bc-6a15062da176");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "676d0f1d-818b-469c-af2b-494322d96c76",
                columns: new[] { "Name", "NormalizedName" },
                values: new object[] { "SuperAdmin", "SUPERADMIN" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "676d0f1d-818b-469c-af2b-494322d96c76",
                columns: new[] { "Name", "NormalizedName" },
                values: new object[] { "Assistant", "ASSISTANT" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "fde5b84c-ab5b-4b05-b2bc-6a15062da176", "c1495958-840b-4659-86cb-d9085c5010ea", "Parent", "PARENT" });
        }
    }
}
