using Microsoft.JSInterop;

public class VercelBlobService
{
    private readonly IJSRuntime _js;

    public VercelBlobService(IJSRuntime js)
    {
        _js = js;
    }
    
    public async void Put(String pathname, String contents)
    {
        await _js.InvokeVoidAsync("vercelBlobPut", pathname, contents);
    }
}