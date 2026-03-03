'use client'

import React from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/Hooks';
import { closeAuthModal } from '@/store/uiSlice';
import { BiX, BiUserCircle } from 'react-icons/bi';
import { appStateType } from '@/store/AppStore';

export default function AuthModal() {
    const dispatch = useAppDispatch();
    const { isAuthModalOpen, authModalMessage } = useAppSelector((state: appStateType) => state.ui);

    if (!isAuthModalOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative mx-4 animate-in zoom-in-95 duration-200">

                {/* Close Button */}
                <button
                    onClick={() => dispatch(closeAuthModal())}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Close modal"
                >
                    <BiX className="w-6 h-6" />
                </button>

                {/* Modal Content */}
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-2">
                        <BiUserCircle className="w-10 h-10 text-orange-500" />
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900">Sign In Required</h2>

                    <p className="text-gray-600 text-[15px] leading-relaxed px-4 pb-4">
                        {authModalMessage}
                    </p>

                    <div className="flex flex-col w-full gap-3 pt-2">
                        <Link
                            href="/login"
                            onClick={() => dispatch(closeAuthModal())}
                            className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                        >
                            Sign In
                        </Link>

                        <Link
                            href="/signup"
                            onClick={() => dispatch(closeAuthModal())}
                            className="w-full py-3.5 bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-xl transition-all"
                        >
                            Create Account
                        </Link>
                    </div>

                    <button
                        onClick={() => dispatch(closeAuthModal())}
                        className="text-sm font-medium text-gray-500 hover:text-orange-500 mt-2 transition-colors"
                    >
                        Continue browsing
                    </button>
                </div>
            </div>
        </div>
    );
}
