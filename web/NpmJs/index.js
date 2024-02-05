import { put } from '@vercel/blob';

export async function BlobServicePut(path, body, token){
    if(!path || !body || !token){
        throw new Error('expected args [path, body, token]');
    }
    await put(path, body, {
        access: 'public',
        addRandomSuffix: false,
        contentType: 'application/json',
        token
    });
}

export function BrowserServiceGetDimensions() {
    return {
        width: window.innerWidth,
        height: window.innerHeight
    };
}