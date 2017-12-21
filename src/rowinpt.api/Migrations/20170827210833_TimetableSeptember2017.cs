using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;
using rowinpt.api.Migrations.Sql;

namespace rowinpt.api.Migrations
{
    public partial class TimetableSeptember2017 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Active",
                table: "CourseTypes",
                type: "bit",
                nullable: true,
                defaultValue: false);

            migrationBuilder.ApplySqlScript("20170827210833_TimetableSeptember2017");

            migrationBuilder.AlterColumn<bool>(
                name: "Active",
                table: "Timetables",
                nullable: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Active",
                table: "CourseTypes");
        }
    }
}
