'use client';
import Image from "next/image";
import { useState } from 'react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();
        console.log(data);

        if (res.ok) {
            window.location.href = '/dashboard'; // Redirect to dashboard
        } else {
            setMessage(data.message);
            setStatus('error');
        }
    };

    return (
        <><section className="gradient-form h-full parent flex items-center justify-center">
            <div className="container baby-item h-full p-10">
                <div
                    className="flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
                    <div className="w-full">
                        <div
                            className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                            <div className="g-0 lg:flex lg:flex-wrap">

                                <div className="px-4 md:px-0 lg:w-6/12">
                                    <div className="md:mx-6 md:p-12">
                                        <div className="text-center">
                                            <Image
                                                className="mx-auto w-48"
                                                src="/img/lotus.webp"
                                                alt="logo"
                                                width={192}
                                                height={132}
                                            />
                                            <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                                                We are The Lotus Team
                                            </h4>
                                        </div>
                                        <form onSubmit={handleLogin}>
                                            <p className="mb-4">Please login to your account</p>
                                            <div className="relative mb-4" data-twe-input-wrapper-init>
                                                <input
                                                    type="email"
                                                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                                                    id="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                    placeholder="email" />
                                            </div>
                                            <div className="relative mb-4" data-twe-input-wrapper-init>
                                                <input
                                                    type="password"
                                                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                                                    id="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                    placeholder="password" />
                                            </div>
                                            <div className="mb-12 pb-1 pt-1 text-center">
                                                <button
                                                    className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-dark-3 transition duration-150 ease-in-out hover:shadow-dark-2 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:shadow-dark-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                                                    type="submit"
                                                    data-twe-ripple-init
                                                    data-twe-ripple-color="light"
                                                    style={{ "background": "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)" }}>
                                                    Log in
                                                </button>
                                                {message && (
                                                    <div
                                                        className={`alert mt-3 ${status === 'success' ? 'alert-success' : 'alert-danger'
                                                            }`}
                                                        role="alert"
                                                    >
                                                        {message}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex items-center justify-between pb-6">
                                                <p className="mb-0 me-2">Don’t have an account?{' '}</p>
                                                <a href="/register" className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-danger-50/50 hover:text-danger-600 focus:border-danger-600 focus:bg-danger-50/50 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-rose-950 dark:focus:bg-rose-950"
                                                    data-twe-ripple-init
                                                    data-twe-ripple-color="light">
                                                    Register
                                                </a>                                                
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div
                                    className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-e-lg lg:rounded-bl-none"
                                    style={{ "background": "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)" }}>
                                    <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                                        <h4 className="mb-6 text-xl font-semibold">
                                            We are more than just a company
                                        </h4>
                                        <p className="text-sm">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing
                                            elit, sed do eiusmod tempor incididunt ut labore et
                                            dolore magna aliqua. Ut enim ad minim veniam, quis
                                            nostrud exercitation ullamco laboris nisi ut aliquip ex
                                            ea commodo consequat.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    );
}
