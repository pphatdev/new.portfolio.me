import { LoginForm } from "./form";

export default function Login() {
    return (
        <main className="flex min-h-screen items-center justify-center p-4 sm:p-24 bg-muted/30">
            <div className="w-full max-w-4xl">
                <LoginForm />
            </div>
        </main>
    );
}
