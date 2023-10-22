import { z } from 'zod';

export const validate = <T extends z.ZodType>(schema: T, formData: FormData) => {
  try {
    const parsed = schema.parse(Object.fromEntries(formData))
    return [parsed, true]
  } catch (e) {
    if (e instanceof z.ZodError) {
      const errors = e.errors.reduce(
        (acc: any, { path, message }: z.ZodIssue) =>
        ({...acc, [path[0]]: [message]}),
        {}
      )
      return [{ errors }, false]
    } else {
      throw e;
    }
  }
}