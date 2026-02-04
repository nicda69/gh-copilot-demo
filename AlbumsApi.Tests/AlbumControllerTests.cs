using System.Net;
using System.Net.Http.Json;
using albums_api.Models;
using Microsoft.AspNetCore.Mvc.Testing;

namespace AlbumsApi.Tests;

public class AlbumControllerTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly WebApplicationFactory<Program> _factory;

    public AlbumControllerTests(WebApplicationFactory<Program> factory)
    {
        _factory = factory;
    }

    [Fact]
    public async Task Get_ReturnsSuccessAndAlbums()
    {
        // Arrange
        var client = _factory.CreateClient();

        // Act
        var response = await client.GetAsync("/albums");

        // Assert
        response.EnsureSuccessStatusCode();
        var albums = await response.Content.ReadFromJsonAsync<List<Album>>();
        Assert.NotNull(albums);
        Assert.Equal(6, albums.Count);
    }

    [Fact]
    public async Task GetById_ExistingId_ReturnsAlbum()
    {
        // Arrange
        var client = _factory.CreateClient();

        // Act
        var response = await client.GetAsync("/albums/1");

        // Assert
        response.EnsureSuccessStatusCode();
        var album = await response.Content.ReadFromJsonAsync<Album>();
        Assert.NotNull(album);
        Assert.Equal(1, album.Id);
        Assert.Equal("You, Me and an App Id", album.Title);
        Assert.Equal("Daprize", album.Artist.Name);
    }

    [Fact]
    public async Task GetById_NonExistingId_ReturnsNotFound()
    {
        // Arrange
        var client = _factory.CreateClient();

        // Act
        var response = await client.GetAsync("/albums/999");

        // Assert
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }
}