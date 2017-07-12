using System.IO;
using Microsoft.DotNet.PlatformAbstractions;
using Microsoft.EntityFrameworkCore.Migrations;

namespace rowinpt.api.Migrations.Sql
{
    public static class SqlMigrationExtensions
    {
        public static void ApplySqlScript(this MigrationBuilder migrationBuilder, string scriptName)
        {
            var path = Path.Combine(ApplicationEnvironment.ApplicationBasePath, "Migrations", "Sql", $"{scriptName}.sql");
            migrationBuilder.Sql(File.ReadAllText(path));
        }
    }
}
