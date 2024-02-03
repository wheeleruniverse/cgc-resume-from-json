import { put } from '@vercel/blob';

export async function BlobServicePut(pathname, body){
    await put(pathname, body, {
        access: 'public',
        addRandomSuffix: false,
        contentType: 'application/json'
    });
}

export function BrowserServiceGetDimensions() {
    return {
        width: window.innerWidth,
        height: window.innerHeight
    };
}