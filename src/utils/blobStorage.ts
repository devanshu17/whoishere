import { BlobServiceClient, StorageSharedKeyCredential, ContainerClient, BlockBlobClient } from '@azure/storage-blob';
import { config } from '../config/config';
import multer from 'multer';

const accountName = config.AZURE_STORAGE_ACCOUNT_NAME as string;
const accountKey = config.AZURE_STORAGE_ACCOUNT_KEY as string;
if (!accountName) throw Error('Azure Storage accountName not found');
if (!accountKey) throw Error('Azure Storage accountKey not found');

const sharedKeyCredential = new StorageSharedKeyCredential(
    accountName,
    accountKey
);

const blobServiceClient = new BlobServiceClient(
  `https://${accountName}.blob.core.windows.net`,
  sharedKeyCredential
);

const upload = multer({ storage: multer.memoryStorage() });

async function uploadBlobFromLocalPath(
    blobName: string,
    localFilePath: string,
    mimeType: string | undefined = 'application/octet-stream',
    containerName: string = config.AZURE_STORAGE_CONTAINER_NAME,
  ): Promise<any> {
    // Create blob client from container client
    const containerClient = await blobServiceClient.getContainerClient(
        containerName
    );
    const blobOptions = { blobHTTPHeaders: { blobContentType: mimeType } };
    const blockBlobClient: BlockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.uploadFile(localFilePath, blobOptions);
    return {
        url: blockBlobClient.url
    }
}

async function uploadBlobFromBuffer(
    blobName: string,
    buffer: Buffer | undefined,
    bufferSize: number | undefined,
    mimeType: string | undefined,
    containerName: string = config.AZURE_STORAGE_CONTAINER_NAME,
  ) {
    if(!buffer || !bufferSize ){
        throw new Error("File Buffer cannot be empty");
    }
    // Create blob client from container client
    const containerClient = await blobServiceClient.getContainerClient(
        containerName
    );
    const blockBlobClient: BlockBlobClient = containerClient.getBlockBlobClient(blobName);
    const blobOptions = { blobHTTPHeaders: { blobContentType: mimeType } };
    await blockBlobClient.upload(buffer, bufferSize, blobOptions);
    return {
        url: blockBlobClient.url
    }
    // return res;
}

export { upload, uploadBlobFromLocalPath, uploadBlobFromBuffer };