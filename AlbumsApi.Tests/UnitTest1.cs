using albums_api.Models;

namespace AlbumsApi.Tests;

public class AlbumTests
{
    [Fact]
    public void GetAll_ReturnsAllAlbums()
    {
        // Act
        var albums = Album.GetAll();

        // Assert
        Assert.Equal(6, albums.Count);
    }

    [Fact]
    public void GetById_ExistingId_ReturnsAlbum()
    {
        // Act
        var album = Album.GetById(1);

        // Assert
        Assert.NotNull(album);
        Assert.Equal(1, album.Id);
        Assert.Equal("You, Me and an App Id", album.Title);
        Assert.Equal("Daprize", album.Artist.Name);
    }

    [Fact]
    public void GetById_NonExistingId_ReturnsNull()
    {
        // Act
        var album = Album.GetById(999);

        // Assert
        Assert.Null(album);
    }

    [Fact]
    public void Album_HasArtistWithProperties()
    {
        // Act
        var albums = Album.GetAll();
        var firstAlbum = albums.First();

        // Assert
        Assert.NotNull(firstAlbum.Artist);
        Assert.Equal("Daprize", firstAlbum.Artist.Name);
        Assert.Equal(new DateTime(1990, 5, 15), firstAlbum.Artist.Birthdate);
        Assert.Equal("New York", firstAlbum.Artist.BirthPlace);
    }
}