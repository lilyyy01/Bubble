import { initEdgeStore } from '@edgestore/server';
import {
    createEdgeStoreNextHandler,
    type CreateContextOptions,
} from '@edgestore/server/adapters/next/pages';

// import { getServerSession } from "next-auth/next"
// import { authOptions } from '../auth/[...nextauth]'

import { AWSProvider, AWSProviderOptions } from '@edgestore/server/providers/aws';
import { z } from 'zod';

type Context = {
    userId: string;
    userRole: 'admin' | 'user';
};

async function createContext({ req }: CreateContextOptions): Promise<Context> {
    // replace with your own session logic...
    // we don't have logic here, it is in the input part...

    return {
        userId: "unknown",
        userRole: 'user',
    }
}

const es = initEdgeStore.context<Context>().create();
 
// the main router for uploads
const edgeStoreRouter = es.router({
    publicImages: es
    .imageBucket({
        maxSize: 1024 * 1024 * 3,  // 3 MB
        accept: ['image/jpeg', 'image/png'],
    }).input(
        // two types, either profile of user, or a post image
        z.object({
          type: z.enum(["post", "profile"]),
          userId: z.string(),
        })
    ).path(
        // store path: /post/{userId}/my-file.jpg
        ({ ctx, input }) => [
            { type: input.type },
            { author: input.userId },
        ]
    ).metadata(({ctx, input}) => ({
        // this metadata will be added to every file in this bucket,
        userRole: ctx.userRole,
    })
    )
});

const awsOptions: AWSProviderOptions = {
    accessKeyId: process.env.ES_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.ES_AWS_SECRET_ACCESS_KEY,
    region: process.env.ES_AWS_REGION,
    bucketName: process.env.ES_AWS_BUCKET_NAME,
    // jwtSecret: secret for the jwt...
}

export default createEdgeStoreNextHandler({
    router: edgeStoreRouter,
    provider: AWSProvider(awsOptions),
    /**
    * The context is generated and saved to a cookie
    * in the first load of the page.
    */
    createContext,
});

// export the type also
export type EdgeStoreRouter = typeof edgeStoreRouter;
