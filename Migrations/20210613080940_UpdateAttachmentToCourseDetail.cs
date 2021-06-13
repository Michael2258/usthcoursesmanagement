using Microsoft.EntityFrameworkCore.Migrations;

namespace coursesmanagement.Migrations
{
    public partial class UpdateAttachmentToCourseDetail : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "08c164f4-6d01-4570-8dac-c8805d5c371b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "67ed2ffa-4987-48a4-bf71-563117018624");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7914c4b1-5931-4c0f-858e-0db9f4f54002");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "99a7f229-e6ae-413c-a8da-4233028011bb");

            migrationBuilder.CreateTable(
                name: "Attachments",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Key = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    CourseDetailId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Attachments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Attachments_CourseDetails_CourseDetailId",
                        column: x => x.CourseDetailId,
                        principalTable: "CourseDetails",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

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

            migrationBuilder.CreateIndex(
                name: "IX_Attachments_CourseDetailId",
                table: "Attachments",
                column: "CourseDetailId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Attachments");

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
                    { "7914c4b1-5931-4c0f-858e-0db9f4f54002", "d1c4ed67-4cda-4f33-90c9-da5e4250517c", "Admin", "ADMIN" },
                    { "67ed2ffa-4987-48a4-bf71-563117018624", "bdb59758-a162-4eb0-8273-5805b585a57a", "Teacher", "TEACHER" },
                    { "99a7f229-e6ae-413c-a8da-4233028011bb", "ee4c698e-415f-4689-ae77-a3417e5b6673", "Student", "STUDENT" },
                    { "08c164f4-6d01-4570-8dac-c8805d5c371b", "0dcb1463-11e3-4e59-932b-28c523118765", "SuperAdmin", "SUPERADMIN" }
                });
        }
    }
}
