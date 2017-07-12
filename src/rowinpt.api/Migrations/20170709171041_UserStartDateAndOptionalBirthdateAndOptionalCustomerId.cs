using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using rowinpt.api.Migrations.Sql;

namespace rowinpt.api.Migrations
{
    public partial class UserStartDateAndOptionalBirthdateAndOptionalCustomerId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "Birthdate",
                table: "AspNetUsers",
                type: "date",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "date");

            migrationBuilder.AddColumn<int>(
                name: "CustomerId",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Startdate",
                table: "AspNetUsers",
                type: "date",
                nullable: true);

            migrationBuilder.ApplySqlScript("20170709171041_UserStartDateAndOptionalBirthdateAndOptionalCustomerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CustomerId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Startdate",
                table: "AspNetUsers");

            migrationBuilder.AlterColumn<DateTime>(
                name: "Birthdate",
                table: "AspNetUsers",
                type: "date",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "date",
                oldNullable: true);
        }
    }
}
