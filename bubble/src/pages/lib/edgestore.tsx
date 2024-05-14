'use client';

import { createEdgeStoreProvider } from '@edgestore/react';
import { type EdgeStoreRouter } from '../api/edgestore/[...edgestore]';

// provider and the hook
const { EdgeStoreProvider, useEdgeStore } = createEdgeStoreProvider<EdgeStoreRouter>();

export { EdgeStoreProvider, useEdgeStore };
