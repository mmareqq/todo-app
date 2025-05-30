export type Prettify<T> = {
   [K in keyof T]: T[K];
} & {};

export type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

export type UpdateValue<T extends object> = <K extends keyof T>(
   key: K,
   value: T[K],
) => void;
