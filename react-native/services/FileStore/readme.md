# `react-native-app-helpers/FileStore`

A wrapper around expo-file-system which stores files in a subdirectory of the
document directory and provides a mockable interface.

## Usage

```tsx
import type { UuidGenerator, FileStore } from "react-native-app-helpers";

const fileStore = new FileStore(new UuidGenerator());

await fileStore.load(`example-subdirectory-name`);

// [`9dd60263-682d-41b9-bf39-c3a1183da1b1`, ...]
await fileStore.list();

// Idempotent.
await fileStore.delete(`9dd60263-682d-41b9-bf39-c3a1183da1b1`);

// `example/path/to/document/directory/example-subdirectory-name/9dd60263-682d-41b9-bf39-c3a1183da1b1`.
fileStore.generatePath(`9dd60263-682d-41b9-bf39-c3a1183da1b1`);

// `9dd60263-682d-41b9-bf39-c3a1183da1b1`
await fileStore.import(`example-file-uri`);

// `9dd60263-682d-41b9-bf39-c3a1183da1b1`
await fileStore.importPreservingOriginal(`example-file-uri`);

fileStore.unload();
```

## Interface

This package also exports a `StateStoreInterface` type which can be used to
substitute other types in place of this class (for unit tests, for example).
