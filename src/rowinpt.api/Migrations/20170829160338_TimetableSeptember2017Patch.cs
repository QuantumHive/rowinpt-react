using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;
using rowinpt.api.Migrations.Sql;

namespace rowinpt.api.Migrations
{
    public partial class TimetableSeptember2017Patch : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.ApplySqlScript("20170829160338_TimetableSeptember2017Patch");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
