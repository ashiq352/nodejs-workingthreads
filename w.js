const { workerData, parentPort } = require("worker_threads");

const buffer = new Uint8Array(workerData.sharedBuffer);

for (let i = 0; i < buffer.length; i++) {
  buffer[i] = 7;
}

parentPort.postMessage("done");


// This is undisputable proof that we can indeed, shared a buffer of memory between threads without 
// needing to copy that buffer around and this is a really great thing when it comes to Performance

// Let's say you want to spin off some worker threads to resize images create thumbnails or convert PDF files
// and a lot of things we can do, fortunately we can do those in a very efficient way 