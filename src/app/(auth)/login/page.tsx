import Image from "../../../../node_modules/next/image";
import SignupImage from '@/assets/formbg.jpg'
import Link from "../../../../node_modules/next/link";
import LoginForm from "./LoginForm";


export default function Page() {
    return (
        <main className="flex h-screen items-center justify-center p-10">
            <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] rounded-2xl shadow-2xl">
                <div className="w-full md:w-1/2 p-10 overflow-y-auto">
                    <div className="text-center">
                        <h1 className="text-2xl">Log in to <span className="font-bold text-[#2168BA]">EduGlobe</span></h1>
                        <p>A global hub for study-abroad aspirants</p>
                    </div>
                    <div className="mt-10 space-y-10">
                        <LoginForm />
                        <Link className="block text-center hover:underline" href={'/signup'}>Don't have an account? <span className="text-[#2168BA]">Sign up</span></Link>
                    </div>
                </div>
                <Image src={SignupImage} alt="bg" className="hidden md:block w-1/2 object-cover"/>
            </div>
        </main>
    )
}