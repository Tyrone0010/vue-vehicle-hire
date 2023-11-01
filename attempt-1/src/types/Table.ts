export type Cell = {
  [key: string]: string ;
  value: string;
  column: string;
};

export type Row = Cell[];
export type Rows = Row[];

export type Column = {
  label: string;
  key: string;
  render: ((data: string) => string) | undefined;
};
