import { createBucketClient } from "@cosmicjs/sdk";
const cosmic = createBucketClient({
  bucketSlug: import.meta.env.BUCKET_SLUG,
  readKey: import.meta.env.BUCKET_READ_KEY,
});

export { cosmic };
