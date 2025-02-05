import { z } from "zod";

export function createValidationHandler<T, R>({
  serviceCall,
  errorMessages,
  responseKey = "responseData",
}: {
  serviceCall: (
    data: T
  ) => Promise<{ success: boolean; error?: { code: string }; data: R }>;
  errorMessages: ErrorMessageCollection;
  responseKey?: string;
}) {
  return async function (data: T, ctx: any) {
    try {
      const result = await serviceCall(data);

      if (!result.success) {
        const errorConfig = result.error?.code
          ? errorMessages[result.error.code] || errorMessages.DEFAULT
          : errorMessages.DEFAULT;

        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: errorConfig.message,
          path: errorConfig.path,
        });
        return z.NEVER;
      }
      return { ...data, [responseKey]: result.data };
    } catch (error) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: errorMessages.SERVER_ERROR.message,
        path: errorMessages.SERVER_ERROR.path,
      });
      return z.NEVER;
    }
  };
}
// We are making assumptions that we have a errorMessages.DEFAULT or errorMessages.SERVER_ERROR
//On TS we need these types:

type ErrorMessageConfig = {
  message: string;
  path: string[];
};

type ErrorMessageCollection = {
  [key: string]: ErrorMessageConfig;
  // Ensure we at least have these required entries
  DEFAULT: ErrorMessageConfig;
  SERVER_ERROR: ErrorMessageConfig;
};
