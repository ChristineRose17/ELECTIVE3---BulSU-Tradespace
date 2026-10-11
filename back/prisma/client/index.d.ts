
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Listing
 * 
 */
export type Listing = $Result.DefaultSelection<Prisma.$ListingPayload>
/**
 * Model Claim
 * 
 */
export type Claim = $Result.DefaultSelection<Prisma.$ClaimPayload>
/**
 * Model SavedItem
 * 
 */
export type SavedItem = $Result.DefaultSelection<Prisma.$SavedItemPayload>
/**
 * Model ListingAvailability
 * 
 */
export type ListingAvailability = $Result.DefaultSelection<Prisma.$ListingAvailabilityPayload>
/**
 * Model TradeRequest
 * 
 */
export type TradeRequest = $Result.DefaultSelection<Prisma.$TradeRequestPayload>
/**
 * Model TradeRequestEvent
 * 
 */
export type TradeRequestEvent = $Result.DefaultSelection<Prisma.$TradeRequestEventPayload>
/**
 * Model Notification
 * 
 */
export type Notification = $Result.DefaultSelection<Prisma.$NotificationPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.listing`: Exposes CRUD operations for the **Listing** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Listings
    * const listings = await prisma.listing.findMany()
    * ```
    */
  get listing(): Prisma.ListingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.claim`: Exposes CRUD operations for the **Claim** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Claims
    * const claims = await prisma.claim.findMany()
    * ```
    */
  get claim(): Prisma.ClaimDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.savedItem`: Exposes CRUD operations for the **SavedItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SavedItems
    * const savedItems = await prisma.savedItem.findMany()
    * ```
    */
  get savedItem(): Prisma.SavedItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.listingAvailability`: Exposes CRUD operations for the **ListingAvailability** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ListingAvailabilities
    * const listingAvailabilities = await prisma.listingAvailability.findMany()
    * ```
    */
  get listingAvailability(): Prisma.ListingAvailabilityDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tradeRequest`: Exposes CRUD operations for the **TradeRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TradeRequests
    * const tradeRequests = await prisma.tradeRequest.findMany()
    * ```
    */
  get tradeRequest(): Prisma.TradeRequestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tradeRequestEvent`: Exposes CRUD operations for the **TradeRequestEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TradeRequestEvents
    * const tradeRequestEvents = await prisma.tradeRequestEvent.findMany()
    * ```
    */
  get tradeRequestEvent(): Prisma.TradeRequestEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Listing: 'Listing',
    Claim: 'Claim',
    SavedItem: 'SavedItem',
    ListingAvailability: 'ListingAvailability',
    TradeRequest: 'TradeRequest',
    TradeRequestEvent: 'TradeRequestEvent',
    Notification: 'Notification'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "listing" | "claim" | "savedItem" | "listingAvailability" | "tradeRequest" | "tradeRequestEvent" | "notification"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Listing: {
        payload: Prisma.$ListingPayload<ExtArgs>
        fields: Prisma.ListingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ListingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ListingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>
          }
          findFirst: {
            args: Prisma.ListingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ListingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>
          }
          findMany: {
            args: Prisma.ListingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>[]
          }
          create: {
            args: Prisma.ListingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>
          }
          createMany: {
            args: Prisma.ListingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ListingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>[]
          }
          delete: {
            args: Prisma.ListingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>
          }
          update: {
            args: Prisma.ListingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>
          }
          deleteMany: {
            args: Prisma.ListingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ListingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ListingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>[]
          }
          upsert: {
            args: Prisma.ListingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>
          }
          aggregate: {
            args: Prisma.ListingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateListing>
          }
          groupBy: {
            args: Prisma.ListingGroupByArgs<ExtArgs>
            result: $Utils.Optional<ListingGroupByOutputType>[]
          }
          count: {
            args: Prisma.ListingCountArgs<ExtArgs>
            result: $Utils.Optional<ListingCountAggregateOutputType> | number
          }
        }
      }
      Claim: {
        payload: Prisma.$ClaimPayload<ExtArgs>
        fields: Prisma.ClaimFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClaimFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClaimFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimPayload>
          }
          findFirst: {
            args: Prisma.ClaimFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClaimFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimPayload>
          }
          findMany: {
            args: Prisma.ClaimFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimPayload>[]
          }
          create: {
            args: Prisma.ClaimCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimPayload>
          }
          createMany: {
            args: Prisma.ClaimCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClaimCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimPayload>[]
          }
          delete: {
            args: Prisma.ClaimDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimPayload>
          }
          update: {
            args: Prisma.ClaimUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimPayload>
          }
          deleteMany: {
            args: Prisma.ClaimDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClaimUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClaimUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimPayload>[]
          }
          upsert: {
            args: Prisma.ClaimUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimPayload>
          }
          aggregate: {
            args: Prisma.ClaimAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClaim>
          }
          groupBy: {
            args: Prisma.ClaimGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClaimGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClaimCountArgs<ExtArgs>
            result: $Utils.Optional<ClaimCountAggregateOutputType> | number
          }
        }
      }
      SavedItem: {
        payload: Prisma.$SavedItemPayload<ExtArgs>
        fields: Prisma.SavedItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SavedItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SavedItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedItemPayload>
          }
          findFirst: {
            args: Prisma.SavedItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SavedItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedItemPayload>
          }
          findMany: {
            args: Prisma.SavedItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedItemPayload>[]
          }
          create: {
            args: Prisma.SavedItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedItemPayload>
          }
          createMany: {
            args: Prisma.SavedItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SavedItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedItemPayload>[]
          }
          delete: {
            args: Prisma.SavedItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedItemPayload>
          }
          update: {
            args: Prisma.SavedItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedItemPayload>
          }
          deleteMany: {
            args: Prisma.SavedItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SavedItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SavedItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedItemPayload>[]
          }
          upsert: {
            args: Prisma.SavedItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedItemPayload>
          }
          aggregate: {
            args: Prisma.SavedItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSavedItem>
          }
          groupBy: {
            args: Prisma.SavedItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<SavedItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.SavedItemCountArgs<ExtArgs>
            result: $Utils.Optional<SavedItemCountAggregateOutputType> | number
          }
        }
      }
      ListingAvailability: {
        payload: Prisma.$ListingAvailabilityPayload<ExtArgs>
        fields: Prisma.ListingAvailabilityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ListingAvailabilityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingAvailabilityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ListingAvailabilityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingAvailabilityPayload>
          }
          findFirst: {
            args: Prisma.ListingAvailabilityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingAvailabilityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ListingAvailabilityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingAvailabilityPayload>
          }
          findMany: {
            args: Prisma.ListingAvailabilityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingAvailabilityPayload>[]
          }
          create: {
            args: Prisma.ListingAvailabilityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingAvailabilityPayload>
          }
          createMany: {
            args: Prisma.ListingAvailabilityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ListingAvailabilityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingAvailabilityPayload>[]
          }
          delete: {
            args: Prisma.ListingAvailabilityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingAvailabilityPayload>
          }
          update: {
            args: Prisma.ListingAvailabilityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingAvailabilityPayload>
          }
          deleteMany: {
            args: Prisma.ListingAvailabilityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ListingAvailabilityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ListingAvailabilityUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingAvailabilityPayload>[]
          }
          upsert: {
            args: Prisma.ListingAvailabilityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingAvailabilityPayload>
          }
          aggregate: {
            args: Prisma.ListingAvailabilityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateListingAvailability>
          }
          groupBy: {
            args: Prisma.ListingAvailabilityGroupByArgs<ExtArgs>
            result: $Utils.Optional<ListingAvailabilityGroupByOutputType>[]
          }
          count: {
            args: Prisma.ListingAvailabilityCountArgs<ExtArgs>
            result: $Utils.Optional<ListingAvailabilityCountAggregateOutputType> | number
          }
        }
      }
      TradeRequest: {
        payload: Prisma.$TradeRequestPayload<ExtArgs>
        fields: Prisma.TradeRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TradeRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TradeRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeRequestPayload>
          }
          findFirst: {
            args: Prisma.TradeRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TradeRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeRequestPayload>
          }
          findMany: {
            args: Prisma.TradeRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeRequestPayload>[]
          }
          create: {
            args: Prisma.TradeRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeRequestPayload>
          }
          createMany: {
            args: Prisma.TradeRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TradeRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeRequestPayload>[]
          }
          delete: {
            args: Prisma.TradeRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeRequestPayload>
          }
          update: {
            args: Prisma.TradeRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeRequestPayload>
          }
          deleteMany: {
            args: Prisma.TradeRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TradeRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TradeRequestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeRequestPayload>[]
          }
          upsert: {
            args: Prisma.TradeRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeRequestPayload>
          }
          aggregate: {
            args: Prisma.TradeRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTradeRequest>
          }
          groupBy: {
            args: Prisma.TradeRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<TradeRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.TradeRequestCountArgs<ExtArgs>
            result: $Utils.Optional<TradeRequestCountAggregateOutputType> | number
          }
        }
      }
      TradeRequestEvent: {
        payload: Prisma.$TradeRequestEventPayload<ExtArgs>
        fields: Prisma.TradeRequestEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TradeRequestEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeRequestEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TradeRequestEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeRequestEventPayload>
          }
          findFirst: {
            args: Prisma.TradeRequestEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeRequestEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TradeRequestEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeRequestEventPayload>
          }
          findMany: {
            args: Prisma.TradeRequestEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeRequestEventPayload>[]
          }
          create: {
            args: Prisma.TradeRequestEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeRequestEventPayload>
          }
          createMany: {
            args: Prisma.TradeRequestEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TradeRequestEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeRequestEventPayload>[]
          }
          delete: {
            args: Prisma.TradeRequestEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeRequestEventPayload>
          }
          update: {
            args: Prisma.TradeRequestEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeRequestEventPayload>
          }
          deleteMany: {
            args: Prisma.TradeRequestEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TradeRequestEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TradeRequestEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeRequestEventPayload>[]
          }
          upsert: {
            args: Prisma.TradeRequestEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeRequestEventPayload>
          }
          aggregate: {
            args: Prisma.TradeRequestEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTradeRequestEvent>
          }
          groupBy: {
            args: Prisma.TradeRequestEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<TradeRequestEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.TradeRequestEventCountArgs<ExtArgs>
            result: $Utils.Optional<TradeRequestEventCountAggregateOutputType> | number
          }
        }
      }
      Notification: {
        payload: Prisma.$NotificationPayload<ExtArgs>
        fields: Prisma.NotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findFirst: {
            args: Prisma.NotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findMany: {
            args: Prisma.NotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          create: {
            args: Prisma.NotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          createMany: {
            args: Prisma.NotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          delete: {
            args: Prisma.NotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          update: {
            args: Prisma.NotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NotificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          upsert: {
            args: Prisma.NotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotification>
          }
          groupBy: {
            args: Prisma.NotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    listing?: ListingOmit
    claim?: ClaimOmit
    savedItem?: SavedItemOmit
    listingAvailability?: ListingAvailabilityOmit
    tradeRequest?: TradeRequestOmit
    tradeRequestEvent?: TradeRequestEventOmit
    notification?: NotificationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    listings: number
    claims: number
    savedItems: number
    notifications: number
    actedNotifications: number
    buyerRequests: number
    sellerRequests: number
    tradeEvents: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    listings?: boolean | UserCountOutputTypeCountListingsArgs
    claims?: boolean | UserCountOutputTypeCountClaimsArgs
    savedItems?: boolean | UserCountOutputTypeCountSavedItemsArgs
    notifications?: boolean | UserCountOutputTypeCountNotificationsArgs
    actedNotifications?: boolean | UserCountOutputTypeCountActedNotificationsArgs
    buyerRequests?: boolean | UserCountOutputTypeCountBuyerRequestsArgs
    sellerRequests?: boolean | UserCountOutputTypeCountSellerRequestsArgs
    tradeEvents?: boolean | UserCountOutputTypeCountTradeEventsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountListingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ListingWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountClaimsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClaimWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSavedItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SavedItemWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountNotificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountActedNotificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBuyerRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TradeRequestWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSellerRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TradeRequestWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTradeEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TradeRequestEventWhereInput
  }


  /**
   * Count Type ListingCountOutputType
   */

  export type ListingCountOutputType = {
    claims: number
    savedBy: number
    notifications: number
    tradeRequests: number
    availabilities: number
  }

  export type ListingCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    claims?: boolean | ListingCountOutputTypeCountClaimsArgs
    savedBy?: boolean | ListingCountOutputTypeCountSavedByArgs
    notifications?: boolean | ListingCountOutputTypeCountNotificationsArgs
    tradeRequests?: boolean | ListingCountOutputTypeCountTradeRequestsArgs
    availabilities?: boolean | ListingCountOutputTypeCountAvailabilitiesArgs
  }

  // Custom InputTypes
  /**
   * ListingCountOutputType without action
   */
  export type ListingCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingCountOutputType
     */
    select?: ListingCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ListingCountOutputType without action
   */
  export type ListingCountOutputTypeCountClaimsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClaimWhereInput
  }

  /**
   * ListingCountOutputType without action
   */
  export type ListingCountOutputTypeCountSavedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SavedItemWhereInput
  }

  /**
   * ListingCountOutputType without action
   */
  export type ListingCountOutputTypeCountNotificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
  }

  /**
   * ListingCountOutputType without action
   */
  export type ListingCountOutputTypeCountTradeRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TradeRequestWhereInput
  }

  /**
   * ListingCountOutputType without action
   */
  export type ListingCountOutputTypeCountAvailabilitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ListingAvailabilityWhereInput
  }


  /**
   * Count Type ClaimCountOutputType
   */

  export type ClaimCountOutputType = {
    notifications: number
  }

  export type ClaimCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    notifications?: boolean | ClaimCountOutputTypeCountNotificationsArgs
  }

  // Custom InputTypes
  /**
   * ClaimCountOutputType without action
   */
  export type ClaimCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimCountOutputType
     */
    select?: ClaimCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClaimCountOutputType without action
   */
  export type ClaimCountOutputTypeCountNotificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
  }


  /**
   * Count Type TradeRequestCountOutputType
   */

  export type TradeRequestCountOutputType = {
    events: number
    notifications: number
  }

  export type TradeRequestCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    events?: boolean | TradeRequestCountOutputTypeCountEventsArgs
    notifications?: boolean | TradeRequestCountOutputTypeCountNotificationsArgs
  }

  // Custom InputTypes
  /**
   * TradeRequestCountOutputType without action
   */
  export type TradeRequestCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeRequestCountOutputType
     */
    select?: TradeRequestCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TradeRequestCountOutputType without action
   */
  export type TradeRequestCountOutputTypeCountEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TradeRequestEventWhereInput
  }

  /**
   * TradeRequestCountOutputType without action
   */
  export type TradeRequestCountOutputTypeCountNotificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    supabaseId: string | null
    email: string | null
    name: string | null
    role: string | null
    profileCompleted: boolean | null
    studentId: string | null
    course: string | null
    year: string | null
    employeeId: string | null
    position: string | null
    office: string | null
    college: string | null
    campus: string | null
    phone: string | null
    bio: string | null
    avatar: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    supabaseId: string | null
    email: string | null
    name: string | null
    role: string | null
    profileCompleted: boolean | null
    studentId: string | null
    course: string | null
    year: string | null
    employeeId: string | null
    position: string | null
    office: string | null
    college: string | null
    campus: string | null
    phone: string | null
    bio: string | null
    avatar: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    supabaseId: number
    email: number
    name: number
    role: number
    profileCompleted: number
    studentId: number
    course: number
    year: number
    employeeId: number
    position: number
    office: number
    college: number
    campus: number
    phone: number
    bio: number
    avatar: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    supabaseId?: true
    email?: true
    name?: true
    role?: true
    profileCompleted?: true
    studentId?: true
    course?: true
    year?: true
    employeeId?: true
    position?: true
    office?: true
    college?: true
    campus?: true
    phone?: true
    bio?: true
    avatar?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    supabaseId?: true
    email?: true
    name?: true
    role?: true
    profileCompleted?: true
    studentId?: true
    course?: true
    year?: true
    employeeId?: true
    position?: true
    office?: true
    college?: true
    campus?: true
    phone?: true
    bio?: true
    avatar?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    supabaseId?: true
    email?: true
    name?: true
    role?: true
    profileCompleted?: true
    studentId?: true
    course?: true
    year?: true
    employeeId?: true
    position?: true
    office?: true
    college?: true
    campus?: true
    phone?: true
    bio?: true
    avatar?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    supabaseId: string
    email: string
    name: string
    role: string | null
    profileCompleted: boolean
    studentId: string | null
    course: string | null
    year: string | null
    employeeId: string | null
    position: string | null
    office: string | null
    college: string | null
    campus: string
    phone: string | null
    bio: string | null
    avatar: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    supabaseId?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    profileCompleted?: boolean
    studentId?: boolean
    course?: boolean
    year?: boolean
    employeeId?: boolean
    position?: boolean
    office?: boolean
    college?: boolean
    campus?: boolean
    phone?: boolean
    bio?: boolean
    avatar?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    listings?: boolean | User$listingsArgs<ExtArgs>
    claims?: boolean | User$claimsArgs<ExtArgs>
    savedItems?: boolean | User$savedItemsArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    actedNotifications?: boolean | User$actedNotificationsArgs<ExtArgs>
    buyerRequests?: boolean | User$buyerRequestsArgs<ExtArgs>
    sellerRequests?: boolean | User$sellerRequestsArgs<ExtArgs>
    tradeEvents?: boolean | User$tradeEventsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    supabaseId?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    profileCompleted?: boolean
    studentId?: boolean
    course?: boolean
    year?: boolean
    employeeId?: boolean
    position?: boolean
    office?: boolean
    college?: boolean
    campus?: boolean
    phone?: boolean
    bio?: boolean
    avatar?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    supabaseId?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    profileCompleted?: boolean
    studentId?: boolean
    course?: boolean
    year?: boolean
    employeeId?: boolean
    position?: boolean
    office?: boolean
    college?: boolean
    campus?: boolean
    phone?: boolean
    bio?: boolean
    avatar?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    supabaseId?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    profileCompleted?: boolean
    studentId?: boolean
    course?: boolean
    year?: boolean
    employeeId?: boolean
    position?: boolean
    office?: boolean
    college?: boolean
    campus?: boolean
    phone?: boolean
    bio?: boolean
    avatar?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "supabaseId" | "email" | "name" | "role" | "profileCompleted" | "studentId" | "course" | "year" | "employeeId" | "position" | "office" | "college" | "campus" | "phone" | "bio" | "avatar" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    listings?: boolean | User$listingsArgs<ExtArgs>
    claims?: boolean | User$claimsArgs<ExtArgs>
    savedItems?: boolean | User$savedItemsArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    actedNotifications?: boolean | User$actedNotificationsArgs<ExtArgs>
    buyerRequests?: boolean | User$buyerRequestsArgs<ExtArgs>
    sellerRequests?: boolean | User$sellerRequestsArgs<ExtArgs>
    tradeEvents?: boolean | User$tradeEventsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      listings: Prisma.$ListingPayload<ExtArgs>[]
      claims: Prisma.$ClaimPayload<ExtArgs>[]
      savedItems: Prisma.$SavedItemPayload<ExtArgs>[]
      notifications: Prisma.$NotificationPayload<ExtArgs>[]
      actedNotifications: Prisma.$NotificationPayload<ExtArgs>[]
      buyerRequests: Prisma.$TradeRequestPayload<ExtArgs>[]
      sellerRequests: Prisma.$TradeRequestPayload<ExtArgs>[]
      tradeEvents: Prisma.$TradeRequestEventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      supabaseId: string
      email: string
      name: string
      role: string | null
      profileCompleted: boolean
      studentId: string | null
      course: string | null
      year: string | null
      employeeId: string | null
      position: string | null
      office: string | null
      college: string | null
      campus: string
      phone: string | null
      bio: string | null
      avatar: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    listings<T extends User$listingsArgs<ExtArgs> = {}>(args?: Subset<T, User$listingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    claims<T extends User$claimsArgs<ExtArgs> = {}>(args?: Subset<T, User$claimsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    savedItems<T extends User$savedItemsArgs<ExtArgs> = {}>(args?: Subset<T, User$savedItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SavedItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    notifications<T extends User$notificationsArgs<ExtArgs> = {}>(args?: Subset<T, User$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    actedNotifications<T extends User$actedNotificationsArgs<ExtArgs> = {}>(args?: Subset<T, User$actedNotificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    buyerRequests<T extends User$buyerRequestsArgs<ExtArgs> = {}>(args?: Subset<T, User$buyerRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradeRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sellerRequests<T extends User$sellerRequestsArgs<ExtArgs> = {}>(args?: Subset<T, User$sellerRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradeRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tradeEvents<T extends User$tradeEventsArgs<ExtArgs> = {}>(args?: Subset<T, User$tradeEventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradeRequestEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly supabaseId: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly profileCompleted: FieldRef<"User", 'Boolean'>
    readonly studentId: FieldRef<"User", 'String'>
    readonly course: FieldRef<"User", 'String'>
    readonly year: FieldRef<"User", 'String'>
    readonly employeeId: FieldRef<"User", 'String'>
    readonly position: FieldRef<"User", 'String'>
    readonly office: FieldRef<"User", 'String'>
    readonly college: FieldRef<"User", 'String'>
    readonly campus: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly bio: FieldRef<"User", 'String'>
    readonly avatar: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.listings
   */
  export type User$listingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    where?: ListingWhereInput
    orderBy?: ListingOrderByWithRelationInput | ListingOrderByWithRelationInput[]
    cursor?: ListingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ListingScalarFieldEnum | ListingScalarFieldEnum[]
  }

  /**
   * User.claims
   */
  export type User$claimsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Claim
     */
    omit?: ClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimInclude<ExtArgs> | null
    where?: ClaimWhereInput
    orderBy?: ClaimOrderByWithRelationInput | ClaimOrderByWithRelationInput[]
    cursor?: ClaimWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClaimScalarFieldEnum | ClaimScalarFieldEnum[]
  }

  /**
   * User.savedItems
   */
  export type User$savedItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedItem
     */
    select?: SavedItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedItem
     */
    omit?: SavedItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedItemInclude<ExtArgs> | null
    where?: SavedItemWhereInput
    orderBy?: SavedItemOrderByWithRelationInput | SavedItemOrderByWithRelationInput[]
    cursor?: SavedItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SavedItemScalarFieldEnum | SavedItemScalarFieldEnum[]
  }

  /**
   * User.notifications
   */
  export type User$notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    cursor?: NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * User.actedNotifications
   */
  export type User$actedNotificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    cursor?: NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * User.buyerRequests
   */
  export type User$buyerRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeRequest
     */
    select?: TradeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeRequest
     */
    omit?: TradeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeRequestInclude<ExtArgs> | null
    where?: TradeRequestWhereInput
    orderBy?: TradeRequestOrderByWithRelationInput | TradeRequestOrderByWithRelationInput[]
    cursor?: TradeRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TradeRequestScalarFieldEnum | TradeRequestScalarFieldEnum[]
  }

  /**
   * User.sellerRequests
   */
  export type User$sellerRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeRequest
     */
    select?: TradeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeRequest
     */
    omit?: TradeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeRequestInclude<ExtArgs> | null
    where?: TradeRequestWhereInput
    orderBy?: TradeRequestOrderByWithRelationInput | TradeRequestOrderByWithRelationInput[]
    cursor?: TradeRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TradeRequestScalarFieldEnum | TradeRequestScalarFieldEnum[]
  }

  /**
   * User.tradeEvents
   */
  export type User$tradeEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeRequestEvent
     */
    select?: TradeRequestEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeRequestEvent
     */
    omit?: TradeRequestEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeRequestEventInclude<ExtArgs> | null
    where?: TradeRequestEventWhereInput
    orderBy?: TradeRequestEventOrderByWithRelationInput | TradeRequestEventOrderByWithRelationInput[]
    cursor?: TradeRequestEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TradeRequestEventScalarFieldEnum | TradeRequestEventScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Listing
   */

  export type AggregateListing = {
    _count: ListingCountAggregateOutputType | null
    _avg: ListingAvgAggregateOutputType | null
    _sum: ListingSumAggregateOutputType | null
    _min: ListingMinAggregateOutputType | null
    _max: ListingMaxAggregateOutputType | null
  }

  export type ListingAvgAggregateOutputType = {
    id: number | null
    price: number | null
    sellerId: number | null
  }

  export type ListingSumAggregateOutputType = {
    id: number | null
    price: number | null
    sellerId: number | null
  }

  export type ListingMinAggregateOutputType = {
    id: number | null
    status: string | null
    title: string | null
    category: string | null
    college: string | null
    campus: string | null
    condition: string | null
    description: string | null
    type: string | null
    price: number | null
    preferredLocation: string | null
    sellerId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ListingMaxAggregateOutputType = {
    id: number | null
    status: string | null
    title: string | null
    category: string | null
    college: string | null
    campus: string | null
    condition: string | null
    description: string | null
    type: string | null
    price: number | null
    preferredLocation: string | null
    sellerId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ListingCountAggregateOutputType = {
    id: number
    status: number
    title: number
    category: number
    college: number
    campus: number
    condition: number
    description: number
    type: number
    price: number
    images: number
    preferredLocation: number
    sellerId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ListingAvgAggregateInputType = {
    id?: true
    price?: true
    sellerId?: true
  }

  export type ListingSumAggregateInputType = {
    id?: true
    price?: true
    sellerId?: true
  }

  export type ListingMinAggregateInputType = {
    id?: true
    status?: true
    title?: true
    category?: true
    college?: true
    campus?: true
    condition?: true
    description?: true
    type?: true
    price?: true
    preferredLocation?: true
    sellerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ListingMaxAggregateInputType = {
    id?: true
    status?: true
    title?: true
    category?: true
    college?: true
    campus?: true
    condition?: true
    description?: true
    type?: true
    price?: true
    preferredLocation?: true
    sellerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ListingCountAggregateInputType = {
    id?: true
    status?: true
    title?: true
    category?: true
    college?: true
    campus?: true
    condition?: true
    description?: true
    type?: true
    price?: true
    images?: true
    preferredLocation?: true
    sellerId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ListingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Listing to aggregate.
     */
    where?: ListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Listings to fetch.
     */
    orderBy?: ListingOrderByWithRelationInput | ListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Listings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Listings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Listings
    **/
    _count?: true | ListingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ListingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ListingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ListingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ListingMaxAggregateInputType
  }

  export type GetListingAggregateType<T extends ListingAggregateArgs> = {
        [P in keyof T & keyof AggregateListing]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateListing[P]>
      : GetScalarType<T[P], AggregateListing[P]>
  }




  export type ListingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ListingWhereInput
    orderBy?: ListingOrderByWithAggregationInput | ListingOrderByWithAggregationInput[]
    by: ListingScalarFieldEnum[] | ListingScalarFieldEnum
    having?: ListingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ListingCountAggregateInputType | true
    _avg?: ListingAvgAggregateInputType
    _sum?: ListingSumAggregateInputType
    _min?: ListingMinAggregateInputType
    _max?: ListingMaxAggregateInputType
  }

  export type ListingGroupByOutputType = {
    id: number
    status: string
    title: string
    category: string
    college: string
    campus: string
    condition: string
    description: string
    type: string
    price: number
    images: string[]
    preferredLocation: string | null
    sellerId: number
    createdAt: Date
    updatedAt: Date
    _count: ListingCountAggregateOutputType | null
    _avg: ListingAvgAggregateOutputType | null
    _sum: ListingSumAggregateOutputType | null
    _min: ListingMinAggregateOutputType | null
    _max: ListingMaxAggregateOutputType | null
  }

  type GetListingGroupByPayload<T extends ListingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ListingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ListingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ListingGroupByOutputType[P]>
            : GetScalarType<T[P], ListingGroupByOutputType[P]>
        }
      >
    >


  export type ListingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    status?: boolean
    title?: boolean
    category?: boolean
    college?: boolean
    campus?: boolean
    condition?: boolean
    description?: boolean
    type?: boolean
    price?: boolean
    images?: boolean
    preferredLocation?: boolean
    sellerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    seller?: boolean | UserDefaultArgs<ExtArgs>
    claims?: boolean | Listing$claimsArgs<ExtArgs>
    savedBy?: boolean | Listing$savedByArgs<ExtArgs>
    notifications?: boolean | Listing$notificationsArgs<ExtArgs>
    tradeRequests?: boolean | Listing$tradeRequestsArgs<ExtArgs>
    availabilities?: boolean | Listing$availabilitiesArgs<ExtArgs>
    _count?: boolean | ListingCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["listing"]>

  export type ListingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    status?: boolean
    title?: boolean
    category?: boolean
    college?: boolean
    campus?: boolean
    condition?: boolean
    description?: boolean
    type?: boolean
    price?: boolean
    images?: boolean
    preferredLocation?: boolean
    sellerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    seller?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["listing"]>

  export type ListingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    status?: boolean
    title?: boolean
    category?: boolean
    college?: boolean
    campus?: boolean
    condition?: boolean
    description?: boolean
    type?: boolean
    price?: boolean
    images?: boolean
    preferredLocation?: boolean
    sellerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    seller?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["listing"]>

  export type ListingSelectScalar = {
    id?: boolean
    status?: boolean
    title?: boolean
    category?: boolean
    college?: boolean
    campus?: boolean
    condition?: boolean
    description?: boolean
    type?: boolean
    price?: boolean
    images?: boolean
    preferredLocation?: boolean
    sellerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ListingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "status" | "title" | "category" | "college" | "campus" | "condition" | "description" | "type" | "price" | "images" | "preferredLocation" | "sellerId" | "createdAt" | "updatedAt", ExtArgs["result"]["listing"]>
  export type ListingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    seller?: boolean | UserDefaultArgs<ExtArgs>
    claims?: boolean | Listing$claimsArgs<ExtArgs>
    savedBy?: boolean | Listing$savedByArgs<ExtArgs>
    notifications?: boolean | Listing$notificationsArgs<ExtArgs>
    tradeRequests?: boolean | Listing$tradeRequestsArgs<ExtArgs>
    availabilities?: boolean | Listing$availabilitiesArgs<ExtArgs>
    _count?: boolean | ListingCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ListingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    seller?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ListingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    seller?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ListingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Listing"
    objects: {
      seller: Prisma.$UserPayload<ExtArgs>
      claims: Prisma.$ClaimPayload<ExtArgs>[]
      savedBy: Prisma.$SavedItemPayload<ExtArgs>[]
      notifications: Prisma.$NotificationPayload<ExtArgs>[]
      tradeRequests: Prisma.$TradeRequestPayload<ExtArgs>[]
      availabilities: Prisma.$ListingAvailabilityPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      status: string
      title: string
      category: string
      college: string
      campus: string
      condition: string
      description: string
      type: string
      price: number
      images: string[]
      preferredLocation: string | null
      sellerId: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["listing"]>
    composites: {}
  }

  type ListingGetPayload<S extends boolean | null | undefined | ListingDefaultArgs> = $Result.GetResult<Prisma.$ListingPayload, S>

  type ListingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ListingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ListingCountAggregateInputType | true
    }

  export interface ListingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Listing'], meta: { name: 'Listing' } }
    /**
     * Find zero or one Listing that matches the filter.
     * @param {ListingFindUniqueArgs} args - Arguments to find a Listing
     * @example
     * // Get one Listing
     * const listing = await prisma.listing.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ListingFindUniqueArgs>(args: SelectSubset<T, ListingFindUniqueArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Listing that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ListingFindUniqueOrThrowArgs} args - Arguments to find a Listing
     * @example
     * // Get one Listing
     * const listing = await prisma.listing.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ListingFindUniqueOrThrowArgs>(args: SelectSubset<T, ListingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Listing that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingFindFirstArgs} args - Arguments to find a Listing
     * @example
     * // Get one Listing
     * const listing = await prisma.listing.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ListingFindFirstArgs>(args?: SelectSubset<T, ListingFindFirstArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Listing that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingFindFirstOrThrowArgs} args - Arguments to find a Listing
     * @example
     * // Get one Listing
     * const listing = await prisma.listing.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ListingFindFirstOrThrowArgs>(args?: SelectSubset<T, ListingFindFirstOrThrowArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Listings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Listings
     * const listings = await prisma.listing.findMany()
     * 
     * // Get first 10 Listings
     * const listings = await prisma.listing.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const listingWithIdOnly = await prisma.listing.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ListingFindManyArgs>(args?: SelectSubset<T, ListingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Listing.
     * @param {ListingCreateArgs} args - Arguments to create a Listing.
     * @example
     * // Create one Listing
     * const Listing = await prisma.listing.create({
     *   data: {
     *     // ... data to create a Listing
     *   }
     * })
     * 
     */
    create<T extends ListingCreateArgs>(args: SelectSubset<T, ListingCreateArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Listings.
     * @param {ListingCreateManyArgs} args - Arguments to create many Listings.
     * @example
     * // Create many Listings
     * const listing = await prisma.listing.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ListingCreateManyArgs>(args?: SelectSubset<T, ListingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Listings and returns the data saved in the database.
     * @param {ListingCreateManyAndReturnArgs} args - Arguments to create many Listings.
     * @example
     * // Create many Listings
     * const listing = await prisma.listing.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Listings and only return the `id`
     * const listingWithIdOnly = await prisma.listing.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ListingCreateManyAndReturnArgs>(args?: SelectSubset<T, ListingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Listing.
     * @param {ListingDeleteArgs} args - Arguments to delete one Listing.
     * @example
     * // Delete one Listing
     * const Listing = await prisma.listing.delete({
     *   where: {
     *     // ... filter to delete one Listing
     *   }
     * })
     * 
     */
    delete<T extends ListingDeleteArgs>(args: SelectSubset<T, ListingDeleteArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Listing.
     * @param {ListingUpdateArgs} args - Arguments to update one Listing.
     * @example
     * // Update one Listing
     * const listing = await prisma.listing.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ListingUpdateArgs>(args: SelectSubset<T, ListingUpdateArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Listings.
     * @param {ListingDeleteManyArgs} args - Arguments to filter Listings to delete.
     * @example
     * // Delete a few Listings
     * const { count } = await prisma.listing.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ListingDeleteManyArgs>(args?: SelectSubset<T, ListingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Listings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Listings
     * const listing = await prisma.listing.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ListingUpdateManyArgs>(args: SelectSubset<T, ListingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Listings and returns the data updated in the database.
     * @param {ListingUpdateManyAndReturnArgs} args - Arguments to update many Listings.
     * @example
     * // Update many Listings
     * const listing = await prisma.listing.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Listings and only return the `id`
     * const listingWithIdOnly = await prisma.listing.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ListingUpdateManyAndReturnArgs>(args: SelectSubset<T, ListingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Listing.
     * @param {ListingUpsertArgs} args - Arguments to update or create a Listing.
     * @example
     * // Update or create a Listing
     * const listing = await prisma.listing.upsert({
     *   create: {
     *     // ... data to create a Listing
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Listing we want to update
     *   }
     * })
     */
    upsert<T extends ListingUpsertArgs>(args: SelectSubset<T, ListingUpsertArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Listings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingCountArgs} args - Arguments to filter Listings to count.
     * @example
     * // Count the number of Listings
     * const count = await prisma.listing.count({
     *   where: {
     *     // ... the filter for the Listings we want to count
     *   }
     * })
    **/
    count<T extends ListingCountArgs>(
      args?: Subset<T, ListingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ListingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Listing.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ListingAggregateArgs>(args: Subset<T, ListingAggregateArgs>): Prisma.PrismaPromise<GetListingAggregateType<T>>

    /**
     * Group by Listing.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ListingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ListingGroupByArgs['orderBy'] }
        : { orderBy?: ListingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ListingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetListingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Listing model
   */
  readonly fields: ListingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Listing.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ListingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    seller<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    claims<T extends Listing$claimsArgs<ExtArgs> = {}>(args?: Subset<T, Listing$claimsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    savedBy<T extends Listing$savedByArgs<ExtArgs> = {}>(args?: Subset<T, Listing$savedByArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SavedItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    notifications<T extends Listing$notificationsArgs<ExtArgs> = {}>(args?: Subset<T, Listing$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tradeRequests<T extends Listing$tradeRequestsArgs<ExtArgs> = {}>(args?: Subset<T, Listing$tradeRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradeRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    availabilities<T extends Listing$availabilitiesArgs<ExtArgs> = {}>(args?: Subset<T, Listing$availabilitiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListingAvailabilityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Listing model
   */
  interface ListingFieldRefs {
    readonly id: FieldRef<"Listing", 'Int'>
    readonly status: FieldRef<"Listing", 'String'>
    readonly title: FieldRef<"Listing", 'String'>
    readonly category: FieldRef<"Listing", 'String'>
    readonly college: FieldRef<"Listing", 'String'>
    readonly campus: FieldRef<"Listing", 'String'>
    readonly condition: FieldRef<"Listing", 'String'>
    readonly description: FieldRef<"Listing", 'String'>
    readonly type: FieldRef<"Listing", 'String'>
    readonly price: FieldRef<"Listing", 'Float'>
    readonly images: FieldRef<"Listing", 'String[]'>
    readonly preferredLocation: FieldRef<"Listing", 'String'>
    readonly sellerId: FieldRef<"Listing", 'Int'>
    readonly createdAt: FieldRef<"Listing", 'DateTime'>
    readonly updatedAt: FieldRef<"Listing", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Listing findUnique
   */
  export type ListingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * Filter, which Listing to fetch.
     */
    where: ListingWhereUniqueInput
  }

  /**
   * Listing findUniqueOrThrow
   */
  export type ListingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * Filter, which Listing to fetch.
     */
    where: ListingWhereUniqueInput
  }

  /**
   * Listing findFirst
   */
  export type ListingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * Filter, which Listing to fetch.
     */
    where?: ListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Listings to fetch.
     */
    orderBy?: ListingOrderByWithRelationInput | ListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Listings.
     */
    cursor?: ListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Listings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Listings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Listings.
     */
    distinct?: ListingScalarFieldEnum | ListingScalarFieldEnum[]
  }

  /**
   * Listing findFirstOrThrow
   */
  export type ListingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * Filter, which Listing to fetch.
     */
    where?: ListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Listings to fetch.
     */
    orderBy?: ListingOrderByWithRelationInput | ListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Listings.
     */
    cursor?: ListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Listings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Listings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Listings.
     */
    distinct?: ListingScalarFieldEnum | ListingScalarFieldEnum[]
  }

  /**
   * Listing findMany
   */
  export type ListingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * Filter, which Listings to fetch.
     */
    where?: ListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Listings to fetch.
     */
    orderBy?: ListingOrderByWithRelationInput | ListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Listings.
     */
    cursor?: ListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Listings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Listings.
     */
    skip?: number
    distinct?: ListingScalarFieldEnum | ListingScalarFieldEnum[]
  }

  /**
   * Listing create
   */
  export type ListingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * The data needed to create a Listing.
     */
    data: XOR<ListingCreateInput, ListingUncheckedCreateInput>
  }

  /**
   * Listing createMany
   */
  export type ListingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Listings.
     */
    data: ListingCreateManyInput | ListingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Listing createManyAndReturn
   */
  export type ListingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * The data used to create many Listings.
     */
    data: ListingCreateManyInput | ListingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Listing update
   */
  export type ListingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * The data needed to update a Listing.
     */
    data: XOR<ListingUpdateInput, ListingUncheckedUpdateInput>
    /**
     * Choose, which Listing to update.
     */
    where: ListingWhereUniqueInput
  }

  /**
   * Listing updateMany
   */
  export type ListingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Listings.
     */
    data: XOR<ListingUpdateManyMutationInput, ListingUncheckedUpdateManyInput>
    /**
     * Filter which Listings to update
     */
    where?: ListingWhereInput
    /**
     * Limit how many Listings to update.
     */
    limit?: number
  }

  /**
   * Listing updateManyAndReturn
   */
  export type ListingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * The data used to update Listings.
     */
    data: XOR<ListingUpdateManyMutationInput, ListingUncheckedUpdateManyInput>
    /**
     * Filter which Listings to update
     */
    where?: ListingWhereInput
    /**
     * Limit how many Listings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Listing upsert
   */
  export type ListingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * The filter to search for the Listing to update in case it exists.
     */
    where: ListingWhereUniqueInput
    /**
     * In case the Listing found by the `where` argument doesn't exist, create a new Listing with this data.
     */
    create: XOR<ListingCreateInput, ListingUncheckedCreateInput>
    /**
     * In case the Listing was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ListingUpdateInput, ListingUncheckedUpdateInput>
  }

  /**
   * Listing delete
   */
  export type ListingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * Filter which Listing to delete.
     */
    where: ListingWhereUniqueInput
  }

  /**
   * Listing deleteMany
   */
  export type ListingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Listings to delete
     */
    where?: ListingWhereInput
    /**
     * Limit how many Listings to delete.
     */
    limit?: number
  }

  /**
   * Listing.claims
   */
  export type Listing$claimsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Claim
     */
    omit?: ClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimInclude<ExtArgs> | null
    where?: ClaimWhereInput
    orderBy?: ClaimOrderByWithRelationInput | ClaimOrderByWithRelationInput[]
    cursor?: ClaimWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClaimScalarFieldEnum | ClaimScalarFieldEnum[]
  }

  /**
   * Listing.savedBy
   */
  export type Listing$savedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedItem
     */
    select?: SavedItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedItem
     */
    omit?: SavedItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedItemInclude<ExtArgs> | null
    where?: SavedItemWhereInput
    orderBy?: SavedItemOrderByWithRelationInput | SavedItemOrderByWithRelationInput[]
    cursor?: SavedItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SavedItemScalarFieldEnum | SavedItemScalarFieldEnum[]
  }

  /**
   * Listing.notifications
   */
  export type Listing$notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    cursor?: NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Listing.tradeRequests
   */
  export type Listing$tradeRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeRequest
     */
    select?: TradeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeRequest
     */
    omit?: TradeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeRequestInclude<ExtArgs> | null
    where?: TradeRequestWhereInput
    orderBy?: TradeRequestOrderByWithRelationInput | TradeRequestOrderByWithRelationInput[]
    cursor?: TradeRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TradeRequestScalarFieldEnum | TradeRequestScalarFieldEnum[]
  }

  /**
   * Listing.availabilities
   */
  export type Listing$availabilitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingAvailability
     */
    select?: ListingAvailabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ListingAvailability
     */
    omit?: ListingAvailabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingAvailabilityInclude<ExtArgs> | null
    where?: ListingAvailabilityWhereInput
    orderBy?: ListingAvailabilityOrderByWithRelationInput | ListingAvailabilityOrderByWithRelationInput[]
    cursor?: ListingAvailabilityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ListingAvailabilityScalarFieldEnum | ListingAvailabilityScalarFieldEnum[]
  }

  /**
   * Listing without action
   */
  export type ListingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
  }


  /**
   * Model Claim
   */

  export type AggregateClaim = {
    _count: ClaimCountAggregateOutputType | null
    _avg: ClaimAvgAggregateOutputType | null
    _sum: ClaimSumAggregateOutputType | null
    _min: ClaimMinAggregateOutputType | null
    _max: ClaimMaxAggregateOutputType | null
  }

  export type ClaimAvgAggregateOutputType = {
    id: number | null
    listingId: number | null
    claimantId: number | null
  }

  export type ClaimSumAggregateOutputType = {
    id: number | null
    listingId: number | null
    claimantId: number | null
  }

  export type ClaimMinAggregateOutputType = {
    id: number | null
    listingId: number | null
    claimantId: number | null
    status: string | null
    notes: string | null
    claimDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClaimMaxAggregateOutputType = {
    id: number | null
    listingId: number | null
    claimantId: number | null
    status: string | null
    notes: string | null
    claimDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClaimCountAggregateOutputType = {
    id: number
    listingId: number
    claimantId: number
    status: number
    notes: number
    claimDate: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ClaimAvgAggregateInputType = {
    id?: true
    listingId?: true
    claimantId?: true
  }

  export type ClaimSumAggregateInputType = {
    id?: true
    listingId?: true
    claimantId?: true
  }

  export type ClaimMinAggregateInputType = {
    id?: true
    listingId?: true
    claimantId?: true
    status?: true
    notes?: true
    claimDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClaimMaxAggregateInputType = {
    id?: true
    listingId?: true
    claimantId?: true
    status?: true
    notes?: true
    claimDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClaimCountAggregateInputType = {
    id?: true
    listingId?: true
    claimantId?: true
    status?: true
    notes?: true
    claimDate?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ClaimAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Claim to aggregate.
     */
    where?: ClaimWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Claims to fetch.
     */
    orderBy?: ClaimOrderByWithRelationInput | ClaimOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClaimWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Claims from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Claims.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Claims
    **/
    _count?: true | ClaimCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ClaimAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ClaimSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClaimMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClaimMaxAggregateInputType
  }

  export type GetClaimAggregateType<T extends ClaimAggregateArgs> = {
        [P in keyof T & keyof AggregateClaim]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClaim[P]>
      : GetScalarType<T[P], AggregateClaim[P]>
  }




  export type ClaimGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClaimWhereInput
    orderBy?: ClaimOrderByWithAggregationInput | ClaimOrderByWithAggregationInput[]
    by: ClaimScalarFieldEnum[] | ClaimScalarFieldEnum
    having?: ClaimScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClaimCountAggregateInputType | true
    _avg?: ClaimAvgAggregateInputType
    _sum?: ClaimSumAggregateInputType
    _min?: ClaimMinAggregateInputType
    _max?: ClaimMaxAggregateInputType
  }

  export type ClaimGroupByOutputType = {
    id: number
    listingId: number
    claimantId: number
    status: string
    notes: string | null
    claimDate: Date
    createdAt: Date
    updatedAt: Date
    _count: ClaimCountAggregateOutputType | null
    _avg: ClaimAvgAggregateOutputType | null
    _sum: ClaimSumAggregateOutputType | null
    _min: ClaimMinAggregateOutputType | null
    _max: ClaimMaxAggregateOutputType | null
  }

  type GetClaimGroupByPayload<T extends ClaimGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClaimGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClaimGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClaimGroupByOutputType[P]>
            : GetScalarType<T[P], ClaimGroupByOutputType[P]>
        }
      >
    >


  export type ClaimSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    listingId?: boolean
    claimantId?: boolean
    status?: boolean
    notes?: boolean
    claimDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    listing?: boolean | ListingDefaultArgs<ExtArgs>
    claimant?: boolean | UserDefaultArgs<ExtArgs>
    notifications?: boolean | Claim$notificationsArgs<ExtArgs>
    _count?: boolean | ClaimCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["claim"]>

  export type ClaimSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    listingId?: boolean
    claimantId?: boolean
    status?: boolean
    notes?: boolean
    claimDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    listing?: boolean | ListingDefaultArgs<ExtArgs>
    claimant?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["claim"]>

  export type ClaimSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    listingId?: boolean
    claimantId?: boolean
    status?: boolean
    notes?: boolean
    claimDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    listing?: boolean | ListingDefaultArgs<ExtArgs>
    claimant?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["claim"]>

  export type ClaimSelectScalar = {
    id?: boolean
    listingId?: boolean
    claimantId?: boolean
    status?: boolean
    notes?: boolean
    claimDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ClaimOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "listingId" | "claimantId" | "status" | "notes" | "claimDate" | "createdAt" | "updatedAt", ExtArgs["result"]["claim"]>
  export type ClaimInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    listing?: boolean | ListingDefaultArgs<ExtArgs>
    claimant?: boolean | UserDefaultArgs<ExtArgs>
    notifications?: boolean | Claim$notificationsArgs<ExtArgs>
    _count?: boolean | ClaimCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ClaimIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    listing?: boolean | ListingDefaultArgs<ExtArgs>
    claimant?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ClaimIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    listing?: boolean | ListingDefaultArgs<ExtArgs>
    claimant?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ClaimPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Claim"
    objects: {
      listing: Prisma.$ListingPayload<ExtArgs>
      claimant: Prisma.$UserPayload<ExtArgs>
      notifications: Prisma.$NotificationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      listingId: number
      claimantId: number
      status: string
      notes: string | null
      claimDate: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["claim"]>
    composites: {}
  }

  type ClaimGetPayload<S extends boolean | null | undefined | ClaimDefaultArgs> = $Result.GetResult<Prisma.$ClaimPayload, S>

  type ClaimCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClaimFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClaimCountAggregateInputType | true
    }

  export interface ClaimDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Claim'], meta: { name: 'Claim' } }
    /**
     * Find zero or one Claim that matches the filter.
     * @param {ClaimFindUniqueArgs} args - Arguments to find a Claim
     * @example
     * // Get one Claim
     * const claim = await prisma.claim.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClaimFindUniqueArgs>(args: SelectSubset<T, ClaimFindUniqueArgs<ExtArgs>>): Prisma__ClaimClient<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Claim that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClaimFindUniqueOrThrowArgs} args - Arguments to find a Claim
     * @example
     * // Get one Claim
     * const claim = await prisma.claim.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClaimFindUniqueOrThrowArgs>(args: SelectSubset<T, ClaimFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClaimClient<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Claim that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimFindFirstArgs} args - Arguments to find a Claim
     * @example
     * // Get one Claim
     * const claim = await prisma.claim.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClaimFindFirstArgs>(args?: SelectSubset<T, ClaimFindFirstArgs<ExtArgs>>): Prisma__ClaimClient<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Claim that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimFindFirstOrThrowArgs} args - Arguments to find a Claim
     * @example
     * // Get one Claim
     * const claim = await prisma.claim.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClaimFindFirstOrThrowArgs>(args?: SelectSubset<T, ClaimFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClaimClient<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Claims that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Claims
     * const claims = await prisma.claim.findMany()
     * 
     * // Get first 10 Claims
     * const claims = await prisma.claim.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const claimWithIdOnly = await prisma.claim.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClaimFindManyArgs>(args?: SelectSubset<T, ClaimFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Claim.
     * @param {ClaimCreateArgs} args - Arguments to create a Claim.
     * @example
     * // Create one Claim
     * const Claim = await prisma.claim.create({
     *   data: {
     *     // ... data to create a Claim
     *   }
     * })
     * 
     */
    create<T extends ClaimCreateArgs>(args: SelectSubset<T, ClaimCreateArgs<ExtArgs>>): Prisma__ClaimClient<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Claims.
     * @param {ClaimCreateManyArgs} args - Arguments to create many Claims.
     * @example
     * // Create many Claims
     * const claim = await prisma.claim.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClaimCreateManyArgs>(args?: SelectSubset<T, ClaimCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Claims and returns the data saved in the database.
     * @param {ClaimCreateManyAndReturnArgs} args - Arguments to create many Claims.
     * @example
     * // Create many Claims
     * const claim = await prisma.claim.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Claims and only return the `id`
     * const claimWithIdOnly = await prisma.claim.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClaimCreateManyAndReturnArgs>(args?: SelectSubset<T, ClaimCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Claim.
     * @param {ClaimDeleteArgs} args - Arguments to delete one Claim.
     * @example
     * // Delete one Claim
     * const Claim = await prisma.claim.delete({
     *   where: {
     *     // ... filter to delete one Claim
     *   }
     * })
     * 
     */
    delete<T extends ClaimDeleteArgs>(args: SelectSubset<T, ClaimDeleteArgs<ExtArgs>>): Prisma__ClaimClient<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Claim.
     * @param {ClaimUpdateArgs} args - Arguments to update one Claim.
     * @example
     * // Update one Claim
     * const claim = await prisma.claim.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClaimUpdateArgs>(args: SelectSubset<T, ClaimUpdateArgs<ExtArgs>>): Prisma__ClaimClient<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Claims.
     * @param {ClaimDeleteManyArgs} args - Arguments to filter Claims to delete.
     * @example
     * // Delete a few Claims
     * const { count } = await prisma.claim.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClaimDeleteManyArgs>(args?: SelectSubset<T, ClaimDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Claims.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Claims
     * const claim = await prisma.claim.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClaimUpdateManyArgs>(args: SelectSubset<T, ClaimUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Claims and returns the data updated in the database.
     * @param {ClaimUpdateManyAndReturnArgs} args - Arguments to update many Claims.
     * @example
     * // Update many Claims
     * const claim = await prisma.claim.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Claims and only return the `id`
     * const claimWithIdOnly = await prisma.claim.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ClaimUpdateManyAndReturnArgs>(args: SelectSubset<T, ClaimUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Claim.
     * @param {ClaimUpsertArgs} args - Arguments to update or create a Claim.
     * @example
     * // Update or create a Claim
     * const claim = await prisma.claim.upsert({
     *   create: {
     *     // ... data to create a Claim
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Claim we want to update
     *   }
     * })
     */
    upsert<T extends ClaimUpsertArgs>(args: SelectSubset<T, ClaimUpsertArgs<ExtArgs>>): Prisma__ClaimClient<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Claims.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimCountArgs} args - Arguments to filter Claims to count.
     * @example
     * // Count the number of Claims
     * const count = await prisma.claim.count({
     *   where: {
     *     // ... the filter for the Claims we want to count
     *   }
     * })
    **/
    count<T extends ClaimCountArgs>(
      args?: Subset<T, ClaimCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClaimCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Claim.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClaimAggregateArgs>(args: Subset<T, ClaimAggregateArgs>): Prisma.PrismaPromise<GetClaimAggregateType<T>>

    /**
     * Group by Claim.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClaimGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClaimGroupByArgs['orderBy'] }
        : { orderBy?: ClaimGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClaimGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClaimGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Claim model
   */
  readonly fields: ClaimFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Claim.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClaimClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    listing<T extends ListingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ListingDefaultArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    claimant<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    notifications<T extends Claim$notificationsArgs<ExtArgs> = {}>(args?: Subset<T, Claim$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Claim model
   */
  interface ClaimFieldRefs {
    readonly id: FieldRef<"Claim", 'Int'>
    readonly listingId: FieldRef<"Claim", 'Int'>
    readonly claimantId: FieldRef<"Claim", 'Int'>
    readonly status: FieldRef<"Claim", 'String'>
    readonly notes: FieldRef<"Claim", 'String'>
    readonly claimDate: FieldRef<"Claim", 'DateTime'>
    readonly createdAt: FieldRef<"Claim", 'DateTime'>
    readonly updatedAt: FieldRef<"Claim", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Claim findUnique
   */
  export type ClaimFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Claim
     */
    omit?: ClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimInclude<ExtArgs> | null
    /**
     * Filter, which Claim to fetch.
     */
    where: ClaimWhereUniqueInput
  }

  /**
   * Claim findUniqueOrThrow
   */
  export type ClaimFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Claim
     */
    omit?: ClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimInclude<ExtArgs> | null
    /**
     * Filter, which Claim to fetch.
     */
    where: ClaimWhereUniqueInput
  }

  /**
   * Claim findFirst
   */
  export type ClaimFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Claim
     */
    omit?: ClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimInclude<ExtArgs> | null
    /**
     * Filter, which Claim to fetch.
     */
    where?: ClaimWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Claims to fetch.
     */
    orderBy?: ClaimOrderByWithRelationInput | ClaimOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Claims.
     */
    cursor?: ClaimWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Claims from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Claims.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Claims.
     */
    distinct?: ClaimScalarFieldEnum | ClaimScalarFieldEnum[]
  }

  /**
   * Claim findFirstOrThrow
   */
  export type ClaimFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Claim
     */
    omit?: ClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimInclude<ExtArgs> | null
    /**
     * Filter, which Claim to fetch.
     */
    where?: ClaimWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Claims to fetch.
     */
    orderBy?: ClaimOrderByWithRelationInput | ClaimOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Claims.
     */
    cursor?: ClaimWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Claims from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Claims.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Claims.
     */
    distinct?: ClaimScalarFieldEnum | ClaimScalarFieldEnum[]
  }

  /**
   * Claim findMany
   */
  export type ClaimFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Claim
     */
    omit?: ClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimInclude<ExtArgs> | null
    /**
     * Filter, which Claims to fetch.
     */
    where?: ClaimWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Claims to fetch.
     */
    orderBy?: ClaimOrderByWithRelationInput | ClaimOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Claims.
     */
    cursor?: ClaimWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Claims from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Claims.
     */
    skip?: number
    distinct?: ClaimScalarFieldEnum | ClaimScalarFieldEnum[]
  }

  /**
   * Claim create
   */
  export type ClaimCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Claim
     */
    omit?: ClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimInclude<ExtArgs> | null
    /**
     * The data needed to create a Claim.
     */
    data: XOR<ClaimCreateInput, ClaimUncheckedCreateInput>
  }

  /**
   * Claim createMany
   */
  export type ClaimCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Claims.
     */
    data: ClaimCreateManyInput | ClaimCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Claim createManyAndReturn
   */
  export type ClaimCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Claim
     */
    omit?: ClaimOmit<ExtArgs> | null
    /**
     * The data used to create many Claims.
     */
    data: ClaimCreateManyInput | ClaimCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Claim update
   */
  export type ClaimUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Claim
     */
    omit?: ClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimInclude<ExtArgs> | null
    /**
     * The data needed to update a Claim.
     */
    data: XOR<ClaimUpdateInput, ClaimUncheckedUpdateInput>
    /**
     * Choose, which Claim to update.
     */
    where: ClaimWhereUniqueInput
  }

  /**
   * Claim updateMany
   */
  export type ClaimUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Claims.
     */
    data: XOR<ClaimUpdateManyMutationInput, ClaimUncheckedUpdateManyInput>
    /**
     * Filter which Claims to update
     */
    where?: ClaimWhereInput
    /**
     * Limit how many Claims to update.
     */
    limit?: number
  }

  /**
   * Claim updateManyAndReturn
   */
  export type ClaimUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Claim
     */
    omit?: ClaimOmit<ExtArgs> | null
    /**
     * The data used to update Claims.
     */
    data: XOR<ClaimUpdateManyMutationInput, ClaimUncheckedUpdateManyInput>
    /**
     * Filter which Claims to update
     */
    where?: ClaimWhereInput
    /**
     * Limit how many Claims to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Claim upsert
   */
  export type ClaimUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Claim
     */
    omit?: ClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimInclude<ExtArgs> | null
    /**
     * The filter to search for the Claim to update in case it exists.
     */
    where: ClaimWhereUniqueInput
    /**
     * In case the Claim found by the `where` argument doesn't exist, create a new Claim with this data.
     */
    create: XOR<ClaimCreateInput, ClaimUncheckedCreateInput>
    /**
     * In case the Claim was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClaimUpdateInput, ClaimUncheckedUpdateInput>
  }

  /**
   * Claim delete
   */
  export type ClaimDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Claim
     */
    omit?: ClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimInclude<ExtArgs> | null
    /**
     * Filter which Claim to delete.
     */
    where: ClaimWhereUniqueInput
  }

  /**
   * Claim deleteMany
   */
  export type ClaimDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Claims to delete
     */
    where?: ClaimWhereInput
    /**
     * Limit how many Claims to delete.
     */
    limit?: number
  }

  /**
   * Claim.notifications
   */
  export type Claim$notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    cursor?: NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Claim without action
   */
  export type ClaimDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Claim
     */
    omit?: ClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimInclude<ExtArgs> | null
  }


  /**
   * Model SavedItem
   */

  export type AggregateSavedItem = {
    _count: SavedItemCountAggregateOutputType | null
    _avg: SavedItemAvgAggregateOutputType | null
    _sum: SavedItemSumAggregateOutputType | null
    _min: SavedItemMinAggregateOutputType | null
    _max: SavedItemMaxAggregateOutputType | null
  }

  export type SavedItemAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    listingId: number | null
  }

  export type SavedItemSumAggregateOutputType = {
    id: number | null
    userId: number | null
    listingId: number | null
  }

  export type SavedItemMinAggregateOutputType = {
    id: number | null
    userId: number | null
    listingId: number | null
    createdAt: Date | null
  }

  export type SavedItemMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    listingId: number | null
    createdAt: Date | null
  }

  export type SavedItemCountAggregateOutputType = {
    id: number
    userId: number
    listingId: number
    createdAt: number
    _all: number
  }


  export type SavedItemAvgAggregateInputType = {
    id?: true
    userId?: true
    listingId?: true
  }

  export type SavedItemSumAggregateInputType = {
    id?: true
    userId?: true
    listingId?: true
  }

  export type SavedItemMinAggregateInputType = {
    id?: true
    userId?: true
    listingId?: true
    createdAt?: true
  }

  export type SavedItemMaxAggregateInputType = {
    id?: true
    userId?: true
    listingId?: true
    createdAt?: true
  }

  export type SavedItemCountAggregateInputType = {
    id?: true
    userId?: true
    listingId?: true
    createdAt?: true
    _all?: true
  }

  export type SavedItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SavedItem to aggregate.
     */
    where?: SavedItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SavedItems to fetch.
     */
    orderBy?: SavedItemOrderByWithRelationInput | SavedItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SavedItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SavedItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SavedItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SavedItems
    **/
    _count?: true | SavedItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SavedItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SavedItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SavedItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SavedItemMaxAggregateInputType
  }

  export type GetSavedItemAggregateType<T extends SavedItemAggregateArgs> = {
        [P in keyof T & keyof AggregateSavedItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSavedItem[P]>
      : GetScalarType<T[P], AggregateSavedItem[P]>
  }




  export type SavedItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SavedItemWhereInput
    orderBy?: SavedItemOrderByWithAggregationInput | SavedItemOrderByWithAggregationInput[]
    by: SavedItemScalarFieldEnum[] | SavedItemScalarFieldEnum
    having?: SavedItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SavedItemCountAggregateInputType | true
    _avg?: SavedItemAvgAggregateInputType
    _sum?: SavedItemSumAggregateInputType
    _min?: SavedItemMinAggregateInputType
    _max?: SavedItemMaxAggregateInputType
  }

  export type SavedItemGroupByOutputType = {
    id: number
    userId: number
    listingId: number
    createdAt: Date
    _count: SavedItemCountAggregateOutputType | null
    _avg: SavedItemAvgAggregateOutputType | null
    _sum: SavedItemSumAggregateOutputType | null
    _min: SavedItemMinAggregateOutputType | null
    _max: SavedItemMaxAggregateOutputType | null
  }

  type GetSavedItemGroupByPayload<T extends SavedItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SavedItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SavedItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SavedItemGroupByOutputType[P]>
            : GetScalarType<T[P], SavedItemGroupByOutputType[P]>
        }
      >
    >


  export type SavedItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    listingId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    listing?: boolean | ListingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["savedItem"]>

  export type SavedItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    listingId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    listing?: boolean | ListingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["savedItem"]>

  export type SavedItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    listingId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    listing?: boolean | ListingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["savedItem"]>

  export type SavedItemSelectScalar = {
    id?: boolean
    userId?: boolean
    listingId?: boolean
    createdAt?: boolean
  }

  export type SavedItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "listingId" | "createdAt", ExtArgs["result"]["savedItem"]>
  export type SavedItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    listing?: boolean | ListingDefaultArgs<ExtArgs>
  }
  export type SavedItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    listing?: boolean | ListingDefaultArgs<ExtArgs>
  }
  export type SavedItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    listing?: boolean | ListingDefaultArgs<ExtArgs>
  }

  export type $SavedItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SavedItem"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      listing: Prisma.$ListingPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      listingId: number
      createdAt: Date
    }, ExtArgs["result"]["savedItem"]>
    composites: {}
  }

  type SavedItemGetPayload<S extends boolean | null | undefined | SavedItemDefaultArgs> = $Result.GetResult<Prisma.$SavedItemPayload, S>

  type SavedItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SavedItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SavedItemCountAggregateInputType | true
    }

  export interface SavedItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SavedItem'], meta: { name: 'SavedItem' } }
    /**
     * Find zero or one SavedItem that matches the filter.
     * @param {SavedItemFindUniqueArgs} args - Arguments to find a SavedItem
     * @example
     * // Get one SavedItem
     * const savedItem = await prisma.savedItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SavedItemFindUniqueArgs>(args: SelectSubset<T, SavedItemFindUniqueArgs<ExtArgs>>): Prisma__SavedItemClient<$Result.GetResult<Prisma.$SavedItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SavedItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SavedItemFindUniqueOrThrowArgs} args - Arguments to find a SavedItem
     * @example
     * // Get one SavedItem
     * const savedItem = await prisma.savedItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SavedItemFindUniqueOrThrowArgs>(args: SelectSubset<T, SavedItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SavedItemClient<$Result.GetResult<Prisma.$SavedItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SavedItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedItemFindFirstArgs} args - Arguments to find a SavedItem
     * @example
     * // Get one SavedItem
     * const savedItem = await prisma.savedItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SavedItemFindFirstArgs>(args?: SelectSubset<T, SavedItemFindFirstArgs<ExtArgs>>): Prisma__SavedItemClient<$Result.GetResult<Prisma.$SavedItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SavedItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedItemFindFirstOrThrowArgs} args - Arguments to find a SavedItem
     * @example
     * // Get one SavedItem
     * const savedItem = await prisma.savedItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SavedItemFindFirstOrThrowArgs>(args?: SelectSubset<T, SavedItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__SavedItemClient<$Result.GetResult<Prisma.$SavedItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SavedItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SavedItems
     * const savedItems = await prisma.savedItem.findMany()
     * 
     * // Get first 10 SavedItems
     * const savedItems = await prisma.savedItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const savedItemWithIdOnly = await prisma.savedItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SavedItemFindManyArgs>(args?: SelectSubset<T, SavedItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SavedItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SavedItem.
     * @param {SavedItemCreateArgs} args - Arguments to create a SavedItem.
     * @example
     * // Create one SavedItem
     * const SavedItem = await prisma.savedItem.create({
     *   data: {
     *     // ... data to create a SavedItem
     *   }
     * })
     * 
     */
    create<T extends SavedItemCreateArgs>(args: SelectSubset<T, SavedItemCreateArgs<ExtArgs>>): Prisma__SavedItemClient<$Result.GetResult<Prisma.$SavedItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SavedItems.
     * @param {SavedItemCreateManyArgs} args - Arguments to create many SavedItems.
     * @example
     * // Create many SavedItems
     * const savedItem = await prisma.savedItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SavedItemCreateManyArgs>(args?: SelectSubset<T, SavedItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SavedItems and returns the data saved in the database.
     * @param {SavedItemCreateManyAndReturnArgs} args - Arguments to create many SavedItems.
     * @example
     * // Create many SavedItems
     * const savedItem = await prisma.savedItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SavedItems and only return the `id`
     * const savedItemWithIdOnly = await prisma.savedItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SavedItemCreateManyAndReturnArgs>(args?: SelectSubset<T, SavedItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SavedItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SavedItem.
     * @param {SavedItemDeleteArgs} args - Arguments to delete one SavedItem.
     * @example
     * // Delete one SavedItem
     * const SavedItem = await prisma.savedItem.delete({
     *   where: {
     *     // ... filter to delete one SavedItem
     *   }
     * })
     * 
     */
    delete<T extends SavedItemDeleteArgs>(args: SelectSubset<T, SavedItemDeleteArgs<ExtArgs>>): Prisma__SavedItemClient<$Result.GetResult<Prisma.$SavedItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SavedItem.
     * @param {SavedItemUpdateArgs} args - Arguments to update one SavedItem.
     * @example
     * // Update one SavedItem
     * const savedItem = await prisma.savedItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SavedItemUpdateArgs>(args: SelectSubset<T, SavedItemUpdateArgs<ExtArgs>>): Prisma__SavedItemClient<$Result.GetResult<Prisma.$SavedItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SavedItems.
     * @param {SavedItemDeleteManyArgs} args - Arguments to filter SavedItems to delete.
     * @example
     * // Delete a few SavedItems
     * const { count } = await prisma.savedItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SavedItemDeleteManyArgs>(args?: SelectSubset<T, SavedItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SavedItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SavedItems
     * const savedItem = await prisma.savedItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SavedItemUpdateManyArgs>(args: SelectSubset<T, SavedItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SavedItems and returns the data updated in the database.
     * @param {SavedItemUpdateManyAndReturnArgs} args - Arguments to update many SavedItems.
     * @example
     * // Update many SavedItems
     * const savedItem = await prisma.savedItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SavedItems and only return the `id`
     * const savedItemWithIdOnly = await prisma.savedItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SavedItemUpdateManyAndReturnArgs>(args: SelectSubset<T, SavedItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SavedItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SavedItem.
     * @param {SavedItemUpsertArgs} args - Arguments to update or create a SavedItem.
     * @example
     * // Update or create a SavedItem
     * const savedItem = await prisma.savedItem.upsert({
     *   create: {
     *     // ... data to create a SavedItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SavedItem we want to update
     *   }
     * })
     */
    upsert<T extends SavedItemUpsertArgs>(args: SelectSubset<T, SavedItemUpsertArgs<ExtArgs>>): Prisma__SavedItemClient<$Result.GetResult<Prisma.$SavedItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SavedItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedItemCountArgs} args - Arguments to filter SavedItems to count.
     * @example
     * // Count the number of SavedItems
     * const count = await prisma.savedItem.count({
     *   where: {
     *     // ... the filter for the SavedItems we want to count
     *   }
     * })
    **/
    count<T extends SavedItemCountArgs>(
      args?: Subset<T, SavedItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SavedItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SavedItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SavedItemAggregateArgs>(args: Subset<T, SavedItemAggregateArgs>): Prisma.PrismaPromise<GetSavedItemAggregateType<T>>

    /**
     * Group by SavedItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SavedItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SavedItemGroupByArgs['orderBy'] }
        : { orderBy?: SavedItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SavedItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSavedItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SavedItem model
   */
  readonly fields: SavedItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SavedItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SavedItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    listing<T extends ListingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ListingDefaultArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SavedItem model
   */
  interface SavedItemFieldRefs {
    readonly id: FieldRef<"SavedItem", 'Int'>
    readonly userId: FieldRef<"SavedItem", 'Int'>
    readonly listingId: FieldRef<"SavedItem", 'Int'>
    readonly createdAt: FieldRef<"SavedItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SavedItem findUnique
   */
  export type SavedItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedItem
     */
    select?: SavedItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedItem
     */
    omit?: SavedItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedItemInclude<ExtArgs> | null
    /**
     * Filter, which SavedItem to fetch.
     */
    where: SavedItemWhereUniqueInput
  }

  /**
   * SavedItem findUniqueOrThrow
   */
  export type SavedItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedItem
     */
    select?: SavedItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedItem
     */
    omit?: SavedItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedItemInclude<ExtArgs> | null
    /**
     * Filter, which SavedItem to fetch.
     */
    where: SavedItemWhereUniqueInput
  }

  /**
   * SavedItem findFirst
   */
  export type SavedItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedItem
     */
    select?: SavedItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedItem
     */
    omit?: SavedItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedItemInclude<ExtArgs> | null
    /**
     * Filter, which SavedItem to fetch.
     */
    where?: SavedItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SavedItems to fetch.
     */
    orderBy?: SavedItemOrderByWithRelationInput | SavedItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SavedItems.
     */
    cursor?: SavedItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SavedItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SavedItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SavedItems.
     */
    distinct?: SavedItemScalarFieldEnum | SavedItemScalarFieldEnum[]
  }

  /**
   * SavedItem findFirstOrThrow
   */
  export type SavedItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedItem
     */
    select?: SavedItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedItem
     */
    omit?: SavedItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedItemInclude<ExtArgs> | null
    /**
     * Filter, which SavedItem to fetch.
     */
    where?: SavedItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SavedItems to fetch.
     */
    orderBy?: SavedItemOrderByWithRelationInput | SavedItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SavedItems.
     */
    cursor?: SavedItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SavedItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SavedItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SavedItems.
     */
    distinct?: SavedItemScalarFieldEnum | SavedItemScalarFieldEnum[]
  }

  /**
   * SavedItem findMany
   */
  export type SavedItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedItem
     */
    select?: SavedItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedItem
     */
    omit?: SavedItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedItemInclude<ExtArgs> | null
    /**
     * Filter, which SavedItems to fetch.
     */
    where?: SavedItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SavedItems to fetch.
     */
    orderBy?: SavedItemOrderByWithRelationInput | SavedItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SavedItems.
     */
    cursor?: SavedItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SavedItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SavedItems.
     */
    skip?: number
    distinct?: SavedItemScalarFieldEnum | SavedItemScalarFieldEnum[]
  }

  /**
   * SavedItem create
   */
  export type SavedItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedItem
     */
    select?: SavedItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedItem
     */
    omit?: SavedItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedItemInclude<ExtArgs> | null
    /**
     * The data needed to create a SavedItem.
     */
    data: XOR<SavedItemCreateInput, SavedItemUncheckedCreateInput>
  }

  /**
   * SavedItem createMany
   */
  export type SavedItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SavedItems.
     */
    data: SavedItemCreateManyInput | SavedItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SavedItem createManyAndReturn
   */
  export type SavedItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedItem
     */
    select?: SavedItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SavedItem
     */
    omit?: SavedItemOmit<ExtArgs> | null
    /**
     * The data used to create many SavedItems.
     */
    data: SavedItemCreateManyInput | SavedItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SavedItem update
   */
  export type SavedItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedItem
     */
    select?: SavedItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedItem
     */
    omit?: SavedItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedItemInclude<ExtArgs> | null
    /**
     * The data needed to update a SavedItem.
     */
    data: XOR<SavedItemUpdateInput, SavedItemUncheckedUpdateInput>
    /**
     * Choose, which SavedItem to update.
     */
    where: SavedItemWhereUniqueInput
  }

  /**
   * SavedItem updateMany
   */
  export type SavedItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SavedItems.
     */
    data: XOR<SavedItemUpdateManyMutationInput, SavedItemUncheckedUpdateManyInput>
    /**
     * Filter which SavedItems to update
     */
    where?: SavedItemWhereInput
    /**
     * Limit how many SavedItems to update.
     */
    limit?: number
  }

  /**
   * SavedItem updateManyAndReturn
   */
  export type SavedItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedItem
     */
    select?: SavedItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SavedItem
     */
    omit?: SavedItemOmit<ExtArgs> | null
    /**
     * The data used to update SavedItems.
     */
    data: XOR<SavedItemUpdateManyMutationInput, SavedItemUncheckedUpdateManyInput>
    /**
     * Filter which SavedItems to update
     */
    where?: SavedItemWhereInput
    /**
     * Limit how many SavedItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SavedItem upsert
   */
  export type SavedItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedItem
     */
    select?: SavedItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedItem
     */
    omit?: SavedItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedItemInclude<ExtArgs> | null
    /**
     * The filter to search for the SavedItem to update in case it exists.
     */
    where: SavedItemWhereUniqueInput
    /**
     * In case the SavedItem found by the `where` argument doesn't exist, create a new SavedItem with this data.
     */
    create: XOR<SavedItemCreateInput, SavedItemUncheckedCreateInput>
    /**
     * In case the SavedItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SavedItemUpdateInput, SavedItemUncheckedUpdateInput>
  }

  /**
   * SavedItem delete
   */
  export type SavedItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedItem
     */
    select?: SavedItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedItem
     */
    omit?: SavedItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedItemInclude<ExtArgs> | null
    /**
     * Filter which SavedItem to delete.
     */
    where: SavedItemWhereUniqueInput
  }

  /**
   * SavedItem deleteMany
   */
  export type SavedItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SavedItems to delete
     */
    where?: SavedItemWhereInput
    /**
     * Limit how many SavedItems to delete.
     */
    limit?: number
  }

  /**
   * SavedItem without action
   */
  export type SavedItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedItem
     */
    select?: SavedItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedItem
     */
    omit?: SavedItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedItemInclude<ExtArgs> | null
  }


  /**
   * Model ListingAvailability
   */

  export type AggregateListingAvailability = {
    _count: ListingAvailabilityCountAggregateOutputType | null
    _avg: ListingAvailabilityAvgAggregateOutputType | null
    _sum: ListingAvailabilitySumAggregateOutputType | null
    _min: ListingAvailabilityMinAggregateOutputType | null
    _max: ListingAvailabilityMaxAggregateOutputType | null
  }

  export type ListingAvailabilityAvgAggregateOutputType = {
    id: number | null
    listingId: number | null
    dayOfWeek: number | null
  }

  export type ListingAvailabilitySumAggregateOutputType = {
    id: number | null
    listingId: number | null
    dayOfWeek: number | null
  }

  export type ListingAvailabilityMinAggregateOutputType = {
    id: number | null
    listingId: number | null
    dayOfWeek: number | null
    startTime: string | null
    endTime: string | null
    createdAt: Date | null
  }

  export type ListingAvailabilityMaxAggregateOutputType = {
    id: number | null
    listingId: number | null
    dayOfWeek: number | null
    startTime: string | null
    endTime: string | null
    createdAt: Date | null
  }

  export type ListingAvailabilityCountAggregateOutputType = {
    id: number
    listingId: number
    dayOfWeek: number
    startTime: number
    endTime: number
    createdAt: number
    _all: number
  }


  export type ListingAvailabilityAvgAggregateInputType = {
    id?: true
    listingId?: true
    dayOfWeek?: true
  }

  export type ListingAvailabilitySumAggregateInputType = {
    id?: true
    listingId?: true
    dayOfWeek?: true
  }

  export type ListingAvailabilityMinAggregateInputType = {
    id?: true
    listingId?: true
    dayOfWeek?: true
    startTime?: true
    endTime?: true
    createdAt?: true
  }

  export type ListingAvailabilityMaxAggregateInputType = {
    id?: true
    listingId?: true
    dayOfWeek?: true
    startTime?: true
    endTime?: true
    createdAt?: true
  }

  export type ListingAvailabilityCountAggregateInputType = {
    id?: true
    listingId?: true
    dayOfWeek?: true
    startTime?: true
    endTime?: true
    createdAt?: true
    _all?: true
  }

  export type ListingAvailabilityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ListingAvailability to aggregate.
     */
    where?: ListingAvailabilityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ListingAvailabilities to fetch.
     */
    orderBy?: ListingAvailabilityOrderByWithRelationInput | ListingAvailabilityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ListingAvailabilityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ListingAvailabilities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ListingAvailabilities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ListingAvailabilities
    **/
    _count?: true | ListingAvailabilityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ListingAvailabilityAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ListingAvailabilitySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ListingAvailabilityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ListingAvailabilityMaxAggregateInputType
  }

  export type GetListingAvailabilityAggregateType<T extends ListingAvailabilityAggregateArgs> = {
        [P in keyof T & keyof AggregateListingAvailability]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateListingAvailability[P]>
      : GetScalarType<T[P], AggregateListingAvailability[P]>
  }




  export type ListingAvailabilityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ListingAvailabilityWhereInput
    orderBy?: ListingAvailabilityOrderByWithAggregationInput | ListingAvailabilityOrderByWithAggregationInput[]
    by: ListingAvailabilityScalarFieldEnum[] | ListingAvailabilityScalarFieldEnum
    having?: ListingAvailabilityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ListingAvailabilityCountAggregateInputType | true
    _avg?: ListingAvailabilityAvgAggregateInputType
    _sum?: ListingAvailabilitySumAggregateInputType
    _min?: ListingAvailabilityMinAggregateInputType
    _max?: ListingAvailabilityMaxAggregateInputType
  }

  export type ListingAvailabilityGroupByOutputType = {
    id: number
    listingId: number
    dayOfWeek: number
    startTime: string
    endTime: string
    createdAt: Date
    _count: ListingAvailabilityCountAggregateOutputType | null
    _avg: ListingAvailabilityAvgAggregateOutputType | null
    _sum: ListingAvailabilitySumAggregateOutputType | null
    _min: ListingAvailabilityMinAggregateOutputType | null
    _max: ListingAvailabilityMaxAggregateOutputType | null
  }

  type GetListingAvailabilityGroupByPayload<T extends ListingAvailabilityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ListingAvailabilityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ListingAvailabilityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ListingAvailabilityGroupByOutputType[P]>
            : GetScalarType<T[P], ListingAvailabilityGroupByOutputType[P]>
        }
      >
    >


  export type ListingAvailabilitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    listingId?: boolean
    dayOfWeek?: boolean
    startTime?: boolean
    endTime?: boolean
    createdAt?: boolean
    listing?: boolean | ListingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["listingAvailability"]>

  export type ListingAvailabilitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    listingId?: boolean
    dayOfWeek?: boolean
    startTime?: boolean
    endTime?: boolean
    createdAt?: boolean
    listing?: boolean | ListingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["listingAvailability"]>

  export type ListingAvailabilitySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    listingId?: boolean
    dayOfWeek?: boolean
    startTime?: boolean
    endTime?: boolean
    createdAt?: boolean
    listing?: boolean | ListingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["listingAvailability"]>

  export type ListingAvailabilitySelectScalar = {
    id?: boolean
    listingId?: boolean
    dayOfWeek?: boolean
    startTime?: boolean
    endTime?: boolean
    createdAt?: boolean
  }

  export type ListingAvailabilityOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "listingId" | "dayOfWeek" | "startTime" | "endTime" | "createdAt", ExtArgs["result"]["listingAvailability"]>
  export type ListingAvailabilityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    listing?: boolean | ListingDefaultArgs<ExtArgs>
  }
  export type ListingAvailabilityIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    listing?: boolean | ListingDefaultArgs<ExtArgs>
  }
  export type ListingAvailabilityIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    listing?: boolean | ListingDefaultArgs<ExtArgs>
  }

  export type $ListingAvailabilityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ListingAvailability"
    objects: {
      listing: Prisma.$ListingPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      listingId: number
      dayOfWeek: number
      startTime: string
      endTime: string
      createdAt: Date
    }, ExtArgs["result"]["listingAvailability"]>
    composites: {}
  }

  type ListingAvailabilityGetPayload<S extends boolean | null | undefined | ListingAvailabilityDefaultArgs> = $Result.GetResult<Prisma.$ListingAvailabilityPayload, S>

  type ListingAvailabilityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ListingAvailabilityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ListingAvailabilityCountAggregateInputType | true
    }

  export interface ListingAvailabilityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ListingAvailability'], meta: { name: 'ListingAvailability' } }
    /**
     * Find zero or one ListingAvailability that matches the filter.
     * @param {ListingAvailabilityFindUniqueArgs} args - Arguments to find a ListingAvailability
     * @example
     * // Get one ListingAvailability
     * const listingAvailability = await prisma.listingAvailability.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ListingAvailabilityFindUniqueArgs>(args: SelectSubset<T, ListingAvailabilityFindUniqueArgs<ExtArgs>>): Prisma__ListingAvailabilityClient<$Result.GetResult<Prisma.$ListingAvailabilityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ListingAvailability that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ListingAvailabilityFindUniqueOrThrowArgs} args - Arguments to find a ListingAvailability
     * @example
     * // Get one ListingAvailability
     * const listingAvailability = await prisma.listingAvailability.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ListingAvailabilityFindUniqueOrThrowArgs>(args: SelectSubset<T, ListingAvailabilityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ListingAvailabilityClient<$Result.GetResult<Prisma.$ListingAvailabilityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ListingAvailability that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingAvailabilityFindFirstArgs} args - Arguments to find a ListingAvailability
     * @example
     * // Get one ListingAvailability
     * const listingAvailability = await prisma.listingAvailability.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ListingAvailabilityFindFirstArgs>(args?: SelectSubset<T, ListingAvailabilityFindFirstArgs<ExtArgs>>): Prisma__ListingAvailabilityClient<$Result.GetResult<Prisma.$ListingAvailabilityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ListingAvailability that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingAvailabilityFindFirstOrThrowArgs} args - Arguments to find a ListingAvailability
     * @example
     * // Get one ListingAvailability
     * const listingAvailability = await prisma.listingAvailability.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ListingAvailabilityFindFirstOrThrowArgs>(args?: SelectSubset<T, ListingAvailabilityFindFirstOrThrowArgs<ExtArgs>>): Prisma__ListingAvailabilityClient<$Result.GetResult<Prisma.$ListingAvailabilityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ListingAvailabilities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingAvailabilityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ListingAvailabilities
     * const listingAvailabilities = await prisma.listingAvailability.findMany()
     * 
     * // Get first 10 ListingAvailabilities
     * const listingAvailabilities = await prisma.listingAvailability.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const listingAvailabilityWithIdOnly = await prisma.listingAvailability.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ListingAvailabilityFindManyArgs>(args?: SelectSubset<T, ListingAvailabilityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListingAvailabilityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ListingAvailability.
     * @param {ListingAvailabilityCreateArgs} args - Arguments to create a ListingAvailability.
     * @example
     * // Create one ListingAvailability
     * const ListingAvailability = await prisma.listingAvailability.create({
     *   data: {
     *     // ... data to create a ListingAvailability
     *   }
     * })
     * 
     */
    create<T extends ListingAvailabilityCreateArgs>(args: SelectSubset<T, ListingAvailabilityCreateArgs<ExtArgs>>): Prisma__ListingAvailabilityClient<$Result.GetResult<Prisma.$ListingAvailabilityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ListingAvailabilities.
     * @param {ListingAvailabilityCreateManyArgs} args - Arguments to create many ListingAvailabilities.
     * @example
     * // Create many ListingAvailabilities
     * const listingAvailability = await prisma.listingAvailability.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ListingAvailabilityCreateManyArgs>(args?: SelectSubset<T, ListingAvailabilityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ListingAvailabilities and returns the data saved in the database.
     * @param {ListingAvailabilityCreateManyAndReturnArgs} args - Arguments to create many ListingAvailabilities.
     * @example
     * // Create many ListingAvailabilities
     * const listingAvailability = await prisma.listingAvailability.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ListingAvailabilities and only return the `id`
     * const listingAvailabilityWithIdOnly = await prisma.listingAvailability.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ListingAvailabilityCreateManyAndReturnArgs>(args?: SelectSubset<T, ListingAvailabilityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListingAvailabilityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ListingAvailability.
     * @param {ListingAvailabilityDeleteArgs} args - Arguments to delete one ListingAvailability.
     * @example
     * // Delete one ListingAvailability
     * const ListingAvailability = await prisma.listingAvailability.delete({
     *   where: {
     *     // ... filter to delete one ListingAvailability
     *   }
     * })
     * 
     */
    delete<T extends ListingAvailabilityDeleteArgs>(args: SelectSubset<T, ListingAvailabilityDeleteArgs<ExtArgs>>): Prisma__ListingAvailabilityClient<$Result.GetResult<Prisma.$ListingAvailabilityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ListingAvailability.
     * @param {ListingAvailabilityUpdateArgs} args - Arguments to update one ListingAvailability.
     * @example
     * // Update one ListingAvailability
     * const listingAvailability = await prisma.listingAvailability.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ListingAvailabilityUpdateArgs>(args: SelectSubset<T, ListingAvailabilityUpdateArgs<ExtArgs>>): Prisma__ListingAvailabilityClient<$Result.GetResult<Prisma.$ListingAvailabilityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ListingAvailabilities.
     * @param {ListingAvailabilityDeleteManyArgs} args - Arguments to filter ListingAvailabilities to delete.
     * @example
     * // Delete a few ListingAvailabilities
     * const { count } = await prisma.listingAvailability.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ListingAvailabilityDeleteManyArgs>(args?: SelectSubset<T, ListingAvailabilityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ListingAvailabilities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingAvailabilityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ListingAvailabilities
     * const listingAvailability = await prisma.listingAvailability.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ListingAvailabilityUpdateManyArgs>(args: SelectSubset<T, ListingAvailabilityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ListingAvailabilities and returns the data updated in the database.
     * @param {ListingAvailabilityUpdateManyAndReturnArgs} args - Arguments to update many ListingAvailabilities.
     * @example
     * // Update many ListingAvailabilities
     * const listingAvailability = await prisma.listingAvailability.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ListingAvailabilities and only return the `id`
     * const listingAvailabilityWithIdOnly = await prisma.listingAvailability.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ListingAvailabilityUpdateManyAndReturnArgs>(args: SelectSubset<T, ListingAvailabilityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListingAvailabilityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ListingAvailability.
     * @param {ListingAvailabilityUpsertArgs} args - Arguments to update or create a ListingAvailability.
     * @example
     * // Update or create a ListingAvailability
     * const listingAvailability = await prisma.listingAvailability.upsert({
     *   create: {
     *     // ... data to create a ListingAvailability
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ListingAvailability we want to update
     *   }
     * })
     */
    upsert<T extends ListingAvailabilityUpsertArgs>(args: SelectSubset<T, ListingAvailabilityUpsertArgs<ExtArgs>>): Prisma__ListingAvailabilityClient<$Result.GetResult<Prisma.$ListingAvailabilityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ListingAvailabilities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingAvailabilityCountArgs} args - Arguments to filter ListingAvailabilities to count.
     * @example
     * // Count the number of ListingAvailabilities
     * const count = await prisma.listingAvailability.count({
     *   where: {
     *     // ... the filter for the ListingAvailabilities we want to count
     *   }
     * })
    **/
    count<T extends ListingAvailabilityCountArgs>(
      args?: Subset<T, ListingAvailabilityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ListingAvailabilityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ListingAvailability.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingAvailabilityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ListingAvailabilityAggregateArgs>(args: Subset<T, ListingAvailabilityAggregateArgs>): Prisma.PrismaPromise<GetListingAvailabilityAggregateType<T>>

    /**
     * Group by ListingAvailability.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingAvailabilityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ListingAvailabilityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ListingAvailabilityGroupByArgs['orderBy'] }
        : { orderBy?: ListingAvailabilityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ListingAvailabilityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetListingAvailabilityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ListingAvailability model
   */
  readonly fields: ListingAvailabilityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ListingAvailability.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ListingAvailabilityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    listing<T extends ListingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ListingDefaultArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ListingAvailability model
   */
  interface ListingAvailabilityFieldRefs {
    readonly id: FieldRef<"ListingAvailability", 'Int'>
    readonly listingId: FieldRef<"ListingAvailability", 'Int'>
    readonly dayOfWeek: FieldRef<"ListingAvailability", 'Int'>
    readonly startTime: FieldRef<"ListingAvailability", 'String'>
    readonly endTime: FieldRef<"ListingAvailability", 'String'>
    readonly createdAt: FieldRef<"ListingAvailability", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ListingAvailability findUnique
   */
  export type ListingAvailabilityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingAvailability
     */
    select?: ListingAvailabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ListingAvailability
     */
    omit?: ListingAvailabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingAvailabilityInclude<ExtArgs> | null
    /**
     * Filter, which ListingAvailability to fetch.
     */
    where: ListingAvailabilityWhereUniqueInput
  }

  /**
   * ListingAvailability findUniqueOrThrow
   */
  export type ListingAvailabilityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingAvailability
     */
    select?: ListingAvailabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ListingAvailability
     */
    omit?: ListingAvailabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingAvailabilityInclude<ExtArgs> | null
    /**
     * Filter, which ListingAvailability to fetch.
     */
    where: ListingAvailabilityWhereUniqueInput
  }

  /**
   * ListingAvailability findFirst
   */
  export type ListingAvailabilityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingAvailability
     */
    select?: ListingAvailabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ListingAvailability
     */
    omit?: ListingAvailabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingAvailabilityInclude<ExtArgs> | null
    /**
     * Filter, which ListingAvailability to fetch.
     */
    where?: ListingAvailabilityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ListingAvailabilities to fetch.
     */
    orderBy?: ListingAvailabilityOrderByWithRelationInput | ListingAvailabilityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ListingAvailabilities.
     */
    cursor?: ListingAvailabilityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ListingAvailabilities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ListingAvailabilities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ListingAvailabilities.
     */
    distinct?: ListingAvailabilityScalarFieldEnum | ListingAvailabilityScalarFieldEnum[]
  }

  /**
   * ListingAvailability findFirstOrThrow
   */
  export type ListingAvailabilityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingAvailability
     */
    select?: ListingAvailabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ListingAvailability
     */
    omit?: ListingAvailabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingAvailabilityInclude<ExtArgs> | null
    /**
     * Filter, which ListingAvailability to fetch.
     */
    where?: ListingAvailabilityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ListingAvailabilities to fetch.
     */
    orderBy?: ListingAvailabilityOrderByWithRelationInput | ListingAvailabilityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ListingAvailabilities.
     */
    cursor?: ListingAvailabilityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ListingAvailabilities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ListingAvailabilities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ListingAvailabilities.
     */
    distinct?: ListingAvailabilityScalarFieldEnum | ListingAvailabilityScalarFieldEnum[]
  }

  /**
   * ListingAvailability findMany
   */
  export type ListingAvailabilityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingAvailability
     */
    select?: ListingAvailabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ListingAvailability
     */
    omit?: ListingAvailabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingAvailabilityInclude<ExtArgs> | null
    /**
     * Filter, which ListingAvailabilities to fetch.
     */
    where?: ListingAvailabilityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ListingAvailabilities to fetch.
     */
    orderBy?: ListingAvailabilityOrderByWithRelationInput | ListingAvailabilityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ListingAvailabilities.
     */
    cursor?: ListingAvailabilityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ListingAvailabilities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ListingAvailabilities.
     */
    skip?: number
    distinct?: ListingAvailabilityScalarFieldEnum | ListingAvailabilityScalarFieldEnum[]
  }

  /**
   * ListingAvailability create
   */
  export type ListingAvailabilityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingAvailability
     */
    select?: ListingAvailabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ListingAvailability
     */
    omit?: ListingAvailabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingAvailabilityInclude<ExtArgs> | null
    /**
     * The data needed to create a ListingAvailability.
     */
    data: XOR<ListingAvailabilityCreateInput, ListingAvailabilityUncheckedCreateInput>
  }

  /**
   * ListingAvailability createMany
   */
  export type ListingAvailabilityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ListingAvailabilities.
     */
    data: ListingAvailabilityCreateManyInput | ListingAvailabilityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ListingAvailability createManyAndReturn
   */
  export type ListingAvailabilityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingAvailability
     */
    select?: ListingAvailabilitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ListingAvailability
     */
    omit?: ListingAvailabilityOmit<ExtArgs> | null
    /**
     * The data used to create many ListingAvailabilities.
     */
    data: ListingAvailabilityCreateManyInput | ListingAvailabilityCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingAvailabilityIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ListingAvailability update
   */
  export type ListingAvailabilityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingAvailability
     */
    select?: ListingAvailabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ListingAvailability
     */
    omit?: ListingAvailabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingAvailabilityInclude<ExtArgs> | null
    /**
     * The data needed to update a ListingAvailability.
     */
    data: XOR<ListingAvailabilityUpdateInput, ListingAvailabilityUncheckedUpdateInput>
    /**
     * Choose, which ListingAvailability to update.
     */
    where: ListingAvailabilityWhereUniqueInput
  }

  /**
   * ListingAvailability updateMany
   */
  export type ListingAvailabilityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ListingAvailabilities.
     */
    data: XOR<ListingAvailabilityUpdateManyMutationInput, ListingAvailabilityUncheckedUpdateManyInput>
    /**
     * Filter which ListingAvailabilities to update
     */
    where?: ListingAvailabilityWhereInput
    /**
     * Limit how many ListingAvailabilities to update.
     */
    limit?: number
  }

  /**
   * ListingAvailability updateManyAndReturn
   */
  export type ListingAvailabilityUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingAvailability
     */
    select?: ListingAvailabilitySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ListingAvailability
     */
    omit?: ListingAvailabilityOmit<ExtArgs> | null
    /**
     * The data used to update ListingAvailabilities.
     */
    data: XOR<ListingAvailabilityUpdateManyMutationInput, ListingAvailabilityUncheckedUpdateManyInput>
    /**
     * Filter which ListingAvailabilities to update
     */
    where?: ListingAvailabilityWhereInput
    /**
     * Limit how many ListingAvailabilities to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingAvailabilityIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ListingAvailability upsert
   */
  export type ListingAvailabilityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingAvailability
     */
    select?: ListingAvailabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ListingAvailability
     */
    omit?: ListingAvailabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingAvailabilityInclude<ExtArgs> | null
    /**
     * The filter to search for the ListingAvailability to update in case it exists.
     */
    where: ListingAvailabilityWhereUniqueInput
    /**
     * In case the ListingAvailability found by the `where` argument doesn't exist, create a new ListingAvailability with this data.
     */
    create: XOR<ListingAvailabilityCreateInput, ListingAvailabilityUncheckedCreateInput>
    /**
     * In case the ListingAvailability was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ListingAvailabilityUpdateInput, ListingAvailabilityUncheckedUpdateInput>
  }

  /**
   * ListingAvailability delete
   */
  export type ListingAvailabilityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingAvailability
     */
    select?: ListingAvailabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ListingAvailability
     */
    omit?: ListingAvailabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingAvailabilityInclude<ExtArgs> | null
    /**
     * Filter which ListingAvailability to delete.
     */
    where: ListingAvailabilityWhereUniqueInput
  }

  /**
   * ListingAvailability deleteMany
   */
  export type ListingAvailabilityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ListingAvailabilities to delete
     */
    where?: ListingAvailabilityWhereInput
    /**
     * Limit how many ListingAvailabilities to delete.
     */
    limit?: number
  }

  /**
   * ListingAvailability without action
   */
  export type ListingAvailabilityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingAvailability
     */
    select?: ListingAvailabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ListingAvailability
     */
    omit?: ListingAvailabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingAvailabilityInclude<ExtArgs> | null
  }


  /**
   * Model TradeRequest
   */

  export type AggregateTradeRequest = {
    _count: TradeRequestCountAggregateOutputType | null
    _avg: TradeRequestAvgAggregateOutputType | null
    _sum: TradeRequestSumAggregateOutputType | null
    _min: TradeRequestMinAggregateOutputType | null
    _max: TradeRequestMaxAggregateOutputType | null
  }

  export type TradeRequestAvgAggregateOutputType = {
    id: number | null
    listingId: number | null
    buyerId: number | null
    sellerId: number | null
  }

  export type TradeRequestSumAggregateOutputType = {
    id: number | null
    listingId: number | null
    buyerId: number | null
    sellerId: number | null
  }

  export type TradeRequestMinAggregateOutputType = {
    id: number | null
    listingId: number | null
    buyerId: number | null
    sellerId: number | null
    meetupLocation: string | null
    meetupDate: string | null
    meetupTime: string | null
    notes: string | null
    status: string | null
    proposedBy: string | null
    declineReason: string | null
    customTime: boolean | null
    expiresAt: Date | null
    respondedAt: Date | null
    completedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TradeRequestMaxAggregateOutputType = {
    id: number | null
    listingId: number | null
    buyerId: number | null
    sellerId: number | null
    meetupLocation: string | null
    meetupDate: string | null
    meetupTime: string | null
    notes: string | null
    status: string | null
    proposedBy: string | null
    declineReason: string | null
    customTime: boolean | null
    expiresAt: Date | null
    respondedAt: Date | null
    completedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TradeRequestCountAggregateOutputType = {
    id: number
    listingId: number
    buyerId: number
    sellerId: number
    meetupLocation: number
    meetupDate: number
    meetupTime: number
    notes: number
    status: number
    proposedBy: number
    declineReason: number
    customTime: number
    expiresAt: number
    respondedAt: number
    completedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TradeRequestAvgAggregateInputType = {
    id?: true
    listingId?: true
    buyerId?: true
    sellerId?: true
  }

  export type TradeRequestSumAggregateInputType = {
    id?: true
    listingId?: true
    buyerId?: true
    sellerId?: true
  }

  export type TradeRequestMinAggregateInputType = {
    id?: true
    listingId?: true
    buyerId?: true
    sellerId?: true
    meetupLocation?: true
    meetupDate?: true
    meetupTime?: true
    notes?: true
    status?: true
    proposedBy?: true
    declineReason?: true
    customTime?: true
    expiresAt?: true
    respondedAt?: true
    completedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TradeRequestMaxAggregateInputType = {
    id?: true
    listingId?: true
    buyerId?: true
    sellerId?: true
    meetupLocation?: true
    meetupDate?: true
    meetupTime?: true
    notes?: true
    status?: true
    proposedBy?: true
    declineReason?: true
    customTime?: true
    expiresAt?: true
    respondedAt?: true
    completedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TradeRequestCountAggregateInputType = {
    id?: true
    listingId?: true
    buyerId?: true
    sellerId?: true
    meetupLocation?: true
    meetupDate?: true
    meetupTime?: true
    notes?: true
    status?: true
    proposedBy?: true
    declineReason?: true
    customTime?: true
    expiresAt?: true
    respondedAt?: true
    completedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TradeRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TradeRequest to aggregate.
     */
    where?: TradeRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TradeRequests to fetch.
     */
    orderBy?: TradeRequestOrderByWithRelationInput | TradeRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TradeRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TradeRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TradeRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TradeRequests
    **/
    _count?: true | TradeRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TradeRequestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TradeRequestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TradeRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TradeRequestMaxAggregateInputType
  }

  export type GetTradeRequestAggregateType<T extends TradeRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateTradeRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTradeRequest[P]>
      : GetScalarType<T[P], AggregateTradeRequest[P]>
  }




  export type TradeRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TradeRequestWhereInput
    orderBy?: TradeRequestOrderByWithAggregationInput | TradeRequestOrderByWithAggregationInput[]
    by: TradeRequestScalarFieldEnum[] | TradeRequestScalarFieldEnum
    having?: TradeRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TradeRequestCountAggregateInputType | true
    _avg?: TradeRequestAvgAggregateInputType
    _sum?: TradeRequestSumAggregateInputType
    _min?: TradeRequestMinAggregateInputType
    _max?: TradeRequestMaxAggregateInputType
  }

  export type TradeRequestGroupByOutputType = {
    id: number
    listingId: number
    buyerId: number
    sellerId: number
    meetupLocation: string
    meetupDate: string
    meetupTime: string
    notes: string | null
    status: string
    proposedBy: string
    declineReason: string | null
    customTime: boolean
    expiresAt: Date | null
    respondedAt: Date | null
    completedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: TradeRequestCountAggregateOutputType | null
    _avg: TradeRequestAvgAggregateOutputType | null
    _sum: TradeRequestSumAggregateOutputType | null
    _min: TradeRequestMinAggregateOutputType | null
    _max: TradeRequestMaxAggregateOutputType | null
  }

  type GetTradeRequestGroupByPayload<T extends TradeRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TradeRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TradeRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TradeRequestGroupByOutputType[P]>
            : GetScalarType<T[P], TradeRequestGroupByOutputType[P]>
        }
      >
    >


  export type TradeRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    listingId?: boolean
    buyerId?: boolean
    sellerId?: boolean
    meetupLocation?: boolean
    meetupDate?: boolean
    meetupTime?: boolean
    notes?: boolean
    status?: boolean
    proposedBy?: boolean
    declineReason?: boolean
    customTime?: boolean
    expiresAt?: boolean
    respondedAt?: boolean
    completedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    listing?: boolean | ListingDefaultArgs<ExtArgs>
    buyer?: boolean | UserDefaultArgs<ExtArgs>
    seller?: boolean | UserDefaultArgs<ExtArgs>
    events?: boolean | TradeRequest$eventsArgs<ExtArgs>
    notifications?: boolean | TradeRequest$notificationsArgs<ExtArgs>
    _count?: boolean | TradeRequestCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tradeRequest"]>

  export type TradeRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    listingId?: boolean
    buyerId?: boolean
    sellerId?: boolean
    meetupLocation?: boolean
    meetupDate?: boolean
    meetupTime?: boolean
    notes?: boolean
    status?: boolean
    proposedBy?: boolean
    declineReason?: boolean
    customTime?: boolean
    expiresAt?: boolean
    respondedAt?: boolean
    completedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    listing?: boolean | ListingDefaultArgs<ExtArgs>
    buyer?: boolean | UserDefaultArgs<ExtArgs>
    seller?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tradeRequest"]>

  export type TradeRequestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    listingId?: boolean
    buyerId?: boolean
    sellerId?: boolean
    meetupLocation?: boolean
    meetupDate?: boolean
    meetupTime?: boolean
    notes?: boolean
    status?: boolean
    proposedBy?: boolean
    declineReason?: boolean
    customTime?: boolean
    expiresAt?: boolean
    respondedAt?: boolean
    completedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    listing?: boolean | ListingDefaultArgs<ExtArgs>
    buyer?: boolean | UserDefaultArgs<ExtArgs>
    seller?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tradeRequest"]>

  export type TradeRequestSelectScalar = {
    id?: boolean
    listingId?: boolean
    buyerId?: boolean
    sellerId?: boolean
    meetupLocation?: boolean
    meetupDate?: boolean
    meetupTime?: boolean
    notes?: boolean
    status?: boolean
    proposedBy?: boolean
    declineReason?: boolean
    customTime?: boolean
    expiresAt?: boolean
    respondedAt?: boolean
    completedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TradeRequestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "listingId" | "buyerId" | "sellerId" | "meetupLocation" | "meetupDate" | "meetupTime" | "notes" | "status" | "proposedBy" | "declineReason" | "customTime" | "expiresAt" | "respondedAt" | "completedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["tradeRequest"]>
  export type TradeRequestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    listing?: boolean | ListingDefaultArgs<ExtArgs>
    buyer?: boolean | UserDefaultArgs<ExtArgs>
    seller?: boolean | UserDefaultArgs<ExtArgs>
    events?: boolean | TradeRequest$eventsArgs<ExtArgs>
    notifications?: boolean | TradeRequest$notificationsArgs<ExtArgs>
    _count?: boolean | TradeRequestCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TradeRequestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    listing?: boolean | ListingDefaultArgs<ExtArgs>
    buyer?: boolean | UserDefaultArgs<ExtArgs>
    seller?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TradeRequestIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    listing?: boolean | ListingDefaultArgs<ExtArgs>
    buyer?: boolean | UserDefaultArgs<ExtArgs>
    seller?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TradeRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TradeRequest"
    objects: {
      listing: Prisma.$ListingPayload<ExtArgs>
      buyer: Prisma.$UserPayload<ExtArgs>
      seller: Prisma.$UserPayload<ExtArgs>
      events: Prisma.$TradeRequestEventPayload<ExtArgs>[]
      notifications: Prisma.$NotificationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      listingId: number
      buyerId: number
      sellerId: number
      meetupLocation: string
      meetupDate: string
      meetupTime: string
      notes: string | null
      status: string
      proposedBy: string
      declineReason: string | null
      customTime: boolean
      expiresAt: Date | null
      respondedAt: Date | null
      completedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["tradeRequest"]>
    composites: {}
  }

  type TradeRequestGetPayload<S extends boolean | null | undefined | TradeRequestDefaultArgs> = $Result.GetResult<Prisma.$TradeRequestPayload, S>

  type TradeRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TradeRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TradeRequestCountAggregateInputType | true
    }

  export interface TradeRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TradeRequest'], meta: { name: 'TradeRequest' } }
    /**
     * Find zero or one TradeRequest that matches the filter.
     * @param {TradeRequestFindUniqueArgs} args - Arguments to find a TradeRequest
     * @example
     * // Get one TradeRequest
     * const tradeRequest = await prisma.tradeRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TradeRequestFindUniqueArgs>(args: SelectSubset<T, TradeRequestFindUniqueArgs<ExtArgs>>): Prisma__TradeRequestClient<$Result.GetResult<Prisma.$TradeRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TradeRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TradeRequestFindUniqueOrThrowArgs} args - Arguments to find a TradeRequest
     * @example
     * // Get one TradeRequest
     * const tradeRequest = await prisma.tradeRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TradeRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, TradeRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TradeRequestClient<$Result.GetResult<Prisma.$TradeRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TradeRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeRequestFindFirstArgs} args - Arguments to find a TradeRequest
     * @example
     * // Get one TradeRequest
     * const tradeRequest = await prisma.tradeRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TradeRequestFindFirstArgs>(args?: SelectSubset<T, TradeRequestFindFirstArgs<ExtArgs>>): Prisma__TradeRequestClient<$Result.GetResult<Prisma.$TradeRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TradeRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeRequestFindFirstOrThrowArgs} args - Arguments to find a TradeRequest
     * @example
     * // Get one TradeRequest
     * const tradeRequest = await prisma.tradeRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TradeRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, TradeRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__TradeRequestClient<$Result.GetResult<Prisma.$TradeRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TradeRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TradeRequests
     * const tradeRequests = await prisma.tradeRequest.findMany()
     * 
     * // Get first 10 TradeRequests
     * const tradeRequests = await prisma.tradeRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tradeRequestWithIdOnly = await prisma.tradeRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TradeRequestFindManyArgs>(args?: SelectSubset<T, TradeRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradeRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TradeRequest.
     * @param {TradeRequestCreateArgs} args - Arguments to create a TradeRequest.
     * @example
     * // Create one TradeRequest
     * const TradeRequest = await prisma.tradeRequest.create({
     *   data: {
     *     // ... data to create a TradeRequest
     *   }
     * })
     * 
     */
    create<T extends TradeRequestCreateArgs>(args: SelectSubset<T, TradeRequestCreateArgs<ExtArgs>>): Prisma__TradeRequestClient<$Result.GetResult<Prisma.$TradeRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TradeRequests.
     * @param {TradeRequestCreateManyArgs} args - Arguments to create many TradeRequests.
     * @example
     * // Create many TradeRequests
     * const tradeRequest = await prisma.tradeRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TradeRequestCreateManyArgs>(args?: SelectSubset<T, TradeRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TradeRequests and returns the data saved in the database.
     * @param {TradeRequestCreateManyAndReturnArgs} args - Arguments to create many TradeRequests.
     * @example
     * // Create many TradeRequests
     * const tradeRequest = await prisma.tradeRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TradeRequests and only return the `id`
     * const tradeRequestWithIdOnly = await prisma.tradeRequest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TradeRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, TradeRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradeRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TradeRequest.
     * @param {TradeRequestDeleteArgs} args - Arguments to delete one TradeRequest.
     * @example
     * // Delete one TradeRequest
     * const TradeRequest = await prisma.tradeRequest.delete({
     *   where: {
     *     // ... filter to delete one TradeRequest
     *   }
     * })
     * 
     */
    delete<T extends TradeRequestDeleteArgs>(args: SelectSubset<T, TradeRequestDeleteArgs<ExtArgs>>): Prisma__TradeRequestClient<$Result.GetResult<Prisma.$TradeRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TradeRequest.
     * @param {TradeRequestUpdateArgs} args - Arguments to update one TradeRequest.
     * @example
     * // Update one TradeRequest
     * const tradeRequest = await prisma.tradeRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TradeRequestUpdateArgs>(args: SelectSubset<T, TradeRequestUpdateArgs<ExtArgs>>): Prisma__TradeRequestClient<$Result.GetResult<Prisma.$TradeRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TradeRequests.
     * @param {TradeRequestDeleteManyArgs} args - Arguments to filter TradeRequests to delete.
     * @example
     * // Delete a few TradeRequests
     * const { count } = await prisma.tradeRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TradeRequestDeleteManyArgs>(args?: SelectSubset<T, TradeRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TradeRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TradeRequests
     * const tradeRequest = await prisma.tradeRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TradeRequestUpdateManyArgs>(args: SelectSubset<T, TradeRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TradeRequests and returns the data updated in the database.
     * @param {TradeRequestUpdateManyAndReturnArgs} args - Arguments to update many TradeRequests.
     * @example
     * // Update many TradeRequests
     * const tradeRequest = await prisma.tradeRequest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TradeRequests and only return the `id`
     * const tradeRequestWithIdOnly = await prisma.tradeRequest.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TradeRequestUpdateManyAndReturnArgs>(args: SelectSubset<T, TradeRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradeRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TradeRequest.
     * @param {TradeRequestUpsertArgs} args - Arguments to update or create a TradeRequest.
     * @example
     * // Update or create a TradeRequest
     * const tradeRequest = await prisma.tradeRequest.upsert({
     *   create: {
     *     // ... data to create a TradeRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TradeRequest we want to update
     *   }
     * })
     */
    upsert<T extends TradeRequestUpsertArgs>(args: SelectSubset<T, TradeRequestUpsertArgs<ExtArgs>>): Prisma__TradeRequestClient<$Result.GetResult<Prisma.$TradeRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TradeRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeRequestCountArgs} args - Arguments to filter TradeRequests to count.
     * @example
     * // Count the number of TradeRequests
     * const count = await prisma.tradeRequest.count({
     *   where: {
     *     // ... the filter for the TradeRequests we want to count
     *   }
     * })
    **/
    count<T extends TradeRequestCountArgs>(
      args?: Subset<T, TradeRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TradeRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TradeRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TradeRequestAggregateArgs>(args: Subset<T, TradeRequestAggregateArgs>): Prisma.PrismaPromise<GetTradeRequestAggregateType<T>>

    /**
     * Group by TradeRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeRequestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TradeRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TradeRequestGroupByArgs['orderBy'] }
        : { orderBy?: TradeRequestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TradeRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTradeRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TradeRequest model
   */
  readonly fields: TradeRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TradeRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TradeRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    listing<T extends ListingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ListingDefaultArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    buyer<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    seller<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    events<T extends TradeRequest$eventsArgs<ExtArgs> = {}>(args?: Subset<T, TradeRequest$eventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradeRequestEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    notifications<T extends TradeRequest$notificationsArgs<ExtArgs> = {}>(args?: Subset<T, TradeRequest$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TradeRequest model
   */
  interface TradeRequestFieldRefs {
    readonly id: FieldRef<"TradeRequest", 'Int'>
    readonly listingId: FieldRef<"TradeRequest", 'Int'>
    readonly buyerId: FieldRef<"TradeRequest", 'Int'>
    readonly sellerId: FieldRef<"TradeRequest", 'Int'>
    readonly meetupLocation: FieldRef<"TradeRequest", 'String'>
    readonly meetupDate: FieldRef<"TradeRequest", 'String'>
    readonly meetupTime: FieldRef<"TradeRequest", 'String'>
    readonly notes: FieldRef<"TradeRequest", 'String'>
    readonly status: FieldRef<"TradeRequest", 'String'>
    readonly proposedBy: FieldRef<"TradeRequest", 'String'>
    readonly declineReason: FieldRef<"TradeRequest", 'String'>
    readonly customTime: FieldRef<"TradeRequest", 'Boolean'>
    readonly expiresAt: FieldRef<"TradeRequest", 'DateTime'>
    readonly respondedAt: FieldRef<"TradeRequest", 'DateTime'>
    readonly completedAt: FieldRef<"TradeRequest", 'DateTime'>
    readonly createdAt: FieldRef<"TradeRequest", 'DateTime'>
    readonly updatedAt: FieldRef<"TradeRequest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TradeRequest findUnique
   */
  export type TradeRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeRequest
     */
    select?: TradeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeRequest
     */
    omit?: TradeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeRequestInclude<ExtArgs> | null
    /**
     * Filter, which TradeRequest to fetch.
     */
    where: TradeRequestWhereUniqueInput
  }

  /**
   * TradeRequest findUniqueOrThrow
   */
  export type TradeRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeRequest
     */
    select?: TradeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeRequest
     */
    omit?: TradeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeRequestInclude<ExtArgs> | null
    /**
     * Filter, which TradeRequest to fetch.
     */
    where: TradeRequestWhereUniqueInput
  }

  /**
   * TradeRequest findFirst
   */
  export type TradeRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeRequest
     */
    select?: TradeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeRequest
     */
    omit?: TradeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeRequestInclude<ExtArgs> | null
    /**
     * Filter, which TradeRequest to fetch.
     */
    where?: TradeRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TradeRequests to fetch.
     */
    orderBy?: TradeRequestOrderByWithRelationInput | TradeRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TradeRequests.
     */
    cursor?: TradeRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TradeRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TradeRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TradeRequests.
     */
    distinct?: TradeRequestScalarFieldEnum | TradeRequestScalarFieldEnum[]
  }

  /**
   * TradeRequest findFirstOrThrow
   */
  export type TradeRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeRequest
     */
    select?: TradeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeRequest
     */
    omit?: TradeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeRequestInclude<ExtArgs> | null
    /**
     * Filter, which TradeRequest to fetch.
     */
    where?: TradeRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TradeRequests to fetch.
     */
    orderBy?: TradeRequestOrderByWithRelationInput | TradeRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TradeRequests.
     */
    cursor?: TradeRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TradeRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TradeRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TradeRequests.
     */
    distinct?: TradeRequestScalarFieldEnum | TradeRequestScalarFieldEnum[]
  }

  /**
   * TradeRequest findMany
   */
  export type TradeRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeRequest
     */
    select?: TradeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeRequest
     */
    omit?: TradeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeRequestInclude<ExtArgs> | null
    /**
     * Filter, which TradeRequests to fetch.
     */
    where?: TradeRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TradeRequests to fetch.
     */
    orderBy?: TradeRequestOrderByWithRelationInput | TradeRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TradeRequests.
     */
    cursor?: TradeRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TradeRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TradeRequests.
     */
    skip?: number
    distinct?: TradeRequestScalarFieldEnum | TradeRequestScalarFieldEnum[]
  }

  /**
   * TradeRequest create
   */
  export type TradeRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeRequest
     */
    select?: TradeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeRequest
     */
    omit?: TradeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeRequestInclude<ExtArgs> | null
    /**
     * The data needed to create a TradeRequest.
     */
    data: XOR<TradeRequestCreateInput, TradeRequestUncheckedCreateInput>
  }

  /**
   * TradeRequest createMany
   */
  export type TradeRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TradeRequests.
     */
    data: TradeRequestCreateManyInput | TradeRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TradeRequest createManyAndReturn
   */
  export type TradeRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeRequest
     */
    select?: TradeRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TradeRequest
     */
    omit?: TradeRequestOmit<ExtArgs> | null
    /**
     * The data used to create many TradeRequests.
     */
    data: TradeRequestCreateManyInput | TradeRequestCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeRequestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TradeRequest update
   */
  export type TradeRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeRequest
     */
    select?: TradeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeRequest
     */
    omit?: TradeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeRequestInclude<ExtArgs> | null
    /**
     * The data needed to update a TradeRequest.
     */
    data: XOR<TradeRequestUpdateInput, TradeRequestUncheckedUpdateInput>
    /**
     * Choose, which TradeRequest to update.
     */
    where: TradeRequestWhereUniqueInput
  }

  /**
   * TradeRequest updateMany
   */
  export type TradeRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TradeRequests.
     */
    data: XOR<TradeRequestUpdateManyMutationInput, TradeRequestUncheckedUpdateManyInput>
    /**
     * Filter which TradeRequests to update
     */
    where?: TradeRequestWhereInput
    /**
     * Limit how many TradeRequests to update.
     */
    limit?: number
  }

  /**
   * TradeRequest updateManyAndReturn
   */
  export type TradeRequestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeRequest
     */
    select?: TradeRequestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TradeRequest
     */
    omit?: TradeRequestOmit<ExtArgs> | null
    /**
     * The data used to update TradeRequests.
     */
    data: XOR<TradeRequestUpdateManyMutationInput, TradeRequestUncheckedUpdateManyInput>
    /**
     * Filter which TradeRequests to update
     */
    where?: TradeRequestWhereInput
    /**
     * Limit how many TradeRequests to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeRequestIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TradeRequest upsert
   */
  export type TradeRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeRequest
     */
    select?: TradeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeRequest
     */
    omit?: TradeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeRequestInclude<ExtArgs> | null
    /**
     * The filter to search for the TradeRequest to update in case it exists.
     */
    where: TradeRequestWhereUniqueInput
    /**
     * In case the TradeRequest found by the `where` argument doesn't exist, create a new TradeRequest with this data.
     */
    create: XOR<TradeRequestCreateInput, TradeRequestUncheckedCreateInput>
    /**
     * In case the TradeRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TradeRequestUpdateInput, TradeRequestUncheckedUpdateInput>
  }

  /**
   * TradeRequest delete
   */
  export type TradeRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeRequest
     */
    select?: TradeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeRequest
     */
    omit?: TradeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeRequestInclude<ExtArgs> | null
    /**
     * Filter which TradeRequest to delete.
     */
    where: TradeRequestWhereUniqueInput
  }

  /**
   * TradeRequest deleteMany
   */
  export type TradeRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TradeRequests to delete
     */
    where?: TradeRequestWhereInput
    /**
     * Limit how many TradeRequests to delete.
     */
    limit?: number
  }

  /**
   * TradeRequest.events
   */
  export type TradeRequest$eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeRequestEvent
     */
    select?: TradeRequestEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeRequestEvent
     */
    omit?: TradeRequestEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeRequestEventInclude<ExtArgs> | null
    where?: TradeRequestEventWhereInput
    orderBy?: TradeRequestEventOrderByWithRelationInput | TradeRequestEventOrderByWithRelationInput[]
    cursor?: TradeRequestEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TradeRequestEventScalarFieldEnum | TradeRequestEventScalarFieldEnum[]
  }

  /**
   * TradeRequest.notifications
   */
  export type TradeRequest$notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    cursor?: NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * TradeRequest without action
   */
  export type TradeRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeRequest
     */
    select?: TradeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeRequest
     */
    omit?: TradeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeRequestInclude<ExtArgs> | null
  }


  /**
   * Model TradeRequestEvent
   */

  export type AggregateTradeRequestEvent = {
    _count: TradeRequestEventCountAggregateOutputType | null
    _avg: TradeRequestEventAvgAggregateOutputType | null
    _sum: TradeRequestEventSumAggregateOutputType | null
    _min: TradeRequestEventMinAggregateOutputType | null
    _max: TradeRequestEventMaxAggregateOutputType | null
  }

  export type TradeRequestEventAvgAggregateOutputType = {
    id: number | null
    requestId: number | null
    actorId: number | null
  }

  export type TradeRequestEventSumAggregateOutputType = {
    id: number | null
    requestId: number | null
    actorId: number | null
  }

  export type TradeRequestEventMinAggregateOutputType = {
    id: number | null
    requestId: number | null
    actorId: number | null
    action: string | null
    snapshotLocation: string | null
    snapshotDate: string | null
    snapshotTime: string | null
    notes: string | null
    createdAt: Date | null
  }

  export type TradeRequestEventMaxAggregateOutputType = {
    id: number | null
    requestId: number | null
    actorId: number | null
    action: string | null
    snapshotLocation: string | null
    snapshotDate: string | null
    snapshotTime: string | null
    notes: string | null
    createdAt: Date | null
  }

  export type TradeRequestEventCountAggregateOutputType = {
    id: number
    requestId: number
    actorId: number
    action: number
    snapshotLocation: number
    snapshotDate: number
    snapshotTime: number
    notes: number
    createdAt: number
    _all: number
  }


  export type TradeRequestEventAvgAggregateInputType = {
    id?: true
    requestId?: true
    actorId?: true
  }

  export type TradeRequestEventSumAggregateInputType = {
    id?: true
    requestId?: true
    actorId?: true
  }

  export type TradeRequestEventMinAggregateInputType = {
    id?: true
    requestId?: true
    actorId?: true
    action?: true
    snapshotLocation?: true
    snapshotDate?: true
    snapshotTime?: true
    notes?: true
    createdAt?: true
  }

  export type TradeRequestEventMaxAggregateInputType = {
    id?: true
    requestId?: true
    actorId?: true
    action?: true
    snapshotLocation?: true
    snapshotDate?: true
    snapshotTime?: true
    notes?: true
    createdAt?: true
  }

  export type TradeRequestEventCountAggregateInputType = {
    id?: true
    requestId?: true
    actorId?: true
    action?: true
    snapshotLocation?: true
    snapshotDate?: true
    snapshotTime?: true
    notes?: true
    createdAt?: true
    _all?: true
  }

  export type TradeRequestEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TradeRequestEvent to aggregate.
     */
    where?: TradeRequestEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TradeRequestEvents to fetch.
     */
    orderBy?: TradeRequestEventOrderByWithRelationInput | TradeRequestEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TradeRequestEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TradeRequestEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TradeRequestEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TradeRequestEvents
    **/
    _count?: true | TradeRequestEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TradeRequestEventAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TradeRequestEventSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TradeRequestEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TradeRequestEventMaxAggregateInputType
  }

  export type GetTradeRequestEventAggregateType<T extends TradeRequestEventAggregateArgs> = {
        [P in keyof T & keyof AggregateTradeRequestEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTradeRequestEvent[P]>
      : GetScalarType<T[P], AggregateTradeRequestEvent[P]>
  }




  export type TradeRequestEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TradeRequestEventWhereInput
    orderBy?: TradeRequestEventOrderByWithAggregationInput | TradeRequestEventOrderByWithAggregationInput[]
    by: TradeRequestEventScalarFieldEnum[] | TradeRequestEventScalarFieldEnum
    having?: TradeRequestEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TradeRequestEventCountAggregateInputType | true
    _avg?: TradeRequestEventAvgAggregateInputType
    _sum?: TradeRequestEventSumAggregateInputType
    _min?: TradeRequestEventMinAggregateInputType
    _max?: TradeRequestEventMaxAggregateInputType
  }

  export type TradeRequestEventGroupByOutputType = {
    id: number
    requestId: number
    actorId: number
    action: string
    snapshotLocation: string | null
    snapshotDate: string | null
    snapshotTime: string | null
    notes: string | null
    createdAt: Date
    _count: TradeRequestEventCountAggregateOutputType | null
    _avg: TradeRequestEventAvgAggregateOutputType | null
    _sum: TradeRequestEventSumAggregateOutputType | null
    _min: TradeRequestEventMinAggregateOutputType | null
    _max: TradeRequestEventMaxAggregateOutputType | null
  }

  type GetTradeRequestEventGroupByPayload<T extends TradeRequestEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TradeRequestEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TradeRequestEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TradeRequestEventGroupByOutputType[P]>
            : GetScalarType<T[P], TradeRequestEventGroupByOutputType[P]>
        }
      >
    >


  export type TradeRequestEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    requestId?: boolean
    actorId?: boolean
    action?: boolean
    snapshotLocation?: boolean
    snapshotDate?: boolean
    snapshotTime?: boolean
    notes?: boolean
    createdAt?: boolean
    request?: boolean | TradeRequestDefaultArgs<ExtArgs>
    actor?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tradeRequestEvent"]>

  export type TradeRequestEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    requestId?: boolean
    actorId?: boolean
    action?: boolean
    snapshotLocation?: boolean
    snapshotDate?: boolean
    snapshotTime?: boolean
    notes?: boolean
    createdAt?: boolean
    request?: boolean | TradeRequestDefaultArgs<ExtArgs>
    actor?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tradeRequestEvent"]>

  export type TradeRequestEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    requestId?: boolean
    actorId?: boolean
    action?: boolean
    snapshotLocation?: boolean
    snapshotDate?: boolean
    snapshotTime?: boolean
    notes?: boolean
    createdAt?: boolean
    request?: boolean | TradeRequestDefaultArgs<ExtArgs>
    actor?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tradeRequestEvent"]>

  export type TradeRequestEventSelectScalar = {
    id?: boolean
    requestId?: boolean
    actorId?: boolean
    action?: boolean
    snapshotLocation?: boolean
    snapshotDate?: boolean
    snapshotTime?: boolean
    notes?: boolean
    createdAt?: boolean
  }

  export type TradeRequestEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "requestId" | "actorId" | "action" | "snapshotLocation" | "snapshotDate" | "snapshotTime" | "notes" | "createdAt", ExtArgs["result"]["tradeRequestEvent"]>
  export type TradeRequestEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    request?: boolean | TradeRequestDefaultArgs<ExtArgs>
    actor?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TradeRequestEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    request?: boolean | TradeRequestDefaultArgs<ExtArgs>
    actor?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TradeRequestEventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    request?: boolean | TradeRequestDefaultArgs<ExtArgs>
    actor?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TradeRequestEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TradeRequestEvent"
    objects: {
      request: Prisma.$TradeRequestPayload<ExtArgs>
      actor: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      requestId: number
      actorId: number
      action: string
      snapshotLocation: string | null
      snapshotDate: string | null
      snapshotTime: string | null
      notes: string | null
      createdAt: Date
    }, ExtArgs["result"]["tradeRequestEvent"]>
    composites: {}
  }

  type TradeRequestEventGetPayload<S extends boolean | null | undefined | TradeRequestEventDefaultArgs> = $Result.GetResult<Prisma.$TradeRequestEventPayload, S>

  type TradeRequestEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TradeRequestEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TradeRequestEventCountAggregateInputType | true
    }

  export interface TradeRequestEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TradeRequestEvent'], meta: { name: 'TradeRequestEvent' } }
    /**
     * Find zero or one TradeRequestEvent that matches the filter.
     * @param {TradeRequestEventFindUniqueArgs} args - Arguments to find a TradeRequestEvent
     * @example
     * // Get one TradeRequestEvent
     * const tradeRequestEvent = await prisma.tradeRequestEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TradeRequestEventFindUniqueArgs>(args: SelectSubset<T, TradeRequestEventFindUniqueArgs<ExtArgs>>): Prisma__TradeRequestEventClient<$Result.GetResult<Prisma.$TradeRequestEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TradeRequestEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TradeRequestEventFindUniqueOrThrowArgs} args - Arguments to find a TradeRequestEvent
     * @example
     * // Get one TradeRequestEvent
     * const tradeRequestEvent = await prisma.tradeRequestEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TradeRequestEventFindUniqueOrThrowArgs>(args: SelectSubset<T, TradeRequestEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TradeRequestEventClient<$Result.GetResult<Prisma.$TradeRequestEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TradeRequestEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeRequestEventFindFirstArgs} args - Arguments to find a TradeRequestEvent
     * @example
     * // Get one TradeRequestEvent
     * const tradeRequestEvent = await prisma.tradeRequestEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TradeRequestEventFindFirstArgs>(args?: SelectSubset<T, TradeRequestEventFindFirstArgs<ExtArgs>>): Prisma__TradeRequestEventClient<$Result.GetResult<Prisma.$TradeRequestEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TradeRequestEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeRequestEventFindFirstOrThrowArgs} args - Arguments to find a TradeRequestEvent
     * @example
     * // Get one TradeRequestEvent
     * const tradeRequestEvent = await prisma.tradeRequestEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TradeRequestEventFindFirstOrThrowArgs>(args?: SelectSubset<T, TradeRequestEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__TradeRequestEventClient<$Result.GetResult<Prisma.$TradeRequestEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TradeRequestEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeRequestEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TradeRequestEvents
     * const tradeRequestEvents = await prisma.tradeRequestEvent.findMany()
     * 
     * // Get first 10 TradeRequestEvents
     * const tradeRequestEvents = await prisma.tradeRequestEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tradeRequestEventWithIdOnly = await prisma.tradeRequestEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TradeRequestEventFindManyArgs>(args?: SelectSubset<T, TradeRequestEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradeRequestEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TradeRequestEvent.
     * @param {TradeRequestEventCreateArgs} args - Arguments to create a TradeRequestEvent.
     * @example
     * // Create one TradeRequestEvent
     * const TradeRequestEvent = await prisma.tradeRequestEvent.create({
     *   data: {
     *     // ... data to create a TradeRequestEvent
     *   }
     * })
     * 
     */
    create<T extends TradeRequestEventCreateArgs>(args: SelectSubset<T, TradeRequestEventCreateArgs<ExtArgs>>): Prisma__TradeRequestEventClient<$Result.GetResult<Prisma.$TradeRequestEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TradeRequestEvents.
     * @param {TradeRequestEventCreateManyArgs} args - Arguments to create many TradeRequestEvents.
     * @example
     * // Create many TradeRequestEvents
     * const tradeRequestEvent = await prisma.tradeRequestEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TradeRequestEventCreateManyArgs>(args?: SelectSubset<T, TradeRequestEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TradeRequestEvents and returns the data saved in the database.
     * @param {TradeRequestEventCreateManyAndReturnArgs} args - Arguments to create many TradeRequestEvents.
     * @example
     * // Create many TradeRequestEvents
     * const tradeRequestEvent = await prisma.tradeRequestEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TradeRequestEvents and only return the `id`
     * const tradeRequestEventWithIdOnly = await prisma.tradeRequestEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TradeRequestEventCreateManyAndReturnArgs>(args?: SelectSubset<T, TradeRequestEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradeRequestEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TradeRequestEvent.
     * @param {TradeRequestEventDeleteArgs} args - Arguments to delete one TradeRequestEvent.
     * @example
     * // Delete one TradeRequestEvent
     * const TradeRequestEvent = await prisma.tradeRequestEvent.delete({
     *   where: {
     *     // ... filter to delete one TradeRequestEvent
     *   }
     * })
     * 
     */
    delete<T extends TradeRequestEventDeleteArgs>(args: SelectSubset<T, TradeRequestEventDeleteArgs<ExtArgs>>): Prisma__TradeRequestEventClient<$Result.GetResult<Prisma.$TradeRequestEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TradeRequestEvent.
     * @param {TradeRequestEventUpdateArgs} args - Arguments to update one TradeRequestEvent.
     * @example
     * // Update one TradeRequestEvent
     * const tradeRequestEvent = await prisma.tradeRequestEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TradeRequestEventUpdateArgs>(args: SelectSubset<T, TradeRequestEventUpdateArgs<ExtArgs>>): Prisma__TradeRequestEventClient<$Result.GetResult<Prisma.$TradeRequestEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TradeRequestEvents.
     * @param {TradeRequestEventDeleteManyArgs} args - Arguments to filter TradeRequestEvents to delete.
     * @example
     * // Delete a few TradeRequestEvents
     * const { count } = await prisma.tradeRequestEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TradeRequestEventDeleteManyArgs>(args?: SelectSubset<T, TradeRequestEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TradeRequestEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeRequestEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TradeRequestEvents
     * const tradeRequestEvent = await prisma.tradeRequestEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TradeRequestEventUpdateManyArgs>(args: SelectSubset<T, TradeRequestEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TradeRequestEvents and returns the data updated in the database.
     * @param {TradeRequestEventUpdateManyAndReturnArgs} args - Arguments to update many TradeRequestEvents.
     * @example
     * // Update many TradeRequestEvents
     * const tradeRequestEvent = await prisma.tradeRequestEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TradeRequestEvents and only return the `id`
     * const tradeRequestEventWithIdOnly = await prisma.tradeRequestEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TradeRequestEventUpdateManyAndReturnArgs>(args: SelectSubset<T, TradeRequestEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradeRequestEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TradeRequestEvent.
     * @param {TradeRequestEventUpsertArgs} args - Arguments to update or create a TradeRequestEvent.
     * @example
     * // Update or create a TradeRequestEvent
     * const tradeRequestEvent = await prisma.tradeRequestEvent.upsert({
     *   create: {
     *     // ... data to create a TradeRequestEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TradeRequestEvent we want to update
     *   }
     * })
     */
    upsert<T extends TradeRequestEventUpsertArgs>(args: SelectSubset<T, TradeRequestEventUpsertArgs<ExtArgs>>): Prisma__TradeRequestEventClient<$Result.GetResult<Prisma.$TradeRequestEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TradeRequestEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeRequestEventCountArgs} args - Arguments to filter TradeRequestEvents to count.
     * @example
     * // Count the number of TradeRequestEvents
     * const count = await prisma.tradeRequestEvent.count({
     *   where: {
     *     // ... the filter for the TradeRequestEvents we want to count
     *   }
     * })
    **/
    count<T extends TradeRequestEventCountArgs>(
      args?: Subset<T, TradeRequestEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TradeRequestEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TradeRequestEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeRequestEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TradeRequestEventAggregateArgs>(args: Subset<T, TradeRequestEventAggregateArgs>): Prisma.PrismaPromise<GetTradeRequestEventAggregateType<T>>

    /**
     * Group by TradeRequestEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeRequestEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TradeRequestEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TradeRequestEventGroupByArgs['orderBy'] }
        : { orderBy?: TradeRequestEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TradeRequestEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTradeRequestEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TradeRequestEvent model
   */
  readonly fields: TradeRequestEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TradeRequestEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TradeRequestEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    request<T extends TradeRequestDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TradeRequestDefaultArgs<ExtArgs>>): Prisma__TradeRequestClient<$Result.GetResult<Prisma.$TradeRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    actor<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TradeRequestEvent model
   */
  interface TradeRequestEventFieldRefs {
    readonly id: FieldRef<"TradeRequestEvent", 'Int'>
    readonly requestId: FieldRef<"TradeRequestEvent", 'Int'>
    readonly actorId: FieldRef<"TradeRequestEvent", 'Int'>
    readonly action: FieldRef<"TradeRequestEvent", 'String'>
    readonly snapshotLocation: FieldRef<"TradeRequestEvent", 'String'>
    readonly snapshotDate: FieldRef<"TradeRequestEvent", 'String'>
    readonly snapshotTime: FieldRef<"TradeRequestEvent", 'String'>
    readonly notes: FieldRef<"TradeRequestEvent", 'String'>
    readonly createdAt: FieldRef<"TradeRequestEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TradeRequestEvent findUnique
   */
  export type TradeRequestEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeRequestEvent
     */
    select?: TradeRequestEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeRequestEvent
     */
    omit?: TradeRequestEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeRequestEventInclude<ExtArgs> | null
    /**
     * Filter, which TradeRequestEvent to fetch.
     */
    where: TradeRequestEventWhereUniqueInput
  }

  /**
   * TradeRequestEvent findUniqueOrThrow
   */
  export type TradeRequestEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeRequestEvent
     */
    select?: TradeRequestEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeRequestEvent
     */
    omit?: TradeRequestEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeRequestEventInclude<ExtArgs> | null
    /**
     * Filter, which TradeRequestEvent to fetch.
     */
    where: TradeRequestEventWhereUniqueInput
  }

  /**
   * TradeRequestEvent findFirst
   */
  export type TradeRequestEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeRequestEvent
     */
    select?: TradeRequestEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeRequestEvent
     */
    omit?: TradeRequestEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeRequestEventInclude<ExtArgs> | null
    /**
     * Filter, which TradeRequestEvent to fetch.
     */
    where?: TradeRequestEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TradeRequestEvents to fetch.
     */
    orderBy?: TradeRequestEventOrderByWithRelationInput | TradeRequestEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TradeRequestEvents.
     */
    cursor?: TradeRequestEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TradeRequestEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TradeRequestEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TradeRequestEvents.
     */
    distinct?: TradeRequestEventScalarFieldEnum | TradeRequestEventScalarFieldEnum[]
  }

  /**
   * TradeRequestEvent findFirstOrThrow
   */
  export type TradeRequestEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeRequestEvent
     */
    select?: TradeRequestEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeRequestEvent
     */
    omit?: TradeRequestEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeRequestEventInclude<ExtArgs> | null
    /**
     * Filter, which TradeRequestEvent to fetch.
     */
    where?: TradeRequestEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TradeRequestEvents to fetch.
     */
    orderBy?: TradeRequestEventOrderByWithRelationInput | TradeRequestEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TradeRequestEvents.
     */
    cursor?: TradeRequestEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TradeRequestEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TradeRequestEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TradeRequestEvents.
     */
    distinct?: TradeRequestEventScalarFieldEnum | TradeRequestEventScalarFieldEnum[]
  }

  /**
   * TradeRequestEvent findMany
   */
  export type TradeRequestEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeRequestEvent
     */
    select?: TradeRequestEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeRequestEvent
     */
    omit?: TradeRequestEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeRequestEventInclude<ExtArgs> | null
    /**
     * Filter, which TradeRequestEvents to fetch.
     */
    where?: TradeRequestEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TradeRequestEvents to fetch.
     */
    orderBy?: TradeRequestEventOrderByWithRelationInput | TradeRequestEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TradeRequestEvents.
     */
    cursor?: TradeRequestEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TradeRequestEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TradeRequestEvents.
     */
    skip?: number
    distinct?: TradeRequestEventScalarFieldEnum | TradeRequestEventScalarFieldEnum[]
  }

  /**
   * TradeRequestEvent create
   */
  export type TradeRequestEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeRequestEvent
     */
    select?: TradeRequestEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeRequestEvent
     */
    omit?: TradeRequestEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeRequestEventInclude<ExtArgs> | null
    /**
     * The data needed to create a TradeRequestEvent.
     */
    data: XOR<TradeRequestEventCreateInput, TradeRequestEventUncheckedCreateInput>
  }

  /**
   * TradeRequestEvent createMany
   */
  export type TradeRequestEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TradeRequestEvents.
     */
    data: TradeRequestEventCreateManyInput | TradeRequestEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TradeRequestEvent createManyAndReturn
   */
  export type TradeRequestEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeRequestEvent
     */
    select?: TradeRequestEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TradeRequestEvent
     */
    omit?: TradeRequestEventOmit<ExtArgs> | null
    /**
     * The data used to create many TradeRequestEvents.
     */
    data: TradeRequestEventCreateManyInput | TradeRequestEventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeRequestEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TradeRequestEvent update
   */
  export type TradeRequestEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeRequestEvent
     */
    select?: TradeRequestEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeRequestEvent
     */
    omit?: TradeRequestEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeRequestEventInclude<ExtArgs> | null
    /**
     * The data needed to update a TradeRequestEvent.
     */
    data: XOR<TradeRequestEventUpdateInput, TradeRequestEventUncheckedUpdateInput>
    /**
     * Choose, which TradeRequestEvent to update.
     */
    where: TradeRequestEventWhereUniqueInput
  }

  /**
   * TradeRequestEvent updateMany
   */
  export type TradeRequestEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TradeRequestEvents.
     */
    data: XOR<TradeRequestEventUpdateManyMutationInput, TradeRequestEventUncheckedUpdateManyInput>
    /**
     * Filter which TradeRequestEvents to update
     */
    where?: TradeRequestEventWhereInput
    /**
     * Limit how many TradeRequestEvents to update.
     */
    limit?: number
  }

  /**
   * TradeRequestEvent updateManyAndReturn
   */
  export type TradeRequestEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeRequestEvent
     */
    select?: TradeRequestEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TradeRequestEvent
     */
    omit?: TradeRequestEventOmit<ExtArgs> | null
    /**
     * The data used to update TradeRequestEvents.
     */
    data: XOR<TradeRequestEventUpdateManyMutationInput, TradeRequestEventUncheckedUpdateManyInput>
    /**
     * Filter which TradeRequestEvents to update
     */
    where?: TradeRequestEventWhereInput
    /**
     * Limit how many TradeRequestEvents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeRequestEventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TradeRequestEvent upsert
   */
  export type TradeRequestEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeRequestEvent
     */
    select?: TradeRequestEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeRequestEvent
     */
    omit?: TradeRequestEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeRequestEventInclude<ExtArgs> | null
    /**
     * The filter to search for the TradeRequestEvent to update in case it exists.
     */
    where: TradeRequestEventWhereUniqueInput
    /**
     * In case the TradeRequestEvent found by the `where` argument doesn't exist, create a new TradeRequestEvent with this data.
     */
    create: XOR<TradeRequestEventCreateInput, TradeRequestEventUncheckedCreateInput>
    /**
     * In case the TradeRequestEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TradeRequestEventUpdateInput, TradeRequestEventUncheckedUpdateInput>
  }

  /**
   * TradeRequestEvent delete
   */
  export type TradeRequestEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeRequestEvent
     */
    select?: TradeRequestEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeRequestEvent
     */
    omit?: TradeRequestEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeRequestEventInclude<ExtArgs> | null
    /**
     * Filter which TradeRequestEvent to delete.
     */
    where: TradeRequestEventWhereUniqueInput
  }

  /**
   * TradeRequestEvent deleteMany
   */
  export type TradeRequestEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TradeRequestEvents to delete
     */
    where?: TradeRequestEventWhereInput
    /**
     * Limit how many TradeRequestEvents to delete.
     */
    limit?: number
  }

  /**
   * TradeRequestEvent without action
   */
  export type TradeRequestEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeRequestEvent
     */
    select?: TradeRequestEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeRequestEvent
     */
    omit?: TradeRequestEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeRequestEventInclude<ExtArgs> | null
  }


  /**
   * Model Notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _avg: NotificationAvgAggregateOutputType | null
    _sum: NotificationSumAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    actorId: number | null
    relatedRequestId: number | null
    relatedItemId: number | null
    listingId: number | null
    claimId: number | null
  }

  export type NotificationSumAggregateOutputType = {
    id: number | null
    userId: number | null
    actorId: number | null
    relatedRequestId: number | null
    relatedItemId: number | null
    listingId: number | null
    claimId: number | null
  }

  export type NotificationMinAggregateOutputType = {
    id: number | null
    userId: number | null
    actorId: number | null
    type: string | null
    title: string | null
    message: string | null
    relatedRequestId: number | null
    relatedItemId: number | null
    listingId: number | null
    claimId: number | null
    isRead: boolean | null
    createdAt: Date | null
  }

  export type NotificationMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    actorId: number | null
    type: string | null
    title: string | null
    message: string | null
    relatedRequestId: number | null
    relatedItemId: number | null
    listingId: number | null
    claimId: number | null
    isRead: boolean | null
    createdAt: Date | null
  }

  export type NotificationCountAggregateOutputType = {
    id: number
    userId: number
    actorId: number
    type: number
    title: number
    message: number
    relatedRequestId: number
    relatedItemId: number
    listingId: number
    claimId: number
    isRead: number
    createdAt: number
    _all: number
  }


  export type NotificationAvgAggregateInputType = {
    id?: true
    userId?: true
    actorId?: true
    relatedRequestId?: true
    relatedItemId?: true
    listingId?: true
    claimId?: true
  }

  export type NotificationSumAggregateInputType = {
    id?: true
    userId?: true
    actorId?: true
    relatedRequestId?: true
    relatedItemId?: true
    listingId?: true
    claimId?: true
  }

  export type NotificationMinAggregateInputType = {
    id?: true
    userId?: true
    actorId?: true
    type?: true
    title?: true
    message?: true
    relatedRequestId?: true
    relatedItemId?: true
    listingId?: true
    claimId?: true
    isRead?: true
    createdAt?: true
  }

  export type NotificationMaxAggregateInputType = {
    id?: true
    userId?: true
    actorId?: true
    type?: true
    title?: true
    message?: true
    relatedRequestId?: true
    relatedItemId?: true
    listingId?: true
    claimId?: true
    isRead?: true
    createdAt?: true
  }

  export type NotificationCountAggregateInputType = {
    id?: true
    userId?: true
    actorId?: true
    type?: true
    title?: true
    message?: true
    relatedRequestId?: true
    relatedItemId?: true
    listingId?: true
    claimId?: true
    isRead?: true
    createdAt?: true
    _all?: true
  }

  export type NotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NotificationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NotificationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type NotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithAggregationInput | NotificationOrderByWithAggregationInput[]
    by: NotificationScalarFieldEnum[] | NotificationScalarFieldEnum
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _avg?: NotificationAvgAggregateInputType
    _sum?: NotificationSumAggregateInputType
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }

  export type NotificationGroupByOutputType = {
    id: number
    userId: number
    actorId: number | null
    type: string
    title: string | null
    message: string
    relatedRequestId: number | null
    relatedItemId: number | null
    listingId: number | null
    claimId: number | null
    isRead: boolean
    createdAt: Date
    _count: NotificationCountAggregateOutputType | null
    _avg: NotificationAvgAggregateOutputType | null
    _sum: NotificationSumAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    actorId?: boolean
    type?: boolean
    title?: boolean
    message?: boolean
    relatedRequestId?: boolean
    relatedItemId?: boolean
    listingId?: boolean
    claimId?: boolean
    isRead?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    actor?: boolean | Notification$actorArgs<ExtArgs>
    relatedRequest?: boolean | Notification$relatedRequestArgs<ExtArgs>
    listing?: boolean | Notification$listingArgs<ExtArgs>
    claim?: boolean | Notification$claimArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    actorId?: boolean
    type?: boolean
    title?: boolean
    message?: boolean
    relatedRequestId?: boolean
    relatedItemId?: boolean
    listingId?: boolean
    claimId?: boolean
    isRead?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    actor?: boolean | Notification$actorArgs<ExtArgs>
    relatedRequest?: boolean | Notification$relatedRequestArgs<ExtArgs>
    listing?: boolean | Notification$listingArgs<ExtArgs>
    claim?: boolean | Notification$claimArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    actorId?: boolean
    type?: boolean
    title?: boolean
    message?: boolean
    relatedRequestId?: boolean
    relatedItemId?: boolean
    listingId?: boolean
    claimId?: boolean
    isRead?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    actor?: boolean | Notification$actorArgs<ExtArgs>
    relatedRequest?: boolean | Notification$relatedRequestArgs<ExtArgs>
    listing?: boolean | Notification$listingArgs<ExtArgs>
    claim?: boolean | Notification$claimArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectScalar = {
    id?: boolean
    userId?: boolean
    actorId?: boolean
    type?: boolean
    title?: boolean
    message?: boolean
    relatedRequestId?: boolean
    relatedItemId?: boolean
    listingId?: boolean
    claimId?: boolean
    isRead?: boolean
    createdAt?: boolean
  }

  export type NotificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "actorId" | "type" | "title" | "message" | "relatedRequestId" | "relatedItemId" | "listingId" | "claimId" | "isRead" | "createdAt", ExtArgs["result"]["notification"]>
  export type NotificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    actor?: boolean | Notification$actorArgs<ExtArgs>
    relatedRequest?: boolean | Notification$relatedRequestArgs<ExtArgs>
    listing?: boolean | Notification$listingArgs<ExtArgs>
    claim?: boolean | Notification$claimArgs<ExtArgs>
  }
  export type NotificationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    actor?: boolean | Notification$actorArgs<ExtArgs>
    relatedRequest?: boolean | Notification$relatedRequestArgs<ExtArgs>
    listing?: boolean | Notification$listingArgs<ExtArgs>
    claim?: boolean | Notification$claimArgs<ExtArgs>
  }
  export type NotificationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    actor?: boolean | Notification$actorArgs<ExtArgs>
    relatedRequest?: boolean | Notification$relatedRequestArgs<ExtArgs>
    listing?: boolean | Notification$listingArgs<ExtArgs>
    claim?: boolean | Notification$claimArgs<ExtArgs>
  }

  export type $NotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notification"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      actor: Prisma.$UserPayload<ExtArgs> | null
      relatedRequest: Prisma.$TradeRequestPayload<ExtArgs> | null
      listing: Prisma.$ListingPayload<ExtArgs> | null
      claim: Prisma.$ClaimPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      actorId: number | null
      type: string
      title: string | null
      message: string
      relatedRequestId: number | null
      relatedItemId: number | null
      listingId: number | null
      claimId: number | null
      isRead: boolean
      createdAt: Date
    }, ExtArgs["result"]["notification"]>
    composites: {}
  }

  type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = $Result.GetResult<Prisma.$NotificationPayload, S>

  type NotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationCountAggregateInputType | true
    }

  export interface NotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notification'], meta: { name: 'Notification' } }
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationFindUniqueArgs>(args: SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationFindFirstArgs>(args?: SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationFindManyArgs>(args?: SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
     */
    create<T extends NotificationCreateArgs>(args: SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Notifications.
     * @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationCreateManyArgs>(args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notifications and returns the data saved in the database.
     * @param {NotificationCreateManyAndReturnArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
     */
    delete<T extends NotificationDeleteArgs>(args: SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationUpdateArgs>(args: SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationDeleteManyArgs>(args?: SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationUpdateManyArgs>(args: SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications and returns the data updated in the database.
     * @param {NotificationUpdateManyAndReturnArgs} args - Arguments to update many Notifications.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NotificationUpdateManyAndReturnArgs>(args: SelectSubset<T, NotificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
     */
    upsert<T extends NotificationUpsertArgs>(args: SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notification model
   */
  readonly fields: NotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    actor<T extends Notification$actorArgs<ExtArgs> = {}>(args?: Subset<T, Notification$actorArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    relatedRequest<T extends Notification$relatedRequestArgs<ExtArgs> = {}>(args?: Subset<T, Notification$relatedRequestArgs<ExtArgs>>): Prisma__TradeRequestClient<$Result.GetResult<Prisma.$TradeRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    listing<T extends Notification$listingArgs<ExtArgs> = {}>(args?: Subset<T, Notification$listingArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    claim<T extends Notification$claimArgs<ExtArgs> = {}>(args?: Subset<T, Notification$claimArgs<ExtArgs>>): Prisma__ClaimClient<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Notification model
   */
  interface NotificationFieldRefs {
    readonly id: FieldRef<"Notification", 'Int'>
    readonly userId: FieldRef<"Notification", 'Int'>
    readonly actorId: FieldRef<"Notification", 'Int'>
    readonly type: FieldRef<"Notification", 'String'>
    readonly title: FieldRef<"Notification", 'String'>
    readonly message: FieldRef<"Notification", 'String'>
    readonly relatedRequestId: FieldRef<"Notification", 'Int'>
    readonly relatedItemId: FieldRef<"Notification", 'Int'>
    readonly listingId: FieldRef<"Notification", 'Int'>
    readonly claimId: FieldRef<"Notification", 'Int'>
    readonly isRead: FieldRef<"Notification", 'Boolean'>
    readonly createdAt: FieldRef<"Notification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notifications to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification create
   */
  export type NotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to create a Notification.
     */
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }

  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notification createManyAndReturn
   */
  export type NotificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification update
   */
  export type NotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to update a Notification.
     */
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
  }

  /**
   * Notification updateManyAndReturn
   */
  export type NotificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }

  /**
   * Notification delete
   */
  export type NotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter which Notification to delete.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifications to delete
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to delete.
     */
    limit?: number
  }

  /**
   * Notification.actor
   */
  export type Notification$actorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Notification.relatedRequest
   */
  export type Notification$relatedRequestArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeRequest
     */
    select?: TradeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeRequest
     */
    omit?: TradeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeRequestInclude<ExtArgs> | null
    where?: TradeRequestWhereInput
  }

  /**
   * Notification.listing
   */
  export type Notification$listingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    where?: ListingWhereInput
  }

  /**
   * Notification.claim
   */
  export type Notification$claimArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Claim
     */
    omit?: ClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimInclude<ExtArgs> | null
    where?: ClaimWhereInput
  }

  /**
   * Notification without action
   */
  export type NotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    supabaseId: 'supabaseId',
    email: 'email',
    name: 'name',
    role: 'role',
    profileCompleted: 'profileCompleted',
    studentId: 'studentId',
    course: 'course',
    year: 'year',
    employeeId: 'employeeId',
    position: 'position',
    office: 'office',
    college: 'college',
    campus: 'campus',
    phone: 'phone',
    bio: 'bio',
    avatar: 'avatar',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ListingScalarFieldEnum: {
    id: 'id',
    status: 'status',
    title: 'title',
    category: 'category',
    college: 'college',
    campus: 'campus',
    condition: 'condition',
    description: 'description',
    type: 'type',
    price: 'price',
    images: 'images',
    preferredLocation: 'preferredLocation',
    sellerId: 'sellerId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ListingScalarFieldEnum = (typeof ListingScalarFieldEnum)[keyof typeof ListingScalarFieldEnum]


  export const ClaimScalarFieldEnum: {
    id: 'id',
    listingId: 'listingId',
    claimantId: 'claimantId',
    status: 'status',
    notes: 'notes',
    claimDate: 'claimDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ClaimScalarFieldEnum = (typeof ClaimScalarFieldEnum)[keyof typeof ClaimScalarFieldEnum]


  export const SavedItemScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    listingId: 'listingId',
    createdAt: 'createdAt'
  };

  export type SavedItemScalarFieldEnum = (typeof SavedItemScalarFieldEnum)[keyof typeof SavedItemScalarFieldEnum]


  export const ListingAvailabilityScalarFieldEnum: {
    id: 'id',
    listingId: 'listingId',
    dayOfWeek: 'dayOfWeek',
    startTime: 'startTime',
    endTime: 'endTime',
    createdAt: 'createdAt'
  };

  export type ListingAvailabilityScalarFieldEnum = (typeof ListingAvailabilityScalarFieldEnum)[keyof typeof ListingAvailabilityScalarFieldEnum]


  export const TradeRequestScalarFieldEnum: {
    id: 'id',
    listingId: 'listingId',
    buyerId: 'buyerId',
    sellerId: 'sellerId',
    meetupLocation: 'meetupLocation',
    meetupDate: 'meetupDate',
    meetupTime: 'meetupTime',
    notes: 'notes',
    status: 'status',
    proposedBy: 'proposedBy',
    declineReason: 'declineReason',
    customTime: 'customTime',
    expiresAt: 'expiresAt',
    respondedAt: 'respondedAt',
    completedAt: 'completedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TradeRequestScalarFieldEnum = (typeof TradeRequestScalarFieldEnum)[keyof typeof TradeRequestScalarFieldEnum]


  export const TradeRequestEventScalarFieldEnum: {
    id: 'id',
    requestId: 'requestId',
    actorId: 'actorId',
    action: 'action',
    snapshotLocation: 'snapshotLocation',
    snapshotDate: 'snapshotDate',
    snapshotTime: 'snapshotTime',
    notes: 'notes',
    createdAt: 'createdAt'
  };

  export type TradeRequestEventScalarFieldEnum = (typeof TradeRequestEventScalarFieldEnum)[keyof typeof TradeRequestEventScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    actorId: 'actorId',
    type: 'type',
    title: 'title',
    message: 'message',
    relatedRequestId: 'relatedRequestId',
    relatedItemId: 'relatedItemId',
    listingId: 'listingId',
    claimId: 'claimId',
    isRead: 'isRead',
    createdAt: 'createdAt'
  };

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    supabaseId?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    role?: StringNullableFilter<"User"> | string | null
    profileCompleted?: BoolFilter<"User"> | boolean
    studentId?: StringNullableFilter<"User"> | string | null
    course?: StringNullableFilter<"User"> | string | null
    year?: StringNullableFilter<"User"> | string | null
    employeeId?: StringNullableFilter<"User"> | string | null
    position?: StringNullableFilter<"User"> | string | null
    office?: StringNullableFilter<"User"> | string | null
    college?: StringNullableFilter<"User"> | string | null
    campus?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    bio?: StringNullableFilter<"User"> | string | null
    avatar?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    listings?: ListingListRelationFilter
    claims?: ClaimListRelationFilter
    savedItems?: SavedItemListRelationFilter
    notifications?: NotificationListRelationFilter
    actedNotifications?: NotificationListRelationFilter
    buyerRequests?: TradeRequestListRelationFilter
    sellerRequests?: TradeRequestListRelationFilter
    tradeEvents?: TradeRequestEventListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    supabaseId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrderInput | SortOrder
    profileCompleted?: SortOrder
    studentId?: SortOrderInput | SortOrder
    course?: SortOrderInput | SortOrder
    year?: SortOrderInput | SortOrder
    employeeId?: SortOrderInput | SortOrder
    position?: SortOrderInput | SortOrder
    office?: SortOrderInput | SortOrder
    college?: SortOrderInput | SortOrder
    campus?: SortOrder
    phone?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    listings?: ListingOrderByRelationAggregateInput
    claims?: ClaimOrderByRelationAggregateInput
    savedItems?: SavedItemOrderByRelationAggregateInput
    notifications?: NotificationOrderByRelationAggregateInput
    actedNotifications?: NotificationOrderByRelationAggregateInput
    buyerRequests?: TradeRequestOrderByRelationAggregateInput
    sellerRequests?: TradeRequestOrderByRelationAggregateInput
    tradeEvents?: TradeRequestEventOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    supabaseId?: string
    email?: string
    studentId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    role?: StringNullableFilter<"User"> | string | null
    profileCompleted?: BoolFilter<"User"> | boolean
    course?: StringNullableFilter<"User"> | string | null
    year?: StringNullableFilter<"User"> | string | null
    employeeId?: StringNullableFilter<"User"> | string | null
    position?: StringNullableFilter<"User"> | string | null
    office?: StringNullableFilter<"User"> | string | null
    college?: StringNullableFilter<"User"> | string | null
    campus?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    bio?: StringNullableFilter<"User"> | string | null
    avatar?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    listings?: ListingListRelationFilter
    claims?: ClaimListRelationFilter
    savedItems?: SavedItemListRelationFilter
    notifications?: NotificationListRelationFilter
    actedNotifications?: NotificationListRelationFilter
    buyerRequests?: TradeRequestListRelationFilter
    sellerRequests?: TradeRequestListRelationFilter
    tradeEvents?: TradeRequestEventListRelationFilter
  }, "id" | "supabaseId" | "email" | "studentId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    supabaseId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrderInput | SortOrder
    profileCompleted?: SortOrder
    studentId?: SortOrderInput | SortOrder
    course?: SortOrderInput | SortOrder
    year?: SortOrderInput | SortOrder
    employeeId?: SortOrderInput | SortOrder
    position?: SortOrderInput | SortOrder
    office?: SortOrderInput | SortOrder
    college?: SortOrderInput | SortOrder
    campus?: SortOrder
    phone?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    supabaseId?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    role?: StringNullableWithAggregatesFilter<"User"> | string | null
    profileCompleted?: BoolWithAggregatesFilter<"User"> | boolean
    studentId?: StringNullableWithAggregatesFilter<"User"> | string | null
    course?: StringNullableWithAggregatesFilter<"User"> | string | null
    year?: StringNullableWithAggregatesFilter<"User"> | string | null
    employeeId?: StringNullableWithAggregatesFilter<"User"> | string | null
    position?: StringNullableWithAggregatesFilter<"User"> | string | null
    office?: StringNullableWithAggregatesFilter<"User"> | string | null
    college?: StringNullableWithAggregatesFilter<"User"> | string | null
    campus?: StringWithAggregatesFilter<"User"> | string
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    bio?: StringNullableWithAggregatesFilter<"User"> | string | null
    avatar?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ListingWhereInput = {
    AND?: ListingWhereInput | ListingWhereInput[]
    OR?: ListingWhereInput[]
    NOT?: ListingWhereInput | ListingWhereInput[]
    id?: IntFilter<"Listing"> | number
    status?: StringFilter<"Listing"> | string
    title?: StringFilter<"Listing"> | string
    category?: StringFilter<"Listing"> | string
    college?: StringFilter<"Listing"> | string
    campus?: StringFilter<"Listing"> | string
    condition?: StringFilter<"Listing"> | string
    description?: StringFilter<"Listing"> | string
    type?: StringFilter<"Listing"> | string
    price?: FloatFilter<"Listing"> | number
    images?: StringNullableListFilter<"Listing">
    preferredLocation?: StringNullableFilter<"Listing"> | string | null
    sellerId?: IntFilter<"Listing"> | number
    createdAt?: DateTimeFilter<"Listing"> | Date | string
    updatedAt?: DateTimeFilter<"Listing"> | Date | string
    seller?: XOR<UserScalarRelationFilter, UserWhereInput>
    claims?: ClaimListRelationFilter
    savedBy?: SavedItemListRelationFilter
    notifications?: NotificationListRelationFilter
    tradeRequests?: TradeRequestListRelationFilter
    availabilities?: ListingAvailabilityListRelationFilter
  }

  export type ListingOrderByWithRelationInput = {
    id?: SortOrder
    status?: SortOrder
    title?: SortOrder
    category?: SortOrder
    college?: SortOrder
    campus?: SortOrder
    condition?: SortOrder
    description?: SortOrder
    type?: SortOrder
    price?: SortOrder
    images?: SortOrder
    preferredLocation?: SortOrderInput | SortOrder
    sellerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    seller?: UserOrderByWithRelationInput
    claims?: ClaimOrderByRelationAggregateInput
    savedBy?: SavedItemOrderByRelationAggregateInput
    notifications?: NotificationOrderByRelationAggregateInput
    tradeRequests?: TradeRequestOrderByRelationAggregateInput
    availabilities?: ListingAvailabilityOrderByRelationAggregateInput
  }

  export type ListingWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ListingWhereInput | ListingWhereInput[]
    OR?: ListingWhereInput[]
    NOT?: ListingWhereInput | ListingWhereInput[]
    status?: StringFilter<"Listing"> | string
    title?: StringFilter<"Listing"> | string
    category?: StringFilter<"Listing"> | string
    college?: StringFilter<"Listing"> | string
    campus?: StringFilter<"Listing"> | string
    condition?: StringFilter<"Listing"> | string
    description?: StringFilter<"Listing"> | string
    type?: StringFilter<"Listing"> | string
    price?: FloatFilter<"Listing"> | number
    images?: StringNullableListFilter<"Listing">
    preferredLocation?: StringNullableFilter<"Listing"> | string | null
    sellerId?: IntFilter<"Listing"> | number
    createdAt?: DateTimeFilter<"Listing"> | Date | string
    updatedAt?: DateTimeFilter<"Listing"> | Date | string
    seller?: XOR<UserScalarRelationFilter, UserWhereInput>
    claims?: ClaimListRelationFilter
    savedBy?: SavedItemListRelationFilter
    notifications?: NotificationListRelationFilter
    tradeRequests?: TradeRequestListRelationFilter
    availabilities?: ListingAvailabilityListRelationFilter
  }, "id">

  export type ListingOrderByWithAggregationInput = {
    id?: SortOrder
    status?: SortOrder
    title?: SortOrder
    category?: SortOrder
    college?: SortOrder
    campus?: SortOrder
    condition?: SortOrder
    description?: SortOrder
    type?: SortOrder
    price?: SortOrder
    images?: SortOrder
    preferredLocation?: SortOrderInput | SortOrder
    sellerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ListingCountOrderByAggregateInput
    _avg?: ListingAvgOrderByAggregateInput
    _max?: ListingMaxOrderByAggregateInput
    _min?: ListingMinOrderByAggregateInput
    _sum?: ListingSumOrderByAggregateInput
  }

  export type ListingScalarWhereWithAggregatesInput = {
    AND?: ListingScalarWhereWithAggregatesInput | ListingScalarWhereWithAggregatesInput[]
    OR?: ListingScalarWhereWithAggregatesInput[]
    NOT?: ListingScalarWhereWithAggregatesInput | ListingScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Listing"> | number
    status?: StringWithAggregatesFilter<"Listing"> | string
    title?: StringWithAggregatesFilter<"Listing"> | string
    category?: StringWithAggregatesFilter<"Listing"> | string
    college?: StringWithAggregatesFilter<"Listing"> | string
    campus?: StringWithAggregatesFilter<"Listing"> | string
    condition?: StringWithAggregatesFilter<"Listing"> | string
    description?: StringWithAggregatesFilter<"Listing"> | string
    type?: StringWithAggregatesFilter<"Listing"> | string
    price?: FloatWithAggregatesFilter<"Listing"> | number
    images?: StringNullableListFilter<"Listing">
    preferredLocation?: StringNullableWithAggregatesFilter<"Listing"> | string | null
    sellerId?: IntWithAggregatesFilter<"Listing"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Listing"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Listing"> | Date | string
  }

  export type ClaimWhereInput = {
    AND?: ClaimWhereInput | ClaimWhereInput[]
    OR?: ClaimWhereInput[]
    NOT?: ClaimWhereInput | ClaimWhereInput[]
    id?: IntFilter<"Claim"> | number
    listingId?: IntFilter<"Claim"> | number
    claimantId?: IntFilter<"Claim"> | number
    status?: StringFilter<"Claim"> | string
    notes?: StringNullableFilter<"Claim"> | string | null
    claimDate?: DateTimeFilter<"Claim"> | Date | string
    createdAt?: DateTimeFilter<"Claim"> | Date | string
    updatedAt?: DateTimeFilter<"Claim"> | Date | string
    listing?: XOR<ListingScalarRelationFilter, ListingWhereInput>
    claimant?: XOR<UserScalarRelationFilter, UserWhereInput>
    notifications?: NotificationListRelationFilter
  }

  export type ClaimOrderByWithRelationInput = {
    id?: SortOrder
    listingId?: SortOrder
    claimantId?: SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    claimDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    listing?: ListingOrderByWithRelationInput
    claimant?: UserOrderByWithRelationInput
    notifications?: NotificationOrderByRelationAggregateInput
  }

  export type ClaimWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ClaimWhereInput | ClaimWhereInput[]
    OR?: ClaimWhereInput[]
    NOT?: ClaimWhereInput | ClaimWhereInput[]
    listingId?: IntFilter<"Claim"> | number
    claimantId?: IntFilter<"Claim"> | number
    status?: StringFilter<"Claim"> | string
    notes?: StringNullableFilter<"Claim"> | string | null
    claimDate?: DateTimeFilter<"Claim"> | Date | string
    createdAt?: DateTimeFilter<"Claim"> | Date | string
    updatedAt?: DateTimeFilter<"Claim"> | Date | string
    listing?: XOR<ListingScalarRelationFilter, ListingWhereInput>
    claimant?: XOR<UserScalarRelationFilter, UserWhereInput>
    notifications?: NotificationListRelationFilter
  }, "id">

  export type ClaimOrderByWithAggregationInput = {
    id?: SortOrder
    listingId?: SortOrder
    claimantId?: SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    claimDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ClaimCountOrderByAggregateInput
    _avg?: ClaimAvgOrderByAggregateInput
    _max?: ClaimMaxOrderByAggregateInput
    _min?: ClaimMinOrderByAggregateInput
    _sum?: ClaimSumOrderByAggregateInput
  }

  export type ClaimScalarWhereWithAggregatesInput = {
    AND?: ClaimScalarWhereWithAggregatesInput | ClaimScalarWhereWithAggregatesInput[]
    OR?: ClaimScalarWhereWithAggregatesInput[]
    NOT?: ClaimScalarWhereWithAggregatesInput | ClaimScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Claim"> | number
    listingId?: IntWithAggregatesFilter<"Claim"> | number
    claimantId?: IntWithAggregatesFilter<"Claim"> | number
    status?: StringWithAggregatesFilter<"Claim"> | string
    notes?: StringNullableWithAggregatesFilter<"Claim"> | string | null
    claimDate?: DateTimeWithAggregatesFilter<"Claim"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Claim"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Claim"> | Date | string
  }

  export type SavedItemWhereInput = {
    AND?: SavedItemWhereInput | SavedItemWhereInput[]
    OR?: SavedItemWhereInput[]
    NOT?: SavedItemWhereInput | SavedItemWhereInput[]
    id?: IntFilter<"SavedItem"> | number
    userId?: IntFilter<"SavedItem"> | number
    listingId?: IntFilter<"SavedItem"> | number
    createdAt?: DateTimeFilter<"SavedItem"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    listing?: XOR<ListingScalarRelationFilter, ListingWhereInput>
  }

  export type SavedItemOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    listingId?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    listing?: ListingOrderByWithRelationInput
  }

  export type SavedItemWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId_listingId?: SavedItemUserIdListingIdCompoundUniqueInput
    AND?: SavedItemWhereInput | SavedItemWhereInput[]
    OR?: SavedItemWhereInput[]
    NOT?: SavedItemWhereInput | SavedItemWhereInput[]
    userId?: IntFilter<"SavedItem"> | number
    listingId?: IntFilter<"SavedItem"> | number
    createdAt?: DateTimeFilter<"SavedItem"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    listing?: XOR<ListingScalarRelationFilter, ListingWhereInput>
  }, "id" | "userId_listingId">

  export type SavedItemOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    listingId?: SortOrder
    createdAt?: SortOrder
    _count?: SavedItemCountOrderByAggregateInput
    _avg?: SavedItemAvgOrderByAggregateInput
    _max?: SavedItemMaxOrderByAggregateInput
    _min?: SavedItemMinOrderByAggregateInput
    _sum?: SavedItemSumOrderByAggregateInput
  }

  export type SavedItemScalarWhereWithAggregatesInput = {
    AND?: SavedItemScalarWhereWithAggregatesInput | SavedItemScalarWhereWithAggregatesInput[]
    OR?: SavedItemScalarWhereWithAggregatesInput[]
    NOT?: SavedItemScalarWhereWithAggregatesInput | SavedItemScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SavedItem"> | number
    userId?: IntWithAggregatesFilter<"SavedItem"> | number
    listingId?: IntWithAggregatesFilter<"SavedItem"> | number
    createdAt?: DateTimeWithAggregatesFilter<"SavedItem"> | Date | string
  }

  export type ListingAvailabilityWhereInput = {
    AND?: ListingAvailabilityWhereInput | ListingAvailabilityWhereInput[]
    OR?: ListingAvailabilityWhereInput[]
    NOT?: ListingAvailabilityWhereInput | ListingAvailabilityWhereInput[]
    id?: IntFilter<"ListingAvailability"> | number
    listingId?: IntFilter<"ListingAvailability"> | number
    dayOfWeek?: IntFilter<"ListingAvailability"> | number
    startTime?: StringFilter<"ListingAvailability"> | string
    endTime?: StringFilter<"ListingAvailability"> | string
    createdAt?: DateTimeFilter<"ListingAvailability"> | Date | string
    listing?: XOR<ListingScalarRelationFilter, ListingWhereInput>
  }

  export type ListingAvailabilityOrderByWithRelationInput = {
    id?: SortOrder
    listingId?: SortOrder
    dayOfWeek?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    createdAt?: SortOrder
    listing?: ListingOrderByWithRelationInput
  }

  export type ListingAvailabilityWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ListingAvailabilityWhereInput | ListingAvailabilityWhereInput[]
    OR?: ListingAvailabilityWhereInput[]
    NOT?: ListingAvailabilityWhereInput | ListingAvailabilityWhereInput[]
    listingId?: IntFilter<"ListingAvailability"> | number
    dayOfWeek?: IntFilter<"ListingAvailability"> | number
    startTime?: StringFilter<"ListingAvailability"> | string
    endTime?: StringFilter<"ListingAvailability"> | string
    createdAt?: DateTimeFilter<"ListingAvailability"> | Date | string
    listing?: XOR<ListingScalarRelationFilter, ListingWhereInput>
  }, "id">

  export type ListingAvailabilityOrderByWithAggregationInput = {
    id?: SortOrder
    listingId?: SortOrder
    dayOfWeek?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    createdAt?: SortOrder
    _count?: ListingAvailabilityCountOrderByAggregateInput
    _avg?: ListingAvailabilityAvgOrderByAggregateInput
    _max?: ListingAvailabilityMaxOrderByAggregateInput
    _min?: ListingAvailabilityMinOrderByAggregateInput
    _sum?: ListingAvailabilitySumOrderByAggregateInput
  }

  export type ListingAvailabilityScalarWhereWithAggregatesInput = {
    AND?: ListingAvailabilityScalarWhereWithAggregatesInput | ListingAvailabilityScalarWhereWithAggregatesInput[]
    OR?: ListingAvailabilityScalarWhereWithAggregatesInput[]
    NOT?: ListingAvailabilityScalarWhereWithAggregatesInput | ListingAvailabilityScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ListingAvailability"> | number
    listingId?: IntWithAggregatesFilter<"ListingAvailability"> | number
    dayOfWeek?: IntWithAggregatesFilter<"ListingAvailability"> | number
    startTime?: StringWithAggregatesFilter<"ListingAvailability"> | string
    endTime?: StringWithAggregatesFilter<"ListingAvailability"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ListingAvailability"> | Date | string
  }

  export type TradeRequestWhereInput = {
    AND?: TradeRequestWhereInput | TradeRequestWhereInput[]
    OR?: TradeRequestWhereInput[]
    NOT?: TradeRequestWhereInput | TradeRequestWhereInput[]
    id?: IntFilter<"TradeRequest"> | number
    listingId?: IntFilter<"TradeRequest"> | number
    buyerId?: IntFilter<"TradeRequest"> | number
    sellerId?: IntFilter<"TradeRequest"> | number
    meetupLocation?: StringFilter<"TradeRequest"> | string
    meetupDate?: StringFilter<"TradeRequest"> | string
    meetupTime?: StringFilter<"TradeRequest"> | string
    notes?: StringNullableFilter<"TradeRequest"> | string | null
    status?: StringFilter<"TradeRequest"> | string
    proposedBy?: StringFilter<"TradeRequest"> | string
    declineReason?: StringNullableFilter<"TradeRequest"> | string | null
    customTime?: BoolFilter<"TradeRequest"> | boolean
    expiresAt?: DateTimeNullableFilter<"TradeRequest"> | Date | string | null
    respondedAt?: DateTimeNullableFilter<"TradeRequest"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"TradeRequest"> | Date | string | null
    createdAt?: DateTimeFilter<"TradeRequest"> | Date | string
    updatedAt?: DateTimeFilter<"TradeRequest"> | Date | string
    listing?: XOR<ListingScalarRelationFilter, ListingWhereInput>
    buyer?: XOR<UserScalarRelationFilter, UserWhereInput>
    seller?: XOR<UserScalarRelationFilter, UserWhereInput>
    events?: TradeRequestEventListRelationFilter
    notifications?: NotificationListRelationFilter
  }

  export type TradeRequestOrderByWithRelationInput = {
    id?: SortOrder
    listingId?: SortOrder
    buyerId?: SortOrder
    sellerId?: SortOrder
    meetupLocation?: SortOrder
    meetupDate?: SortOrder
    meetupTime?: SortOrder
    notes?: SortOrderInput | SortOrder
    status?: SortOrder
    proposedBy?: SortOrder
    declineReason?: SortOrderInput | SortOrder
    customTime?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    respondedAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    listing?: ListingOrderByWithRelationInput
    buyer?: UserOrderByWithRelationInput
    seller?: UserOrderByWithRelationInput
    events?: TradeRequestEventOrderByRelationAggregateInput
    notifications?: NotificationOrderByRelationAggregateInput
  }

  export type TradeRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TradeRequestWhereInput | TradeRequestWhereInput[]
    OR?: TradeRequestWhereInput[]
    NOT?: TradeRequestWhereInput | TradeRequestWhereInput[]
    listingId?: IntFilter<"TradeRequest"> | number
    buyerId?: IntFilter<"TradeRequest"> | number
    sellerId?: IntFilter<"TradeRequest"> | number
    meetupLocation?: StringFilter<"TradeRequest"> | string
    meetupDate?: StringFilter<"TradeRequest"> | string
    meetupTime?: StringFilter<"TradeRequest"> | string
    notes?: StringNullableFilter<"TradeRequest"> | string | null
    status?: StringFilter<"TradeRequest"> | string
    proposedBy?: StringFilter<"TradeRequest"> | string
    declineReason?: StringNullableFilter<"TradeRequest"> | string | null
    customTime?: BoolFilter<"TradeRequest"> | boolean
    expiresAt?: DateTimeNullableFilter<"TradeRequest"> | Date | string | null
    respondedAt?: DateTimeNullableFilter<"TradeRequest"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"TradeRequest"> | Date | string | null
    createdAt?: DateTimeFilter<"TradeRequest"> | Date | string
    updatedAt?: DateTimeFilter<"TradeRequest"> | Date | string
    listing?: XOR<ListingScalarRelationFilter, ListingWhereInput>
    buyer?: XOR<UserScalarRelationFilter, UserWhereInput>
    seller?: XOR<UserScalarRelationFilter, UserWhereInput>
    events?: TradeRequestEventListRelationFilter
    notifications?: NotificationListRelationFilter
  }, "id">

  export type TradeRequestOrderByWithAggregationInput = {
    id?: SortOrder
    listingId?: SortOrder
    buyerId?: SortOrder
    sellerId?: SortOrder
    meetupLocation?: SortOrder
    meetupDate?: SortOrder
    meetupTime?: SortOrder
    notes?: SortOrderInput | SortOrder
    status?: SortOrder
    proposedBy?: SortOrder
    declineReason?: SortOrderInput | SortOrder
    customTime?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    respondedAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TradeRequestCountOrderByAggregateInput
    _avg?: TradeRequestAvgOrderByAggregateInput
    _max?: TradeRequestMaxOrderByAggregateInput
    _min?: TradeRequestMinOrderByAggregateInput
    _sum?: TradeRequestSumOrderByAggregateInput
  }

  export type TradeRequestScalarWhereWithAggregatesInput = {
    AND?: TradeRequestScalarWhereWithAggregatesInput | TradeRequestScalarWhereWithAggregatesInput[]
    OR?: TradeRequestScalarWhereWithAggregatesInput[]
    NOT?: TradeRequestScalarWhereWithAggregatesInput | TradeRequestScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TradeRequest"> | number
    listingId?: IntWithAggregatesFilter<"TradeRequest"> | number
    buyerId?: IntWithAggregatesFilter<"TradeRequest"> | number
    sellerId?: IntWithAggregatesFilter<"TradeRequest"> | number
    meetupLocation?: StringWithAggregatesFilter<"TradeRequest"> | string
    meetupDate?: StringWithAggregatesFilter<"TradeRequest"> | string
    meetupTime?: StringWithAggregatesFilter<"TradeRequest"> | string
    notes?: StringNullableWithAggregatesFilter<"TradeRequest"> | string | null
    status?: StringWithAggregatesFilter<"TradeRequest"> | string
    proposedBy?: StringWithAggregatesFilter<"TradeRequest"> | string
    declineReason?: StringNullableWithAggregatesFilter<"TradeRequest"> | string | null
    customTime?: BoolWithAggregatesFilter<"TradeRequest"> | boolean
    expiresAt?: DateTimeNullableWithAggregatesFilter<"TradeRequest"> | Date | string | null
    respondedAt?: DateTimeNullableWithAggregatesFilter<"TradeRequest"> | Date | string | null
    completedAt?: DateTimeNullableWithAggregatesFilter<"TradeRequest"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"TradeRequest"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TradeRequest"> | Date | string
  }

  export type TradeRequestEventWhereInput = {
    AND?: TradeRequestEventWhereInput | TradeRequestEventWhereInput[]
    OR?: TradeRequestEventWhereInput[]
    NOT?: TradeRequestEventWhereInput | TradeRequestEventWhereInput[]
    id?: IntFilter<"TradeRequestEvent"> | number
    requestId?: IntFilter<"TradeRequestEvent"> | number
    actorId?: IntFilter<"TradeRequestEvent"> | number
    action?: StringFilter<"TradeRequestEvent"> | string
    snapshotLocation?: StringNullableFilter<"TradeRequestEvent"> | string | null
    snapshotDate?: StringNullableFilter<"TradeRequestEvent"> | string | null
    snapshotTime?: StringNullableFilter<"TradeRequestEvent"> | string | null
    notes?: StringNullableFilter<"TradeRequestEvent"> | string | null
    createdAt?: DateTimeFilter<"TradeRequestEvent"> | Date | string
    request?: XOR<TradeRequestScalarRelationFilter, TradeRequestWhereInput>
    actor?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type TradeRequestEventOrderByWithRelationInput = {
    id?: SortOrder
    requestId?: SortOrder
    actorId?: SortOrder
    action?: SortOrder
    snapshotLocation?: SortOrderInput | SortOrder
    snapshotDate?: SortOrderInput | SortOrder
    snapshotTime?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    request?: TradeRequestOrderByWithRelationInput
    actor?: UserOrderByWithRelationInput
  }

  export type TradeRequestEventWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TradeRequestEventWhereInput | TradeRequestEventWhereInput[]
    OR?: TradeRequestEventWhereInput[]
    NOT?: TradeRequestEventWhereInput | TradeRequestEventWhereInput[]
    requestId?: IntFilter<"TradeRequestEvent"> | number
    actorId?: IntFilter<"TradeRequestEvent"> | number
    action?: StringFilter<"TradeRequestEvent"> | string
    snapshotLocation?: StringNullableFilter<"TradeRequestEvent"> | string | null
    snapshotDate?: StringNullableFilter<"TradeRequestEvent"> | string | null
    snapshotTime?: StringNullableFilter<"TradeRequestEvent"> | string | null
    notes?: StringNullableFilter<"TradeRequestEvent"> | string | null
    createdAt?: DateTimeFilter<"TradeRequestEvent"> | Date | string
    request?: XOR<TradeRequestScalarRelationFilter, TradeRequestWhereInput>
    actor?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type TradeRequestEventOrderByWithAggregationInput = {
    id?: SortOrder
    requestId?: SortOrder
    actorId?: SortOrder
    action?: SortOrder
    snapshotLocation?: SortOrderInput | SortOrder
    snapshotDate?: SortOrderInput | SortOrder
    snapshotTime?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: TradeRequestEventCountOrderByAggregateInput
    _avg?: TradeRequestEventAvgOrderByAggregateInput
    _max?: TradeRequestEventMaxOrderByAggregateInput
    _min?: TradeRequestEventMinOrderByAggregateInput
    _sum?: TradeRequestEventSumOrderByAggregateInput
  }

  export type TradeRequestEventScalarWhereWithAggregatesInput = {
    AND?: TradeRequestEventScalarWhereWithAggregatesInput | TradeRequestEventScalarWhereWithAggregatesInput[]
    OR?: TradeRequestEventScalarWhereWithAggregatesInput[]
    NOT?: TradeRequestEventScalarWhereWithAggregatesInput | TradeRequestEventScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TradeRequestEvent"> | number
    requestId?: IntWithAggregatesFilter<"TradeRequestEvent"> | number
    actorId?: IntWithAggregatesFilter<"TradeRequestEvent"> | number
    action?: StringWithAggregatesFilter<"TradeRequestEvent"> | string
    snapshotLocation?: StringNullableWithAggregatesFilter<"TradeRequestEvent"> | string | null
    snapshotDate?: StringNullableWithAggregatesFilter<"TradeRequestEvent"> | string | null
    snapshotTime?: StringNullableWithAggregatesFilter<"TradeRequestEvent"> | string | null
    notes?: StringNullableWithAggregatesFilter<"TradeRequestEvent"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"TradeRequestEvent"> | Date | string
  }

  export type NotificationWhereInput = {
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    id?: IntFilter<"Notification"> | number
    userId?: IntFilter<"Notification"> | number
    actorId?: IntNullableFilter<"Notification"> | number | null
    type?: StringFilter<"Notification"> | string
    title?: StringNullableFilter<"Notification"> | string | null
    message?: StringFilter<"Notification"> | string
    relatedRequestId?: IntNullableFilter<"Notification"> | number | null
    relatedItemId?: IntNullableFilter<"Notification"> | number | null
    listingId?: IntNullableFilter<"Notification"> | number | null
    claimId?: IntNullableFilter<"Notification"> | number | null
    isRead?: BoolFilter<"Notification"> | boolean
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    actor?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    relatedRequest?: XOR<TradeRequestNullableScalarRelationFilter, TradeRequestWhereInput> | null
    listing?: XOR<ListingNullableScalarRelationFilter, ListingWhereInput> | null
    claim?: XOR<ClaimNullableScalarRelationFilter, ClaimWhereInput> | null
  }

  export type NotificationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    actorId?: SortOrderInput | SortOrder
    type?: SortOrder
    title?: SortOrderInput | SortOrder
    message?: SortOrder
    relatedRequestId?: SortOrderInput | SortOrder
    relatedItemId?: SortOrderInput | SortOrder
    listingId?: SortOrderInput | SortOrder
    claimId?: SortOrderInput | SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    actor?: UserOrderByWithRelationInput
    relatedRequest?: TradeRequestOrderByWithRelationInput
    listing?: ListingOrderByWithRelationInput
    claim?: ClaimOrderByWithRelationInput
  }

  export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    userId?: IntFilter<"Notification"> | number
    actorId?: IntNullableFilter<"Notification"> | number | null
    type?: StringFilter<"Notification"> | string
    title?: StringNullableFilter<"Notification"> | string | null
    message?: StringFilter<"Notification"> | string
    relatedRequestId?: IntNullableFilter<"Notification"> | number | null
    relatedItemId?: IntNullableFilter<"Notification"> | number | null
    listingId?: IntNullableFilter<"Notification"> | number | null
    claimId?: IntNullableFilter<"Notification"> | number | null
    isRead?: BoolFilter<"Notification"> | boolean
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    actor?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    relatedRequest?: XOR<TradeRequestNullableScalarRelationFilter, TradeRequestWhereInput> | null
    listing?: XOR<ListingNullableScalarRelationFilter, ListingWhereInput> | null
    claim?: XOR<ClaimNullableScalarRelationFilter, ClaimWhereInput> | null
  }, "id">

  export type NotificationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    actorId?: SortOrderInput | SortOrder
    type?: SortOrder
    title?: SortOrderInput | SortOrder
    message?: SortOrder
    relatedRequestId?: SortOrderInput | SortOrder
    relatedItemId?: SortOrderInput | SortOrder
    listingId?: SortOrderInput | SortOrder
    claimId?: SortOrderInput | SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _avg?: NotificationAvgOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
    _sum?: NotificationSumOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    OR?: NotificationScalarWhereWithAggregatesInput[]
    NOT?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Notification"> | number
    userId?: IntWithAggregatesFilter<"Notification"> | number
    actorId?: IntNullableWithAggregatesFilter<"Notification"> | number | null
    type?: StringWithAggregatesFilter<"Notification"> | string
    title?: StringNullableWithAggregatesFilter<"Notification"> | string | null
    message?: StringWithAggregatesFilter<"Notification"> | string
    relatedRequestId?: IntNullableWithAggregatesFilter<"Notification"> | number | null
    relatedItemId?: IntNullableWithAggregatesFilter<"Notification"> | number | null
    listingId?: IntNullableWithAggregatesFilter<"Notification"> | number | null
    claimId?: IntNullableWithAggregatesFilter<"Notification"> | number | null
    isRead?: BoolWithAggregatesFilter<"Notification"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
  }

  export type UserCreateInput = {
    supabaseId: string
    email: string
    name: string
    role?: string | null
    profileCompleted?: boolean
    studentId?: string | null
    course?: string | null
    year?: string | null
    employeeId?: string | null
    position?: string | null
    office?: string | null
    college?: string | null
    campus?: string
    phone?: string | null
    bio?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    listings?: ListingCreateNestedManyWithoutSellerInput
    claims?: ClaimCreateNestedManyWithoutClaimantInput
    savedItems?: SavedItemCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    actedNotifications?: NotificationCreateNestedManyWithoutActorInput
    buyerRequests?: TradeRequestCreateNestedManyWithoutBuyerInput
    sellerRequests?: TradeRequestCreateNestedManyWithoutSellerInput
    tradeEvents?: TradeRequestEventCreateNestedManyWithoutActorInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    supabaseId: string
    email: string
    name: string
    role?: string | null
    profileCompleted?: boolean
    studentId?: string | null
    course?: string | null
    year?: string | null
    employeeId?: string | null
    position?: string | null
    office?: string | null
    college?: string | null
    campus?: string
    phone?: string | null
    bio?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    listings?: ListingUncheckedCreateNestedManyWithoutSellerInput
    claims?: ClaimUncheckedCreateNestedManyWithoutClaimantInput
    savedItems?: SavedItemUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    actedNotifications?: NotificationUncheckedCreateNestedManyWithoutActorInput
    buyerRequests?: TradeRequestUncheckedCreateNestedManyWithoutBuyerInput
    sellerRequests?: TradeRequestUncheckedCreateNestedManyWithoutSellerInput
    tradeEvents?: TradeRequestEventUncheckedCreateNestedManyWithoutActorInput
  }

  export type UserUpdateInput = {
    supabaseId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    profileCompleted?: BoolFieldUpdateOperationsInput | boolean
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    course?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableStringFieldUpdateOperationsInput | string | null
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    office?: NullableStringFieldUpdateOperationsInput | string | null
    college?: NullableStringFieldUpdateOperationsInput | string | null
    campus?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listings?: ListingUpdateManyWithoutSellerNestedInput
    claims?: ClaimUpdateManyWithoutClaimantNestedInput
    savedItems?: SavedItemUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    actedNotifications?: NotificationUpdateManyWithoutActorNestedInput
    buyerRequests?: TradeRequestUpdateManyWithoutBuyerNestedInput
    sellerRequests?: TradeRequestUpdateManyWithoutSellerNestedInput
    tradeEvents?: TradeRequestEventUpdateManyWithoutActorNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    supabaseId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    profileCompleted?: BoolFieldUpdateOperationsInput | boolean
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    course?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableStringFieldUpdateOperationsInput | string | null
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    office?: NullableStringFieldUpdateOperationsInput | string | null
    college?: NullableStringFieldUpdateOperationsInput | string | null
    campus?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listings?: ListingUncheckedUpdateManyWithoutSellerNestedInput
    claims?: ClaimUncheckedUpdateManyWithoutClaimantNestedInput
    savedItems?: SavedItemUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    actedNotifications?: NotificationUncheckedUpdateManyWithoutActorNestedInput
    buyerRequests?: TradeRequestUncheckedUpdateManyWithoutBuyerNestedInput
    sellerRequests?: TradeRequestUncheckedUpdateManyWithoutSellerNestedInput
    tradeEvents?: TradeRequestEventUncheckedUpdateManyWithoutActorNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    supabaseId: string
    email: string
    name: string
    role?: string | null
    profileCompleted?: boolean
    studentId?: string | null
    course?: string | null
    year?: string | null
    employeeId?: string | null
    position?: string | null
    office?: string | null
    college?: string | null
    campus?: string
    phone?: string | null
    bio?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    supabaseId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    profileCompleted?: BoolFieldUpdateOperationsInput | boolean
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    course?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableStringFieldUpdateOperationsInput | string | null
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    office?: NullableStringFieldUpdateOperationsInput | string | null
    college?: NullableStringFieldUpdateOperationsInput | string | null
    campus?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    supabaseId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    profileCompleted?: BoolFieldUpdateOperationsInput | boolean
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    course?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableStringFieldUpdateOperationsInput | string | null
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    office?: NullableStringFieldUpdateOperationsInput | string | null
    college?: NullableStringFieldUpdateOperationsInput | string | null
    campus?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListingCreateInput = {
    status?: string
    title: string
    category: string
    college: string
    campus?: string
    condition: string
    description: string
    type?: string
    price?: number
    images?: ListingCreateimagesInput | string[]
    preferredLocation?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    seller: UserCreateNestedOneWithoutListingsInput
    claims?: ClaimCreateNestedManyWithoutListingInput
    savedBy?: SavedItemCreateNestedManyWithoutListingInput
    notifications?: NotificationCreateNestedManyWithoutListingInput
    tradeRequests?: TradeRequestCreateNestedManyWithoutListingInput
    availabilities?: ListingAvailabilityCreateNestedManyWithoutListingInput
  }

  export type ListingUncheckedCreateInput = {
    id?: number
    status?: string
    title: string
    category: string
    college: string
    campus?: string
    condition: string
    description: string
    type?: string
    price?: number
    images?: ListingCreateimagesInput | string[]
    preferredLocation?: string | null
    sellerId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    claims?: ClaimUncheckedCreateNestedManyWithoutListingInput
    savedBy?: SavedItemUncheckedCreateNestedManyWithoutListingInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutListingInput
    tradeRequests?: TradeRequestUncheckedCreateNestedManyWithoutListingInput
    availabilities?: ListingAvailabilityUncheckedCreateNestedManyWithoutListingInput
  }

  export type ListingUpdateInput = {
    status?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    college?: StringFieldUpdateOperationsInput | string
    campus?: StringFieldUpdateOperationsInput | string
    condition?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    images?: ListingUpdateimagesInput | string[]
    preferredLocation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    seller?: UserUpdateOneRequiredWithoutListingsNestedInput
    claims?: ClaimUpdateManyWithoutListingNestedInput
    savedBy?: SavedItemUpdateManyWithoutListingNestedInput
    notifications?: NotificationUpdateManyWithoutListingNestedInput
    tradeRequests?: TradeRequestUpdateManyWithoutListingNestedInput
    availabilities?: ListingAvailabilityUpdateManyWithoutListingNestedInput
  }

  export type ListingUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    college?: StringFieldUpdateOperationsInput | string
    campus?: StringFieldUpdateOperationsInput | string
    condition?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    images?: ListingUpdateimagesInput | string[]
    preferredLocation?: NullableStringFieldUpdateOperationsInput | string | null
    sellerId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    claims?: ClaimUncheckedUpdateManyWithoutListingNestedInput
    savedBy?: SavedItemUncheckedUpdateManyWithoutListingNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutListingNestedInput
    tradeRequests?: TradeRequestUncheckedUpdateManyWithoutListingNestedInput
    availabilities?: ListingAvailabilityUncheckedUpdateManyWithoutListingNestedInput
  }

  export type ListingCreateManyInput = {
    id?: number
    status?: string
    title: string
    category: string
    college: string
    campus?: string
    condition: string
    description: string
    type?: string
    price?: number
    images?: ListingCreateimagesInput | string[]
    preferredLocation?: string | null
    sellerId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ListingUpdateManyMutationInput = {
    status?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    college?: StringFieldUpdateOperationsInput | string
    campus?: StringFieldUpdateOperationsInput | string
    condition?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    images?: ListingUpdateimagesInput | string[]
    preferredLocation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListingUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    college?: StringFieldUpdateOperationsInput | string
    campus?: StringFieldUpdateOperationsInput | string
    condition?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    images?: ListingUpdateimagesInput | string[]
    preferredLocation?: NullableStringFieldUpdateOperationsInput | string | null
    sellerId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClaimCreateInput = {
    status?: string
    notes?: string | null
    claimDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    listing: ListingCreateNestedOneWithoutClaimsInput
    claimant: UserCreateNestedOneWithoutClaimsInput
    notifications?: NotificationCreateNestedManyWithoutClaimInput
  }

  export type ClaimUncheckedCreateInput = {
    id?: number
    listingId: number
    claimantId: number
    status?: string
    notes?: string | null
    claimDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    notifications?: NotificationUncheckedCreateNestedManyWithoutClaimInput
  }

  export type ClaimUpdateInput = {
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    claimDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listing?: ListingUpdateOneRequiredWithoutClaimsNestedInput
    claimant?: UserUpdateOneRequiredWithoutClaimsNestedInput
    notifications?: NotificationUpdateManyWithoutClaimNestedInput
  }

  export type ClaimUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    listingId?: IntFieldUpdateOperationsInput | number
    claimantId?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    claimDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notifications?: NotificationUncheckedUpdateManyWithoutClaimNestedInput
  }

  export type ClaimCreateManyInput = {
    id?: number
    listingId: number
    claimantId: number
    status?: string
    notes?: string | null
    claimDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClaimUpdateManyMutationInput = {
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    claimDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClaimUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    listingId?: IntFieldUpdateOperationsInput | number
    claimantId?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    claimDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SavedItemCreateInput = {
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutSavedItemsInput
    listing: ListingCreateNestedOneWithoutSavedByInput
  }

  export type SavedItemUncheckedCreateInput = {
    id?: number
    userId: number
    listingId: number
    createdAt?: Date | string
  }

  export type SavedItemUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSavedItemsNestedInput
    listing?: ListingUpdateOneRequiredWithoutSavedByNestedInput
  }

  export type SavedItemUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    listingId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SavedItemCreateManyInput = {
    id?: number
    userId: number
    listingId: number
    createdAt?: Date | string
  }

  export type SavedItemUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SavedItemUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    listingId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListingAvailabilityCreateInput = {
    dayOfWeek: number
    startTime: string
    endTime: string
    createdAt?: Date | string
    listing: ListingCreateNestedOneWithoutAvailabilitiesInput
  }

  export type ListingAvailabilityUncheckedCreateInput = {
    id?: number
    listingId: number
    dayOfWeek: number
    startTime: string
    endTime: string
    createdAt?: Date | string
  }

  export type ListingAvailabilityUpdateInput = {
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listing?: ListingUpdateOneRequiredWithoutAvailabilitiesNestedInput
  }

  export type ListingAvailabilityUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    listingId?: IntFieldUpdateOperationsInput | number
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListingAvailabilityCreateManyInput = {
    id?: number
    listingId: number
    dayOfWeek: number
    startTime: string
    endTime: string
    createdAt?: Date | string
  }

  export type ListingAvailabilityUpdateManyMutationInput = {
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListingAvailabilityUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    listingId?: IntFieldUpdateOperationsInput | number
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeRequestCreateInput = {
    meetupLocation: string
    meetupDate: string
    meetupTime: string
    notes?: string | null
    status?: string
    proposedBy?: string
    declineReason?: string | null
    customTime?: boolean
    expiresAt?: Date | string | null
    respondedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    listing: ListingCreateNestedOneWithoutTradeRequestsInput
    buyer: UserCreateNestedOneWithoutBuyerRequestsInput
    seller: UserCreateNestedOneWithoutSellerRequestsInput
    events?: TradeRequestEventCreateNestedManyWithoutRequestInput
    notifications?: NotificationCreateNestedManyWithoutRelatedRequestInput
  }

  export type TradeRequestUncheckedCreateInput = {
    id?: number
    listingId: number
    buyerId: number
    sellerId: number
    meetupLocation: string
    meetupDate: string
    meetupTime: string
    notes?: string | null
    status?: string
    proposedBy?: string
    declineReason?: string | null
    customTime?: boolean
    expiresAt?: Date | string | null
    respondedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: TradeRequestEventUncheckedCreateNestedManyWithoutRequestInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutRelatedRequestInput
  }

  export type TradeRequestUpdateInput = {
    meetupLocation?: StringFieldUpdateOperationsInput | string
    meetupDate?: StringFieldUpdateOperationsInput | string
    meetupTime?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    proposedBy?: StringFieldUpdateOperationsInput | string
    declineReason?: NullableStringFieldUpdateOperationsInput | string | null
    customTime?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listing?: ListingUpdateOneRequiredWithoutTradeRequestsNestedInput
    buyer?: UserUpdateOneRequiredWithoutBuyerRequestsNestedInput
    seller?: UserUpdateOneRequiredWithoutSellerRequestsNestedInput
    events?: TradeRequestEventUpdateManyWithoutRequestNestedInput
    notifications?: NotificationUpdateManyWithoutRelatedRequestNestedInput
  }

  export type TradeRequestUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    listingId?: IntFieldUpdateOperationsInput | number
    buyerId?: IntFieldUpdateOperationsInput | number
    sellerId?: IntFieldUpdateOperationsInput | number
    meetupLocation?: StringFieldUpdateOperationsInput | string
    meetupDate?: StringFieldUpdateOperationsInput | string
    meetupTime?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    proposedBy?: StringFieldUpdateOperationsInput | string
    declineReason?: NullableStringFieldUpdateOperationsInput | string | null
    customTime?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: TradeRequestEventUncheckedUpdateManyWithoutRequestNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutRelatedRequestNestedInput
  }

  export type TradeRequestCreateManyInput = {
    id?: number
    listingId: number
    buyerId: number
    sellerId: number
    meetupLocation: string
    meetupDate: string
    meetupTime: string
    notes?: string | null
    status?: string
    proposedBy?: string
    declineReason?: string | null
    customTime?: boolean
    expiresAt?: Date | string | null
    respondedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TradeRequestUpdateManyMutationInput = {
    meetupLocation?: StringFieldUpdateOperationsInput | string
    meetupDate?: StringFieldUpdateOperationsInput | string
    meetupTime?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    proposedBy?: StringFieldUpdateOperationsInput | string
    declineReason?: NullableStringFieldUpdateOperationsInput | string | null
    customTime?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeRequestUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    listingId?: IntFieldUpdateOperationsInput | number
    buyerId?: IntFieldUpdateOperationsInput | number
    sellerId?: IntFieldUpdateOperationsInput | number
    meetupLocation?: StringFieldUpdateOperationsInput | string
    meetupDate?: StringFieldUpdateOperationsInput | string
    meetupTime?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    proposedBy?: StringFieldUpdateOperationsInput | string
    declineReason?: NullableStringFieldUpdateOperationsInput | string | null
    customTime?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeRequestEventCreateInput = {
    action: string
    snapshotLocation?: string | null
    snapshotDate?: string | null
    snapshotTime?: string | null
    notes?: string | null
    createdAt?: Date | string
    request: TradeRequestCreateNestedOneWithoutEventsInput
    actor: UserCreateNestedOneWithoutTradeEventsInput
  }

  export type TradeRequestEventUncheckedCreateInput = {
    id?: number
    requestId: number
    actorId: number
    action: string
    snapshotLocation?: string | null
    snapshotDate?: string | null
    snapshotTime?: string | null
    notes?: string | null
    createdAt?: Date | string
  }

  export type TradeRequestEventUpdateInput = {
    action?: StringFieldUpdateOperationsInput | string
    snapshotLocation?: NullableStringFieldUpdateOperationsInput | string | null
    snapshotDate?: NullableStringFieldUpdateOperationsInput | string | null
    snapshotTime?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    request?: TradeRequestUpdateOneRequiredWithoutEventsNestedInput
    actor?: UserUpdateOneRequiredWithoutTradeEventsNestedInput
  }

  export type TradeRequestEventUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    requestId?: IntFieldUpdateOperationsInput | number
    actorId?: IntFieldUpdateOperationsInput | number
    action?: StringFieldUpdateOperationsInput | string
    snapshotLocation?: NullableStringFieldUpdateOperationsInput | string | null
    snapshotDate?: NullableStringFieldUpdateOperationsInput | string | null
    snapshotTime?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeRequestEventCreateManyInput = {
    id?: number
    requestId: number
    actorId: number
    action: string
    snapshotLocation?: string | null
    snapshotDate?: string | null
    snapshotTime?: string | null
    notes?: string | null
    createdAt?: Date | string
  }

  export type TradeRequestEventUpdateManyMutationInput = {
    action?: StringFieldUpdateOperationsInput | string
    snapshotLocation?: NullableStringFieldUpdateOperationsInput | string | null
    snapshotDate?: NullableStringFieldUpdateOperationsInput | string | null
    snapshotTime?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeRequestEventUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    requestId?: IntFieldUpdateOperationsInput | number
    actorId?: IntFieldUpdateOperationsInput | number
    action?: StringFieldUpdateOperationsInput | string
    snapshotLocation?: NullableStringFieldUpdateOperationsInput | string | null
    snapshotDate?: NullableStringFieldUpdateOperationsInput | string | null
    snapshotTime?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateInput = {
    type: string
    title?: string | null
    message: string
    relatedItemId?: number | null
    isRead?: boolean
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutNotificationsInput
    actor?: UserCreateNestedOneWithoutActedNotificationsInput
    relatedRequest?: TradeRequestCreateNestedOneWithoutNotificationsInput
    listing?: ListingCreateNestedOneWithoutNotificationsInput
    claim?: ClaimCreateNestedOneWithoutNotificationsInput
  }

  export type NotificationUncheckedCreateInput = {
    id?: number
    userId: number
    actorId?: number | null
    type: string
    title?: string | null
    message: string
    relatedRequestId?: number | null
    relatedItemId?: number | null
    listingId?: number | null
    claimId?: number | null
    isRead?: boolean
    createdAt?: Date | string
  }

  export type NotificationUpdateInput = {
    type?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    relatedItemId?: NullableIntFieldUpdateOperationsInput | number | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutNotificationsNestedInput
    actor?: UserUpdateOneWithoutActedNotificationsNestedInput
    relatedRequest?: TradeRequestUpdateOneWithoutNotificationsNestedInput
    listing?: ListingUpdateOneWithoutNotificationsNestedInput
    claim?: ClaimUpdateOneWithoutNotificationsNestedInput
  }

  export type NotificationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    actorId?: NullableIntFieldUpdateOperationsInput | number | null
    type?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    relatedRequestId?: NullableIntFieldUpdateOperationsInput | number | null
    relatedItemId?: NullableIntFieldUpdateOperationsInput | number | null
    listingId?: NullableIntFieldUpdateOperationsInput | number | null
    claimId?: NullableIntFieldUpdateOperationsInput | number | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateManyInput = {
    id?: number
    userId: number
    actorId?: number | null
    type: string
    title?: string | null
    message: string
    relatedRequestId?: number | null
    relatedItemId?: number | null
    listingId?: number | null
    claimId?: number | null
    isRead?: boolean
    createdAt?: Date | string
  }

  export type NotificationUpdateManyMutationInput = {
    type?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    relatedItemId?: NullableIntFieldUpdateOperationsInput | number | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    actorId?: NullableIntFieldUpdateOperationsInput | number | null
    type?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    relatedRequestId?: NullableIntFieldUpdateOperationsInput | number | null
    relatedItemId?: NullableIntFieldUpdateOperationsInput | number | null
    listingId?: NullableIntFieldUpdateOperationsInput | number | null
    claimId?: NullableIntFieldUpdateOperationsInput | number | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ListingListRelationFilter = {
    every?: ListingWhereInput
    some?: ListingWhereInput
    none?: ListingWhereInput
  }

  export type ClaimListRelationFilter = {
    every?: ClaimWhereInput
    some?: ClaimWhereInput
    none?: ClaimWhereInput
  }

  export type SavedItemListRelationFilter = {
    every?: SavedItemWhereInput
    some?: SavedItemWhereInput
    none?: SavedItemWhereInput
  }

  export type NotificationListRelationFilter = {
    every?: NotificationWhereInput
    some?: NotificationWhereInput
    none?: NotificationWhereInput
  }

  export type TradeRequestListRelationFilter = {
    every?: TradeRequestWhereInput
    some?: TradeRequestWhereInput
    none?: TradeRequestWhereInput
  }

  export type TradeRequestEventListRelationFilter = {
    every?: TradeRequestEventWhereInput
    some?: TradeRequestEventWhereInput
    none?: TradeRequestEventWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ListingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClaimOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SavedItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NotificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TradeRequestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TradeRequestEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    supabaseId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    profileCompleted?: SortOrder
    studentId?: SortOrder
    course?: SortOrder
    year?: SortOrder
    employeeId?: SortOrder
    position?: SortOrder
    office?: SortOrder
    college?: SortOrder
    campus?: SortOrder
    phone?: SortOrder
    bio?: SortOrder
    avatar?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    supabaseId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    profileCompleted?: SortOrder
    studentId?: SortOrder
    course?: SortOrder
    year?: SortOrder
    employeeId?: SortOrder
    position?: SortOrder
    office?: SortOrder
    college?: SortOrder
    campus?: SortOrder
    phone?: SortOrder
    bio?: SortOrder
    avatar?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    supabaseId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    profileCompleted?: SortOrder
    studentId?: SortOrder
    course?: SortOrder
    year?: SortOrder
    employeeId?: SortOrder
    position?: SortOrder
    office?: SortOrder
    college?: SortOrder
    campus?: SortOrder
    phone?: SortOrder
    bio?: SortOrder
    avatar?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ListingAvailabilityListRelationFilter = {
    every?: ListingAvailabilityWhereInput
    some?: ListingAvailabilityWhereInput
    none?: ListingAvailabilityWhereInput
  }

  export type ListingAvailabilityOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ListingCountOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    title?: SortOrder
    category?: SortOrder
    college?: SortOrder
    campus?: SortOrder
    condition?: SortOrder
    description?: SortOrder
    type?: SortOrder
    price?: SortOrder
    images?: SortOrder
    preferredLocation?: SortOrder
    sellerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ListingAvgOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
    sellerId?: SortOrder
  }

  export type ListingMaxOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    title?: SortOrder
    category?: SortOrder
    college?: SortOrder
    campus?: SortOrder
    condition?: SortOrder
    description?: SortOrder
    type?: SortOrder
    price?: SortOrder
    preferredLocation?: SortOrder
    sellerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ListingMinOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    title?: SortOrder
    category?: SortOrder
    college?: SortOrder
    campus?: SortOrder
    condition?: SortOrder
    description?: SortOrder
    type?: SortOrder
    price?: SortOrder
    preferredLocation?: SortOrder
    sellerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ListingSumOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
    sellerId?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type ListingScalarRelationFilter = {
    is?: ListingWhereInput
    isNot?: ListingWhereInput
  }

  export type ClaimCountOrderByAggregateInput = {
    id?: SortOrder
    listingId?: SortOrder
    claimantId?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    claimDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClaimAvgOrderByAggregateInput = {
    id?: SortOrder
    listingId?: SortOrder
    claimantId?: SortOrder
  }

  export type ClaimMaxOrderByAggregateInput = {
    id?: SortOrder
    listingId?: SortOrder
    claimantId?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    claimDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClaimMinOrderByAggregateInput = {
    id?: SortOrder
    listingId?: SortOrder
    claimantId?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    claimDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClaimSumOrderByAggregateInput = {
    id?: SortOrder
    listingId?: SortOrder
    claimantId?: SortOrder
  }

  export type SavedItemUserIdListingIdCompoundUniqueInput = {
    userId: number
    listingId: number
  }

  export type SavedItemCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    listingId?: SortOrder
    createdAt?: SortOrder
  }

  export type SavedItemAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    listingId?: SortOrder
  }

  export type SavedItemMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    listingId?: SortOrder
    createdAt?: SortOrder
  }

  export type SavedItemMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    listingId?: SortOrder
    createdAt?: SortOrder
  }

  export type SavedItemSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    listingId?: SortOrder
  }

  export type ListingAvailabilityCountOrderByAggregateInput = {
    id?: SortOrder
    listingId?: SortOrder
    dayOfWeek?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    createdAt?: SortOrder
  }

  export type ListingAvailabilityAvgOrderByAggregateInput = {
    id?: SortOrder
    listingId?: SortOrder
    dayOfWeek?: SortOrder
  }

  export type ListingAvailabilityMaxOrderByAggregateInput = {
    id?: SortOrder
    listingId?: SortOrder
    dayOfWeek?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    createdAt?: SortOrder
  }

  export type ListingAvailabilityMinOrderByAggregateInput = {
    id?: SortOrder
    listingId?: SortOrder
    dayOfWeek?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    createdAt?: SortOrder
  }

  export type ListingAvailabilitySumOrderByAggregateInput = {
    id?: SortOrder
    listingId?: SortOrder
    dayOfWeek?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type TradeRequestCountOrderByAggregateInput = {
    id?: SortOrder
    listingId?: SortOrder
    buyerId?: SortOrder
    sellerId?: SortOrder
    meetupLocation?: SortOrder
    meetupDate?: SortOrder
    meetupTime?: SortOrder
    notes?: SortOrder
    status?: SortOrder
    proposedBy?: SortOrder
    declineReason?: SortOrder
    customTime?: SortOrder
    expiresAt?: SortOrder
    respondedAt?: SortOrder
    completedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TradeRequestAvgOrderByAggregateInput = {
    id?: SortOrder
    listingId?: SortOrder
    buyerId?: SortOrder
    sellerId?: SortOrder
  }

  export type TradeRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    listingId?: SortOrder
    buyerId?: SortOrder
    sellerId?: SortOrder
    meetupLocation?: SortOrder
    meetupDate?: SortOrder
    meetupTime?: SortOrder
    notes?: SortOrder
    status?: SortOrder
    proposedBy?: SortOrder
    declineReason?: SortOrder
    customTime?: SortOrder
    expiresAt?: SortOrder
    respondedAt?: SortOrder
    completedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TradeRequestMinOrderByAggregateInput = {
    id?: SortOrder
    listingId?: SortOrder
    buyerId?: SortOrder
    sellerId?: SortOrder
    meetupLocation?: SortOrder
    meetupDate?: SortOrder
    meetupTime?: SortOrder
    notes?: SortOrder
    status?: SortOrder
    proposedBy?: SortOrder
    declineReason?: SortOrder
    customTime?: SortOrder
    expiresAt?: SortOrder
    respondedAt?: SortOrder
    completedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TradeRequestSumOrderByAggregateInput = {
    id?: SortOrder
    listingId?: SortOrder
    buyerId?: SortOrder
    sellerId?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type TradeRequestScalarRelationFilter = {
    is?: TradeRequestWhereInput
    isNot?: TradeRequestWhereInput
  }

  export type TradeRequestEventCountOrderByAggregateInput = {
    id?: SortOrder
    requestId?: SortOrder
    actorId?: SortOrder
    action?: SortOrder
    snapshotLocation?: SortOrder
    snapshotDate?: SortOrder
    snapshotTime?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
  }

  export type TradeRequestEventAvgOrderByAggregateInput = {
    id?: SortOrder
    requestId?: SortOrder
    actorId?: SortOrder
  }

  export type TradeRequestEventMaxOrderByAggregateInput = {
    id?: SortOrder
    requestId?: SortOrder
    actorId?: SortOrder
    action?: SortOrder
    snapshotLocation?: SortOrder
    snapshotDate?: SortOrder
    snapshotTime?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
  }

  export type TradeRequestEventMinOrderByAggregateInput = {
    id?: SortOrder
    requestId?: SortOrder
    actorId?: SortOrder
    action?: SortOrder
    snapshotLocation?: SortOrder
    snapshotDate?: SortOrder
    snapshotTime?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
  }

  export type TradeRequestEventSumOrderByAggregateInput = {
    id?: SortOrder
    requestId?: SortOrder
    actorId?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type TradeRequestNullableScalarRelationFilter = {
    is?: TradeRequestWhereInput | null
    isNot?: TradeRequestWhereInput | null
  }

  export type ListingNullableScalarRelationFilter = {
    is?: ListingWhereInput | null
    isNot?: ListingWhereInput | null
  }

  export type ClaimNullableScalarRelationFilter = {
    is?: ClaimWhereInput | null
    isNot?: ClaimWhereInput | null
  }

  export type NotificationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    actorId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    message?: SortOrder
    relatedRequestId?: SortOrder
    relatedItemId?: SortOrder
    listingId?: SortOrder
    claimId?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    actorId?: SortOrder
    relatedRequestId?: SortOrder
    relatedItemId?: SortOrder
    listingId?: SortOrder
    claimId?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    actorId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    message?: SortOrder
    relatedRequestId?: SortOrder
    relatedItemId?: SortOrder
    listingId?: SortOrder
    claimId?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    actorId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    message?: SortOrder
    relatedRequestId?: SortOrder
    relatedItemId?: SortOrder
    listingId?: SortOrder
    claimId?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    actorId?: SortOrder
    relatedRequestId?: SortOrder
    relatedItemId?: SortOrder
    listingId?: SortOrder
    claimId?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type ListingCreateNestedManyWithoutSellerInput = {
    create?: XOR<ListingCreateWithoutSellerInput, ListingUncheckedCreateWithoutSellerInput> | ListingCreateWithoutSellerInput[] | ListingUncheckedCreateWithoutSellerInput[]
    connectOrCreate?: ListingCreateOrConnectWithoutSellerInput | ListingCreateOrConnectWithoutSellerInput[]
    createMany?: ListingCreateManySellerInputEnvelope
    connect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
  }

  export type ClaimCreateNestedManyWithoutClaimantInput = {
    create?: XOR<ClaimCreateWithoutClaimantInput, ClaimUncheckedCreateWithoutClaimantInput> | ClaimCreateWithoutClaimantInput[] | ClaimUncheckedCreateWithoutClaimantInput[]
    connectOrCreate?: ClaimCreateOrConnectWithoutClaimantInput | ClaimCreateOrConnectWithoutClaimantInput[]
    createMany?: ClaimCreateManyClaimantInputEnvelope
    connect?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
  }

  export type SavedItemCreateNestedManyWithoutUserInput = {
    create?: XOR<SavedItemCreateWithoutUserInput, SavedItemUncheckedCreateWithoutUserInput> | SavedItemCreateWithoutUserInput[] | SavedItemUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SavedItemCreateOrConnectWithoutUserInput | SavedItemCreateOrConnectWithoutUserInput[]
    createMany?: SavedItemCreateManyUserInputEnvelope
    connect?: SavedItemWhereUniqueInput | SavedItemWhereUniqueInput[]
  }

  export type NotificationCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type NotificationCreateNestedManyWithoutActorInput = {
    create?: XOR<NotificationCreateWithoutActorInput, NotificationUncheckedCreateWithoutActorInput> | NotificationCreateWithoutActorInput[] | NotificationUncheckedCreateWithoutActorInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutActorInput | NotificationCreateOrConnectWithoutActorInput[]
    createMany?: NotificationCreateManyActorInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type TradeRequestCreateNestedManyWithoutBuyerInput = {
    create?: XOR<TradeRequestCreateWithoutBuyerInput, TradeRequestUncheckedCreateWithoutBuyerInput> | TradeRequestCreateWithoutBuyerInput[] | TradeRequestUncheckedCreateWithoutBuyerInput[]
    connectOrCreate?: TradeRequestCreateOrConnectWithoutBuyerInput | TradeRequestCreateOrConnectWithoutBuyerInput[]
    createMany?: TradeRequestCreateManyBuyerInputEnvelope
    connect?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
  }

  export type TradeRequestCreateNestedManyWithoutSellerInput = {
    create?: XOR<TradeRequestCreateWithoutSellerInput, TradeRequestUncheckedCreateWithoutSellerInput> | TradeRequestCreateWithoutSellerInput[] | TradeRequestUncheckedCreateWithoutSellerInput[]
    connectOrCreate?: TradeRequestCreateOrConnectWithoutSellerInput | TradeRequestCreateOrConnectWithoutSellerInput[]
    createMany?: TradeRequestCreateManySellerInputEnvelope
    connect?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
  }

  export type TradeRequestEventCreateNestedManyWithoutActorInput = {
    create?: XOR<TradeRequestEventCreateWithoutActorInput, TradeRequestEventUncheckedCreateWithoutActorInput> | TradeRequestEventCreateWithoutActorInput[] | TradeRequestEventUncheckedCreateWithoutActorInput[]
    connectOrCreate?: TradeRequestEventCreateOrConnectWithoutActorInput | TradeRequestEventCreateOrConnectWithoutActorInput[]
    createMany?: TradeRequestEventCreateManyActorInputEnvelope
    connect?: TradeRequestEventWhereUniqueInput | TradeRequestEventWhereUniqueInput[]
  }

  export type ListingUncheckedCreateNestedManyWithoutSellerInput = {
    create?: XOR<ListingCreateWithoutSellerInput, ListingUncheckedCreateWithoutSellerInput> | ListingCreateWithoutSellerInput[] | ListingUncheckedCreateWithoutSellerInput[]
    connectOrCreate?: ListingCreateOrConnectWithoutSellerInput | ListingCreateOrConnectWithoutSellerInput[]
    createMany?: ListingCreateManySellerInputEnvelope
    connect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
  }

  export type ClaimUncheckedCreateNestedManyWithoutClaimantInput = {
    create?: XOR<ClaimCreateWithoutClaimantInput, ClaimUncheckedCreateWithoutClaimantInput> | ClaimCreateWithoutClaimantInput[] | ClaimUncheckedCreateWithoutClaimantInput[]
    connectOrCreate?: ClaimCreateOrConnectWithoutClaimantInput | ClaimCreateOrConnectWithoutClaimantInput[]
    createMany?: ClaimCreateManyClaimantInputEnvelope
    connect?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
  }

  export type SavedItemUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SavedItemCreateWithoutUserInput, SavedItemUncheckedCreateWithoutUserInput> | SavedItemCreateWithoutUserInput[] | SavedItemUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SavedItemCreateOrConnectWithoutUserInput | SavedItemCreateOrConnectWithoutUserInput[]
    createMany?: SavedItemCreateManyUserInputEnvelope
    connect?: SavedItemWhereUniqueInput | SavedItemWhereUniqueInput[]
  }

  export type NotificationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type NotificationUncheckedCreateNestedManyWithoutActorInput = {
    create?: XOR<NotificationCreateWithoutActorInput, NotificationUncheckedCreateWithoutActorInput> | NotificationCreateWithoutActorInput[] | NotificationUncheckedCreateWithoutActorInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutActorInput | NotificationCreateOrConnectWithoutActorInput[]
    createMany?: NotificationCreateManyActorInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type TradeRequestUncheckedCreateNestedManyWithoutBuyerInput = {
    create?: XOR<TradeRequestCreateWithoutBuyerInput, TradeRequestUncheckedCreateWithoutBuyerInput> | TradeRequestCreateWithoutBuyerInput[] | TradeRequestUncheckedCreateWithoutBuyerInput[]
    connectOrCreate?: TradeRequestCreateOrConnectWithoutBuyerInput | TradeRequestCreateOrConnectWithoutBuyerInput[]
    createMany?: TradeRequestCreateManyBuyerInputEnvelope
    connect?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
  }

  export type TradeRequestUncheckedCreateNestedManyWithoutSellerInput = {
    create?: XOR<TradeRequestCreateWithoutSellerInput, TradeRequestUncheckedCreateWithoutSellerInput> | TradeRequestCreateWithoutSellerInput[] | TradeRequestUncheckedCreateWithoutSellerInput[]
    connectOrCreate?: TradeRequestCreateOrConnectWithoutSellerInput | TradeRequestCreateOrConnectWithoutSellerInput[]
    createMany?: TradeRequestCreateManySellerInputEnvelope
    connect?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
  }

  export type TradeRequestEventUncheckedCreateNestedManyWithoutActorInput = {
    create?: XOR<TradeRequestEventCreateWithoutActorInput, TradeRequestEventUncheckedCreateWithoutActorInput> | TradeRequestEventCreateWithoutActorInput[] | TradeRequestEventUncheckedCreateWithoutActorInput[]
    connectOrCreate?: TradeRequestEventCreateOrConnectWithoutActorInput | TradeRequestEventCreateOrConnectWithoutActorInput[]
    createMany?: TradeRequestEventCreateManyActorInputEnvelope
    connect?: TradeRequestEventWhereUniqueInput | TradeRequestEventWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ListingUpdateManyWithoutSellerNestedInput = {
    create?: XOR<ListingCreateWithoutSellerInput, ListingUncheckedCreateWithoutSellerInput> | ListingCreateWithoutSellerInput[] | ListingUncheckedCreateWithoutSellerInput[]
    connectOrCreate?: ListingCreateOrConnectWithoutSellerInput | ListingCreateOrConnectWithoutSellerInput[]
    upsert?: ListingUpsertWithWhereUniqueWithoutSellerInput | ListingUpsertWithWhereUniqueWithoutSellerInput[]
    createMany?: ListingCreateManySellerInputEnvelope
    set?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    disconnect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    delete?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    connect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    update?: ListingUpdateWithWhereUniqueWithoutSellerInput | ListingUpdateWithWhereUniqueWithoutSellerInput[]
    updateMany?: ListingUpdateManyWithWhereWithoutSellerInput | ListingUpdateManyWithWhereWithoutSellerInput[]
    deleteMany?: ListingScalarWhereInput | ListingScalarWhereInput[]
  }

  export type ClaimUpdateManyWithoutClaimantNestedInput = {
    create?: XOR<ClaimCreateWithoutClaimantInput, ClaimUncheckedCreateWithoutClaimantInput> | ClaimCreateWithoutClaimantInput[] | ClaimUncheckedCreateWithoutClaimantInput[]
    connectOrCreate?: ClaimCreateOrConnectWithoutClaimantInput | ClaimCreateOrConnectWithoutClaimantInput[]
    upsert?: ClaimUpsertWithWhereUniqueWithoutClaimantInput | ClaimUpsertWithWhereUniqueWithoutClaimantInput[]
    createMany?: ClaimCreateManyClaimantInputEnvelope
    set?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
    disconnect?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
    delete?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
    connect?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
    update?: ClaimUpdateWithWhereUniqueWithoutClaimantInput | ClaimUpdateWithWhereUniqueWithoutClaimantInput[]
    updateMany?: ClaimUpdateManyWithWhereWithoutClaimantInput | ClaimUpdateManyWithWhereWithoutClaimantInput[]
    deleteMany?: ClaimScalarWhereInput | ClaimScalarWhereInput[]
  }

  export type SavedItemUpdateManyWithoutUserNestedInput = {
    create?: XOR<SavedItemCreateWithoutUserInput, SavedItemUncheckedCreateWithoutUserInput> | SavedItemCreateWithoutUserInput[] | SavedItemUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SavedItemCreateOrConnectWithoutUserInput | SavedItemCreateOrConnectWithoutUserInput[]
    upsert?: SavedItemUpsertWithWhereUniqueWithoutUserInput | SavedItemUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SavedItemCreateManyUserInputEnvelope
    set?: SavedItemWhereUniqueInput | SavedItemWhereUniqueInput[]
    disconnect?: SavedItemWhereUniqueInput | SavedItemWhereUniqueInput[]
    delete?: SavedItemWhereUniqueInput | SavedItemWhereUniqueInput[]
    connect?: SavedItemWhereUniqueInput | SavedItemWhereUniqueInput[]
    update?: SavedItemUpdateWithWhereUniqueWithoutUserInput | SavedItemUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SavedItemUpdateManyWithWhereWithoutUserInput | SavedItemUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SavedItemScalarWhereInput | SavedItemScalarWhereInput[]
  }

  export type NotificationUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type NotificationUpdateManyWithoutActorNestedInput = {
    create?: XOR<NotificationCreateWithoutActorInput, NotificationUncheckedCreateWithoutActorInput> | NotificationCreateWithoutActorInput[] | NotificationUncheckedCreateWithoutActorInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutActorInput | NotificationCreateOrConnectWithoutActorInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutActorInput | NotificationUpsertWithWhereUniqueWithoutActorInput[]
    createMany?: NotificationCreateManyActorInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutActorInput | NotificationUpdateWithWhereUniqueWithoutActorInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutActorInput | NotificationUpdateManyWithWhereWithoutActorInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type TradeRequestUpdateManyWithoutBuyerNestedInput = {
    create?: XOR<TradeRequestCreateWithoutBuyerInput, TradeRequestUncheckedCreateWithoutBuyerInput> | TradeRequestCreateWithoutBuyerInput[] | TradeRequestUncheckedCreateWithoutBuyerInput[]
    connectOrCreate?: TradeRequestCreateOrConnectWithoutBuyerInput | TradeRequestCreateOrConnectWithoutBuyerInput[]
    upsert?: TradeRequestUpsertWithWhereUniqueWithoutBuyerInput | TradeRequestUpsertWithWhereUniqueWithoutBuyerInput[]
    createMany?: TradeRequestCreateManyBuyerInputEnvelope
    set?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
    disconnect?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
    delete?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
    connect?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
    update?: TradeRequestUpdateWithWhereUniqueWithoutBuyerInput | TradeRequestUpdateWithWhereUniqueWithoutBuyerInput[]
    updateMany?: TradeRequestUpdateManyWithWhereWithoutBuyerInput | TradeRequestUpdateManyWithWhereWithoutBuyerInput[]
    deleteMany?: TradeRequestScalarWhereInput | TradeRequestScalarWhereInput[]
  }

  export type TradeRequestUpdateManyWithoutSellerNestedInput = {
    create?: XOR<TradeRequestCreateWithoutSellerInput, TradeRequestUncheckedCreateWithoutSellerInput> | TradeRequestCreateWithoutSellerInput[] | TradeRequestUncheckedCreateWithoutSellerInput[]
    connectOrCreate?: TradeRequestCreateOrConnectWithoutSellerInput | TradeRequestCreateOrConnectWithoutSellerInput[]
    upsert?: TradeRequestUpsertWithWhereUniqueWithoutSellerInput | TradeRequestUpsertWithWhereUniqueWithoutSellerInput[]
    createMany?: TradeRequestCreateManySellerInputEnvelope
    set?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
    disconnect?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
    delete?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
    connect?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
    update?: TradeRequestUpdateWithWhereUniqueWithoutSellerInput | TradeRequestUpdateWithWhereUniqueWithoutSellerInput[]
    updateMany?: TradeRequestUpdateManyWithWhereWithoutSellerInput | TradeRequestUpdateManyWithWhereWithoutSellerInput[]
    deleteMany?: TradeRequestScalarWhereInput | TradeRequestScalarWhereInput[]
  }

  export type TradeRequestEventUpdateManyWithoutActorNestedInput = {
    create?: XOR<TradeRequestEventCreateWithoutActorInput, TradeRequestEventUncheckedCreateWithoutActorInput> | TradeRequestEventCreateWithoutActorInput[] | TradeRequestEventUncheckedCreateWithoutActorInput[]
    connectOrCreate?: TradeRequestEventCreateOrConnectWithoutActorInput | TradeRequestEventCreateOrConnectWithoutActorInput[]
    upsert?: TradeRequestEventUpsertWithWhereUniqueWithoutActorInput | TradeRequestEventUpsertWithWhereUniqueWithoutActorInput[]
    createMany?: TradeRequestEventCreateManyActorInputEnvelope
    set?: TradeRequestEventWhereUniqueInput | TradeRequestEventWhereUniqueInput[]
    disconnect?: TradeRequestEventWhereUniqueInput | TradeRequestEventWhereUniqueInput[]
    delete?: TradeRequestEventWhereUniqueInput | TradeRequestEventWhereUniqueInput[]
    connect?: TradeRequestEventWhereUniqueInput | TradeRequestEventWhereUniqueInput[]
    update?: TradeRequestEventUpdateWithWhereUniqueWithoutActorInput | TradeRequestEventUpdateWithWhereUniqueWithoutActorInput[]
    updateMany?: TradeRequestEventUpdateManyWithWhereWithoutActorInput | TradeRequestEventUpdateManyWithWhereWithoutActorInput[]
    deleteMany?: TradeRequestEventScalarWhereInput | TradeRequestEventScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ListingUncheckedUpdateManyWithoutSellerNestedInput = {
    create?: XOR<ListingCreateWithoutSellerInput, ListingUncheckedCreateWithoutSellerInput> | ListingCreateWithoutSellerInput[] | ListingUncheckedCreateWithoutSellerInput[]
    connectOrCreate?: ListingCreateOrConnectWithoutSellerInput | ListingCreateOrConnectWithoutSellerInput[]
    upsert?: ListingUpsertWithWhereUniqueWithoutSellerInput | ListingUpsertWithWhereUniqueWithoutSellerInput[]
    createMany?: ListingCreateManySellerInputEnvelope
    set?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    disconnect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    delete?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    connect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    update?: ListingUpdateWithWhereUniqueWithoutSellerInput | ListingUpdateWithWhereUniqueWithoutSellerInput[]
    updateMany?: ListingUpdateManyWithWhereWithoutSellerInput | ListingUpdateManyWithWhereWithoutSellerInput[]
    deleteMany?: ListingScalarWhereInput | ListingScalarWhereInput[]
  }

  export type ClaimUncheckedUpdateManyWithoutClaimantNestedInput = {
    create?: XOR<ClaimCreateWithoutClaimantInput, ClaimUncheckedCreateWithoutClaimantInput> | ClaimCreateWithoutClaimantInput[] | ClaimUncheckedCreateWithoutClaimantInput[]
    connectOrCreate?: ClaimCreateOrConnectWithoutClaimantInput | ClaimCreateOrConnectWithoutClaimantInput[]
    upsert?: ClaimUpsertWithWhereUniqueWithoutClaimantInput | ClaimUpsertWithWhereUniqueWithoutClaimantInput[]
    createMany?: ClaimCreateManyClaimantInputEnvelope
    set?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
    disconnect?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
    delete?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
    connect?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
    update?: ClaimUpdateWithWhereUniqueWithoutClaimantInput | ClaimUpdateWithWhereUniqueWithoutClaimantInput[]
    updateMany?: ClaimUpdateManyWithWhereWithoutClaimantInput | ClaimUpdateManyWithWhereWithoutClaimantInput[]
    deleteMany?: ClaimScalarWhereInput | ClaimScalarWhereInput[]
  }

  export type SavedItemUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SavedItemCreateWithoutUserInput, SavedItemUncheckedCreateWithoutUserInput> | SavedItemCreateWithoutUserInput[] | SavedItemUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SavedItemCreateOrConnectWithoutUserInput | SavedItemCreateOrConnectWithoutUserInput[]
    upsert?: SavedItemUpsertWithWhereUniqueWithoutUserInput | SavedItemUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SavedItemCreateManyUserInputEnvelope
    set?: SavedItemWhereUniqueInput | SavedItemWhereUniqueInput[]
    disconnect?: SavedItemWhereUniqueInput | SavedItemWhereUniqueInput[]
    delete?: SavedItemWhereUniqueInput | SavedItemWhereUniqueInput[]
    connect?: SavedItemWhereUniqueInput | SavedItemWhereUniqueInput[]
    update?: SavedItemUpdateWithWhereUniqueWithoutUserInput | SavedItemUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SavedItemUpdateManyWithWhereWithoutUserInput | SavedItemUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SavedItemScalarWhereInput | SavedItemScalarWhereInput[]
  }

  export type NotificationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type NotificationUncheckedUpdateManyWithoutActorNestedInput = {
    create?: XOR<NotificationCreateWithoutActorInput, NotificationUncheckedCreateWithoutActorInput> | NotificationCreateWithoutActorInput[] | NotificationUncheckedCreateWithoutActorInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutActorInput | NotificationCreateOrConnectWithoutActorInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutActorInput | NotificationUpsertWithWhereUniqueWithoutActorInput[]
    createMany?: NotificationCreateManyActorInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutActorInput | NotificationUpdateWithWhereUniqueWithoutActorInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutActorInput | NotificationUpdateManyWithWhereWithoutActorInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type TradeRequestUncheckedUpdateManyWithoutBuyerNestedInput = {
    create?: XOR<TradeRequestCreateWithoutBuyerInput, TradeRequestUncheckedCreateWithoutBuyerInput> | TradeRequestCreateWithoutBuyerInput[] | TradeRequestUncheckedCreateWithoutBuyerInput[]
    connectOrCreate?: TradeRequestCreateOrConnectWithoutBuyerInput | TradeRequestCreateOrConnectWithoutBuyerInput[]
    upsert?: TradeRequestUpsertWithWhereUniqueWithoutBuyerInput | TradeRequestUpsertWithWhereUniqueWithoutBuyerInput[]
    createMany?: TradeRequestCreateManyBuyerInputEnvelope
    set?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
    disconnect?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
    delete?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
    connect?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
    update?: TradeRequestUpdateWithWhereUniqueWithoutBuyerInput | TradeRequestUpdateWithWhereUniqueWithoutBuyerInput[]
    updateMany?: TradeRequestUpdateManyWithWhereWithoutBuyerInput | TradeRequestUpdateManyWithWhereWithoutBuyerInput[]
    deleteMany?: TradeRequestScalarWhereInput | TradeRequestScalarWhereInput[]
  }

  export type TradeRequestUncheckedUpdateManyWithoutSellerNestedInput = {
    create?: XOR<TradeRequestCreateWithoutSellerInput, TradeRequestUncheckedCreateWithoutSellerInput> | TradeRequestCreateWithoutSellerInput[] | TradeRequestUncheckedCreateWithoutSellerInput[]
    connectOrCreate?: TradeRequestCreateOrConnectWithoutSellerInput | TradeRequestCreateOrConnectWithoutSellerInput[]
    upsert?: TradeRequestUpsertWithWhereUniqueWithoutSellerInput | TradeRequestUpsertWithWhereUniqueWithoutSellerInput[]
    createMany?: TradeRequestCreateManySellerInputEnvelope
    set?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
    disconnect?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
    delete?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
    connect?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
    update?: TradeRequestUpdateWithWhereUniqueWithoutSellerInput | TradeRequestUpdateWithWhereUniqueWithoutSellerInput[]
    updateMany?: TradeRequestUpdateManyWithWhereWithoutSellerInput | TradeRequestUpdateManyWithWhereWithoutSellerInput[]
    deleteMany?: TradeRequestScalarWhereInput | TradeRequestScalarWhereInput[]
  }

  export type TradeRequestEventUncheckedUpdateManyWithoutActorNestedInput = {
    create?: XOR<TradeRequestEventCreateWithoutActorInput, TradeRequestEventUncheckedCreateWithoutActorInput> | TradeRequestEventCreateWithoutActorInput[] | TradeRequestEventUncheckedCreateWithoutActorInput[]
    connectOrCreate?: TradeRequestEventCreateOrConnectWithoutActorInput | TradeRequestEventCreateOrConnectWithoutActorInput[]
    upsert?: TradeRequestEventUpsertWithWhereUniqueWithoutActorInput | TradeRequestEventUpsertWithWhereUniqueWithoutActorInput[]
    createMany?: TradeRequestEventCreateManyActorInputEnvelope
    set?: TradeRequestEventWhereUniqueInput | TradeRequestEventWhereUniqueInput[]
    disconnect?: TradeRequestEventWhereUniqueInput | TradeRequestEventWhereUniqueInput[]
    delete?: TradeRequestEventWhereUniqueInput | TradeRequestEventWhereUniqueInput[]
    connect?: TradeRequestEventWhereUniqueInput | TradeRequestEventWhereUniqueInput[]
    update?: TradeRequestEventUpdateWithWhereUniqueWithoutActorInput | TradeRequestEventUpdateWithWhereUniqueWithoutActorInput[]
    updateMany?: TradeRequestEventUpdateManyWithWhereWithoutActorInput | TradeRequestEventUpdateManyWithWhereWithoutActorInput[]
    deleteMany?: TradeRequestEventScalarWhereInput | TradeRequestEventScalarWhereInput[]
  }

  export type ListingCreateimagesInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutListingsInput = {
    create?: XOR<UserCreateWithoutListingsInput, UserUncheckedCreateWithoutListingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutListingsInput
    connect?: UserWhereUniqueInput
  }

  export type ClaimCreateNestedManyWithoutListingInput = {
    create?: XOR<ClaimCreateWithoutListingInput, ClaimUncheckedCreateWithoutListingInput> | ClaimCreateWithoutListingInput[] | ClaimUncheckedCreateWithoutListingInput[]
    connectOrCreate?: ClaimCreateOrConnectWithoutListingInput | ClaimCreateOrConnectWithoutListingInput[]
    createMany?: ClaimCreateManyListingInputEnvelope
    connect?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
  }

  export type SavedItemCreateNestedManyWithoutListingInput = {
    create?: XOR<SavedItemCreateWithoutListingInput, SavedItemUncheckedCreateWithoutListingInput> | SavedItemCreateWithoutListingInput[] | SavedItemUncheckedCreateWithoutListingInput[]
    connectOrCreate?: SavedItemCreateOrConnectWithoutListingInput | SavedItemCreateOrConnectWithoutListingInput[]
    createMany?: SavedItemCreateManyListingInputEnvelope
    connect?: SavedItemWhereUniqueInput | SavedItemWhereUniqueInput[]
  }

  export type NotificationCreateNestedManyWithoutListingInput = {
    create?: XOR<NotificationCreateWithoutListingInput, NotificationUncheckedCreateWithoutListingInput> | NotificationCreateWithoutListingInput[] | NotificationUncheckedCreateWithoutListingInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutListingInput | NotificationCreateOrConnectWithoutListingInput[]
    createMany?: NotificationCreateManyListingInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type TradeRequestCreateNestedManyWithoutListingInput = {
    create?: XOR<TradeRequestCreateWithoutListingInput, TradeRequestUncheckedCreateWithoutListingInput> | TradeRequestCreateWithoutListingInput[] | TradeRequestUncheckedCreateWithoutListingInput[]
    connectOrCreate?: TradeRequestCreateOrConnectWithoutListingInput | TradeRequestCreateOrConnectWithoutListingInput[]
    createMany?: TradeRequestCreateManyListingInputEnvelope
    connect?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
  }

  export type ListingAvailabilityCreateNestedManyWithoutListingInput = {
    create?: XOR<ListingAvailabilityCreateWithoutListingInput, ListingAvailabilityUncheckedCreateWithoutListingInput> | ListingAvailabilityCreateWithoutListingInput[] | ListingAvailabilityUncheckedCreateWithoutListingInput[]
    connectOrCreate?: ListingAvailabilityCreateOrConnectWithoutListingInput | ListingAvailabilityCreateOrConnectWithoutListingInput[]
    createMany?: ListingAvailabilityCreateManyListingInputEnvelope
    connect?: ListingAvailabilityWhereUniqueInput | ListingAvailabilityWhereUniqueInput[]
  }

  export type ClaimUncheckedCreateNestedManyWithoutListingInput = {
    create?: XOR<ClaimCreateWithoutListingInput, ClaimUncheckedCreateWithoutListingInput> | ClaimCreateWithoutListingInput[] | ClaimUncheckedCreateWithoutListingInput[]
    connectOrCreate?: ClaimCreateOrConnectWithoutListingInput | ClaimCreateOrConnectWithoutListingInput[]
    createMany?: ClaimCreateManyListingInputEnvelope
    connect?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
  }

  export type SavedItemUncheckedCreateNestedManyWithoutListingInput = {
    create?: XOR<SavedItemCreateWithoutListingInput, SavedItemUncheckedCreateWithoutListingInput> | SavedItemCreateWithoutListingInput[] | SavedItemUncheckedCreateWithoutListingInput[]
    connectOrCreate?: SavedItemCreateOrConnectWithoutListingInput | SavedItemCreateOrConnectWithoutListingInput[]
    createMany?: SavedItemCreateManyListingInputEnvelope
    connect?: SavedItemWhereUniqueInput | SavedItemWhereUniqueInput[]
  }

  export type NotificationUncheckedCreateNestedManyWithoutListingInput = {
    create?: XOR<NotificationCreateWithoutListingInput, NotificationUncheckedCreateWithoutListingInput> | NotificationCreateWithoutListingInput[] | NotificationUncheckedCreateWithoutListingInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutListingInput | NotificationCreateOrConnectWithoutListingInput[]
    createMany?: NotificationCreateManyListingInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type TradeRequestUncheckedCreateNestedManyWithoutListingInput = {
    create?: XOR<TradeRequestCreateWithoutListingInput, TradeRequestUncheckedCreateWithoutListingInput> | TradeRequestCreateWithoutListingInput[] | TradeRequestUncheckedCreateWithoutListingInput[]
    connectOrCreate?: TradeRequestCreateOrConnectWithoutListingInput | TradeRequestCreateOrConnectWithoutListingInput[]
    createMany?: TradeRequestCreateManyListingInputEnvelope
    connect?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
  }

  export type ListingAvailabilityUncheckedCreateNestedManyWithoutListingInput = {
    create?: XOR<ListingAvailabilityCreateWithoutListingInput, ListingAvailabilityUncheckedCreateWithoutListingInput> | ListingAvailabilityCreateWithoutListingInput[] | ListingAvailabilityUncheckedCreateWithoutListingInput[]
    connectOrCreate?: ListingAvailabilityCreateOrConnectWithoutListingInput | ListingAvailabilityCreateOrConnectWithoutListingInput[]
    createMany?: ListingAvailabilityCreateManyListingInputEnvelope
    connect?: ListingAvailabilityWhereUniqueInput | ListingAvailabilityWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ListingUpdateimagesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateOneRequiredWithoutListingsNestedInput = {
    create?: XOR<UserCreateWithoutListingsInput, UserUncheckedCreateWithoutListingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutListingsInput
    upsert?: UserUpsertWithoutListingsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutListingsInput, UserUpdateWithoutListingsInput>, UserUncheckedUpdateWithoutListingsInput>
  }

  export type ClaimUpdateManyWithoutListingNestedInput = {
    create?: XOR<ClaimCreateWithoutListingInput, ClaimUncheckedCreateWithoutListingInput> | ClaimCreateWithoutListingInput[] | ClaimUncheckedCreateWithoutListingInput[]
    connectOrCreate?: ClaimCreateOrConnectWithoutListingInput | ClaimCreateOrConnectWithoutListingInput[]
    upsert?: ClaimUpsertWithWhereUniqueWithoutListingInput | ClaimUpsertWithWhereUniqueWithoutListingInput[]
    createMany?: ClaimCreateManyListingInputEnvelope
    set?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
    disconnect?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
    delete?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
    connect?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
    update?: ClaimUpdateWithWhereUniqueWithoutListingInput | ClaimUpdateWithWhereUniqueWithoutListingInput[]
    updateMany?: ClaimUpdateManyWithWhereWithoutListingInput | ClaimUpdateManyWithWhereWithoutListingInput[]
    deleteMany?: ClaimScalarWhereInput | ClaimScalarWhereInput[]
  }

  export type SavedItemUpdateManyWithoutListingNestedInput = {
    create?: XOR<SavedItemCreateWithoutListingInput, SavedItemUncheckedCreateWithoutListingInput> | SavedItemCreateWithoutListingInput[] | SavedItemUncheckedCreateWithoutListingInput[]
    connectOrCreate?: SavedItemCreateOrConnectWithoutListingInput | SavedItemCreateOrConnectWithoutListingInput[]
    upsert?: SavedItemUpsertWithWhereUniqueWithoutListingInput | SavedItemUpsertWithWhereUniqueWithoutListingInput[]
    createMany?: SavedItemCreateManyListingInputEnvelope
    set?: SavedItemWhereUniqueInput | SavedItemWhereUniqueInput[]
    disconnect?: SavedItemWhereUniqueInput | SavedItemWhereUniqueInput[]
    delete?: SavedItemWhereUniqueInput | SavedItemWhereUniqueInput[]
    connect?: SavedItemWhereUniqueInput | SavedItemWhereUniqueInput[]
    update?: SavedItemUpdateWithWhereUniqueWithoutListingInput | SavedItemUpdateWithWhereUniqueWithoutListingInput[]
    updateMany?: SavedItemUpdateManyWithWhereWithoutListingInput | SavedItemUpdateManyWithWhereWithoutListingInput[]
    deleteMany?: SavedItemScalarWhereInput | SavedItemScalarWhereInput[]
  }

  export type NotificationUpdateManyWithoutListingNestedInput = {
    create?: XOR<NotificationCreateWithoutListingInput, NotificationUncheckedCreateWithoutListingInput> | NotificationCreateWithoutListingInput[] | NotificationUncheckedCreateWithoutListingInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutListingInput | NotificationCreateOrConnectWithoutListingInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutListingInput | NotificationUpsertWithWhereUniqueWithoutListingInput[]
    createMany?: NotificationCreateManyListingInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutListingInput | NotificationUpdateWithWhereUniqueWithoutListingInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutListingInput | NotificationUpdateManyWithWhereWithoutListingInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type TradeRequestUpdateManyWithoutListingNestedInput = {
    create?: XOR<TradeRequestCreateWithoutListingInput, TradeRequestUncheckedCreateWithoutListingInput> | TradeRequestCreateWithoutListingInput[] | TradeRequestUncheckedCreateWithoutListingInput[]
    connectOrCreate?: TradeRequestCreateOrConnectWithoutListingInput | TradeRequestCreateOrConnectWithoutListingInput[]
    upsert?: TradeRequestUpsertWithWhereUniqueWithoutListingInput | TradeRequestUpsertWithWhereUniqueWithoutListingInput[]
    createMany?: TradeRequestCreateManyListingInputEnvelope
    set?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
    disconnect?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
    delete?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
    connect?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
    update?: TradeRequestUpdateWithWhereUniqueWithoutListingInput | TradeRequestUpdateWithWhereUniqueWithoutListingInput[]
    updateMany?: TradeRequestUpdateManyWithWhereWithoutListingInput | TradeRequestUpdateManyWithWhereWithoutListingInput[]
    deleteMany?: TradeRequestScalarWhereInput | TradeRequestScalarWhereInput[]
  }

  export type ListingAvailabilityUpdateManyWithoutListingNestedInput = {
    create?: XOR<ListingAvailabilityCreateWithoutListingInput, ListingAvailabilityUncheckedCreateWithoutListingInput> | ListingAvailabilityCreateWithoutListingInput[] | ListingAvailabilityUncheckedCreateWithoutListingInput[]
    connectOrCreate?: ListingAvailabilityCreateOrConnectWithoutListingInput | ListingAvailabilityCreateOrConnectWithoutListingInput[]
    upsert?: ListingAvailabilityUpsertWithWhereUniqueWithoutListingInput | ListingAvailabilityUpsertWithWhereUniqueWithoutListingInput[]
    createMany?: ListingAvailabilityCreateManyListingInputEnvelope
    set?: ListingAvailabilityWhereUniqueInput | ListingAvailabilityWhereUniqueInput[]
    disconnect?: ListingAvailabilityWhereUniqueInput | ListingAvailabilityWhereUniqueInput[]
    delete?: ListingAvailabilityWhereUniqueInput | ListingAvailabilityWhereUniqueInput[]
    connect?: ListingAvailabilityWhereUniqueInput | ListingAvailabilityWhereUniqueInput[]
    update?: ListingAvailabilityUpdateWithWhereUniqueWithoutListingInput | ListingAvailabilityUpdateWithWhereUniqueWithoutListingInput[]
    updateMany?: ListingAvailabilityUpdateManyWithWhereWithoutListingInput | ListingAvailabilityUpdateManyWithWhereWithoutListingInput[]
    deleteMany?: ListingAvailabilityScalarWhereInput | ListingAvailabilityScalarWhereInput[]
  }

  export type ClaimUncheckedUpdateManyWithoutListingNestedInput = {
    create?: XOR<ClaimCreateWithoutListingInput, ClaimUncheckedCreateWithoutListingInput> | ClaimCreateWithoutListingInput[] | ClaimUncheckedCreateWithoutListingInput[]
    connectOrCreate?: ClaimCreateOrConnectWithoutListingInput | ClaimCreateOrConnectWithoutListingInput[]
    upsert?: ClaimUpsertWithWhereUniqueWithoutListingInput | ClaimUpsertWithWhereUniqueWithoutListingInput[]
    createMany?: ClaimCreateManyListingInputEnvelope
    set?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
    disconnect?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
    delete?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
    connect?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
    update?: ClaimUpdateWithWhereUniqueWithoutListingInput | ClaimUpdateWithWhereUniqueWithoutListingInput[]
    updateMany?: ClaimUpdateManyWithWhereWithoutListingInput | ClaimUpdateManyWithWhereWithoutListingInput[]
    deleteMany?: ClaimScalarWhereInput | ClaimScalarWhereInput[]
  }

  export type SavedItemUncheckedUpdateManyWithoutListingNestedInput = {
    create?: XOR<SavedItemCreateWithoutListingInput, SavedItemUncheckedCreateWithoutListingInput> | SavedItemCreateWithoutListingInput[] | SavedItemUncheckedCreateWithoutListingInput[]
    connectOrCreate?: SavedItemCreateOrConnectWithoutListingInput | SavedItemCreateOrConnectWithoutListingInput[]
    upsert?: SavedItemUpsertWithWhereUniqueWithoutListingInput | SavedItemUpsertWithWhereUniqueWithoutListingInput[]
    createMany?: SavedItemCreateManyListingInputEnvelope
    set?: SavedItemWhereUniqueInput | SavedItemWhereUniqueInput[]
    disconnect?: SavedItemWhereUniqueInput | SavedItemWhereUniqueInput[]
    delete?: SavedItemWhereUniqueInput | SavedItemWhereUniqueInput[]
    connect?: SavedItemWhereUniqueInput | SavedItemWhereUniqueInput[]
    update?: SavedItemUpdateWithWhereUniqueWithoutListingInput | SavedItemUpdateWithWhereUniqueWithoutListingInput[]
    updateMany?: SavedItemUpdateManyWithWhereWithoutListingInput | SavedItemUpdateManyWithWhereWithoutListingInput[]
    deleteMany?: SavedItemScalarWhereInput | SavedItemScalarWhereInput[]
  }

  export type NotificationUncheckedUpdateManyWithoutListingNestedInput = {
    create?: XOR<NotificationCreateWithoutListingInput, NotificationUncheckedCreateWithoutListingInput> | NotificationCreateWithoutListingInput[] | NotificationUncheckedCreateWithoutListingInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutListingInput | NotificationCreateOrConnectWithoutListingInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutListingInput | NotificationUpsertWithWhereUniqueWithoutListingInput[]
    createMany?: NotificationCreateManyListingInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutListingInput | NotificationUpdateWithWhereUniqueWithoutListingInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutListingInput | NotificationUpdateManyWithWhereWithoutListingInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type TradeRequestUncheckedUpdateManyWithoutListingNestedInput = {
    create?: XOR<TradeRequestCreateWithoutListingInput, TradeRequestUncheckedCreateWithoutListingInput> | TradeRequestCreateWithoutListingInput[] | TradeRequestUncheckedCreateWithoutListingInput[]
    connectOrCreate?: TradeRequestCreateOrConnectWithoutListingInput | TradeRequestCreateOrConnectWithoutListingInput[]
    upsert?: TradeRequestUpsertWithWhereUniqueWithoutListingInput | TradeRequestUpsertWithWhereUniqueWithoutListingInput[]
    createMany?: TradeRequestCreateManyListingInputEnvelope
    set?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
    disconnect?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
    delete?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
    connect?: TradeRequestWhereUniqueInput | TradeRequestWhereUniqueInput[]
    update?: TradeRequestUpdateWithWhereUniqueWithoutListingInput | TradeRequestUpdateWithWhereUniqueWithoutListingInput[]
    updateMany?: TradeRequestUpdateManyWithWhereWithoutListingInput | TradeRequestUpdateManyWithWhereWithoutListingInput[]
    deleteMany?: TradeRequestScalarWhereInput | TradeRequestScalarWhereInput[]
  }

  export type ListingAvailabilityUncheckedUpdateManyWithoutListingNestedInput = {
    create?: XOR<ListingAvailabilityCreateWithoutListingInput, ListingAvailabilityUncheckedCreateWithoutListingInput> | ListingAvailabilityCreateWithoutListingInput[] | ListingAvailabilityUncheckedCreateWithoutListingInput[]
    connectOrCreate?: ListingAvailabilityCreateOrConnectWithoutListingInput | ListingAvailabilityCreateOrConnectWithoutListingInput[]
    upsert?: ListingAvailabilityUpsertWithWhereUniqueWithoutListingInput | ListingAvailabilityUpsertWithWhereUniqueWithoutListingInput[]
    createMany?: ListingAvailabilityCreateManyListingInputEnvelope
    set?: ListingAvailabilityWhereUniqueInput | ListingAvailabilityWhereUniqueInput[]
    disconnect?: ListingAvailabilityWhereUniqueInput | ListingAvailabilityWhereUniqueInput[]
    delete?: ListingAvailabilityWhereUniqueInput | ListingAvailabilityWhereUniqueInput[]
    connect?: ListingAvailabilityWhereUniqueInput | ListingAvailabilityWhereUniqueInput[]
    update?: ListingAvailabilityUpdateWithWhereUniqueWithoutListingInput | ListingAvailabilityUpdateWithWhereUniqueWithoutListingInput[]
    updateMany?: ListingAvailabilityUpdateManyWithWhereWithoutListingInput | ListingAvailabilityUpdateManyWithWhereWithoutListingInput[]
    deleteMany?: ListingAvailabilityScalarWhereInput | ListingAvailabilityScalarWhereInput[]
  }

  export type ListingCreateNestedOneWithoutClaimsInput = {
    create?: XOR<ListingCreateWithoutClaimsInput, ListingUncheckedCreateWithoutClaimsInput>
    connectOrCreate?: ListingCreateOrConnectWithoutClaimsInput
    connect?: ListingWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutClaimsInput = {
    create?: XOR<UserCreateWithoutClaimsInput, UserUncheckedCreateWithoutClaimsInput>
    connectOrCreate?: UserCreateOrConnectWithoutClaimsInput
    connect?: UserWhereUniqueInput
  }

  export type NotificationCreateNestedManyWithoutClaimInput = {
    create?: XOR<NotificationCreateWithoutClaimInput, NotificationUncheckedCreateWithoutClaimInput> | NotificationCreateWithoutClaimInput[] | NotificationUncheckedCreateWithoutClaimInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutClaimInput | NotificationCreateOrConnectWithoutClaimInput[]
    createMany?: NotificationCreateManyClaimInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type NotificationUncheckedCreateNestedManyWithoutClaimInput = {
    create?: XOR<NotificationCreateWithoutClaimInput, NotificationUncheckedCreateWithoutClaimInput> | NotificationCreateWithoutClaimInput[] | NotificationUncheckedCreateWithoutClaimInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutClaimInput | NotificationCreateOrConnectWithoutClaimInput[]
    createMany?: NotificationCreateManyClaimInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type ListingUpdateOneRequiredWithoutClaimsNestedInput = {
    create?: XOR<ListingCreateWithoutClaimsInput, ListingUncheckedCreateWithoutClaimsInput>
    connectOrCreate?: ListingCreateOrConnectWithoutClaimsInput
    upsert?: ListingUpsertWithoutClaimsInput
    connect?: ListingWhereUniqueInput
    update?: XOR<XOR<ListingUpdateToOneWithWhereWithoutClaimsInput, ListingUpdateWithoutClaimsInput>, ListingUncheckedUpdateWithoutClaimsInput>
  }

  export type UserUpdateOneRequiredWithoutClaimsNestedInput = {
    create?: XOR<UserCreateWithoutClaimsInput, UserUncheckedCreateWithoutClaimsInput>
    connectOrCreate?: UserCreateOrConnectWithoutClaimsInput
    upsert?: UserUpsertWithoutClaimsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutClaimsInput, UserUpdateWithoutClaimsInput>, UserUncheckedUpdateWithoutClaimsInput>
  }

  export type NotificationUpdateManyWithoutClaimNestedInput = {
    create?: XOR<NotificationCreateWithoutClaimInput, NotificationUncheckedCreateWithoutClaimInput> | NotificationCreateWithoutClaimInput[] | NotificationUncheckedCreateWithoutClaimInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutClaimInput | NotificationCreateOrConnectWithoutClaimInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutClaimInput | NotificationUpsertWithWhereUniqueWithoutClaimInput[]
    createMany?: NotificationCreateManyClaimInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutClaimInput | NotificationUpdateWithWhereUniqueWithoutClaimInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutClaimInput | NotificationUpdateManyWithWhereWithoutClaimInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type NotificationUncheckedUpdateManyWithoutClaimNestedInput = {
    create?: XOR<NotificationCreateWithoutClaimInput, NotificationUncheckedCreateWithoutClaimInput> | NotificationCreateWithoutClaimInput[] | NotificationUncheckedCreateWithoutClaimInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutClaimInput | NotificationCreateOrConnectWithoutClaimInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutClaimInput | NotificationUpsertWithWhereUniqueWithoutClaimInput[]
    createMany?: NotificationCreateManyClaimInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutClaimInput | NotificationUpdateWithWhereUniqueWithoutClaimInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutClaimInput | NotificationUpdateManyWithWhereWithoutClaimInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutSavedItemsInput = {
    create?: XOR<UserCreateWithoutSavedItemsInput, UserUncheckedCreateWithoutSavedItemsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSavedItemsInput
    connect?: UserWhereUniqueInput
  }

  export type ListingCreateNestedOneWithoutSavedByInput = {
    create?: XOR<ListingCreateWithoutSavedByInput, ListingUncheckedCreateWithoutSavedByInput>
    connectOrCreate?: ListingCreateOrConnectWithoutSavedByInput
    connect?: ListingWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSavedItemsNestedInput = {
    create?: XOR<UserCreateWithoutSavedItemsInput, UserUncheckedCreateWithoutSavedItemsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSavedItemsInput
    upsert?: UserUpsertWithoutSavedItemsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSavedItemsInput, UserUpdateWithoutSavedItemsInput>, UserUncheckedUpdateWithoutSavedItemsInput>
  }

  export type ListingUpdateOneRequiredWithoutSavedByNestedInput = {
    create?: XOR<ListingCreateWithoutSavedByInput, ListingUncheckedCreateWithoutSavedByInput>
    connectOrCreate?: ListingCreateOrConnectWithoutSavedByInput
    upsert?: ListingUpsertWithoutSavedByInput
    connect?: ListingWhereUniqueInput
    update?: XOR<XOR<ListingUpdateToOneWithWhereWithoutSavedByInput, ListingUpdateWithoutSavedByInput>, ListingUncheckedUpdateWithoutSavedByInput>
  }

  export type ListingCreateNestedOneWithoutAvailabilitiesInput = {
    create?: XOR<ListingCreateWithoutAvailabilitiesInput, ListingUncheckedCreateWithoutAvailabilitiesInput>
    connectOrCreate?: ListingCreateOrConnectWithoutAvailabilitiesInput
    connect?: ListingWhereUniqueInput
  }

  export type ListingUpdateOneRequiredWithoutAvailabilitiesNestedInput = {
    create?: XOR<ListingCreateWithoutAvailabilitiesInput, ListingUncheckedCreateWithoutAvailabilitiesInput>
    connectOrCreate?: ListingCreateOrConnectWithoutAvailabilitiesInput
    upsert?: ListingUpsertWithoutAvailabilitiesInput
    connect?: ListingWhereUniqueInput
    update?: XOR<XOR<ListingUpdateToOneWithWhereWithoutAvailabilitiesInput, ListingUpdateWithoutAvailabilitiesInput>, ListingUncheckedUpdateWithoutAvailabilitiesInput>
  }

  export type ListingCreateNestedOneWithoutTradeRequestsInput = {
    create?: XOR<ListingCreateWithoutTradeRequestsInput, ListingUncheckedCreateWithoutTradeRequestsInput>
    connectOrCreate?: ListingCreateOrConnectWithoutTradeRequestsInput
    connect?: ListingWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutBuyerRequestsInput = {
    create?: XOR<UserCreateWithoutBuyerRequestsInput, UserUncheckedCreateWithoutBuyerRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBuyerRequestsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutSellerRequestsInput = {
    create?: XOR<UserCreateWithoutSellerRequestsInput, UserUncheckedCreateWithoutSellerRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSellerRequestsInput
    connect?: UserWhereUniqueInput
  }

  export type TradeRequestEventCreateNestedManyWithoutRequestInput = {
    create?: XOR<TradeRequestEventCreateWithoutRequestInput, TradeRequestEventUncheckedCreateWithoutRequestInput> | TradeRequestEventCreateWithoutRequestInput[] | TradeRequestEventUncheckedCreateWithoutRequestInput[]
    connectOrCreate?: TradeRequestEventCreateOrConnectWithoutRequestInput | TradeRequestEventCreateOrConnectWithoutRequestInput[]
    createMany?: TradeRequestEventCreateManyRequestInputEnvelope
    connect?: TradeRequestEventWhereUniqueInput | TradeRequestEventWhereUniqueInput[]
  }

  export type NotificationCreateNestedManyWithoutRelatedRequestInput = {
    create?: XOR<NotificationCreateWithoutRelatedRequestInput, NotificationUncheckedCreateWithoutRelatedRequestInput> | NotificationCreateWithoutRelatedRequestInput[] | NotificationUncheckedCreateWithoutRelatedRequestInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutRelatedRequestInput | NotificationCreateOrConnectWithoutRelatedRequestInput[]
    createMany?: NotificationCreateManyRelatedRequestInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type TradeRequestEventUncheckedCreateNestedManyWithoutRequestInput = {
    create?: XOR<TradeRequestEventCreateWithoutRequestInput, TradeRequestEventUncheckedCreateWithoutRequestInput> | TradeRequestEventCreateWithoutRequestInput[] | TradeRequestEventUncheckedCreateWithoutRequestInput[]
    connectOrCreate?: TradeRequestEventCreateOrConnectWithoutRequestInput | TradeRequestEventCreateOrConnectWithoutRequestInput[]
    createMany?: TradeRequestEventCreateManyRequestInputEnvelope
    connect?: TradeRequestEventWhereUniqueInput | TradeRequestEventWhereUniqueInput[]
  }

  export type NotificationUncheckedCreateNestedManyWithoutRelatedRequestInput = {
    create?: XOR<NotificationCreateWithoutRelatedRequestInput, NotificationUncheckedCreateWithoutRelatedRequestInput> | NotificationCreateWithoutRelatedRequestInput[] | NotificationUncheckedCreateWithoutRelatedRequestInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutRelatedRequestInput | NotificationCreateOrConnectWithoutRelatedRequestInput[]
    createMany?: NotificationCreateManyRelatedRequestInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ListingUpdateOneRequiredWithoutTradeRequestsNestedInput = {
    create?: XOR<ListingCreateWithoutTradeRequestsInput, ListingUncheckedCreateWithoutTradeRequestsInput>
    connectOrCreate?: ListingCreateOrConnectWithoutTradeRequestsInput
    upsert?: ListingUpsertWithoutTradeRequestsInput
    connect?: ListingWhereUniqueInput
    update?: XOR<XOR<ListingUpdateToOneWithWhereWithoutTradeRequestsInput, ListingUpdateWithoutTradeRequestsInput>, ListingUncheckedUpdateWithoutTradeRequestsInput>
  }

  export type UserUpdateOneRequiredWithoutBuyerRequestsNestedInput = {
    create?: XOR<UserCreateWithoutBuyerRequestsInput, UserUncheckedCreateWithoutBuyerRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBuyerRequestsInput
    upsert?: UserUpsertWithoutBuyerRequestsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBuyerRequestsInput, UserUpdateWithoutBuyerRequestsInput>, UserUncheckedUpdateWithoutBuyerRequestsInput>
  }

  export type UserUpdateOneRequiredWithoutSellerRequestsNestedInput = {
    create?: XOR<UserCreateWithoutSellerRequestsInput, UserUncheckedCreateWithoutSellerRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSellerRequestsInput
    upsert?: UserUpsertWithoutSellerRequestsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSellerRequestsInput, UserUpdateWithoutSellerRequestsInput>, UserUncheckedUpdateWithoutSellerRequestsInput>
  }

  export type TradeRequestEventUpdateManyWithoutRequestNestedInput = {
    create?: XOR<TradeRequestEventCreateWithoutRequestInput, TradeRequestEventUncheckedCreateWithoutRequestInput> | TradeRequestEventCreateWithoutRequestInput[] | TradeRequestEventUncheckedCreateWithoutRequestInput[]
    connectOrCreate?: TradeRequestEventCreateOrConnectWithoutRequestInput | TradeRequestEventCreateOrConnectWithoutRequestInput[]
    upsert?: TradeRequestEventUpsertWithWhereUniqueWithoutRequestInput | TradeRequestEventUpsertWithWhereUniqueWithoutRequestInput[]
    createMany?: TradeRequestEventCreateManyRequestInputEnvelope
    set?: TradeRequestEventWhereUniqueInput | TradeRequestEventWhereUniqueInput[]
    disconnect?: TradeRequestEventWhereUniqueInput | TradeRequestEventWhereUniqueInput[]
    delete?: TradeRequestEventWhereUniqueInput | TradeRequestEventWhereUniqueInput[]
    connect?: TradeRequestEventWhereUniqueInput | TradeRequestEventWhereUniqueInput[]
    update?: TradeRequestEventUpdateWithWhereUniqueWithoutRequestInput | TradeRequestEventUpdateWithWhereUniqueWithoutRequestInput[]
    updateMany?: TradeRequestEventUpdateManyWithWhereWithoutRequestInput | TradeRequestEventUpdateManyWithWhereWithoutRequestInput[]
    deleteMany?: TradeRequestEventScalarWhereInput | TradeRequestEventScalarWhereInput[]
  }

  export type NotificationUpdateManyWithoutRelatedRequestNestedInput = {
    create?: XOR<NotificationCreateWithoutRelatedRequestInput, NotificationUncheckedCreateWithoutRelatedRequestInput> | NotificationCreateWithoutRelatedRequestInput[] | NotificationUncheckedCreateWithoutRelatedRequestInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutRelatedRequestInput | NotificationCreateOrConnectWithoutRelatedRequestInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutRelatedRequestInput | NotificationUpsertWithWhereUniqueWithoutRelatedRequestInput[]
    createMany?: NotificationCreateManyRelatedRequestInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutRelatedRequestInput | NotificationUpdateWithWhereUniqueWithoutRelatedRequestInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutRelatedRequestInput | NotificationUpdateManyWithWhereWithoutRelatedRequestInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type TradeRequestEventUncheckedUpdateManyWithoutRequestNestedInput = {
    create?: XOR<TradeRequestEventCreateWithoutRequestInput, TradeRequestEventUncheckedCreateWithoutRequestInput> | TradeRequestEventCreateWithoutRequestInput[] | TradeRequestEventUncheckedCreateWithoutRequestInput[]
    connectOrCreate?: TradeRequestEventCreateOrConnectWithoutRequestInput | TradeRequestEventCreateOrConnectWithoutRequestInput[]
    upsert?: TradeRequestEventUpsertWithWhereUniqueWithoutRequestInput | TradeRequestEventUpsertWithWhereUniqueWithoutRequestInput[]
    createMany?: TradeRequestEventCreateManyRequestInputEnvelope
    set?: TradeRequestEventWhereUniqueInput | TradeRequestEventWhereUniqueInput[]
    disconnect?: TradeRequestEventWhereUniqueInput | TradeRequestEventWhereUniqueInput[]
    delete?: TradeRequestEventWhereUniqueInput | TradeRequestEventWhereUniqueInput[]
    connect?: TradeRequestEventWhereUniqueInput | TradeRequestEventWhereUniqueInput[]
    update?: TradeRequestEventUpdateWithWhereUniqueWithoutRequestInput | TradeRequestEventUpdateWithWhereUniqueWithoutRequestInput[]
    updateMany?: TradeRequestEventUpdateManyWithWhereWithoutRequestInput | TradeRequestEventUpdateManyWithWhereWithoutRequestInput[]
    deleteMany?: TradeRequestEventScalarWhereInput | TradeRequestEventScalarWhereInput[]
  }

  export type NotificationUncheckedUpdateManyWithoutRelatedRequestNestedInput = {
    create?: XOR<NotificationCreateWithoutRelatedRequestInput, NotificationUncheckedCreateWithoutRelatedRequestInput> | NotificationCreateWithoutRelatedRequestInput[] | NotificationUncheckedCreateWithoutRelatedRequestInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutRelatedRequestInput | NotificationCreateOrConnectWithoutRelatedRequestInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutRelatedRequestInput | NotificationUpsertWithWhereUniqueWithoutRelatedRequestInput[]
    createMany?: NotificationCreateManyRelatedRequestInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutRelatedRequestInput | NotificationUpdateWithWhereUniqueWithoutRelatedRequestInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutRelatedRequestInput | NotificationUpdateManyWithWhereWithoutRelatedRequestInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type TradeRequestCreateNestedOneWithoutEventsInput = {
    create?: XOR<TradeRequestCreateWithoutEventsInput, TradeRequestUncheckedCreateWithoutEventsInput>
    connectOrCreate?: TradeRequestCreateOrConnectWithoutEventsInput
    connect?: TradeRequestWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutTradeEventsInput = {
    create?: XOR<UserCreateWithoutTradeEventsInput, UserUncheckedCreateWithoutTradeEventsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTradeEventsInput
    connect?: UserWhereUniqueInput
  }

  export type TradeRequestUpdateOneRequiredWithoutEventsNestedInput = {
    create?: XOR<TradeRequestCreateWithoutEventsInput, TradeRequestUncheckedCreateWithoutEventsInput>
    connectOrCreate?: TradeRequestCreateOrConnectWithoutEventsInput
    upsert?: TradeRequestUpsertWithoutEventsInput
    connect?: TradeRequestWhereUniqueInput
    update?: XOR<XOR<TradeRequestUpdateToOneWithWhereWithoutEventsInput, TradeRequestUpdateWithoutEventsInput>, TradeRequestUncheckedUpdateWithoutEventsInput>
  }

  export type UserUpdateOneRequiredWithoutTradeEventsNestedInput = {
    create?: XOR<UserCreateWithoutTradeEventsInput, UserUncheckedCreateWithoutTradeEventsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTradeEventsInput
    upsert?: UserUpsertWithoutTradeEventsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTradeEventsInput, UserUpdateWithoutTradeEventsInput>, UserUncheckedUpdateWithoutTradeEventsInput>
  }

  export type UserCreateNestedOneWithoutNotificationsInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutActedNotificationsInput = {
    create?: XOR<UserCreateWithoutActedNotificationsInput, UserUncheckedCreateWithoutActedNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutActedNotificationsInput
    connect?: UserWhereUniqueInput
  }

  export type TradeRequestCreateNestedOneWithoutNotificationsInput = {
    create?: XOR<TradeRequestCreateWithoutNotificationsInput, TradeRequestUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: TradeRequestCreateOrConnectWithoutNotificationsInput
    connect?: TradeRequestWhereUniqueInput
  }

  export type ListingCreateNestedOneWithoutNotificationsInput = {
    create?: XOR<ListingCreateWithoutNotificationsInput, ListingUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: ListingCreateOrConnectWithoutNotificationsInput
    connect?: ListingWhereUniqueInput
  }

  export type ClaimCreateNestedOneWithoutNotificationsInput = {
    create?: XOR<ClaimCreateWithoutNotificationsInput, ClaimUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: ClaimCreateOrConnectWithoutNotificationsInput
    connect?: ClaimWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutNotificationsNestedInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    upsert?: UserUpsertWithoutNotificationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNotificationsInput, UserUpdateWithoutNotificationsInput>, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type UserUpdateOneWithoutActedNotificationsNestedInput = {
    create?: XOR<UserCreateWithoutActedNotificationsInput, UserUncheckedCreateWithoutActedNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutActedNotificationsInput
    upsert?: UserUpsertWithoutActedNotificationsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutActedNotificationsInput, UserUpdateWithoutActedNotificationsInput>, UserUncheckedUpdateWithoutActedNotificationsInput>
  }

  export type TradeRequestUpdateOneWithoutNotificationsNestedInput = {
    create?: XOR<TradeRequestCreateWithoutNotificationsInput, TradeRequestUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: TradeRequestCreateOrConnectWithoutNotificationsInput
    upsert?: TradeRequestUpsertWithoutNotificationsInput
    disconnect?: TradeRequestWhereInput | boolean
    delete?: TradeRequestWhereInput | boolean
    connect?: TradeRequestWhereUniqueInput
    update?: XOR<XOR<TradeRequestUpdateToOneWithWhereWithoutNotificationsInput, TradeRequestUpdateWithoutNotificationsInput>, TradeRequestUncheckedUpdateWithoutNotificationsInput>
  }

  export type ListingUpdateOneWithoutNotificationsNestedInput = {
    create?: XOR<ListingCreateWithoutNotificationsInput, ListingUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: ListingCreateOrConnectWithoutNotificationsInput
    upsert?: ListingUpsertWithoutNotificationsInput
    disconnect?: ListingWhereInput | boolean
    delete?: ListingWhereInput | boolean
    connect?: ListingWhereUniqueInput
    update?: XOR<XOR<ListingUpdateToOneWithWhereWithoutNotificationsInput, ListingUpdateWithoutNotificationsInput>, ListingUncheckedUpdateWithoutNotificationsInput>
  }

  export type ClaimUpdateOneWithoutNotificationsNestedInput = {
    create?: XOR<ClaimCreateWithoutNotificationsInput, ClaimUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: ClaimCreateOrConnectWithoutNotificationsInput
    upsert?: ClaimUpsertWithoutNotificationsInput
    disconnect?: ClaimWhereInput | boolean
    delete?: ClaimWhereInput | boolean
    connect?: ClaimWhereUniqueInput
    update?: XOR<XOR<ClaimUpdateToOneWithWhereWithoutNotificationsInput, ClaimUpdateWithoutNotificationsInput>, ClaimUncheckedUpdateWithoutNotificationsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type ListingCreateWithoutSellerInput = {
    status?: string
    title: string
    category: string
    college: string
    campus?: string
    condition: string
    description: string
    type?: string
    price?: number
    images?: ListingCreateimagesInput | string[]
    preferredLocation?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    claims?: ClaimCreateNestedManyWithoutListingInput
    savedBy?: SavedItemCreateNestedManyWithoutListingInput
    notifications?: NotificationCreateNestedManyWithoutListingInput
    tradeRequests?: TradeRequestCreateNestedManyWithoutListingInput
    availabilities?: ListingAvailabilityCreateNestedManyWithoutListingInput
  }

  export type ListingUncheckedCreateWithoutSellerInput = {
    id?: number
    status?: string
    title: string
    category: string
    college: string
    campus?: string
    condition: string
    description: string
    type?: string
    price?: number
    images?: ListingCreateimagesInput | string[]
    preferredLocation?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    claims?: ClaimUncheckedCreateNestedManyWithoutListingInput
    savedBy?: SavedItemUncheckedCreateNestedManyWithoutListingInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutListingInput
    tradeRequests?: TradeRequestUncheckedCreateNestedManyWithoutListingInput
    availabilities?: ListingAvailabilityUncheckedCreateNestedManyWithoutListingInput
  }

  export type ListingCreateOrConnectWithoutSellerInput = {
    where: ListingWhereUniqueInput
    create: XOR<ListingCreateWithoutSellerInput, ListingUncheckedCreateWithoutSellerInput>
  }

  export type ListingCreateManySellerInputEnvelope = {
    data: ListingCreateManySellerInput | ListingCreateManySellerInput[]
    skipDuplicates?: boolean
  }

  export type ClaimCreateWithoutClaimantInput = {
    status?: string
    notes?: string | null
    claimDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    listing: ListingCreateNestedOneWithoutClaimsInput
    notifications?: NotificationCreateNestedManyWithoutClaimInput
  }

  export type ClaimUncheckedCreateWithoutClaimantInput = {
    id?: number
    listingId: number
    status?: string
    notes?: string | null
    claimDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    notifications?: NotificationUncheckedCreateNestedManyWithoutClaimInput
  }

  export type ClaimCreateOrConnectWithoutClaimantInput = {
    where: ClaimWhereUniqueInput
    create: XOR<ClaimCreateWithoutClaimantInput, ClaimUncheckedCreateWithoutClaimantInput>
  }

  export type ClaimCreateManyClaimantInputEnvelope = {
    data: ClaimCreateManyClaimantInput | ClaimCreateManyClaimantInput[]
    skipDuplicates?: boolean
  }

  export type SavedItemCreateWithoutUserInput = {
    createdAt?: Date | string
    listing: ListingCreateNestedOneWithoutSavedByInput
  }

  export type SavedItemUncheckedCreateWithoutUserInput = {
    id?: number
    listingId: number
    createdAt?: Date | string
  }

  export type SavedItemCreateOrConnectWithoutUserInput = {
    where: SavedItemWhereUniqueInput
    create: XOR<SavedItemCreateWithoutUserInput, SavedItemUncheckedCreateWithoutUserInput>
  }

  export type SavedItemCreateManyUserInputEnvelope = {
    data: SavedItemCreateManyUserInput | SavedItemCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type NotificationCreateWithoutUserInput = {
    type: string
    title?: string | null
    message: string
    relatedItemId?: number | null
    isRead?: boolean
    createdAt?: Date | string
    actor?: UserCreateNestedOneWithoutActedNotificationsInput
    relatedRequest?: TradeRequestCreateNestedOneWithoutNotificationsInput
    listing?: ListingCreateNestedOneWithoutNotificationsInput
    claim?: ClaimCreateNestedOneWithoutNotificationsInput
  }

  export type NotificationUncheckedCreateWithoutUserInput = {
    id?: number
    actorId?: number | null
    type: string
    title?: string | null
    message: string
    relatedRequestId?: number | null
    relatedItemId?: number | null
    listingId?: number | null
    claimId?: number | null
    isRead?: boolean
    createdAt?: Date | string
  }

  export type NotificationCreateOrConnectWithoutUserInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationCreateManyUserInputEnvelope = {
    data: NotificationCreateManyUserInput | NotificationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type NotificationCreateWithoutActorInput = {
    type: string
    title?: string | null
    message: string
    relatedItemId?: number | null
    isRead?: boolean
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutNotificationsInput
    relatedRequest?: TradeRequestCreateNestedOneWithoutNotificationsInput
    listing?: ListingCreateNestedOneWithoutNotificationsInput
    claim?: ClaimCreateNestedOneWithoutNotificationsInput
  }

  export type NotificationUncheckedCreateWithoutActorInput = {
    id?: number
    userId: number
    type: string
    title?: string | null
    message: string
    relatedRequestId?: number | null
    relatedItemId?: number | null
    listingId?: number | null
    claimId?: number | null
    isRead?: boolean
    createdAt?: Date | string
  }

  export type NotificationCreateOrConnectWithoutActorInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutActorInput, NotificationUncheckedCreateWithoutActorInput>
  }

  export type NotificationCreateManyActorInputEnvelope = {
    data: NotificationCreateManyActorInput | NotificationCreateManyActorInput[]
    skipDuplicates?: boolean
  }

  export type TradeRequestCreateWithoutBuyerInput = {
    meetupLocation: string
    meetupDate: string
    meetupTime: string
    notes?: string | null
    status?: string
    proposedBy?: string
    declineReason?: string | null
    customTime?: boolean
    expiresAt?: Date | string | null
    respondedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    listing: ListingCreateNestedOneWithoutTradeRequestsInput
    seller: UserCreateNestedOneWithoutSellerRequestsInput
    events?: TradeRequestEventCreateNestedManyWithoutRequestInput
    notifications?: NotificationCreateNestedManyWithoutRelatedRequestInput
  }

  export type TradeRequestUncheckedCreateWithoutBuyerInput = {
    id?: number
    listingId: number
    sellerId: number
    meetupLocation: string
    meetupDate: string
    meetupTime: string
    notes?: string | null
    status?: string
    proposedBy?: string
    declineReason?: string | null
    customTime?: boolean
    expiresAt?: Date | string | null
    respondedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: TradeRequestEventUncheckedCreateNestedManyWithoutRequestInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutRelatedRequestInput
  }

  export type TradeRequestCreateOrConnectWithoutBuyerInput = {
    where: TradeRequestWhereUniqueInput
    create: XOR<TradeRequestCreateWithoutBuyerInput, TradeRequestUncheckedCreateWithoutBuyerInput>
  }

  export type TradeRequestCreateManyBuyerInputEnvelope = {
    data: TradeRequestCreateManyBuyerInput | TradeRequestCreateManyBuyerInput[]
    skipDuplicates?: boolean
  }

  export type TradeRequestCreateWithoutSellerInput = {
    meetupLocation: string
    meetupDate: string
    meetupTime: string
    notes?: string | null
    status?: string
    proposedBy?: string
    declineReason?: string | null
    customTime?: boolean
    expiresAt?: Date | string | null
    respondedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    listing: ListingCreateNestedOneWithoutTradeRequestsInput
    buyer: UserCreateNestedOneWithoutBuyerRequestsInput
    events?: TradeRequestEventCreateNestedManyWithoutRequestInput
    notifications?: NotificationCreateNestedManyWithoutRelatedRequestInput
  }

  export type TradeRequestUncheckedCreateWithoutSellerInput = {
    id?: number
    listingId: number
    buyerId: number
    meetupLocation: string
    meetupDate: string
    meetupTime: string
    notes?: string | null
    status?: string
    proposedBy?: string
    declineReason?: string | null
    customTime?: boolean
    expiresAt?: Date | string | null
    respondedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: TradeRequestEventUncheckedCreateNestedManyWithoutRequestInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutRelatedRequestInput
  }

  export type TradeRequestCreateOrConnectWithoutSellerInput = {
    where: TradeRequestWhereUniqueInput
    create: XOR<TradeRequestCreateWithoutSellerInput, TradeRequestUncheckedCreateWithoutSellerInput>
  }

  export type TradeRequestCreateManySellerInputEnvelope = {
    data: TradeRequestCreateManySellerInput | TradeRequestCreateManySellerInput[]
    skipDuplicates?: boolean
  }

  export type TradeRequestEventCreateWithoutActorInput = {
    action: string
    snapshotLocation?: string | null
    snapshotDate?: string | null
    snapshotTime?: string | null
    notes?: string | null
    createdAt?: Date | string
    request: TradeRequestCreateNestedOneWithoutEventsInput
  }

  export type TradeRequestEventUncheckedCreateWithoutActorInput = {
    id?: number
    requestId: number
    action: string
    snapshotLocation?: string | null
    snapshotDate?: string | null
    snapshotTime?: string | null
    notes?: string | null
    createdAt?: Date | string
  }

  export type TradeRequestEventCreateOrConnectWithoutActorInput = {
    where: TradeRequestEventWhereUniqueInput
    create: XOR<TradeRequestEventCreateWithoutActorInput, TradeRequestEventUncheckedCreateWithoutActorInput>
  }

  export type TradeRequestEventCreateManyActorInputEnvelope = {
    data: TradeRequestEventCreateManyActorInput | TradeRequestEventCreateManyActorInput[]
    skipDuplicates?: boolean
  }

  export type ListingUpsertWithWhereUniqueWithoutSellerInput = {
    where: ListingWhereUniqueInput
    update: XOR<ListingUpdateWithoutSellerInput, ListingUncheckedUpdateWithoutSellerInput>
    create: XOR<ListingCreateWithoutSellerInput, ListingUncheckedCreateWithoutSellerInput>
  }

  export type ListingUpdateWithWhereUniqueWithoutSellerInput = {
    where: ListingWhereUniqueInput
    data: XOR<ListingUpdateWithoutSellerInput, ListingUncheckedUpdateWithoutSellerInput>
  }

  export type ListingUpdateManyWithWhereWithoutSellerInput = {
    where: ListingScalarWhereInput
    data: XOR<ListingUpdateManyMutationInput, ListingUncheckedUpdateManyWithoutSellerInput>
  }

  export type ListingScalarWhereInput = {
    AND?: ListingScalarWhereInput | ListingScalarWhereInput[]
    OR?: ListingScalarWhereInput[]
    NOT?: ListingScalarWhereInput | ListingScalarWhereInput[]
    id?: IntFilter<"Listing"> | number
    status?: StringFilter<"Listing"> | string
    title?: StringFilter<"Listing"> | string
    category?: StringFilter<"Listing"> | string
    college?: StringFilter<"Listing"> | string
    campus?: StringFilter<"Listing"> | string
    condition?: StringFilter<"Listing"> | string
    description?: StringFilter<"Listing"> | string
    type?: StringFilter<"Listing"> | string
    price?: FloatFilter<"Listing"> | number
    images?: StringNullableListFilter<"Listing">
    preferredLocation?: StringNullableFilter<"Listing"> | string | null
    sellerId?: IntFilter<"Listing"> | number
    createdAt?: DateTimeFilter<"Listing"> | Date | string
    updatedAt?: DateTimeFilter<"Listing"> | Date | string
  }

  export type ClaimUpsertWithWhereUniqueWithoutClaimantInput = {
    where: ClaimWhereUniqueInput
    update: XOR<ClaimUpdateWithoutClaimantInput, ClaimUncheckedUpdateWithoutClaimantInput>
    create: XOR<ClaimCreateWithoutClaimantInput, ClaimUncheckedCreateWithoutClaimantInput>
  }

  export type ClaimUpdateWithWhereUniqueWithoutClaimantInput = {
    where: ClaimWhereUniqueInput
    data: XOR<ClaimUpdateWithoutClaimantInput, ClaimUncheckedUpdateWithoutClaimantInput>
  }

  export type ClaimUpdateManyWithWhereWithoutClaimantInput = {
    where: ClaimScalarWhereInput
    data: XOR<ClaimUpdateManyMutationInput, ClaimUncheckedUpdateManyWithoutClaimantInput>
  }

  export type ClaimScalarWhereInput = {
    AND?: ClaimScalarWhereInput | ClaimScalarWhereInput[]
    OR?: ClaimScalarWhereInput[]
    NOT?: ClaimScalarWhereInput | ClaimScalarWhereInput[]
    id?: IntFilter<"Claim"> | number
    listingId?: IntFilter<"Claim"> | number
    claimantId?: IntFilter<"Claim"> | number
    status?: StringFilter<"Claim"> | string
    notes?: StringNullableFilter<"Claim"> | string | null
    claimDate?: DateTimeFilter<"Claim"> | Date | string
    createdAt?: DateTimeFilter<"Claim"> | Date | string
    updatedAt?: DateTimeFilter<"Claim"> | Date | string
  }

  export type SavedItemUpsertWithWhereUniqueWithoutUserInput = {
    where: SavedItemWhereUniqueInput
    update: XOR<SavedItemUpdateWithoutUserInput, SavedItemUncheckedUpdateWithoutUserInput>
    create: XOR<SavedItemCreateWithoutUserInput, SavedItemUncheckedCreateWithoutUserInput>
  }

  export type SavedItemUpdateWithWhereUniqueWithoutUserInput = {
    where: SavedItemWhereUniqueInput
    data: XOR<SavedItemUpdateWithoutUserInput, SavedItemUncheckedUpdateWithoutUserInput>
  }

  export type SavedItemUpdateManyWithWhereWithoutUserInput = {
    where: SavedItemScalarWhereInput
    data: XOR<SavedItemUpdateManyMutationInput, SavedItemUncheckedUpdateManyWithoutUserInput>
  }

  export type SavedItemScalarWhereInput = {
    AND?: SavedItemScalarWhereInput | SavedItemScalarWhereInput[]
    OR?: SavedItemScalarWhereInput[]
    NOT?: SavedItemScalarWhereInput | SavedItemScalarWhereInput[]
    id?: IntFilter<"SavedItem"> | number
    userId?: IntFilter<"SavedItem"> | number
    listingId?: IntFilter<"SavedItem"> | number
    createdAt?: DateTimeFilter<"SavedItem"> | Date | string
  }

  export type NotificationUpsertWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
  }

  export type NotificationUpdateManyWithWhereWithoutUserInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutUserInput>
  }

  export type NotificationScalarWhereInput = {
    AND?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    OR?: NotificationScalarWhereInput[]
    NOT?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    id?: IntFilter<"Notification"> | number
    userId?: IntFilter<"Notification"> | number
    actorId?: IntNullableFilter<"Notification"> | number | null
    type?: StringFilter<"Notification"> | string
    title?: StringNullableFilter<"Notification"> | string | null
    message?: StringFilter<"Notification"> | string
    relatedRequestId?: IntNullableFilter<"Notification"> | number | null
    relatedItemId?: IntNullableFilter<"Notification"> | number | null
    listingId?: IntNullableFilter<"Notification"> | number | null
    claimId?: IntNullableFilter<"Notification"> | number | null
    isRead?: BoolFilter<"Notification"> | boolean
    createdAt?: DateTimeFilter<"Notification"> | Date | string
  }

  export type NotificationUpsertWithWhereUniqueWithoutActorInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutActorInput, NotificationUncheckedUpdateWithoutActorInput>
    create: XOR<NotificationCreateWithoutActorInput, NotificationUncheckedCreateWithoutActorInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutActorInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutActorInput, NotificationUncheckedUpdateWithoutActorInput>
  }

  export type NotificationUpdateManyWithWhereWithoutActorInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutActorInput>
  }

  export type TradeRequestUpsertWithWhereUniqueWithoutBuyerInput = {
    where: TradeRequestWhereUniqueInput
    update: XOR<TradeRequestUpdateWithoutBuyerInput, TradeRequestUncheckedUpdateWithoutBuyerInput>
    create: XOR<TradeRequestCreateWithoutBuyerInput, TradeRequestUncheckedCreateWithoutBuyerInput>
  }

  export type TradeRequestUpdateWithWhereUniqueWithoutBuyerInput = {
    where: TradeRequestWhereUniqueInput
    data: XOR<TradeRequestUpdateWithoutBuyerInput, TradeRequestUncheckedUpdateWithoutBuyerInput>
  }

  export type TradeRequestUpdateManyWithWhereWithoutBuyerInput = {
    where: TradeRequestScalarWhereInput
    data: XOR<TradeRequestUpdateManyMutationInput, TradeRequestUncheckedUpdateManyWithoutBuyerInput>
  }

  export type TradeRequestScalarWhereInput = {
    AND?: TradeRequestScalarWhereInput | TradeRequestScalarWhereInput[]
    OR?: TradeRequestScalarWhereInput[]
    NOT?: TradeRequestScalarWhereInput | TradeRequestScalarWhereInput[]
    id?: IntFilter<"TradeRequest"> | number
    listingId?: IntFilter<"TradeRequest"> | number
    buyerId?: IntFilter<"TradeRequest"> | number
    sellerId?: IntFilter<"TradeRequest"> | number
    meetupLocation?: StringFilter<"TradeRequest"> | string
    meetupDate?: StringFilter<"TradeRequest"> | string
    meetupTime?: StringFilter<"TradeRequest"> | string
    notes?: StringNullableFilter<"TradeRequest"> | string | null
    status?: StringFilter<"TradeRequest"> | string
    proposedBy?: StringFilter<"TradeRequest"> | string
    declineReason?: StringNullableFilter<"TradeRequest"> | string | null
    customTime?: BoolFilter<"TradeRequest"> | boolean
    expiresAt?: DateTimeNullableFilter<"TradeRequest"> | Date | string | null
    respondedAt?: DateTimeNullableFilter<"TradeRequest"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"TradeRequest"> | Date | string | null
    createdAt?: DateTimeFilter<"TradeRequest"> | Date | string
    updatedAt?: DateTimeFilter<"TradeRequest"> | Date | string
  }

  export type TradeRequestUpsertWithWhereUniqueWithoutSellerInput = {
    where: TradeRequestWhereUniqueInput
    update: XOR<TradeRequestUpdateWithoutSellerInput, TradeRequestUncheckedUpdateWithoutSellerInput>
    create: XOR<TradeRequestCreateWithoutSellerInput, TradeRequestUncheckedCreateWithoutSellerInput>
  }

  export type TradeRequestUpdateWithWhereUniqueWithoutSellerInput = {
    where: TradeRequestWhereUniqueInput
    data: XOR<TradeRequestUpdateWithoutSellerInput, TradeRequestUncheckedUpdateWithoutSellerInput>
  }

  export type TradeRequestUpdateManyWithWhereWithoutSellerInput = {
    where: TradeRequestScalarWhereInput
    data: XOR<TradeRequestUpdateManyMutationInput, TradeRequestUncheckedUpdateManyWithoutSellerInput>
  }

  export type TradeRequestEventUpsertWithWhereUniqueWithoutActorInput = {
    where: TradeRequestEventWhereUniqueInput
    update: XOR<TradeRequestEventUpdateWithoutActorInput, TradeRequestEventUncheckedUpdateWithoutActorInput>
    create: XOR<TradeRequestEventCreateWithoutActorInput, TradeRequestEventUncheckedCreateWithoutActorInput>
  }

  export type TradeRequestEventUpdateWithWhereUniqueWithoutActorInput = {
    where: TradeRequestEventWhereUniqueInput
    data: XOR<TradeRequestEventUpdateWithoutActorInput, TradeRequestEventUncheckedUpdateWithoutActorInput>
  }

  export type TradeRequestEventUpdateManyWithWhereWithoutActorInput = {
    where: TradeRequestEventScalarWhereInput
    data: XOR<TradeRequestEventUpdateManyMutationInput, TradeRequestEventUncheckedUpdateManyWithoutActorInput>
  }

  export type TradeRequestEventScalarWhereInput = {
    AND?: TradeRequestEventScalarWhereInput | TradeRequestEventScalarWhereInput[]
    OR?: TradeRequestEventScalarWhereInput[]
    NOT?: TradeRequestEventScalarWhereInput | TradeRequestEventScalarWhereInput[]
    id?: IntFilter<"TradeRequestEvent"> | number
    requestId?: IntFilter<"TradeRequestEvent"> | number
    actorId?: IntFilter<"TradeRequestEvent"> | number
    action?: StringFilter<"TradeRequestEvent"> | string
    snapshotLocation?: StringNullableFilter<"TradeRequestEvent"> | string | null
    snapshotDate?: StringNullableFilter<"TradeRequestEvent"> | string | null
    snapshotTime?: StringNullableFilter<"TradeRequestEvent"> | string | null
    notes?: StringNullableFilter<"TradeRequestEvent"> | string | null
    createdAt?: DateTimeFilter<"TradeRequestEvent"> | Date | string
  }

  export type UserCreateWithoutListingsInput = {
    supabaseId: string
    email: string
    name: string
    role?: string | null
    profileCompleted?: boolean
    studentId?: string | null
    course?: string | null
    year?: string | null
    employeeId?: string | null
    position?: string | null
    office?: string | null
    college?: string | null
    campus?: string
    phone?: string | null
    bio?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    claims?: ClaimCreateNestedManyWithoutClaimantInput
    savedItems?: SavedItemCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    actedNotifications?: NotificationCreateNestedManyWithoutActorInput
    buyerRequests?: TradeRequestCreateNestedManyWithoutBuyerInput
    sellerRequests?: TradeRequestCreateNestedManyWithoutSellerInput
    tradeEvents?: TradeRequestEventCreateNestedManyWithoutActorInput
  }

  export type UserUncheckedCreateWithoutListingsInput = {
    id?: number
    supabaseId: string
    email: string
    name: string
    role?: string | null
    profileCompleted?: boolean
    studentId?: string | null
    course?: string | null
    year?: string | null
    employeeId?: string | null
    position?: string | null
    office?: string | null
    college?: string | null
    campus?: string
    phone?: string | null
    bio?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    claims?: ClaimUncheckedCreateNestedManyWithoutClaimantInput
    savedItems?: SavedItemUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    actedNotifications?: NotificationUncheckedCreateNestedManyWithoutActorInput
    buyerRequests?: TradeRequestUncheckedCreateNestedManyWithoutBuyerInput
    sellerRequests?: TradeRequestUncheckedCreateNestedManyWithoutSellerInput
    tradeEvents?: TradeRequestEventUncheckedCreateNestedManyWithoutActorInput
  }

  export type UserCreateOrConnectWithoutListingsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutListingsInput, UserUncheckedCreateWithoutListingsInput>
  }

  export type ClaimCreateWithoutListingInput = {
    status?: string
    notes?: string | null
    claimDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    claimant: UserCreateNestedOneWithoutClaimsInput
    notifications?: NotificationCreateNestedManyWithoutClaimInput
  }

  export type ClaimUncheckedCreateWithoutListingInput = {
    id?: number
    claimantId: number
    status?: string
    notes?: string | null
    claimDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    notifications?: NotificationUncheckedCreateNestedManyWithoutClaimInput
  }

  export type ClaimCreateOrConnectWithoutListingInput = {
    where: ClaimWhereUniqueInput
    create: XOR<ClaimCreateWithoutListingInput, ClaimUncheckedCreateWithoutListingInput>
  }

  export type ClaimCreateManyListingInputEnvelope = {
    data: ClaimCreateManyListingInput | ClaimCreateManyListingInput[]
    skipDuplicates?: boolean
  }

  export type SavedItemCreateWithoutListingInput = {
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutSavedItemsInput
  }

  export type SavedItemUncheckedCreateWithoutListingInput = {
    id?: number
    userId: number
    createdAt?: Date | string
  }

  export type SavedItemCreateOrConnectWithoutListingInput = {
    where: SavedItemWhereUniqueInput
    create: XOR<SavedItemCreateWithoutListingInput, SavedItemUncheckedCreateWithoutListingInput>
  }

  export type SavedItemCreateManyListingInputEnvelope = {
    data: SavedItemCreateManyListingInput | SavedItemCreateManyListingInput[]
    skipDuplicates?: boolean
  }

  export type NotificationCreateWithoutListingInput = {
    type: string
    title?: string | null
    message: string
    relatedItemId?: number | null
    isRead?: boolean
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutNotificationsInput
    actor?: UserCreateNestedOneWithoutActedNotificationsInput
    relatedRequest?: TradeRequestCreateNestedOneWithoutNotificationsInput
    claim?: ClaimCreateNestedOneWithoutNotificationsInput
  }

  export type NotificationUncheckedCreateWithoutListingInput = {
    id?: number
    userId: number
    actorId?: number | null
    type: string
    title?: string | null
    message: string
    relatedRequestId?: number | null
    relatedItemId?: number | null
    claimId?: number | null
    isRead?: boolean
    createdAt?: Date | string
  }

  export type NotificationCreateOrConnectWithoutListingInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutListingInput, NotificationUncheckedCreateWithoutListingInput>
  }

  export type NotificationCreateManyListingInputEnvelope = {
    data: NotificationCreateManyListingInput | NotificationCreateManyListingInput[]
    skipDuplicates?: boolean
  }

  export type TradeRequestCreateWithoutListingInput = {
    meetupLocation: string
    meetupDate: string
    meetupTime: string
    notes?: string | null
    status?: string
    proposedBy?: string
    declineReason?: string | null
    customTime?: boolean
    expiresAt?: Date | string | null
    respondedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    buyer: UserCreateNestedOneWithoutBuyerRequestsInput
    seller: UserCreateNestedOneWithoutSellerRequestsInput
    events?: TradeRequestEventCreateNestedManyWithoutRequestInput
    notifications?: NotificationCreateNestedManyWithoutRelatedRequestInput
  }

  export type TradeRequestUncheckedCreateWithoutListingInput = {
    id?: number
    buyerId: number
    sellerId: number
    meetupLocation: string
    meetupDate: string
    meetupTime: string
    notes?: string | null
    status?: string
    proposedBy?: string
    declineReason?: string | null
    customTime?: boolean
    expiresAt?: Date | string | null
    respondedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: TradeRequestEventUncheckedCreateNestedManyWithoutRequestInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutRelatedRequestInput
  }

  export type TradeRequestCreateOrConnectWithoutListingInput = {
    where: TradeRequestWhereUniqueInput
    create: XOR<TradeRequestCreateWithoutListingInput, TradeRequestUncheckedCreateWithoutListingInput>
  }

  export type TradeRequestCreateManyListingInputEnvelope = {
    data: TradeRequestCreateManyListingInput | TradeRequestCreateManyListingInput[]
    skipDuplicates?: boolean
  }

  export type ListingAvailabilityCreateWithoutListingInput = {
    dayOfWeek: number
    startTime: string
    endTime: string
    createdAt?: Date | string
  }

  export type ListingAvailabilityUncheckedCreateWithoutListingInput = {
    id?: number
    dayOfWeek: number
    startTime: string
    endTime: string
    createdAt?: Date | string
  }

  export type ListingAvailabilityCreateOrConnectWithoutListingInput = {
    where: ListingAvailabilityWhereUniqueInput
    create: XOR<ListingAvailabilityCreateWithoutListingInput, ListingAvailabilityUncheckedCreateWithoutListingInput>
  }

  export type ListingAvailabilityCreateManyListingInputEnvelope = {
    data: ListingAvailabilityCreateManyListingInput | ListingAvailabilityCreateManyListingInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutListingsInput = {
    update: XOR<UserUpdateWithoutListingsInput, UserUncheckedUpdateWithoutListingsInput>
    create: XOR<UserCreateWithoutListingsInput, UserUncheckedCreateWithoutListingsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutListingsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutListingsInput, UserUncheckedUpdateWithoutListingsInput>
  }

  export type UserUpdateWithoutListingsInput = {
    supabaseId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    profileCompleted?: BoolFieldUpdateOperationsInput | boolean
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    course?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableStringFieldUpdateOperationsInput | string | null
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    office?: NullableStringFieldUpdateOperationsInput | string | null
    college?: NullableStringFieldUpdateOperationsInput | string | null
    campus?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    claims?: ClaimUpdateManyWithoutClaimantNestedInput
    savedItems?: SavedItemUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    actedNotifications?: NotificationUpdateManyWithoutActorNestedInput
    buyerRequests?: TradeRequestUpdateManyWithoutBuyerNestedInput
    sellerRequests?: TradeRequestUpdateManyWithoutSellerNestedInput
    tradeEvents?: TradeRequestEventUpdateManyWithoutActorNestedInput
  }

  export type UserUncheckedUpdateWithoutListingsInput = {
    id?: IntFieldUpdateOperationsInput | number
    supabaseId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    profileCompleted?: BoolFieldUpdateOperationsInput | boolean
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    course?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableStringFieldUpdateOperationsInput | string | null
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    office?: NullableStringFieldUpdateOperationsInput | string | null
    college?: NullableStringFieldUpdateOperationsInput | string | null
    campus?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    claims?: ClaimUncheckedUpdateManyWithoutClaimantNestedInput
    savedItems?: SavedItemUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    actedNotifications?: NotificationUncheckedUpdateManyWithoutActorNestedInput
    buyerRequests?: TradeRequestUncheckedUpdateManyWithoutBuyerNestedInput
    sellerRequests?: TradeRequestUncheckedUpdateManyWithoutSellerNestedInput
    tradeEvents?: TradeRequestEventUncheckedUpdateManyWithoutActorNestedInput
  }

  export type ClaimUpsertWithWhereUniqueWithoutListingInput = {
    where: ClaimWhereUniqueInput
    update: XOR<ClaimUpdateWithoutListingInput, ClaimUncheckedUpdateWithoutListingInput>
    create: XOR<ClaimCreateWithoutListingInput, ClaimUncheckedCreateWithoutListingInput>
  }

  export type ClaimUpdateWithWhereUniqueWithoutListingInput = {
    where: ClaimWhereUniqueInput
    data: XOR<ClaimUpdateWithoutListingInput, ClaimUncheckedUpdateWithoutListingInput>
  }

  export type ClaimUpdateManyWithWhereWithoutListingInput = {
    where: ClaimScalarWhereInput
    data: XOR<ClaimUpdateManyMutationInput, ClaimUncheckedUpdateManyWithoutListingInput>
  }

  export type SavedItemUpsertWithWhereUniqueWithoutListingInput = {
    where: SavedItemWhereUniqueInput
    update: XOR<SavedItemUpdateWithoutListingInput, SavedItemUncheckedUpdateWithoutListingInput>
    create: XOR<SavedItemCreateWithoutListingInput, SavedItemUncheckedCreateWithoutListingInput>
  }

  export type SavedItemUpdateWithWhereUniqueWithoutListingInput = {
    where: SavedItemWhereUniqueInput
    data: XOR<SavedItemUpdateWithoutListingInput, SavedItemUncheckedUpdateWithoutListingInput>
  }

  export type SavedItemUpdateManyWithWhereWithoutListingInput = {
    where: SavedItemScalarWhereInput
    data: XOR<SavedItemUpdateManyMutationInput, SavedItemUncheckedUpdateManyWithoutListingInput>
  }

  export type NotificationUpsertWithWhereUniqueWithoutListingInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutListingInput, NotificationUncheckedUpdateWithoutListingInput>
    create: XOR<NotificationCreateWithoutListingInput, NotificationUncheckedCreateWithoutListingInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutListingInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutListingInput, NotificationUncheckedUpdateWithoutListingInput>
  }

  export type NotificationUpdateManyWithWhereWithoutListingInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutListingInput>
  }

  export type TradeRequestUpsertWithWhereUniqueWithoutListingInput = {
    where: TradeRequestWhereUniqueInput
    update: XOR<TradeRequestUpdateWithoutListingInput, TradeRequestUncheckedUpdateWithoutListingInput>
    create: XOR<TradeRequestCreateWithoutListingInput, TradeRequestUncheckedCreateWithoutListingInput>
  }

  export type TradeRequestUpdateWithWhereUniqueWithoutListingInput = {
    where: TradeRequestWhereUniqueInput
    data: XOR<TradeRequestUpdateWithoutListingInput, TradeRequestUncheckedUpdateWithoutListingInput>
  }

  export type TradeRequestUpdateManyWithWhereWithoutListingInput = {
    where: TradeRequestScalarWhereInput
    data: XOR<TradeRequestUpdateManyMutationInput, TradeRequestUncheckedUpdateManyWithoutListingInput>
  }

  export type ListingAvailabilityUpsertWithWhereUniqueWithoutListingInput = {
    where: ListingAvailabilityWhereUniqueInput
    update: XOR<ListingAvailabilityUpdateWithoutListingInput, ListingAvailabilityUncheckedUpdateWithoutListingInput>
    create: XOR<ListingAvailabilityCreateWithoutListingInput, ListingAvailabilityUncheckedCreateWithoutListingInput>
  }

  export type ListingAvailabilityUpdateWithWhereUniqueWithoutListingInput = {
    where: ListingAvailabilityWhereUniqueInput
    data: XOR<ListingAvailabilityUpdateWithoutListingInput, ListingAvailabilityUncheckedUpdateWithoutListingInput>
  }

  export type ListingAvailabilityUpdateManyWithWhereWithoutListingInput = {
    where: ListingAvailabilityScalarWhereInput
    data: XOR<ListingAvailabilityUpdateManyMutationInput, ListingAvailabilityUncheckedUpdateManyWithoutListingInput>
  }

  export type ListingAvailabilityScalarWhereInput = {
    AND?: ListingAvailabilityScalarWhereInput | ListingAvailabilityScalarWhereInput[]
    OR?: ListingAvailabilityScalarWhereInput[]
    NOT?: ListingAvailabilityScalarWhereInput | ListingAvailabilityScalarWhereInput[]
    id?: IntFilter<"ListingAvailability"> | number
    listingId?: IntFilter<"ListingAvailability"> | number
    dayOfWeek?: IntFilter<"ListingAvailability"> | number
    startTime?: StringFilter<"ListingAvailability"> | string
    endTime?: StringFilter<"ListingAvailability"> | string
    createdAt?: DateTimeFilter<"ListingAvailability"> | Date | string
  }

  export type ListingCreateWithoutClaimsInput = {
    status?: string
    title: string
    category: string
    college: string
    campus?: string
    condition: string
    description: string
    type?: string
    price?: number
    images?: ListingCreateimagesInput | string[]
    preferredLocation?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    seller: UserCreateNestedOneWithoutListingsInput
    savedBy?: SavedItemCreateNestedManyWithoutListingInput
    notifications?: NotificationCreateNestedManyWithoutListingInput
    tradeRequests?: TradeRequestCreateNestedManyWithoutListingInput
    availabilities?: ListingAvailabilityCreateNestedManyWithoutListingInput
  }

  export type ListingUncheckedCreateWithoutClaimsInput = {
    id?: number
    status?: string
    title: string
    category: string
    college: string
    campus?: string
    condition: string
    description: string
    type?: string
    price?: number
    images?: ListingCreateimagesInput | string[]
    preferredLocation?: string | null
    sellerId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    savedBy?: SavedItemUncheckedCreateNestedManyWithoutListingInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutListingInput
    tradeRequests?: TradeRequestUncheckedCreateNestedManyWithoutListingInput
    availabilities?: ListingAvailabilityUncheckedCreateNestedManyWithoutListingInput
  }

  export type ListingCreateOrConnectWithoutClaimsInput = {
    where: ListingWhereUniqueInput
    create: XOR<ListingCreateWithoutClaimsInput, ListingUncheckedCreateWithoutClaimsInput>
  }

  export type UserCreateWithoutClaimsInput = {
    supabaseId: string
    email: string
    name: string
    role?: string | null
    profileCompleted?: boolean
    studentId?: string | null
    course?: string | null
    year?: string | null
    employeeId?: string | null
    position?: string | null
    office?: string | null
    college?: string | null
    campus?: string
    phone?: string | null
    bio?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    listings?: ListingCreateNestedManyWithoutSellerInput
    savedItems?: SavedItemCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    actedNotifications?: NotificationCreateNestedManyWithoutActorInput
    buyerRequests?: TradeRequestCreateNestedManyWithoutBuyerInput
    sellerRequests?: TradeRequestCreateNestedManyWithoutSellerInput
    tradeEvents?: TradeRequestEventCreateNestedManyWithoutActorInput
  }

  export type UserUncheckedCreateWithoutClaimsInput = {
    id?: number
    supabaseId: string
    email: string
    name: string
    role?: string | null
    profileCompleted?: boolean
    studentId?: string | null
    course?: string | null
    year?: string | null
    employeeId?: string | null
    position?: string | null
    office?: string | null
    college?: string | null
    campus?: string
    phone?: string | null
    bio?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    listings?: ListingUncheckedCreateNestedManyWithoutSellerInput
    savedItems?: SavedItemUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    actedNotifications?: NotificationUncheckedCreateNestedManyWithoutActorInput
    buyerRequests?: TradeRequestUncheckedCreateNestedManyWithoutBuyerInput
    sellerRequests?: TradeRequestUncheckedCreateNestedManyWithoutSellerInput
    tradeEvents?: TradeRequestEventUncheckedCreateNestedManyWithoutActorInput
  }

  export type UserCreateOrConnectWithoutClaimsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutClaimsInput, UserUncheckedCreateWithoutClaimsInput>
  }

  export type NotificationCreateWithoutClaimInput = {
    type: string
    title?: string | null
    message: string
    relatedItemId?: number | null
    isRead?: boolean
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutNotificationsInput
    actor?: UserCreateNestedOneWithoutActedNotificationsInput
    relatedRequest?: TradeRequestCreateNestedOneWithoutNotificationsInput
    listing?: ListingCreateNestedOneWithoutNotificationsInput
  }

  export type NotificationUncheckedCreateWithoutClaimInput = {
    id?: number
    userId: number
    actorId?: number | null
    type: string
    title?: string | null
    message: string
    relatedRequestId?: number | null
    relatedItemId?: number | null
    listingId?: number | null
    isRead?: boolean
    createdAt?: Date | string
  }

  export type NotificationCreateOrConnectWithoutClaimInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutClaimInput, NotificationUncheckedCreateWithoutClaimInput>
  }

  export type NotificationCreateManyClaimInputEnvelope = {
    data: NotificationCreateManyClaimInput | NotificationCreateManyClaimInput[]
    skipDuplicates?: boolean
  }

  export type ListingUpsertWithoutClaimsInput = {
    update: XOR<ListingUpdateWithoutClaimsInput, ListingUncheckedUpdateWithoutClaimsInput>
    create: XOR<ListingCreateWithoutClaimsInput, ListingUncheckedCreateWithoutClaimsInput>
    where?: ListingWhereInput
  }

  export type ListingUpdateToOneWithWhereWithoutClaimsInput = {
    where?: ListingWhereInput
    data: XOR<ListingUpdateWithoutClaimsInput, ListingUncheckedUpdateWithoutClaimsInput>
  }

  export type ListingUpdateWithoutClaimsInput = {
    status?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    college?: StringFieldUpdateOperationsInput | string
    campus?: StringFieldUpdateOperationsInput | string
    condition?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    images?: ListingUpdateimagesInput | string[]
    preferredLocation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    seller?: UserUpdateOneRequiredWithoutListingsNestedInput
    savedBy?: SavedItemUpdateManyWithoutListingNestedInput
    notifications?: NotificationUpdateManyWithoutListingNestedInput
    tradeRequests?: TradeRequestUpdateManyWithoutListingNestedInput
    availabilities?: ListingAvailabilityUpdateManyWithoutListingNestedInput
  }

  export type ListingUncheckedUpdateWithoutClaimsInput = {
    id?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    college?: StringFieldUpdateOperationsInput | string
    campus?: StringFieldUpdateOperationsInput | string
    condition?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    images?: ListingUpdateimagesInput | string[]
    preferredLocation?: NullableStringFieldUpdateOperationsInput | string | null
    sellerId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    savedBy?: SavedItemUncheckedUpdateManyWithoutListingNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutListingNestedInput
    tradeRequests?: TradeRequestUncheckedUpdateManyWithoutListingNestedInput
    availabilities?: ListingAvailabilityUncheckedUpdateManyWithoutListingNestedInput
  }

  export type UserUpsertWithoutClaimsInput = {
    update: XOR<UserUpdateWithoutClaimsInput, UserUncheckedUpdateWithoutClaimsInput>
    create: XOR<UserCreateWithoutClaimsInput, UserUncheckedCreateWithoutClaimsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutClaimsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutClaimsInput, UserUncheckedUpdateWithoutClaimsInput>
  }

  export type UserUpdateWithoutClaimsInput = {
    supabaseId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    profileCompleted?: BoolFieldUpdateOperationsInput | boolean
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    course?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableStringFieldUpdateOperationsInput | string | null
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    office?: NullableStringFieldUpdateOperationsInput | string | null
    college?: NullableStringFieldUpdateOperationsInput | string | null
    campus?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listings?: ListingUpdateManyWithoutSellerNestedInput
    savedItems?: SavedItemUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    actedNotifications?: NotificationUpdateManyWithoutActorNestedInput
    buyerRequests?: TradeRequestUpdateManyWithoutBuyerNestedInput
    sellerRequests?: TradeRequestUpdateManyWithoutSellerNestedInput
    tradeEvents?: TradeRequestEventUpdateManyWithoutActorNestedInput
  }

  export type UserUncheckedUpdateWithoutClaimsInput = {
    id?: IntFieldUpdateOperationsInput | number
    supabaseId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    profileCompleted?: BoolFieldUpdateOperationsInput | boolean
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    course?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableStringFieldUpdateOperationsInput | string | null
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    office?: NullableStringFieldUpdateOperationsInput | string | null
    college?: NullableStringFieldUpdateOperationsInput | string | null
    campus?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listings?: ListingUncheckedUpdateManyWithoutSellerNestedInput
    savedItems?: SavedItemUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    actedNotifications?: NotificationUncheckedUpdateManyWithoutActorNestedInput
    buyerRequests?: TradeRequestUncheckedUpdateManyWithoutBuyerNestedInput
    sellerRequests?: TradeRequestUncheckedUpdateManyWithoutSellerNestedInput
    tradeEvents?: TradeRequestEventUncheckedUpdateManyWithoutActorNestedInput
  }

  export type NotificationUpsertWithWhereUniqueWithoutClaimInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutClaimInput, NotificationUncheckedUpdateWithoutClaimInput>
    create: XOR<NotificationCreateWithoutClaimInput, NotificationUncheckedCreateWithoutClaimInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutClaimInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutClaimInput, NotificationUncheckedUpdateWithoutClaimInput>
  }

  export type NotificationUpdateManyWithWhereWithoutClaimInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutClaimInput>
  }

  export type UserCreateWithoutSavedItemsInput = {
    supabaseId: string
    email: string
    name: string
    role?: string | null
    profileCompleted?: boolean
    studentId?: string | null
    course?: string | null
    year?: string | null
    employeeId?: string | null
    position?: string | null
    office?: string | null
    college?: string | null
    campus?: string
    phone?: string | null
    bio?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    listings?: ListingCreateNestedManyWithoutSellerInput
    claims?: ClaimCreateNestedManyWithoutClaimantInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    actedNotifications?: NotificationCreateNestedManyWithoutActorInput
    buyerRequests?: TradeRequestCreateNestedManyWithoutBuyerInput
    sellerRequests?: TradeRequestCreateNestedManyWithoutSellerInput
    tradeEvents?: TradeRequestEventCreateNestedManyWithoutActorInput
  }

  export type UserUncheckedCreateWithoutSavedItemsInput = {
    id?: number
    supabaseId: string
    email: string
    name: string
    role?: string | null
    profileCompleted?: boolean
    studentId?: string | null
    course?: string | null
    year?: string | null
    employeeId?: string | null
    position?: string | null
    office?: string | null
    college?: string | null
    campus?: string
    phone?: string | null
    bio?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    listings?: ListingUncheckedCreateNestedManyWithoutSellerInput
    claims?: ClaimUncheckedCreateNestedManyWithoutClaimantInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    actedNotifications?: NotificationUncheckedCreateNestedManyWithoutActorInput
    buyerRequests?: TradeRequestUncheckedCreateNestedManyWithoutBuyerInput
    sellerRequests?: TradeRequestUncheckedCreateNestedManyWithoutSellerInput
    tradeEvents?: TradeRequestEventUncheckedCreateNestedManyWithoutActorInput
  }

  export type UserCreateOrConnectWithoutSavedItemsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSavedItemsInput, UserUncheckedCreateWithoutSavedItemsInput>
  }

  export type ListingCreateWithoutSavedByInput = {
    status?: string
    title: string
    category: string
    college: string
    campus?: string
    condition: string
    description: string
    type?: string
    price?: number
    images?: ListingCreateimagesInput | string[]
    preferredLocation?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    seller: UserCreateNestedOneWithoutListingsInput
    claims?: ClaimCreateNestedManyWithoutListingInput
    notifications?: NotificationCreateNestedManyWithoutListingInput
    tradeRequests?: TradeRequestCreateNestedManyWithoutListingInput
    availabilities?: ListingAvailabilityCreateNestedManyWithoutListingInput
  }

  export type ListingUncheckedCreateWithoutSavedByInput = {
    id?: number
    status?: string
    title: string
    category: string
    college: string
    campus?: string
    condition: string
    description: string
    type?: string
    price?: number
    images?: ListingCreateimagesInput | string[]
    preferredLocation?: string | null
    sellerId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    claims?: ClaimUncheckedCreateNestedManyWithoutListingInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutListingInput
    tradeRequests?: TradeRequestUncheckedCreateNestedManyWithoutListingInput
    availabilities?: ListingAvailabilityUncheckedCreateNestedManyWithoutListingInput
  }

  export type ListingCreateOrConnectWithoutSavedByInput = {
    where: ListingWhereUniqueInput
    create: XOR<ListingCreateWithoutSavedByInput, ListingUncheckedCreateWithoutSavedByInput>
  }

  export type UserUpsertWithoutSavedItemsInput = {
    update: XOR<UserUpdateWithoutSavedItemsInput, UserUncheckedUpdateWithoutSavedItemsInput>
    create: XOR<UserCreateWithoutSavedItemsInput, UserUncheckedCreateWithoutSavedItemsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSavedItemsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSavedItemsInput, UserUncheckedUpdateWithoutSavedItemsInput>
  }

  export type UserUpdateWithoutSavedItemsInput = {
    supabaseId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    profileCompleted?: BoolFieldUpdateOperationsInput | boolean
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    course?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableStringFieldUpdateOperationsInput | string | null
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    office?: NullableStringFieldUpdateOperationsInput | string | null
    college?: NullableStringFieldUpdateOperationsInput | string | null
    campus?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listings?: ListingUpdateManyWithoutSellerNestedInput
    claims?: ClaimUpdateManyWithoutClaimantNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    actedNotifications?: NotificationUpdateManyWithoutActorNestedInput
    buyerRequests?: TradeRequestUpdateManyWithoutBuyerNestedInput
    sellerRequests?: TradeRequestUpdateManyWithoutSellerNestedInput
    tradeEvents?: TradeRequestEventUpdateManyWithoutActorNestedInput
  }

  export type UserUncheckedUpdateWithoutSavedItemsInput = {
    id?: IntFieldUpdateOperationsInput | number
    supabaseId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    profileCompleted?: BoolFieldUpdateOperationsInput | boolean
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    course?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableStringFieldUpdateOperationsInput | string | null
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    office?: NullableStringFieldUpdateOperationsInput | string | null
    college?: NullableStringFieldUpdateOperationsInput | string | null
    campus?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listings?: ListingUncheckedUpdateManyWithoutSellerNestedInput
    claims?: ClaimUncheckedUpdateManyWithoutClaimantNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    actedNotifications?: NotificationUncheckedUpdateManyWithoutActorNestedInput
    buyerRequests?: TradeRequestUncheckedUpdateManyWithoutBuyerNestedInput
    sellerRequests?: TradeRequestUncheckedUpdateManyWithoutSellerNestedInput
    tradeEvents?: TradeRequestEventUncheckedUpdateManyWithoutActorNestedInput
  }

  export type ListingUpsertWithoutSavedByInput = {
    update: XOR<ListingUpdateWithoutSavedByInput, ListingUncheckedUpdateWithoutSavedByInput>
    create: XOR<ListingCreateWithoutSavedByInput, ListingUncheckedCreateWithoutSavedByInput>
    where?: ListingWhereInput
  }

  export type ListingUpdateToOneWithWhereWithoutSavedByInput = {
    where?: ListingWhereInput
    data: XOR<ListingUpdateWithoutSavedByInput, ListingUncheckedUpdateWithoutSavedByInput>
  }

  export type ListingUpdateWithoutSavedByInput = {
    status?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    college?: StringFieldUpdateOperationsInput | string
    campus?: StringFieldUpdateOperationsInput | string
    condition?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    images?: ListingUpdateimagesInput | string[]
    preferredLocation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    seller?: UserUpdateOneRequiredWithoutListingsNestedInput
    claims?: ClaimUpdateManyWithoutListingNestedInput
    notifications?: NotificationUpdateManyWithoutListingNestedInput
    tradeRequests?: TradeRequestUpdateManyWithoutListingNestedInput
    availabilities?: ListingAvailabilityUpdateManyWithoutListingNestedInput
  }

  export type ListingUncheckedUpdateWithoutSavedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    college?: StringFieldUpdateOperationsInput | string
    campus?: StringFieldUpdateOperationsInput | string
    condition?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    images?: ListingUpdateimagesInput | string[]
    preferredLocation?: NullableStringFieldUpdateOperationsInput | string | null
    sellerId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    claims?: ClaimUncheckedUpdateManyWithoutListingNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutListingNestedInput
    tradeRequests?: TradeRequestUncheckedUpdateManyWithoutListingNestedInput
    availabilities?: ListingAvailabilityUncheckedUpdateManyWithoutListingNestedInput
  }

  export type ListingCreateWithoutAvailabilitiesInput = {
    status?: string
    title: string
    category: string
    college: string
    campus?: string
    condition: string
    description: string
    type?: string
    price?: number
    images?: ListingCreateimagesInput | string[]
    preferredLocation?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    seller: UserCreateNestedOneWithoutListingsInput
    claims?: ClaimCreateNestedManyWithoutListingInput
    savedBy?: SavedItemCreateNestedManyWithoutListingInput
    notifications?: NotificationCreateNestedManyWithoutListingInput
    tradeRequests?: TradeRequestCreateNestedManyWithoutListingInput
  }

  export type ListingUncheckedCreateWithoutAvailabilitiesInput = {
    id?: number
    status?: string
    title: string
    category: string
    college: string
    campus?: string
    condition: string
    description: string
    type?: string
    price?: number
    images?: ListingCreateimagesInput | string[]
    preferredLocation?: string | null
    sellerId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    claims?: ClaimUncheckedCreateNestedManyWithoutListingInput
    savedBy?: SavedItemUncheckedCreateNestedManyWithoutListingInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutListingInput
    tradeRequests?: TradeRequestUncheckedCreateNestedManyWithoutListingInput
  }

  export type ListingCreateOrConnectWithoutAvailabilitiesInput = {
    where: ListingWhereUniqueInput
    create: XOR<ListingCreateWithoutAvailabilitiesInput, ListingUncheckedCreateWithoutAvailabilitiesInput>
  }

  export type ListingUpsertWithoutAvailabilitiesInput = {
    update: XOR<ListingUpdateWithoutAvailabilitiesInput, ListingUncheckedUpdateWithoutAvailabilitiesInput>
    create: XOR<ListingCreateWithoutAvailabilitiesInput, ListingUncheckedCreateWithoutAvailabilitiesInput>
    where?: ListingWhereInput
  }

  export type ListingUpdateToOneWithWhereWithoutAvailabilitiesInput = {
    where?: ListingWhereInput
    data: XOR<ListingUpdateWithoutAvailabilitiesInput, ListingUncheckedUpdateWithoutAvailabilitiesInput>
  }

  export type ListingUpdateWithoutAvailabilitiesInput = {
    status?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    college?: StringFieldUpdateOperationsInput | string
    campus?: StringFieldUpdateOperationsInput | string
    condition?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    images?: ListingUpdateimagesInput | string[]
    preferredLocation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    seller?: UserUpdateOneRequiredWithoutListingsNestedInput
    claims?: ClaimUpdateManyWithoutListingNestedInput
    savedBy?: SavedItemUpdateManyWithoutListingNestedInput
    notifications?: NotificationUpdateManyWithoutListingNestedInput
    tradeRequests?: TradeRequestUpdateManyWithoutListingNestedInput
  }

  export type ListingUncheckedUpdateWithoutAvailabilitiesInput = {
    id?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    college?: StringFieldUpdateOperationsInput | string
    campus?: StringFieldUpdateOperationsInput | string
    condition?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    images?: ListingUpdateimagesInput | string[]
    preferredLocation?: NullableStringFieldUpdateOperationsInput | string | null
    sellerId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    claims?: ClaimUncheckedUpdateManyWithoutListingNestedInput
    savedBy?: SavedItemUncheckedUpdateManyWithoutListingNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutListingNestedInput
    tradeRequests?: TradeRequestUncheckedUpdateManyWithoutListingNestedInput
  }

  export type ListingCreateWithoutTradeRequestsInput = {
    status?: string
    title: string
    category: string
    college: string
    campus?: string
    condition: string
    description: string
    type?: string
    price?: number
    images?: ListingCreateimagesInput | string[]
    preferredLocation?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    seller: UserCreateNestedOneWithoutListingsInput
    claims?: ClaimCreateNestedManyWithoutListingInput
    savedBy?: SavedItemCreateNestedManyWithoutListingInput
    notifications?: NotificationCreateNestedManyWithoutListingInput
    availabilities?: ListingAvailabilityCreateNestedManyWithoutListingInput
  }

  export type ListingUncheckedCreateWithoutTradeRequestsInput = {
    id?: number
    status?: string
    title: string
    category: string
    college: string
    campus?: string
    condition: string
    description: string
    type?: string
    price?: number
    images?: ListingCreateimagesInput | string[]
    preferredLocation?: string | null
    sellerId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    claims?: ClaimUncheckedCreateNestedManyWithoutListingInput
    savedBy?: SavedItemUncheckedCreateNestedManyWithoutListingInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutListingInput
    availabilities?: ListingAvailabilityUncheckedCreateNestedManyWithoutListingInput
  }

  export type ListingCreateOrConnectWithoutTradeRequestsInput = {
    where: ListingWhereUniqueInput
    create: XOR<ListingCreateWithoutTradeRequestsInput, ListingUncheckedCreateWithoutTradeRequestsInput>
  }

  export type UserCreateWithoutBuyerRequestsInput = {
    supabaseId: string
    email: string
    name: string
    role?: string | null
    profileCompleted?: boolean
    studentId?: string | null
    course?: string | null
    year?: string | null
    employeeId?: string | null
    position?: string | null
    office?: string | null
    college?: string | null
    campus?: string
    phone?: string | null
    bio?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    listings?: ListingCreateNestedManyWithoutSellerInput
    claims?: ClaimCreateNestedManyWithoutClaimantInput
    savedItems?: SavedItemCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    actedNotifications?: NotificationCreateNestedManyWithoutActorInput
    sellerRequests?: TradeRequestCreateNestedManyWithoutSellerInput
    tradeEvents?: TradeRequestEventCreateNestedManyWithoutActorInput
  }

  export type UserUncheckedCreateWithoutBuyerRequestsInput = {
    id?: number
    supabaseId: string
    email: string
    name: string
    role?: string | null
    profileCompleted?: boolean
    studentId?: string | null
    course?: string | null
    year?: string | null
    employeeId?: string | null
    position?: string | null
    office?: string | null
    college?: string | null
    campus?: string
    phone?: string | null
    bio?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    listings?: ListingUncheckedCreateNestedManyWithoutSellerInput
    claims?: ClaimUncheckedCreateNestedManyWithoutClaimantInput
    savedItems?: SavedItemUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    actedNotifications?: NotificationUncheckedCreateNestedManyWithoutActorInput
    sellerRequests?: TradeRequestUncheckedCreateNestedManyWithoutSellerInput
    tradeEvents?: TradeRequestEventUncheckedCreateNestedManyWithoutActorInput
  }

  export type UserCreateOrConnectWithoutBuyerRequestsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBuyerRequestsInput, UserUncheckedCreateWithoutBuyerRequestsInput>
  }

  export type UserCreateWithoutSellerRequestsInput = {
    supabaseId: string
    email: string
    name: string
    role?: string | null
    profileCompleted?: boolean
    studentId?: string | null
    course?: string | null
    year?: string | null
    employeeId?: string | null
    position?: string | null
    office?: string | null
    college?: string | null
    campus?: string
    phone?: string | null
    bio?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    listings?: ListingCreateNestedManyWithoutSellerInput
    claims?: ClaimCreateNestedManyWithoutClaimantInput
    savedItems?: SavedItemCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    actedNotifications?: NotificationCreateNestedManyWithoutActorInput
    buyerRequests?: TradeRequestCreateNestedManyWithoutBuyerInput
    tradeEvents?: TradeRequestEventCreateNestedManyWithoutActorInput
  }

  export type UserUncheckedCreateWithoutSellerRequestsInput = {
    id?: number
    supabaseId: string
    email: string
    name: string
    role?: string | null
    profileCompleted?: boolean
    studentId?: string | null
    course?: string | null
    year?: string | null
    employeeId?: string | null
    position?: string | null
    office?: string | null
    college?: string | null
    campus?: string
    phone?: string | null
    bio?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    listings?: ListingUncheckedCreateNestedManyWithoutSellerInput
    claims?: ClaimUncheckedCreateNestedManyWithoutClaimantInput
    savedItems?: SavedItemUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    actedNotifications?: NotificationUncheckedCreateNestedManyWithoutActorInput
    buyerRequests?: TradeRequestUncheckedCreateNestedManyWithoutBuyerInput
    tradeEvents?: TradeRequestEventUncheckedCreateNestedManyWithoutActorInput
  }

  export type UserCreateOrConnectWithoutSellerRequestsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSellerRequestsInput, UserUncheckedCreateWithoutSellerRequestsInput>
  }

  export type TradeRequestEventCreateWithoutRequestInput = {
    action: string
    snapshotLocation?: string | null
    snapshotDate?: string | null
    snapshotTime?: string | null
    notes?: string | null
    createdAt?: Date | string
    actor: UserCreateNestedOneWithoutTradeEventsInput
  }

  export type TradeRequestEventUncheckedCreateWithoutRequestInput = {
    id?: number
    actorId: number
    action: string
    snapshotLocation?: string | null
    snapshotDate?: string | null
    snapshotTime?: string | null
    notes?: string | null
    createdAt?: Date | string
  }

  export type TradeRequestEventCreateOrConnectWithoutRequestInput = {
    where: TradeRequestEventWhereUniqueInput
    create: XOR<TradeRequestEventCreateWithoutRequestInput, TradeRequestEventUncheckedCreateWithoutRequestInput>
  }

  export type TradeRequestEventCreateManyRequestInputEnvelope = {
    data: TradeRequestEventCreateManyRequestInput | TradeRequestEventCreateManyRequestInput[]
    skipDuplicates?: boolean
  }

  export type NotificationCreateWithoutRelatedRequestInput = {
    type: string
    title?: string | null
    message: string
    relatedItemId?: number | null
    isRead?: boolean
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutNotificationsInput
    actor?: UserCreateNestedOneWithoutActedNotificationsInput
    listing?: ListingCreateNestedOneWithoutNotificationsInput
    claim?: ClaimCreateNestedOneWithoutNotificationsInput
  }

  export type NotificationUncheckedCreateWithoutRelatedRequestInput = {
    id?: number
    userId: number
    actorId?: number | null
    type: string
    title?: string | null
    message: string
    relatedItemId?: number | null
    listingId?: number | null
    claimId?: number | null
    isRead?: boolean
    createdAt?: Date | string
  }

  export type NotificationCreateOrConnectWithoutRelatedRequestInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutRelatedRequestInput, NotificationUncheckedCreateWithoutRelatedRequestInput>
  }

  export type NotificationCreateManyRelatedRequestInputEnvelope = {
    data: NotificationCreateManyRelatedRequestInput | NotificationCreateManyRelatedRequestInput[]
    skipDuplicates?: boolean
  }

  export type ListingUpsertWithoutTradeRequestsInput = {
    update: XOR<ListingUpdateWithoutTradeRequestsInput, ListingUncheckedUpdateWithoutTradeRequestsInput>
    create: XOR<ListingCreateWithoutTradeRequestsInput, ListingUncheckedCreateWithoutTradeRequestsInput>
    where?: ListingWhereInput
  }

  export type ListingUpdateToOneWithWhereWithoutTradeRequestsInput = {
    where?: ListingWhereInput
    data: XOR<ListingUpdateWithoutTradeRequestsInput, ListingUncheckedUpdateWithoutTradeRequestsInput>
  }

  export type ListingUpdateWithoutTradeRequestsInput = {
    status?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    college?: StringFieldUpdateOperationsInput | string
    campus?: StringFieldUpdateOperationsInput | string
    condition?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    images?: ListingUpdateimagesInput | string[]
    preferredLocation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    seller?: UserUpdateOneRequiredWithoutListingsNestedInput
    claims?: ClaimUpdateManyWithoutListingNestedInput
    savedBy?: SavedItemUpdateManyWithoutListingNestedInput
    notifications?: NotificationUpdateManyWithoutListingNestedInput
    availabilities?: ListingAvailabilityUpdateManyWithoutListingNestedInput
  }

  export type ListingUncheckedUpdateWithoutTradeRequestsInput = {
    id?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    college?: StringFieldUpdateOperationsInput | string
    campus?: StringFieldUpdateOperationsInput | string
    condition?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    images?: ListingUpdateimagesInput | string[]
    preferredLocation?: NullableStringFieldUpdateOperationsInput | string | null
    sellerId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    claims?: ClaimUncheckedUpdateManyWithoutListingNestedInput
    savedBy?: SavedItemUncheckedUpdateManyWithoutListingNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutListingNestedInput
    availabilities?: ListingAvailabilityUncheckedUpdateManyWithoutListingNestedInput
  }

  export type UserUpsertWithoutBuyerRequestsInput = {
    update: XOR<UserUpdateWithoutBuyerRequestsInput, UserUncheckedUpdateWithoutBuyerRequestsInput>
    create: XOR<UserCreateWithoutBuyerRequestsInput, UserUncheckedCreateWithoutBuyerRequestsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBuyerRequestsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBuyerRequestsInput, UserUncheckedUpdateWithoutBuyerRequestsInput>
  }

  export type UserUpdateWithoutBuyerRequestsInput = {
    supabaseId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    profileCompleted?: BoolFieldUpdateOperationsInput | boolean
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    course?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableStringFieldUpdateOperationsInput | string | null
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    office?: NullableStringFieldUpdateOperationsInput | string | null
    college?: NullableStringFieldUpdateOperationsInput | string | null
    campus?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listings?: ListingUpdateManyWithoutSellerNestedInput
    claims?: ClaimUpdateManyWithoutClaimantNestedInput
    savedItems?: SavedItemUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    actedNotifications?: NotificationUpdateManyWithoutActorNestedInput
    sellerRequests?: TradeRequestUpdateManyWithoutSellerNestedInput
    tradeEvents?: TradeRequestEventUpdateManyWithoutActorNestedInput
  }

  export type UserUncheckedUpdateWithoutBuyerRequestsInput = {
    id?: IntFieldUpdateOperationsInput | number
    supabaseId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    profileCompleted?: BoolFieldUpdateOperationsInput | boolean
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    course?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableStringFieldUpdateOperationsInput | string | null
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    office?: NullableStringFieldUpdateOperationsInput | string | null
    college?: NullableStringFieldUpdateOperationsInput | string | null
    campus?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listings?: ListingUncheckedUpdateManyWithoutSellerNestedInput
    claims?: ClaimUncheckedUpdateManyWithoutClaimantNestedInput
    savedItems?: SavedItemUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    actedNotifications?: NotificationUncheckedUpdateManyWithoutActorNestedInput
    sellerRequests?: TradeRequestUncheckedUpdateManyWithoutSellerNestedInput
    tradeEvents?: TradeRequestEventUncheckedUpdateManyWithoutActorNestedInput
  }

  export type UserUpsertWithoutSellerRequestsInput = {
    update: XOR<UserUpdateWithoutSellerRequestsInput, UserUncheckedUpdateWithoutSellerRequestsInput>
    create: XOR<UserCreateWithoutSellerRequestsInput, UserUncheckedCreateWithoutSellerRequestsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSellerRequestsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSellerRequestsInput, UserUncheckedUpdateWithoutSellerRequestsInput>
  }

  export type UserUpdateWithoutSellerRequestsInput = {
    supabaseId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    profileCompleted?: BoolFieldUpdateOperationsInput | boolean
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    course?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableStringFieldUpdateOperationsInput | string | null
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    office?: NullableStringFieldUpdateOperationsInput | string | null
    college?: NullableStringFieldUpdateOperationsInput | string | null
    campus?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listings?: ListingUpdateManyWithoutSellerNestedInput
    claims?: ClaimUpdateManyWithoutClaimantNestedInput
    savedItems?: SavedItemUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    actedNotifications?: NotificationUpdateManyWithoutActorNestedInput
    buyerRequests?: TradeRequestUpdateManyWithoutBuyerNestedInput
    tradeEvents?: TradeRequestEventUpdateManyWithoutActorNestedInput
  }

  export type UserUncheckedUpdateWithoutSellerRequestsInput = {
    id?: IntFieldUpdateOperationsInput | number
    supabaseId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    profileCompleted?: BoolFieldUpdateOperationsInput | boolean
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    course?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableStringFieldUpdateOperationsInput | string | null
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    office?: NullableStringFieldUpdateOperationsInput | string | null
    college?: NullableStringFieldUpdateOperationsInput | string | null
    campus?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listings?: ListingUncheckedUpdateManyWithoutSellerNestedInput
    claims?: ClaimUncheckedUpdateManyWithoutClaimantNestedInput
    savedItems?: SavedItemUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    actedNotifications?: NotificationUncheckedUpdateManyWithoutActorNestedInput
    buyerRequests?: TradeRequestUncheckedUpdateManyWithoutBuyerNestedInput
    tradeEvents?: TradeRequestEventUncheckedUpdateManyWithoutActorNestedInput
  }

  export type TradeRequestEventUpsertWithWhereUniqueWithoutRequestInput = {
    where: TradeRequestEventWhereUniqueInput
    update: XOR<TradeRequestEventUpdateWithoutRequestInput, TradeRequestEventUncheckedUpdateWithoutRequestInput>
    create: XOR<TradeRequestEventCreateWithoutRequestInput, TradeRequestEventUncheckedCreateWithoutRequestInput>
  }

  export type TradeRequestEventUpdateWithWhereUniqueWithoutRequestInput = {
    where: TradeRequestEventWhereUniqueInput
    data: XOR<TradeRequestEventUpdateWithoutRequestInput, TradeRequestEventUncheckedUpdateWithoutRequestInput>
  }

  export type TradeRequestEventUpdateManyWithWhereWithoutRequestInput = {
    where: TradeRequestEventScalarWhereInput
    data: XOR<TradeRequestEventUpdateManyMutationInput, TradeRequestEventUncheckedUpdateManyWithoutRequestInput>
  }

  export type NotificationUpsertWithWhereUniqueWithoutRelatedRequestInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutRelatedRequestInput, NotificationUncheckedUpdateWithoutRelatedRequestInput>
    create: XOR<NotificationCreateWithoutRelatedRequestInput, NotificationUncheckedCreateWithoutRelatedRequestInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutRelatedRequestInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutRelatedRequestInput, NotificationUncheckedUpdateWithoutRelatedRequestInput>
  }

  export type NotificationUpdateManyWithWhereWithoutRelatedRequestInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutRelatedRequestInput>
  }

  export type TradeRequestCreateWithoutEventsInput = {
    meetupLocation: string
    meetupDate: string
    meetupTime: string
    notes?: string | null
    status?: string
    proposedBy?: string
    declineReason?: string | null
    customTime?: boolean
    expiresAt?: Date | string | null
    respondedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    listing: ListingCreateNestedOneWithoutTradeRequestsInput
    buyer: UserCreateNestedOneWithoutBuyerRequestsInput
    seller: UserCreateNestedOneWithoutSellerRequestsInput
    notifications?: NotificationCreateNestedManyWithoutRelatedRequestInput
  }

  export type TradeRequestUncheckedCreateWithoutEventsInput = {
    id?: number
    listingId: number
    buyerId: number
    sellerId: number
    meetupLocation: string
    meetupDate: string
    meetupTime: string
    notes?: string | null
    status?: string
    proposedBy?: string
    declineReason?: string | null
    customTime?: boolean
    expiresAt?: Date | string | null
    respondedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    notifications?: NotificationUncheckedCreateNestedManyWithoutRelatedRequestInput
  }

  export type TradeRequestCreateOrConnectWithoutEventsInput = {
    where: TradeRequestWhereUniqueInput
    create: XOR<TradeRequestCreateWithoutEventsInput, TradeRequestUncheckedCreateWithoutEventsInput>
  }

  export type UserCreateWithoutTradeEventsInput = {
    supabaseId: string
    email: string
    name: string
    role?: string | null
    profileCompleted?: boolean
    studentId?: string | null
    course?: string | null
    year?: string | null
    employeeId?: string | null
    position?: string | null
    office?: string | null
    college?: string | null
    campus?: string
    phone?: string | null
    bio?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    listings?: ListingCreateNestedManyWithoutSellerInput
    claims?: ClaimCreateNestedManyWithoutClaimantInput
    savedItems?: SavedItemCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    actedNotifications?: NotificationCreateNestedManyWithoutActorInput
    buyerRequests?: TradeRequestCreateNestedManyWithoutBuyerInput
    sellerRequests?: TradeRequestCreateNestedManyWithoutSellerInput
  }

  export type UserUncheckedCreateWithoutTradeEventsInput = {
    id?: number
    supabaseId: string
    email: string
    name: string
    role?: string | null
    profileCompleted?: boolean
    studentId?: string | null
    course?: string | null
    year?: string | null
    employeeId?: string | null
    position?: string | null
    office?: string | null
    college?: string | null
    campus?: string
    phone?: string | null
    bio?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    listings?: ListingUncheckedCreateNestedManyWithoutSellerInput
    claims?: ClaimUncheckedCreateNestedManyWithoutClaimantInput
    savedItems?: SavedItemUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    actedNotifications?: NotificationUncheckedCreateNestedManyWithoutActorInput
    buyerRequests?: TradeRequestUncheckedCreateNestedManyWithoutBuyerInput
    sellerRequests?: TradeRequestUncheckedCreateNestedManyWithoutSellerInput
  }

  export type UserCreateOrConnectWithoutTradeEventsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTradeEventsInput, UserUncheckedCreateWithoutTradeEventsInput>
  }

  export type TradeRequestUpsertWithoutEventsInput = {
    update: XOR<TradeRequestUpdateWithoutEventsInput, TradeRequestUncheckedUpdateWithoutEventsInput>
    create: XOR<TradeRequestCreateWithoutEventsInput, TradeRequestUncheckedCreateWithoutEventsInput>
    where?: TradeRequestWhereInput
  }

  export type TradeRequestUpdateToOneWithWhereWithoutEventsInput = {
    where?: TradeRequestWhereInput
    data: XOR<TradeRequestUpdateWithoutEventsInput, TradeRequestUncheckedUpdateWithoutEventsInput>
  }

  export type TradeRequestUpdateWithoutEventsInput = {
    meetupLocation?: StringFieldUpdateOperationsInput | string
    meetupDate?: StringFieldUpdateOperationsInput | string
    meetupTime?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    proposedBy?: StringFieldUpdateOperationsInput | string
    declineReason?: NullableStringFieldUpdateOperationsInput | string | null
    customTime?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listing?: ListingUpdateOneRequiredWithoutTradeRequestsNestedInput
    buyer?: UserUpdateOneRequiredWithoutBuyerRequestsNestedInput
    seller?: UserUpdateOneRequiredWithoutSellerRequestsNestedInput
    notifications?: NotificationUpdateManyWithoutRelatedRequestNestedInput
  }

  export type TradeRequestUncheckedUpdateWithoutEventsInput = {
    id?: IntFieldUpdateOperationsInput | number
    listingId?: IntFieldUpdateOperationsInput | number
    buyerId?: IntFieldUpdateOperationsInput | number
    sellerId?: IntFieldUpdateOperationsInput | number
    meetupLocation?: StringFieldUpdateOperationsInput | string
    meetupDate?: StringFieldUpdateOperationsInput | string
    meetupTime?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    proposedBy?: StringFieldUpdateOperationsInput | string
    declineReason?: NullableStringFieldUpdateOperationsInput | string | null
    customTime?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notifications?: NotificationUncheckedUpdateManyWithoutRelatedRequestNestedInput
  }

  export type UserUpsertWithoutTradeEventsInput = {
    update: XOR<UserUpdateWithoutTradeEventsInput, UserUncheckedUpdateWithoutTradeEventsInput>
    create: XOR<UserCreateWithoutTradeEventsInput, UserUncheckedCreateWithoutTradeEventsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTradeEventsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTradeEventsInput, UserUncheckedUpdateWithoutTradeEventsInput>
  }

  export type UserUpdateWithoutTradeEventsInput = {
    supabaseId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    profileCompleted?: BoolFieldUpdateOperationsInput | boolean
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    course?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableStringFieldUpdateOperationsInput | string | null
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    office?: NullableStringFieldUpdateOperationsInput | string | null
    college?: NullableStringFieldUpdateOperationsInput | string | null
    campus?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listings?: ListingUpdateManyWithoutSellerNestedInput
    claims?: ClaimUpdateManyWithoutClaimantNestedInput
    savedItems?: SavedItemUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    actedNotifications?: NotificationUpdateManyWithoutActorNestedInput
    buyerRequests?: TradeRequestUpdateManyWithoutBuyerNestedInput
    sellerRequests?: TradeRequestUpdateManyWithoutSellerNestedInput
  }

  export type UserUncheckedUpdateWithoutTradeEventsInput = {
    id?: IntFieldUpdateOperationsInput | number
    supabaseId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    profileCompleted?: BoolFieldUpdateOperationsInput | boolean
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    course?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableStringFieldUpdateOperationsInput | string | null
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    office?: NullableStringFieldUpdateOperationsInput | string | null
    college?: NullableStringFieldUpdateOperationsInput | string | null
    campus?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listings?: ListingUncheckedUpdateManyWithoutSellerNestedInput
    claims?: ClaimUncheckedUpdateManyWithoutClaimantNestedInput
    savedItems?: SavedItemUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    actedNotifications?: NotificationUncheckedUpdateManyWithoutActorNestedInput
    buyerRequests?: TradeRequestUncheckedUpdateManyWithoutBuyerNestedInput
    sellerRequests?: TradeRequestUncheckedUpdateManyWithoutSellerNestedInput
  }

  export type UserCreateWithoutNotificationsInput = {
    supabaseId: string
    email: string
    name: string
    role?: string | null
    profileCompleted?: boolean
    studentId?: string | null
    course?: string | null
    year?: string | null
    employeeId?: string | null
    position?: string | null
    office?: string | null
    college?: string | null
    campus?: string
    phone?: string | null
    bio?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    listings?: ListingCreateNestedManyWithoutSellerInput
    claims?: ClaimCreateNestedManyWithoutClaimantInput
    savedItems?: SavedItemCreateNestedManyWithoutUserInput
    actedNotifications?: NotificationCreateNestedManyWithoutActorInput
    buyerRequests?: TradeRequestCreateNestedManyWithoutBuyerInput
    sellerRequests?: TradeRequestCreateNestedManyWithoutSellerInput
    tradeEvents?: TradeRequestEventCreateNestedManyWithoutActorInput
  }

  export type UserUncheckedCreateWithoutNotificationsInput = {
    id?: number
    supabaseId: string
    email: string
    name: string
    role?: string | null
    profileCompleted?: boolean
    studentId?: string | null
    course?: string | null
    year?: string | null
    employeeId?: string | null
    position?: string | null
    office?: string | null
    college?: string | null
    campus?: string
    phone?: string | null
    bio?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    listings?: ListingUncheckedCreateNestedManyWithoutSellerInput
    claims?: ClaimUncheckedCreateNestedManyWithoutClaimantInput
    savedItems?: SavedItemUncheckedCreateNestedManyWithoutUserInput
    actedNotifications?: NotificationUncheckedCreateNestedManyWithoutActorInput
    buyerRequests?: TradeRequestUncheckedCreateNestedManyWithoutBuyerInput
    sellerRequests?: TradeRequestUncheckedCreateNestedManyWithoutSellerInput
    tradeEvents?: TradeRequestEventUncheckedCreateNestedManyWithoutActorInput
  }

  export type UserCreateOrConnectWithoutNotificationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
  }

  export type UserCreateWithoutActedNotificationsInput = {
    supabaseId: string
    email: string
    name: string
    role?: string | null
    profileCompleted?: boolean
    studentId?: string | null
    course?: string | null
    year?: string | null
    employeeId?: string | null
    position?: string | null
    office?: string | null
    college?: string | null
    campus?: string
    phone?: string | null
    bio?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    listings?: ListingCreateNestedManyWithoutSellerInput
    claims?: ClaimCreateNestedManyWithoutClaimantInput
    savedItems?: SavedItemCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    buyerRequests?: TradeRequestCreateNestedManyWithoutBuyerInput
    sellerRequests?: TradeRequestCreateNestedManyWithoutSellerInput
    tradeEvents?: TradeRequestEventCreateNestedManyWithoutActorInput
  }

  export type UserUncheckedCreateWithoutActedNotificationsInput = {
    id?: number
    supabaseId: string
    email: string
    name: string
    role?: string | null
    profileCompleted?: boolean
    studentId?: string | null
    course?: string | null
    year?: string | null
    employeeId?: string | null
    position?: string | null
    office?: string | null
    college?: string | null
    campus?: string
    phone?: string | null
    bio?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    listings?: ListingUncheckedCreateNestedManyWithoutSellerInput
    claims?: ClaimUncheckedCreateNestedManyWithoutClaimantInput
    savedItems?: SavedItemUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    buyerRequests?: TradeRequestUncheckedCreateNestedManyWithoutBuyerInput
    sellerRequests?: TradeRequestUncheckedCreateNestedManyWithoutSellerInput
    tradeEvents?: TradeRequestEventUncheckedCreateNestedManyWithoutActorInput
  }

  export type UserCreateOrConnectWithoutActedNotificationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutActedNotificationsInput, UserUncheckedCreateWithoutActedNotificationsInput>
  }

  export type TradeRequestCreateWithoutNotificationsInput = {
    meetupLocation: string
    meetupDate: string
    meetupTime: string
    notes?: string | null
    status?: string
    proposedBy?: string
    declineReason?: string | null
    customTime?: boolean
    expiresAt?: Date | string | null
    respondedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    listing: ListingCreateNestedOneWithoutTradeRequestsInput
    buyer: UserCreateNestedOneWithoutBuyerRequestsInput
    seller: UserCreateNestedOneWithoutSellerRequestsInput
    events?: TradeRequestEventCreateNestedManyWithoutRequestInput
  }

  export type TradeRequestUncheckedCreateWithoutNotificationsInput = {
    id?: number
    listingId: number
    buyerId: number
    sellerId: number
    meetupLocation: string
    meetupDate: string
    meetupTime: string
    notes?: string | null
    status?: string
    proposedBy?: string
    declineReason?: string | null
    customTime?: boolean
    expiresAt?: Date | string | null
    respondedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: TradeRequestEventUncheckedCreateNestedManyWithoutRequestInput
  }

  export type TradeRequestCreateOrConnectWithoutNotificationsInput = {
    where: TradeRequestWhereUniqueInput
    create: XOR<TradeRequestCreateWithoutNotificationsInput, TradeRequestUncheckedCreateWithoutNotificationsInput>
  }

  export type ListingCreateWithoutNotificationsInput = {
    status?: string
    title: string
    category: string
    college: string
    campus?: string
    condition: string
    description: string
    type?: string
    price?: number
    images?: ListingCreateimagesInput | string[]
    preferredLocation?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    seller: UserCreateNestedOneWithoutListingsInput
    claims?: ClaimCreateNestedManyWithoutListingInput
    savedBy?: SavedItemCreateNestedManyWithoutListingInput
    tradeRequests?: TradeRequestCreateNestedManyWithoutListingInput
    availabilities?: ListingAvailabilityCreateNestedManyWithoutListingInput
  }

  export type ListingUncheckedCreateWithoutNotificationsInput = {
    id?: number
    status?: string
    title: string
    category: string
    college: string
    campus?: string
    condition: string
    description: string
    type?: string
    price?: number
    images?: ListingCreateimagesInput | string[]
    preferredLocation?: string | null
    sellerId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    claims?: ClaimUncheckedCreateNestedManyWithoutListingInput
    savedBy?: SavedItemUncheckedCreateNestedManyWithoutListingInput
    tradeRequests?: TradeRequestUncheckedCreateNestedManyWithoutListingInput
    availabilities?: ListingAvailabilityUncheckedCreateNestedManyWithoutListingInput
  }

  export type ListingCreateOrConnectWithoutNotificationsInput = {
    where: ListingWhereUniqueInput
    create: XOR<ListingCreateWithoutNotificationsInput, ListingUncheckedCreateWithoutNotificationsInput>
  }

  export type ClaimCreateWithoutNotificationsInput = {
    status?: string
    notes?: string | null
    claimDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    listing: ListingCreateNestedOneWithoutClaimsInput
    claimant: UserCreateNestedOneWithoutClaimsInput
  }

  export type ClaimUncheckedCreateWithoutNotificationsInput = {
    id?: number
    listingId: number
    claimantId: number
    status?: string
    notes?: string | null
    claimDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClaimCreateOrConnectWithoutNotificationsInput = {
    where: ClaimWhereUniqueInput
    create: XOR<ClaimCreateWithoutNotificationsInput, ClaimUncheckedCreateWithoutNotificationsInput>
  }

  export type UserUpsertWithoutNotificationsInput = {
    update: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type UserUpdateWithoutNotificationsInput = {
    supabaseId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    profileCompleted?: BoolFieldUpdateOperationsInput | boolean
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    course?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableStringFieldUpdateOperationsInput | string | null
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    office?: NullableStringFieldUpdateOperationsInput | string | null
    college?: NullableStringFieldUpdateOperationsInput | string | null
    campus?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listings?: ListingUpdateManyWithoutSellerNestedInput
    claims?: ClaimUpdateManyWithoutClaimantNestedInput
    savedItems?: SavedItemUpdateManyWithoutUserNestedInput
    actedNotifications?: NotificationUpdateManyWithoutActorNestedInput
    buyerRequests?: TradeRequestUpdateManyWithoutBuyerNestedInput
    sellerRequests?: TradeRequestUpdateManyWithoutSellerNestedInput
    tradeEvents?: TradeRequestEventUpdateManyWithoutActorNestedInput
  }

  export type UserUncheckedUpdateWithoutNotificationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    supabaseId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    profileCompleted?: BoolFieldUpdateOperationsInput | boolean
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    course?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableStringFieldUpdateOperationsInput | string | null
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    office?: NullableStringFieldUpdateOperationsInput | string | null
    college?: NullableStringFieldUpdateOperationsInput | string | null
    campus?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listings?: ListingUncheckedUpdateManyWithoutSellerNestedInput
    claims?: ClaimUncheckedUpdateManyWithoutClaimantNestedInput
    savedItems?: SavedItemUncheckedUpdateManyWithoutUserNestedInput
    actedNotifications?: NotificationUncheckedUpdateManyWithoutActorNestedInput
    buyerRequests?: TradeRequestUncheckedUpdateManyWithoutBuyerNestedInput
    sellerRequests?: TradeRequestUncheckedUpdateManyWithoutSellerNestedInput
    tradeEvents?: TradeRequestEventUncheckedUpdateManyWithoutActorNestedInput
  }

  export type UserUpsertWithoutActedNotificationsInput = {
    update: XOR<UserUpdateWithoutActedNotificationsInput, UserUncheckedUpdateWithoutActedNotificationsInput>
    create: XOR<UserCreateWithoutActedNotificationsInput, UserUncheckedCreateWithoutActedNotificationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutActedNotificationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutActedNotificationsInput, UserUncheckedUpdateWithoutActedNotificationsInput>
  }

  export type UserUpdateWithoutActedNotificationsInput = {
    supabaseId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    profileCompleted?: BoolFieldUpdateOperationsInput | boolean
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    course?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableStringFieldUpdateOperationsInput | string | null
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    office?: NullableStringFieldUpdateOperationsInput | string | null
    college?: NullableStringFieldUpdateOperationsInput | string | null
    campus?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listings?: ListingUpdateManyWithoutSellerNestedInput
    claims?: ClaimUpdateManyWithoutClaimantNestedInput
    savedItems?: SavedItemUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    buyerRequests?: TradeRequestUpdateManyWithoutBuyerNestedInput
    sellerRequests?: TradeRequestUpdateManyWithoutSellerNestedInput
    tradeEvents?: TradeRequestEventUpdateManyWithoutActorNestedInput
  }

  export type UserUncheckedUpdateWithoutActedNotificationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    supabaseId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    profileCompleted?: BoolFieldUpdateOperationsInput | boolean
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    course?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableStringFieldUpdateOperationsInput | string | null
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    office?: NullableStringFieldUpdateOperationsInput | string | null
    college?: NullableStringFieldUpdateOperationsInput | string | null
    campus?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listings?: ListingUncheckedUpdateManyWithoutSellerNestedInput
    claims?: ClaimUncheckedUpdateManyWithoutClaimantNestedInput
    savedItems?: SavedItemUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    buyerRequests?: TradeRequestUncheckedUpdateManyWithoutBuyerNestedInput
    sellerRequests?: TradeRequestUncheckedUpdateManyWithoutSellerNestedInput
    tradeEvents?: TradeRequestEventUncheckedUpdateManyWithoutActorNestedInput
  }

  export type TradeRequestUpsertWithoutNotificationsInput = {
    update: XOR<TradeRequestUpdateWithoutNotificationsInput, TradeRequestUncheckedUpdateWithoutNotificationsInput>
    create: XOR<TradeRequestCreateWithoutNotificationsInput, TradeRequestUncheckedCreateWithoutNotificationsInput>
    where?: TradeRequestWhereInput
  }

  export type TradeRequestUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: TradeRequestWhereInput
    data: XOR<TradeRequestUpdateWithoutNotificationsInput, TradeRequestUncheckedUpdateWithoutNotificationsInput>
  }

  export type TradeRequestUpdateWithoutNotificationsInput = {
    meetupLocation?: StringFieldUpdateOperationsInput | string
    meetupDate?: StringFieldUpdateOperationsInput | string
    meetupTime?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    proposedBy?: StringFieldUpdateOperationsInput | string
    declineReason?: NullableStringFieldUpdateOperationsInput | string | null
    customTime?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listing?: ListingUpdateOneRequiredWithoutTradeRequestsNestedInput
    buyer?: UserUpdateOneRequiredWithoutBuyerRequestsNestedInput
    seller?: UserUpdateOneRequiredWithoutSellerRequestsNestedInput
    events?: TradeRequestEventUpdateManyWithoutRequestNestedInput
  }

  export type TradeRequestUncheckedUpdateWithoutNotificationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    listingId?: IntFieldUpdateOperationsInput | number
    buyerId?: IntFieldUpdateOperationsInput | number
    sellerId?: IntFieldUpdateOperationsInput | number
    meetupLocation?: StringFieldUpdateOperationsInput | string
    meetupDate?: StringFieldUpdateOperationsInput | string
    meetupTime?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    proposedBy?: StringFieldUpdateOperationsInput | string
    declineReason?: NullableStringFieldUpdateOperationsInput | string | null
    customTime?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: TradeRequestEventUncheckedUpdateManyWithoutRequestNestedInput
  }

  export type ListingUpsertWithoutNotificationsInput = {
    update: XOR<ListingUpdateWithoutNotificationsInput, ListingUncheckedUpdateWithoutNotificationsInput>
    create: XOR<ListingCreateWithoutNotificationsInput, ListingUncheckedCreateWithoutNotificationsInput>
    where?: ListingWhereInput
  }

  export type ListingUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: ListingWhereInput
    data: XOR<ListingUpdateWithoutNotificationsInput, ListingUncheckedUpdateWithoutNotificationsInput>
  }

  export type ListingUpdateWithoutNotificationsInput = {
    status?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    college?: StringFieldUpdateOperationsInput | string
    campus?: StringFieldUpdateOperationsInput | string
    condition?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    images?: ListingUpdateimagesInput | string[]
    preferredLocation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    seller?: UserUpdateOneRequiredWithoutListingsNestedInput
    claims?: ClaimUpdateManyWithoutListingNestedInput
    savedBy?: SavedItemUpdateManyWithoutListingNestedInput
    tradeRequests?: TradeRequestUpdateManyWithoutListingNestedInput
    availabilities?: ListingAvailabilityUpdateManyWithoutListingNestedInput
  }

  export type ListingUncheckedUpdateWithoutNotificationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    college?: StringFieldUpdateOperationsInput | string
    campus?: StringFieldUpdateOperationsInput | string
    condition?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    images?: ListingUpdateimagesInput | string[]
    preferredLocation?: NullableStringFieldUpdateOperationsInput | string | null
    sellerId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    claims?: ClaimUncheckedUpdateManyWithoutListingNestedInput
    savedBy?: SavedItemUncheckedUpdateManyWithoutListingNestedInput
    tradeRequests?: TradeRequestUncheckedUpdateManyWithoutListingNestedInput
    availabilities?: ListingAvailabilityUncheckedUpdateManyWithoutListingNestedInput
  }

  export type ClaimUpsertWithoutNotificationsInput = {
    update: XOR<ClaimUpdateWithoutNotificationsInput, ClaimUncheckedUpdateWithoutNotificationsInput>
    create: XOR<ClaimCreateWithoutNotificationsInput, ClaimUncheckedCreateWithoutNotificationsInput>
    where?: ClaimWhereInput
  }

  export type ClaimUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: ClaimWhereInput
    data: XOR<ClaimUpdateWithoutNotificationsInput, ClaimUncheckedUpdateWithoutNotificationsInput>
  }

  export type ClaimUpdateWithoutNotificationsInput = {
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    claimDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listing?: ListingUpdateOneRequiredWithoutClaimsNestedInput
    claimant?: UserUpdateOneRequiredWithoutClaimsNestedInput
  }

  export type ClaimUncheckedUpdateWithoutNotificationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    listingId?: IntFieldUpdateOperationsInput | number
    claimantId?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    claimDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListingCreateManySellerInput = {
    id?: number
    status?: string
    title: string
    category: string
    college: string
    campus?: string
    condition: string
    description: string
    type?: string
    price?: number
    images?: ListingCreateimagesInput | string[]
    preferredLocation?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClaimCreateManyClaimantInput = {
    id?: number
    listingId: number
    status?: string
    notes?: string | null
    claimDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SavedItemCreateManyUserInput = {
    id?: number
    listingId: number
    createdAt?: Date | string
  }

  export type NotificationCreateManyUserInput = {
    id?: number
    actorId?: number | null
    type: string
    title?: string | null
    message: string
    relatedRequestId?: number | null
    relatedItemId?: number | null
    listingId?: number | null
    claimId?: number | null
    isRead?: boolean
    createdAt?: Date | string
  }

  export type NotificationCreateManyActorInput = {
    id?: number
    userId: number
    type: string
    title?: string | null
    message: string
    relatedRequestId?: number | null
    relatedItemId?: number | null
    listingId?: number | null
    claimId?: number | null
    isRead?: boolean
    createdAt?: Date | string
  }

  export type TradeRequestCreateManyBuyerInput = {
    id?: number
    listingId: number
    sellerId: number
    meetupLocation: string
    meetupDate: string
    meetupTime: string
    notes?: string | null
    status?: string
    proposedBy?: string
    declineReason?: string | null
    customTime?: boolean
    expiresAt?: Date | string | null
    respondedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TradeRequestCreateManySellerInput = {
    id?: number
    listingId: number
    buyerId: number
    meetupLocation: string
    meetupDate: string
    meetupTime: string
    notes?: string | null
    status?: string
    proposedBy?: string
    declineReason?: string | null
    customTime?: boolean
    expiresAt?: Date | string | null
    respondedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TradeRequestEventCreateManyActorInput = {
    id?: number
    requestId: number
    action: string
    snapshotLocation?: string | null
    snapshotDate?: string | null
    snapshotTime?: string | null
    notes?: string | null
    createdAt?: Date | string
  }

  export type ListingUpdateWithoutSellerInput = {
    status?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    college?: StringFieldUpdateOperationsInput | string
    campus?: StringFieldUpdateOperationsInput | string
    condition?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    images?: ListingUpdateimagesInput | string[]
    preferredLocation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    claims?: ClaimUpdateManyWithoutListingNestedInput
    savedBy?: SavedItemUpdateManyWithoutListingNestedInput
    notifications?: NotificationUpdateManyWithoutListingNestedInput
    tradeRequests?: TradeRequestUpdateManyWithoutListingNestedInput
    availabilities?: ListingAvailabilityUpdateManyWithoutListingNestedInput
  }

  export type ListingUncheckedUpdateWithoutSellerInput = {
    id?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    college?: StringFieldUpdateOperationsInput | string
    campus?: StringFieldUpdateOperationsInput | string
    condition?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    images?: ListingUpdateimagesInput | string[]
    preferredLocation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    claims?: ClaimUncheckedUpdateManyWithoutListingNestedInput
    savedBy?: SavedItemUncheckedUpdateManyWithoutListingNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutListingNestedInput
    tradeRequests?: TradeRequestUncheckedUpdateManyWithoutListingNestedInput
    availabilities?: ListingAvailabilityUncheckedUpdateManyWithoutListingNestedInput
  }

  export type ListingUncheckedUpdateManyWithoutSellerInput = {
    id?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    college?: StringFieldUpdateOperationsInput | string
    campus?: StringFieldUpdateOperationsInput | string
    condition?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    images?: ListingUpdateimagesInput | string[]
    preferredLocation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClaimUpdateWithoutClaimantInput = {
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    claimDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listing?: ListingUpdateOneRequiredWithoutClaimsNestedInput
    notifications?: NotificationUpdateManyWithoutClaimNestedInput
  }

  export type ClaimUncheckedUpdateWithoutClaimantInput = {
    id?: IntFieldUpdateOperationsInput | number
    listingId?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    claimDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notifications?: NotificationUncheckedUpdateManyWithoutClaimNestedInput
  }

  export type ClaimUncheckedUpdateManyWithoutClaimantInput = {
    id?: IntFieldUpdateOperationsInput | number
    listingId?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    claimDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SavedItemUpdateWithoutUserInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listing?: ListingUpdateOneRequiredWithoutSavedByNestedInput
  }

  export type SavedItemUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    listingId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SavedItemUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    listingId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUpdateWithoutUserInput = {
    type?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    relatedItemId?: NullableIntFieldUpdateOperationsInput | number | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actor?: UserUpdateOneWithoutActedNotificationsNestedInput
    relatedRequest?: TradeRequestUpdateOneWithoutNotificationsNestedInput
    listing?: ListingUpdateOneWithoutNotificationsNestedInput
    claim?: ClaimUpdateOneWithoutNotificationsNestedInput
  }

  export type NotificationUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    actorId?: NullableIntFieldUpdateOperationsInput | number | null
    type?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    relatedRequestId?: NullableIntFieldUpdateOperationsInput | number | null
    relatedItemId?: NullableIntFieldUpdateOperationsInput | number | null
    listingId?: NullableIntFieldUpdateOperationsInput | number | null
    claimId?: NullableIntFieldUpdateOperationsInput | number | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    actorId?: NullableIntFieldUpdateOperationsInput | number | null
    type?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    relatedRequestId?: NullableIntFieldUpdateOperationsInput | number | null
    relatedItemId?: NullableIntFieldUpdateOperationsInput | number | null
    listingId?: NullableIntFieldUpdateOperationsInput | number | null
    claimId?: NullableIntFieldUpdateOperationsInput | number | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUpdateWithoutActorInput = {
    type?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    relatedItemId?: NullableIntFieldUpdateOperationsInput | number | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutNotificationsNestedInput
    relatedRequest?: TradeRequestUpdateOneWithoutNotificationsNestedInput
    listing?: ListingUpdateOneWithoutNotificationsNestedInput
    claim?: ClaimUpdateOneWithoutNotificationsNestedInput
  }

  export type NotificationUncheckedUpdateWithoutActorInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    relatedRequestId?: NullableIntFieldUpdateOperationsInput | number | null
    relatedItemId?: NullableIntFieldUpdateOperationsInput | number | null
    listingId?: NullableIntFieldUpdateOperationsInput | number | null
    claimId?: NullableIntFieldUpdateOperationsInput | number | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyWithoutActorInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    relatedRequestId?: NullableIntFieldUpdateOperationsInput | number | null
    relatedItemId?: NullableIntFieldUpdateOperationsInput | number | null
    listingId?: NullableIntFieldUpdateOperationsInput | number | null
    claimId?: NullableIntFieldUpdateOperationsInput | number | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeRequestUpdateWithoutBuyerInput = {
    meetupLocation?: StringFieldUpdateOperationsInput | string
    meetupDate?: StringFieldUpdateOperationsInput | string
    meetupTime?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    proposedBy?: StringFieldUpdateOperationsInput | string
    declineReason?: NullableStringFieldUpdateOperationsInput | string | null
    customTime?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listing?: ListingUpdateOneRequiredWithoutTradeRequestsNestedInput
    seller?: UserUpdateOneRequiredWithoutSellerRequestsNestedInput
    events?: TradeRequestEventUpdateManyWithoutRequestNestedInput
    notifications?: NotificationUpdateManyWithoutRelatedRequestNestedInput
  }

  export type TradeRequestUncheckedUpdateWithoutBuyerInput = {
    id?: IntFieldUpdateOperationsInput | number
    listingId?: IntFieldUpdateOperationsInput | number
    sellerId?: IntFieldUpdateOperationsInput | number
    meetupLocation?: StringFieldUpdateOperationsInput | string
    meetupDate?: StringFieldUpdateOperationsInput | string
    meetupTime?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    proposedBy?: StringFieldUpdateOperationsInput | string
    declineReason?: NullableStringFieldUpdateOperationsInput | string | null
    customTime?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: TradeRequestEventUncheckedUpdateManyWithoutRequestNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutRelatedRequestNestedInput
  }

  export type TradeRequestUncheckedUpdateManyWithoutBuyerInput = {
    id?: IntFieldUpdateOperationsInput | number
    listingId?: IntFieldUpdateOperationsInput | number
    sellerId?: IntFieldUpdateOperationsInput | number
    meetupLocation?: StringFieldUpdateOperationsInput | string
    meetupDate?: StringFieldUpdateOperationsInput | string
    meetupTime?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    proposedBy?: StringFieldUpdateOperationsInput | string
    declineReason?: NullableStringFieldUpdateOperationsInput | string | null
    customTime?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeRequestUpdateWithoutSellerInput = {
    meetupLocation?: StringFieldUpdateOperationsInput | string
    meetupDate?: StringFieldUpdateOperationsInput | string
    meetupTime?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    proposedBy?: StringFieldUpdateOperationsInput | string
    declineReason?: NullableStringFieldUpdateOperationsInput | string | null
    customTime?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listing?: ListingUpdateOneRequiredWithoutTradeRequestsNestedInput
    buyer?: UserUpdateOneRequiredWithoutBuyerRequestsNestedInput
    events?: TradeRequestEventUpdateManyWithoutRequestNestedInput
    notifications?: NotificationUpdateManyWithoutRelatedRequestNestedInput
  }

  export type TradeRequestUncheckedUpdateWithoutSellerInput = {
    id?: IntFieldUpdateOperationsInput | number
    listingId?: IntFieldUpdateOperationsInput | number
    buyerId?: IntFieldUpdateOperationsInput | number
    meetupLocation?: StringFieldUpdateOperationsInput | string
    meetupDate?: StringFieldUpdateOperationsInput | string
    meetupTime?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    proposedBy?: StringFieldUpdateOperationsInput | string
    declineReason?: NullableStringFieldUpdateOperationsInput | string | null
    customTime?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: TradeRequestEventUncheckedUpdateManyWithoutRequestNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutRelatedRequestNestedInput
  }

  export type TradeRequestUncheckedUpdateManyWithoutSellerInput = {
    id?: IntFieldUpdateOperationsInput | number
    listingId?: IntFieldUpdateOperationsInput | number
    buyerId?: IntFieldUpdateOperationsInput | number
    meetupLocation?: StringFieldUpdateOperationsInput | string
    meetupDate?: StringFieldUpdateOperationsInput | string
    meetupTime?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    proposedBy?: StringFieldUpdateOperationsInput | string
    declineReason?: NullableStringFieldUpdateOperationsInput | string | null
    customTime?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeRequestEventUpdateWithoutActorInput = {
    action?: StringFieldUpdateOperationsInput | string
    snapshotLocation?: NullableStringFieldUpdateOperationsInput | string | null
    snapshotDate?: NullableStringFieldUpdateOperationsInput | string | null
    snapshotTime?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    request?: TradeRequestUpdateOneRequiredWithoutEventsNestedInput
  }

  export type TradeRequestEventUncheckedUpdateWithoutActorInput = {
    id?: IntFieldUpdateOperationsInput | number
    requestId?: IntFieldUpdateOperationsInput | number
    action?: StringFieldUpdateOperationsInput | string
    snapshotLocation?: NullableStringFieldUpdateOperationsInput | string | null
    snapshotDate?: NullableStringFieldUpdateOperationsInput | string | null
    snapshotTime?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeRequestEventUncheckedUpdateManyWithoutActorInput = {
    id?: IntFieldUpdateOperationsInput | number
    requestId?: IntFieldUpdateOperationsInput | number
    action?: StringFieldUpdateOperationsInput | string
    snapshotLocation?: NullableStringFieldUpdateOperationsInput | string | null
    snapshotDate?: NullableStringFieldUpdateOperationsInput | string | null
    snapshotTime?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClaimCreateManyListingInput = {
    id?: number
    claimantId: number
    status?: string
    notes?: string | null
    claimDate?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SavedItemCreateManyListingInput = {
    id?: number
    userId: number
    createdAt?: Date | string
  }

  export type NotificationCreateManyListingInput = {
    id?: number
    userId: number
    actorId?: number | null
    type: string
    title?: string | null
    message: string
    relatedRequestId?: number | null
    relatedItemId?: number | null
    claimId?: number | null
    isRead?: boolean
    createdAt?: Date | string
  }

  export type TradeRequestCreateManyListingInput = {
    id?: number
    buyerId: number
    sellerId: number
    meetupLocation: string
    meetupDate: string
    meetupTime: string
    notes?: string | null
    status?: string
    proposedBy?: string
    declineReason?: string | null
    customTime?: boolean
    expiresAt?: Date | string | null
    respondedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ListingAvailabilityCreateManyListingInput = {
    id?: number
    dayOfWeek: number
    startTime: string
    endTime: string
    createdAt?: Date | string
  }

  export type ClaimUpdateWithoutListingInput = {
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    claimDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    claimant?: UserUpdateOneRequiredWithoutClaimsNestedInput
    notifications?: NotificationUpdateManyWithoutClaimNestedInput
  }

  export type ClaimUncheckedUpdateWithoutListingInput = {
    id?: IntFieldUpdateOperationsInput | number
    claimantId?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    claimDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notifications?: NotificationUncheckedUpdateManyWithoutClaimNestedInput
  }

  export type ClaimUncheckedUpdateManyWithoutListingInput = {
    id?: IntFieldUpdateOperationsInput | number
    claimantId?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    claimDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SavedItemUpdateWithoutListingInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSavedItemsNestedInput
  }

  export type SavedItemUncheckedUpdateWithoutListingInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SavedItemUncheckedUpdateManyWithoutListingInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUpdateWithoutListingInput = {
    type?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    relatedItemId?: NullableIntFieldUpdateOperationsInput | number | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutNotificationsNestedInput
    actor?: UserUpdateOneWithoutActedNotificationsNestedInput
    relatedRequest?: TradeRequestUpdateOneWithoutNotificationsNestedInput
    claim?: ClaimUpdateOneWithoutNotificationsNestedInput
  }

  export type NotificationUncheckedUpdateWithoutListingInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    actorId?: NullableIntFieldUpdateOperationsInput | number | null
    type?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    relatedRequestId?: NullableIntFieldUpdateOperationsInput | number | null
    relatedItemId?: NullableIntFieldUpdateOperationsInput | number | null
    claimId?: NullableIntFieldUpdateOperationsInput | number | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyWithoutListingInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    actorId?: NullableIntFieldUpdateOperationsInput | number | null
    type?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    relatedRequestId?: NullableIntFieldUpdateOperationsInput | number | null
    relatedItemId?: NullableIntFieldUpdateOperationsInput | number | null
    claimId?: NullableIntFieldUpdateOperationsInput | number | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeRequestUpdateWithoutListingInput = {
    meetupLocation?: StringFieldUpdateOperationsInput | string
    meetupDate?: StringFieldUpdateOperationsInput | string
    meetupTime?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    proposedBy?: StringFieldUpdateOperationsInput | string
    declineReason?: NullableStringFieldUpdateOperationsInput | string | null
    customTime?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    buyer?: UserUpdateOneRequiredWithoutBuyerRequestsNestedInput
    seller?: UserUpdateOneRequiredWithoutSellerRequestsNestedInput
    events?: TradeRequestEventUpdateManyWithoutRequestNestedInput
    notifications?: NotificationUpdateManyWithoutRelatedRequestNestedInput
  }

  export type TradeRequestUncheckedUpdateWithoutListingInput = {
    id?: IntFieldUpdateOperationsInput | number
    buyerId?: IntFieldUpdateOperationsInput | number
    sellerId?: IntFieldUpdateOperationsInput | number
    meetupLocation?: StringFieldUpdateOperationsInput | string
    meetupDate?: StringFieldUpdateOperationsInput | string
    meetupTime?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    proposedBy?: StringFieldUpdateOperationsInput | string
    declineReason?: NullableStringFieldUpdateOperationsInput | string | null
    customTime?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: TradeRequestEventUncheckedUpdateManyWithoutRequestNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutRelatedRequestNestedInput
  }

  export type TradeRequestUncheckedUpdateManyWithoutListingInput = {
    id?: IntFieldUpdateOperationsInput | number
    buyerId?: IntFieldUpdateOperationsInput | number
    sellerId?: IntFieldUpdateOperationsInput | number
    meetupLocation?: StringFieldUpdateOperationsInput | string
    meetupDate?: StringFieldUpdateOperationsInput | string
    meetupTime?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    proposedBy?: StringFieldUpdateOperationsInput | string
    declineReason?: NullableStringFieldUpdateOperationsInput | string | null
    customTime?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListingAvailabilityUpdateWithoutListingInput = {
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListingAvailabilityUncheckedUpdateWithoutListingInput = {
    id?: IntFieldUpdateOperationsInput | number
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListingAvailabilityUncheckedUpdateManyWithoutListingInput = {
    id?: IntFieldUpdateOperationsInput | number
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateManyClaimInput = {
    id?: number
    userId: number
    actorId?: number | null
    type: string
    title?: string | null
    message: string
    relatedRequestId?: number | null
    relatedItemId?: number | null
    listingId?: number | null
    isRead?: boolean
    createdAt?: Date | string
  }

  export type NotificationUpdateWithoutClaimInput = {
    type?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    relatedItemId?: NullableIntFieldUpdateOperationsInput | number | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutNotificationsNestedInput
    actor?: UserUpdateOneWithoutActedNotificationsNestedInput
    relatedRequest?: TradeRequestUpdateOneWithoutNotificationsNestedInput
    listing?: ListingUpdateOneWithoutNotificationsNestedInput
  }

  export type NotificationUncheckedUpdateWithoutClaimInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    actorId?: NullableIntFieldUpdateOperationsInput | number | null
    type?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    relatedRequestId?: NullableIntFieldUpdateOperationsInput | number | null
    relatedItemId?: NullableIntFieldUpdateOperationsInput | number | null
    listingId?: NullableIntFieldUpdateOperationsInput | number | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyWithoutClaimInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    actorId?: NullableIntFieldUpdateOperationsInput | number | null
    type?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    relatedRequestId?: NullableIntFieldUpdateOperationsInput | number | null
    relatedItemId?: NullableIntFieldUpdateOperationsInput | number | null
    listingId?: NullableIntFieldUpdateOperationsInput | number | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeRequestEventCreateManyRequestInput = {
    id?: number
    actorId: number
    action: string
    snapshotLocation?: string | null
    snapshotDate?: string | null
    snapshotTime?: string | null
    notes?: string | null
    createdAt?: Date | string
  }

  export type NotificationCreateManyRelatedRequestInput = {
    id?: number
    userId: number
    actorId?: number | null
    type: string
    title?: string | null
    message: string
    relatedItemId?: number | null
    listingId?: number | null
    claimId?: number | null
    isRead?: boolean
    createdAt?: Date | string
  }

  export type TradeRequestEventUpdateWithoutRequestInput = {
    action?: StringFieldUpdateOperationsInput | string
    snapshotLocation?: NullableStringFieldUpdateOperationsInput | string | null
    snapshotDate?: NullableStringFieldUpdateOperationsInput | string | null
    snapshotTime?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actor?: UserUpdateOneRequiredWithoutTradeEventsNestedInput
  }

  export type TradeRequestEventUncheckedUpdateWithoutRequestInput = {
    id?: IntFieldUpdateOperationsInput | number
    actorId?: IntFieldUpdateOperationsInput | number
    action?: StringFieldUpdateOperationsInput | string
    snapshotLocation?: NullableStringFieldUpdateOperationsInput | string | null
    snapshotDate?: NullableStringFieldUpdateOperationsInput | string | null
    snapshotTime?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeRequestEventUncheckedUpdateManyWithoutRequestInput = {
    id?: IntFieldUpdateOperationsInput | number
    actorId?: IntFieldUpdateOperationsInput | number
    action?: StringFieldUpdateOperationsInput | string
    snapshotLocation?: NullableStringFieldUpdateOperationsInput | string | null
    snapshotDate?: NullableStringFieldUpdateOperationsInput | string | null
    snapshotTime?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUpdateWithoutRelatedRequestInput = {
    type?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    relatedItemId?: NullableIntFieldUpdateOperationsInput | number | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutNotificationsNestedInput
    actor?: UserUpdateOneWithoutActedNotificationsNestedInput
    listing?: ListingUpdateOneWithoutNotificationsNestedInput
    claim?: ClaimUpdateOneWithoutNotificationsNestedInput
  }

  export type NotificationUncheckedUpdateWithoutRelatedRequestInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    actorId?: NullableIntFieldUpdateOperationsInput | number | null
    type?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    relatedItemId?: NullableIntFieldUpdateOperationsInput | number | null
    listingId?: NullableIntFieldUpdateOperationsInput | number | null
    claimId?: NullableIntFieldUpdateOperationsInput | number | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyWithoutRelatedRequestInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    actorId?: NullableIntFieldUpdateOperationsInput | number | null
    type?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    relatedItemId?: NullableIntFieldUpdateOperationsInput | number | null
    listingId?: NullableIntFieldUpdateOperationsInput | number | null
    claimId?: NullableIntFieldUpdateOperationsInput | number | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}