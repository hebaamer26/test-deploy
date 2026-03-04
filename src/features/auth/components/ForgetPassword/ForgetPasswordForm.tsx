"use client"
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import zod from "zod";
import { Button } from "@heroui/react";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { ImSpinner3 } from "react-icons/im";
import { ForgetPasswordServerAction, VerifyResetCodeServerAction } from "../../Server/ForgetPasswordServer";
import { useState, useEffect } from "react";

const ForgetPasswordSchema = zod.object({
    email: zod.string().email("Invalid email address").regex(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, "Please enter a valid Gmail address"),
});

export type ForgetPasswordTypes = zod.infer<typeof ForgetPasswordSchema>;

const VerifyResetCodeSchema = zod.object({
    resetCode: zod.string().min(1, "Reset code is required"),
});

export type VerifyResetCodeTypes = zod.infer<typeof VerifyResetCodeSchema>;

export default function ForgetPasswordForm() {
    const router = useRouter();

    const [step, setStep] = useState<"email" | "verify">("email");
    const [submittedEmail, setSubmittedEmail] = useState("");
    const [timeLeft, setTimeLeft] = useState(0);
    const [isResending, setIsResending] = useState(false);

    useEffect(() => {
        if (timeLeft <= 0) return;

        const timerId = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [timeLeft]);

    const {
        handleSubmit: handleEmailSubmit,
        register: registerEmail,
        formState: { errors: emailErrors, isSubmitting: isSubmittingEmail },
        setError: setEmailError,
    } = useForm<ForgetPasswordTypes>({
        defaultValues: { email: "" },
        resolver: zodResolver(ForgetPasswordSchema),
        mode: 'onSubmit',
        reValidateMode: 'onChange'
    });

    const {
        handleSubmit: handleVerifySubmit,
        register: registerVerify,
        formState: { errors: verifyErrors, isSubmitting: isSubmittingVerify },
        setError: setVerifyError,
    } = useForm<VerifyResetCodeTypes>({
        defaultValues: { resetCode: "" },
        resolver: zodResolver(VerifyResetCodeSchema),
        mode: 'onSubmit',
        reValidateMode: 'onChange'
    });

    async function onSubmitEmail(userData: ForgetPasswordTypes) {
        try {
            const response = await ForgetPasswordServerAction(userData)

            if (response?.success) {
                toast.success(response.message)
                setSubmittedEmail(userData.email);
                setTimeLeft(60);
                setStep("verify");
            } else {
                if (response?.errors) {
                    Object.keys(response.errors).forEach((key) => {
                        setEmailError(key as keyof ForgetPasswordTypes, { message: String(response.errors[key]) })
                    });
                } else {
                    toast.error(response?.message)
                }
            }
        } catch (error) {
            toast.error("An unexpected error occurred.")
        }
    }

    async function onSubmitVerify(data: VerifyResetCodeTypes) {
        try {
            const response = await VerifyResetCodeServerAction(data);

            if (response?.success) {
                toast.success(response.message);
                setTimeout(() => {
                    router.push("/login");
                }, 2000);
            } else {
                if (response?.errors) {
                    Object.keys(response.errors).forEach((key) => {
                        setVerifyError(key as keyof VerifyResetCodeTypes, { message: String(response.errors[key]) });
                    });
                } else {
                    toast.error(response?.message);
                }
            }
        } catch (error) {
            toast.error("An unexpected error occurred.");
        }
    }

    async function handleResendCode() {
        if (!submittedEmail || timeLeft > 0) return;

        setIsResending(true);
        try {
            const response = await ForgetPasswordServerAction({ email: submittedEmail });

            if (response?.success) {
                toast.success("A new code has been sent to your email.");
                setTimeLeft(60); // Reset timer to 60 seconds
            } else {
                toast.error(response?.message || "Failed to resend code.");
            }
        } catch (error) {
            toast.error("An unexpected error occurred.");
        } finally {
            setIsResending(false);
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
                                    {step === "email" ? "Forgot Password?" : "Verify Reset Code"}
                                </h2>
                                <p className="text-gray-600 text-center">
                                    {step === "email"
                                        ? "Enter your email address to receive a verification code."
                                        : "Enter the code sent to your email address."}
                                </p>
                            </div>

                            {step === "email" ? (
                                <form onSubmit={handleEmailSubmit(onSubmitEmail)}>
                                    {/* Email */}
                                    <div className="flex flex-col pt-6">
                                        <label htmlFor="email" className="pb-2">Email Address *</label>
                                        <input id="email"
                                            {...registerEmail("email")}
                                            type="email"
                                            className="px-3 border-2 border-zinc-200 rounded-lg py-3"
                                            placeholder="name@example.com"
                                        />
                                        {emailErrors.email && (<p className="text-red-500 mt-2 mx-1">{emailErrors.email.message}</p>)}
                                    </div>

                                    <div className="mt-8 mb-4">
                                        <Button
                                            type="submit"
                                            className="w-full bg-orange-400 text-white py-3 rounded-lg"
                                            isDisabled={isSubmittingEmail}
                                        >
                                            {isSubmittingEmail ? <div className="flex justify-center items-center"> <ImSpinner3 className="animate-spin me-2" />
                                                <span>Sending ...</span>
                                            </div> : <>Send Reset Code</>}
                                        </Button>
                                    </div>
                                </form>
                            ) : (
                                <form onSubmit={handleVerifySubmit(onSubmitVerify)}>
                                    {/* Verification Code */}
                                    <div className="flex flex-col pt-6">
                                        <label htmlFor="resetCode" className="pb-2">Verification Code *</label>
                                        <input id="resetCode"
                                            {...registerVerify("resetCode")}
                                            type="text"
                                            className="px-3 border-2 border-zinc-200 rounded-lg py-3 text-center tracking-widest text-lg font-semibold"
                                            placeholder="Enter code"
                                        />
                                        {verifyErrors.resetCode && (<p className="text-red-500 mt-2 mx-1">{verifyErrors.resetCode.message}</p>)}
                                    </div>

                                    <div className="mt-8 mb-4">
                                        <Button
                                            type="submit"
                                            className="w-full bg-orange-400 text-white py-3 rounded-lg"
                                            isDisabled={isSubmittingVerify}
                                        >
                                            {isSubmittingVerify ? <div className="flex justify-center items-center"> <ImSpinner3 className="animate-spin me-2" />
                                                <span>Verifying ...</span>
                                            </div> : <>Verify Code</>}
                                        </Button>
                                    </div>

                                    {/* Resend Code Section */}
                                    <div className="mt-4 text-center">
                                        <p className="text-gray-600 text-sm mb-2">Didn't receive the code?</p>
                                        <Button
                                            type="button"
                                            variant="light"
                                            className={`font-medium ${timeLeft > 0 ? "text-gray-400" : "text-orange-600 hover:text-orange-700"} bg-transparent p-0 h-auto disabled:opacity-70`}
                                            isDisabled={timeLeft > 0 || isResending}
                                            onPress={handleResendCode}
                                        >
                                            {isResending ? (
                                                <div className="flex justify-center items-center">
                                                    <ImSpinner3 className="animate-spin me-2" />
                                                    <span>Resending...</span>
                                                </div>
                                            ) : timeLeft > 0 ? (
                                                `Resend Code in ${timeLeft}s`
                                            ) : (
                                                "Resend Code"
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            )}

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
