using DatingAppProject.Helpers;
using System.Text.Json;

namespace DatingAppProject.Extensions
{
    public static class HttpExtensions
    {

        public static void AddPaginationHeader(this HttpResponse response, PaginationHeader header)
        {
            var jsonOpt = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
            response.Headers.Add("Pagination",JsonSerializer.Serialize(header,jsonOpt));
            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");

        }
    }
}