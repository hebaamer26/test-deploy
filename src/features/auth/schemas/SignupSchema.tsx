import * as zod from "zod"

//schema (validation)
 export const SignupSchema=zod.object({
    name:zod.string().nonempty('Name is required')
    .regex(/^[A-Za-z]/, "Username must start with a letter")
    .min(4,"Username must be at least 4 characters")
    .max(20,"Username must not exceed 20 characters"),
    email: zod.string().nonempty("Email is required")
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email"),
    password:zod.string().nonempty("Password is required")
    .regex(/^.{8,}$/,"Password must be at least 8 characters")
    .regex(/(?=.*[a-z])/,"Password must contain at least one lowercase letter")
    .regex(/(?=.*[A-Z])/,"Password must contain at least one uppercase letter")
    .regex(/[!@#$%^&*]/,"Password must contain least one special character"),
    rePassword:zod.string().nonempty("Please confirm your password"),
    phone:zod.string().nonempty("phone number is required").regex(/^(\+2)?01[0125][0-9]{8}$/,"only Egyptian phone numbers are allowed")
    
  }).refine((data)=> data.password==data.rePassword,{path:['rePassword'],message:"Passwords do not match"} );


  export type SignupTypes= zod.infer<typeof SignupSchema>

