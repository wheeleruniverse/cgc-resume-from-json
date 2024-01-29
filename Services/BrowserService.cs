using Microsoft.JSInterop;

public class BrowserService(IJSRuntime js)
{
    public async Task<BrowserScreenSize> GetScreenSize()
    {
        var dimensions = await GetDimensions();
        return dimensions.Width switch
        {
            >= 1024 => BrowserScreenSize.Desktop,
            >= 768 => BrowserScreenSize.Tablet,
            _ => BrowserScreenSize.Mobile
        };
    }
    
    private async Task<BrowserDimension> GetDimensions()
    {
        return await js.InvokeAsync<BrowserDimension>("getDimensions");
    }
}

public class BrowserDimension
{
    public int Width { get; set; }
    public int Height { get; set; }
}

public enum BrowserScreenSize
{
    Desktop,
    Mobile,
    Tablet,
}