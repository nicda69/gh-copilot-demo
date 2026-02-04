namespace albums_api.Models
{
    public class Artist
    {
        public string Name { get; set; }
        public DateTime Birthdate { get; set; }
        public string BirthPlace { get; set; }

        public Artist(string name, DateTime birthdate, string birthPlace)
        {
            Name = name;
            Birthdate = birthdate;
            BirthPlace = birthPlace;
        }
    }
}