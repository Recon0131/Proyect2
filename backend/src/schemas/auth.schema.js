import { z } from "zod";

export const registerSchema = z.object({
  username: z.string({
    required_error: "Username is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      required_error: "Email is invalid",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, { required_error: "Password must be at least 6 characters" }),
  description: z
  .string({
    required_error: "Your Description is required",
  }),
  phone: z
  .string({
    required_error: "Your Phone is required",
  }),
  direction: z
  .string({
    required_error: "Your Direction is required",
  })
    
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      required_error: "Email is not valid",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, { required_error: "Password must be at least 6 characters" }),
});
export const feedbackSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  email: z
  .string({
    required_error: "Email is required",
  })
  .email({
    required_error: "Email is invalid",
  }),
  message:z
  .string({
    required_error: "Message is required",
  })
})  
export const updateSchema = z.object({
  username: z.string({
    required_error: "Username is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      required_error: "Email is invalid",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, { required_error: "Password must be at least 6 characters" }),
  description: z
  .string({
    required_error: "Your Description is required",
  }),
  phone: z
  .string({
    required_error: "Your Phone is required",
  }),
  direction: z
  .string({
    required_error: "Your Direction is required",
  })
    
});