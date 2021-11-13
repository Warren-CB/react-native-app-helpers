import type { TableRow } from "../TableRow";

/**
 * Data to be passed to a table.
 * @template TKeyableColumnKey    The keys of keyable columns within the table.
 * @template TNonKeyableColumnKey The keys of non-keyable columns within the
 *                                table.
 */
export type TableData<
  TKeyableColumnKey extends string,
  TNonKeyableColumnKey extends string
  > = {
    /**
     * The rows to be shown in the table.
     */
    readonly rows: ReadonlyArray<
      TableRow<TKeyableColumnKey, TNonKeyableColumnKey>
    >;
  };
