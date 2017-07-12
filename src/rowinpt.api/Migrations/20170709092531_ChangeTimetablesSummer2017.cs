using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using rowinpt.api.Migrations.Sql;

namespace rowinpt.api.Migrations
{
    public partial class ChangeTimetablesSummer2017 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Active",
                table: "Timetables",
                nullable: true,
                defaultValue: false);

            migrationBuilder.ApplySqlScript("20170709092531_ChangeTimetablesSummer2017");

            migrationBuilder.AlterColumn<bool>(
                name: "Active",
                table: "Timetables",
                nullable: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Active",
                table: "Timetables");
        }
    }
}
