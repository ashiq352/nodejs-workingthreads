// How Worker makes it faster and efficient
const { Worker } = require("worker_threads");

const doFib = (iterations) =>
  new Promise((resolve) => {
    const start = Date.now();
    // --- start worker
    const worker = new Worker("./fib.js", {
      workerData: {
        iterations,
      },
    });
    // --- listen for message from worker
    worker.once("message", (data) => {
      console.log(
        `worker [${worker.threadId}]: done in ${Date.now() - start}ms`
      );
      resolve(data);
    });

    // --- Listen for error from worker
    worker.once("error", (err) => reject(err));
  });

const main = async () => {
  const start = Date.now();

  const values = await Promise.all([
    doFib(40),
    doFib(40),
    doFib(40),
    doFib(40),
    doFib(40),
    doFib(40),
    doFib(40),
    doFib(40),
    doFib(40),
    doFib(40),
  ]);

  console.log(`values: `, values);
  console.log(`fib done in: ${Date.now() - start}ms`);
};

main().catch(console.error);


// After all , Javascript is single threaded but with Worker threads we can achieve multi-threading
// and we can do it in a relatively efficient way