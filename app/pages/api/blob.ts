import { list, put, PutCommandOptions } from '@vercel/blob';
import type { NextApiRequest, NextApiResponse } from 'next';

type BlobResponse = BlobFailureResponse | BlobSuccessResponse;
type BlobFailureResponse = {
  error: any;
};
type BlobSuccessResponse = {
  download: string;
  filename: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BlobResponse>
): Promise<void> {
  if (!req.method || !['GET', 'OPTIONS', 'PUT'].includes(req.method)) {
    sendError(res, 405);
    return;
  }
  switch (req.method) {
    case 'OPTIONS':
      res.status(200).end();
      break;
    case 'GET':
      await getBlob(req, res);
      break;
    case 'PUT':
      await putBlob(req, res);
      break;
  }
}

async function getBlob(
  req: NextApiRequest,
  res: NextApiResponse<BlobResponse>
): Promise<void> {
  const id = req.query?.id as string;
  if (!id) {
    sendError(res, 400);
    return;
  }
  const result = await list({
    limit: 1,
    prefix: `${id}.json`,
  });

  if (!result?.blobs?.length) {
    sendError(res, 404);
    return;
  }
  const { downloadUrl, pathname } = result.blobs[0];
  res.status(200).send({ download: downloadUrl, filename: pathname });
}

async function putBlob(
  req: NextApiRequest,
  res: NextApiResponse<BlobResponse>
): Promise<void> {
  if (!req.body) {
    sendError(res, 400);
    return;
  }
  const filename = `${crypto.randomUUID()}.json`;
  const options: PutCommandOptions = {
    access: 'public',
    addRandomSuffix: false,
    contentType: 'application/json',
  };
  try {
    const result = await put(filename, JSON.stringify(req.body), options);
    res.status(200).json({ download: result.downloadUrl, filename });
  } catch (error) {
    console.log(error);
    sendError(res, 500);
  }
}

function sendError(
  res: NextApiResponse<BlobFailureResponse>,
  code: number
): void {
  let error: string;
  switch (code) {
    case 400:
      error = 'Bad Request';
      break;
    case 404:
      error = 'Not Found';
      break;
    case 405:
      error = 'Method Not Allowed';
      break;
    case 500:
      error = 'Internal Server Error';
      break;
    default:
      error = 'Unknown';
  }
  res.status(code).json({ error });
}
