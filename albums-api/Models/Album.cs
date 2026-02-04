namespace albums_api.Models
{
    public record Album(int Id, string Title, Artist Artist, double Price, string Image_url, int year)
    {
        public static List<Album> GetAll()
        {
            var albums = new List<Album>(){
            new Album(1, "You, Me and an App Id", new Artist("Daprize", new DateTime(1990, 5, 15), "New York"), 10.99, "https://aka.ms/albums-daprlogo", 2020),
            new Album(2, "Seven Revision Army", new Artist("The Blue-Green Stripes", new DateTime(1985, 3, 22), "London"), 13.99, "https://aka.ms/albums-containerappslogo", 2021),
            new Album(3, "Scale It Up", new Artist("KEDA Club", new DateTime(1992, 7, 10), "Tokyo"), 13.99, "https://aka.ms/albums-kedalogo", 2022),
            new Album(4, "Lost in Translation", new Artist("MegaDNS", new DateTime(1988, 11, 5), "Berlin"), 12.99,"https://aka.ms/albums-envoylogo", 2023),
            new Album(5, "Lock Down Your Love", new Artist("V is for VNET", new DateTime(1995, 1, 30), "Sydney"), 12.99, "https://aka.ms/albums-vnetlogo", 2024),
            new Album(6, "Sweet Container O' Mine", new Artist("Guns N Probeses", new DateTime(1980, 9, 12), "Los Angeles"), 14.99, "https://aka.ms/albums-containerappslogo", 2025)
         };

            return albums;
        }

        public static Album? GetById(int id)
        {
            var albums = GetAll();
            return albums.FirstOrDefault(a => a.Id == id);
        } 
    }
}
