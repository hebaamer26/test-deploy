'use server'
import axios, { AxiosError, AxiosRequestConfig } from "axios"
import zod from "zod";

const ForgetPasswordSchema = zod.object({
    email: zod.string().email("Invalid email address").regex(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, "Please enter a valid Gmail address"),
});

export type ForgetPasswordTypes = zod.infer<typeof ForgetPasswordSchema>;

export async function ForgetPasswordServerAction(userData: ForgetPasswordTypes) {
    const validationResult = ForgetPasswordSchema.safeParse(userData)
    if (!validationResult.success) {
        const errors: Record<string, string> = {}
        validationResult.error.issues.forEach((issue) => {
            const field = issue.path[0] as string
            const message = issue.message
            if (!errors[field]) {
                errors[field] = message
            }
        })
        return {
            success: false,
            message: "validation errors",
            errors
        }
    }

    try {
        const options: AxiosRequestConfig = {
            url: "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
            method: "post",
            data: validationResult.data
        }
        const { data } = await axios.request(options)

        return {
            success: true,
            message: data.message || 'Reset code sent to your email',
            data
        }

    } catch (error) {
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data?.message || "Something went wrong";
            return {
                success: false,
                message: errorMessage,
            }
        }
        return {
            success: false,
            message: "Failed to send reset code. Please try again later."
        }
    }
}
