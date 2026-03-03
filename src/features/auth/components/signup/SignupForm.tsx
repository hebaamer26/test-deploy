"use client";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { SignupSchema } from "../../schemas/SignupSchema";
import { SignupTypes } from "../../schemas/SignupSchema";
import { SignupServerAction } from "../../Server/SignupServer";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { Button, Checkbox } from "@heroui/react";
import { ImSpinner } from "react-icons/im";








export default function SignupForm() {
  const router = useRouter()

  let { handleSubmit, register, formState: { errors, isSubmitting }, setError } = useForm<SignupTypes>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ''

    },
    resolver: zodResolver(SignupSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange'
  })


  async function formData(userData: SignupTypes) {
    try {
      const response = await SignupServerAction(userData)
      console.log(response)

      if (response?.success) {
        toast.success(response.message)
        setTimeout(() => {
          router.push("/login")
        }, 2000);

      } else {
        if (response?.errors) {
          Object.keys(response.errors).forEach((key) => {
            setError(key as keyof SignupTypes, { message: String(response.errors[key]) })

          });

        }
      }

    } catch (error) {

    }

  }





  return (
    <>

      <div className="min-h-[calc(100vh-120px)] flex">
        {/* Left Section */}
        <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-orange-50 to-orange-100 flex-col items-center justify-center py-12 px-12 ">
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
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-white pt-10">
          <div className="w-full max-w-xl">

            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 ">
              <div className="mb-4">
                {/* Logo */}
                <div className="flex items-center justify-center mb-3">
                  <div className="font-extrabold text-3xl tracking-tight">
                    <span className="text-orange-500 drop-shadow-md">Fresh</span>
                    <span className="text-black">Cart</span>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
                  Create Your Account
                </h2>
                <p className="text-gray-600 text-center">
                  Start your fresh journey with us today
                </p>
              </div>

              <form onSubmit={handleSubmit(formData)}>
                {/* name */}
                <div className="flex flex-col pt-4">
                  <label htmlFor="name" className="pb-2">Name *</label>
                  <input id="name"
                    {...register("name")}
                    type="name"
                    className="px-3 border-2 border-zinc-200 rounded-lg py-3"
                  />
                  {errors.name ? (<p className="text-red-500 mt-2  mx-1">{errors.name.message}</p>) : ''}
                </div>
                {/* Email */}
                <div className="flex flex-col pt-4">
                  <label htmlFor="email" className="pb-2">Email Address *</label>
                  <input id="email"
                    {...register("email")}
                    type="email"
                    className="px-3 border-2 border-zinc-200 rounded-lg py-3"
                  />
                  {errors.email ? (<p className="text-red-500 mt-2  mx-1">{errors.email.message}</p>) : ''}
                </div>
                {/* Password */}
                <div className="flex flex-col pt-4">
                  <label htmlFor="password" className="pb-2">Password *</label>
                  <input id="password"
                    {...register("password")}
                    type="password"
                    className="w-full px-3 border-2 border-zinc-200 rounded-lg py-3 "

                  />
                  {errors.password ? (<p className="text-red-500 mt-2  mx-1">{errors.password.message}</p>) : ''}
                </div>
                {/* rePassword*/}
                <div className="flex flex-col pt-4">
                  <label htmlFor="rePassword" className="pb-2">Confirm Password *</label>
                  <input id="rePassword"
                    {...register("rePassword")}
                    type="Password"
                    className="w-full px-3 border-2 border-zinc-200 rounded-lg py-3 "

                  />
                  {errors.rePassword ? (<p className="text-red-500 mt-2  mx-1">{errors.rePassword.message}</p>) : ''}
                </div>
                {/* Phone Number*/}
                <div className="flex flex-col pt-4 pb-5">
                  <label htmlFor="phone" className="pb-2">Phone Number *</label>
                  <input id="phone"
                    {...register("phone")}
                    type="phone"
                    className="w-full px-3 border-2 border-zinc-200 rounded-lg py-3 "

                  />
                  {errors.phone ? (<p className="text-red-500 mt-2  mx-1">{errors.phone.message}</p>) : ''}
                </div>






                <Button
                  type="submit"
                  className="w-full bg-orange-500 text-white py-3 rounded-lg"
                >
                  {isSubmitting ? <div className="flex justify-center items-center"> <ImSpinner className="me-2 " />
                    <span>Signing up ...</span>
                  </div> : <>Sign up</>}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600">Do you have an account ? <Link className='text-orange-600 font-medium ' href={"/login"}> Sign in</Link></p>
              </div>
            </div>



          </div>
        </div>
      </div>


    </>
  )
}

