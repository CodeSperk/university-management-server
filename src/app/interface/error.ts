export type TErrorSources = {
  path: string;
  message: string;
}[];

export type TGenericErrorResponse = {
  statusCode: number;
  messege: string;
  errorSources: TErrorSources;
};
