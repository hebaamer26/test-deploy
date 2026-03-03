"use client"
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import zod from "zod";
import { Button } from "@heroui/react";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { ImSpinner3 } from "react-icons/im";
import { ForgetPasswordServerAction } from "../../Server/ForgetPasswordServer";

const ForgetPasswordSchema = zod.object({
    email: zod.string().email("Invalid email address").regex(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, "Please enter a valid Gmail address"),
});

export type ForgetPasswordTypes = zod.infer<typeof ForgetPasswordSchema>;

export default function ForgetPasswordForm() {
    const router = useRouter();

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        setError
    } = useForm<ForgetPasswordTypes>({
        defaultValues: {
            email: "",
        },
        resolver: zodResolver(ForgetPasswordSchema),
        mode: 'onSubmit',
        reValidateMode: 'onChange'
    });

    async function ForgetPasswordFormData(userData: ForgetPasswordTypes) {
        try {
            const response = await ForgetPasswordServerAction(userData)

            if (response?.success) {
                toast.success(response.message)
                // Optionally redirect to a verify code page, but typical reset flows
                // let the user stay or navigate back to login. Let's redirect to login for now.
                setTimeout(() => {
                    router.push("/ResetPassword")
                }, 2000);
            } else {
                if (response?.errors) {
                    Object.keys(response.errors).forEach((key) => {
                        setError(key as keyof ForgetPasswordTypes, { message: String(response.errors[key]) })
                    });
                } else {
                    toast.error(response?.message)
                }
            }
        } catch (error) {
            toast.error("An unexpected error occurred.")
        }
    }

    return (
        <>
            <div className="min-h-screen flex ">
                {/* Left Section */}
                <div className=" hidden lg:flex lg:w-1/2 bg-linear-to-br from-orange-50 to-orange-100 flex-col items-center justify-center py-12 px-12">
                    <div className="max-w-lg w-full">
                        <img
                            src="/images/remote-online-shopping-vector-41157205 (1).png"
                            alt="Online shopping illustration"
                            className="w-full h-auto mb-8 rounded-lg shadow-lg"
                        />
                        <div className="text-center">
                            <h3 className="text-3xl font-bold text-gray-700 mb-4">
                                Fresh Groceries Delivered
                            </h3>
                            <p className="text-gray-600 text-lg">
                                Join thousands of happy customers who trust FreshCart for their daily grocery needs
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-white">
                    <div className="w-full max-w-lg">

                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 ">
                            <div className="mb-4">
                                <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
                                    <span className="text-orange-400">Fresh</span>Cart
                                </h2>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
                                    Forgot Password?
                                </h2>
                                <p className="text-gray-600 text-center">
                                    Enter your email address to receive a verification code.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit(ForgetPasswordFormData)}>
                                {/* Email */}
                                <div className="flex flex-col pt-6">
                                    <label htmlFor="email" className="pb-2">Email Address *</label>
                                    <input id="email"
                                        {...register("email")}
                                        type="email"
                                        className="px-3 border-2 border-zinc-200 rounded-lg py-3"
                                        placeholder="name@example.com"
                                    />
                                    {errors.email ? (<p className="text-red-500 mt-2  mx-1">{errors.email.message}</p>) : ''}
                                </div>

                                <div className="mt-8 mb-4">
                                    <Button
                                        type="submit"
                                        className="w-full bg-orange-400 text-white py-3 rounded-lg"
                                        isDisabled={isSubmitting}
                                    >
                                        {isSubmitting ? <div className="flex justify-center items-center"> <ImSpinner3 className="animate-spin me-2 " />
                                            <span>Sending ...</span>
                                        </div> : <>Send Reset Code</>}
                                    </Button>
                                </div>
                            </form>

                            <div className="mt-6 text-center">
                                <p className="text-gray-600">Remember your password? <Link className='text-orange-600 font-medium ' href={"/login"}> Sign In</Link></p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
