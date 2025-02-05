import { z } from "zod";
import { ALL_ERROR_MESSAGES } from "./error-msgs";

export function createValidationHandler<T, R>({
  serviceCall,

  responseKey = "responseData",
}: {
  serviceCall: (
    data: T
  ) => Promise<{ success: boolean; error?: { code: string }; data: R }>;

  responseKey?: string;
}) {
  return async function (data: T, ctx: any) {
    let errorMessages = ALL_ERROR_MESSAGES;

    try {
      const result = await serviceCall(data);

      if (!result.success) {
        let errorConfig = result.error?.code
          ? errorMessages[result.error.code] || errorMessages.DEFAULT
          : errorMessages.DEFAULT;

        if (typeof errorConfig === "string") {
          errorConfig = JSON.parse(errorConfig);
        }

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
