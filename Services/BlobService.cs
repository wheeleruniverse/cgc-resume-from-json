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
        await _js.InvokeVoidAsync("NpmJs.BlobServicePut", path, body);
    }
}