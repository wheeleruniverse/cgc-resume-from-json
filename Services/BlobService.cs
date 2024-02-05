using Microsoft.JSInterop;

public class BlobService
{
    private readonly IJSRuntime _js;

    public BlobService(IJSRuntime js)
    {
        _js = js;
    }
    
    public async void Put(String path, String body)
    {
        var token = Environment.GetEnvironmentVariable("BLOB_READ_WRITE_TOKEN");
        if (token != null)
        {
            await _js.InvokeVoidAsync("NpmJs.BlobServicePut", path, body, token);
        }
    }
}