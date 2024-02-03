import { put } from '@vercel/blob';

export async function BlobServicePut(path, body){
    if(!path || !body){
        throw new Error('expected args path and body');
    }
    await put(path, body, {
        access: 'public',
        addRandomSuffix: false,
        contentType: 'application/json',
        token: process.env.BLOB_READ_WRITE_TOKEN
    });
    
    // TODO: resolve the environment variable
}

export function BrowserServiceGetDimensions() {
    return {
        width: window.innerWidth,
        height: window.innerHeight
    };
}