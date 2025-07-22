type ReactChild =
  | string
  | number
  | bigint
  | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>
  | Iterable<React.ReactNode>
  | React.ReactPortal
  | Promise<any>;

export type { ReactChild };
