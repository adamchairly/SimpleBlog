using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SimpleBlog.Migrations
{
    /// <inheritdoc />
    public partial class BlogPostID : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "BlogPosts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "1",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "ff0dbc2f-f0c3-4661-9b51-8ab44394b3ec", "AQAAAAIAAYagAAAAEAQgRMWwqss50btcWSyIVErz5WFU3FFLf8noCja8GVxNdenYgCfFGL5b4lBLNX4eWQ==", "3114b5a1-d0d6-4472-8598-18f5ceaa3a85" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                table: "BlogPosts");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "1",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "c5107528-1638-4511-a2d4-d1a89eb8d8fa", "AQAAAAIAAYagAAAAENK88AUkS0FoRVtbVLHzwvEH4svrQrPjpLNapcchzdREFvYB0ReP4BQ566qzHYdRbA==", "d6e781f7-4fd3-4c21-906e-27218425a931" });
        }
    }
}
