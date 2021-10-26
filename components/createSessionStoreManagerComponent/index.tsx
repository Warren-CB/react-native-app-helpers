import * as React from "react";
import { useEventRefresh } from "../../hooks/useEventRefresh";
import type { SessionStore } from "../../services/SessionStore";
import type { Json } from "../../types/Json";

/**
 * Creates a React component which automatically manages a session store,
 * loading it and unloading it as appropriate and passing its content down to
 * its props.
 *
 * A re-render will be triggered automatically should the store's content
 * change.
 * @template T         The type of session maintained by the session store.
 * @param sessionStore The session store.  This must not yet be loaded.
 * @returns            A React component which automatically manages the session
 *                     store, loading it and unloading it as appropriate and
 *                     passing its content down to its props.
 */
export const createSessionStoreManagerComponent = <T extends Json>(
  sessionStore: SessionStore<T>
): React.FunctionComponent<{
  readonly loading: React.ReactElement<any, any> | null;
  readonly ready: (
    session: T,
    setSession: (to: T) => void
  ) => React.ReactElement<any, any> | null;
}> => {
  return ({ loading, ready }) => {
    const [loaded, setLoaded] = React.useState(false);
    useEventRefresh(sessionStore, `set`);

    React.useEffect(() => {
      let state: `loading` | `loaded` | `aborting` = `loading`;

      (async () => {
        await sessionStore.load();

        switch (state as `loading` | `aborting`) {
          case `loading`:
            state = `loaded`;
            setLoaded(true);
            break;

          case `aborting`:
            await sessionStore.unload();
            break;
        }
      })();

      return () => {
        switch (state) {
          case `loading`:
            state = `aborting`;
            break;

          case `loaded`:
            (async () => {
              await sessionStore.unload();
            })();
        }
      };
    }, []);

    if (loaded) {
      return ready(sessionStore.get(), (to: T) => {
        sessionStore.set(to);
      });
    } else {
      return loading;
    }
  };
};
