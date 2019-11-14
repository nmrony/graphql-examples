export interface IResolverMap {
  [key: string]: {
    [key: string]: (parent: any, args: any, context: object, info: any) => any;
  };
}
