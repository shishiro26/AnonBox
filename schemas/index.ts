import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});

export const RegisterSchema = z
  .object({
    name: z.string().min(4, {
      message: "Minimum of 4 characters required",
    }),
    email: z.string().email({
      message: "Email is required",
    }),
    password: z.string({ required_error: "Password is required" }).min(6, {
      message: "Minimum of 6 characters required",
    }),
    confirmPassword: z.string().min(6, {
      message: "Minimum of 6 characters required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  .superRefine(({ password }, checkPassComplexity) => {
    const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
    const containsLowercase = (ch: string) => /[a-z]/.test(ch);
    const containsSpecialChar = (ch: string) =>
      /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);

    const errors = [];

    if (!containsLowercase(password)) {
      errors.push(`Password must contain at least one lowercase letter.`);
    }

    if (!containsUppercase(password)) {
      errors.push(`Password must contain at least one uppercase letter.`);
    }

    if (!containsSpecialChar(password)) {
      errors.push(`Password must contain at least one special character.`);
    }

    if (!/\d/.test(password)) {
      errors.push("Password must contain at least one number.\n");
    }

    if (errors.length > 0) {
      checkPassComplexity.addIssue({
        code: "custom",
        path: ["password"],
        message: errors.join("\n"),
      });
    }
  });

export const ComplaintSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(1000, "Description is too long"),
  attachments: z
    .array(
      z
        .instanceof(File)
        .refine(
          (file) => file.size <= 5 * 1024 * 1024,
          "File size should be less than 5MB"
        )
    )
    .optional(),
});
