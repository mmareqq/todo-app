export type Prettify<T> = {
   [K in keyof T]: T[K];
} & {};

export type strictOptional<T> = Prettify<{
   [K in keyof T]?: Exclude<T[K], undefined>;
}>;

export type JSONValue = number | string | boolean | null;

export type JSONObject =
   | JSONValue
   | JSONObject[]
   | { [key: string]: JSONObject };
