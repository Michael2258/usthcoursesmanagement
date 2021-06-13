using Microsoft.EntityFrameworkCore.Migrations;

namespace coursesmanagement.Migrations
{
    public partial class AddAttachmentToCourseDetail : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1303f472-0799-4d22-ab7d-d2ec5663109f");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "61c9d56c-eb7d-42ed-bf9a-bca944bb5536");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a2ba65e6-d518-443f-b995-1641dfad7271");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e8669635-a7e1-41b8-ab5a-39d5df25cf5f");

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

        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "e8669635-a7e1-41b8-ab5a-39d5df25cf5f", "0a3ba4d5-1bce-408c-9c9c-476be98ba8c3", "Admin", "ADMIN" },
                    { "1303f472-0799-4d22-ab7d-d2ec5663109f", "1746a31f-dfba-4a46-b401-b4cb14196487", "Teacher", "TEACHER" },
                    { "a2ba65e6-d518-443f-b995-1641dfad7271", "6d73ff0a-c05f-4c0b-b8f6-191af15ef717", "Student", "STUDENT" },
                    { "61c9d56c-eb7d-42ed-bf9a-bca944bb5536", "5d3fcbac-bdb5-4a6b-bd8f-77b5dcc5030e", "SuperAdmin", "SUPERADMIN" }
                });
        }
    }
}
