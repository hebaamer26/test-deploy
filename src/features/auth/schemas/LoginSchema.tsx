import * as zod from "zod"

//schema (validation)
 export const LoginSchema=zod.object({
    email: zod.string().nonempty("Email is required")
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email"),
    password:zod.string().nonempty("Password is required"),

    rememberUser:zod.boolean()
    
    
  })


  export type LoginTypes= zod.infer<typeof LoginSchema>

