'use client';

import { ArrowRight, Loader2 } from 'lucide-react';
import { IconBrandGithub, IconBrandGoogle } from '@tabler/icons-react';
import { Label } from '@/shared/components/ui/label';
import { Input } from '@/shared/components/ui/input';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { useActionState } from 'react';
import { cn } from '@/shared/libs/utils';
import { loginAction } from './actions';
import { BlurFade } from '@/shared/components/background/blur-fade';
import { FlipWords } from '@/shared/components/ui/flip-words';
import { GridPattern } from '@/shared/components/background/grid-pattern';
import MagneticArea from '@/shared/components/ui/magnetic-area';

function SubmitButton({ pending }: { pending: boolean }) {
    return (
        <Button type="submit" disabled={pending} variant={'outline'} className='group w-full'>
            <span className="flex min-w-0 items-center gap-2">
                {pending
                    ? <Loader2 className="h-4 w-4 animate-spin" />
                    : <span className="relative flex size-2 shrink-0 transition-[transform,width] duration-200 group-hover:opacity-0">
                        <span className={cn("absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60")} />
                        <span className={cn("relative inline-flex size-2 rounded-full bg-primary")} />
                    </span>
                }
                <span className="truncate text-foreground shrink-0">Login</span>
                <span className="ml-1 inline-flex w-0 overflow-hidden transition-[width] duration-200 group-hover:w-4">
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                </span>
            </span>

        </Button>
    );
}

export function LoginForm({ className, callbackUrl, ...props }: React.ComponentProps<'div'> & { callbackUrl?: string }) {
    const [state, formAction, isPending] = useActionState(loginAction, null);

    return (
        <div className={cn('flex flex-col justify-center gap-6', className)} {...props}>
            <div className="absolute inset-0 pointer-events-none -translate-y-25" aria-hidden="true">
                <GridPattern
                    width={32}
                    height={32}
                    strokeDasharray={"5 2"}
                    className={"mask-[radial-gradient(300px_circle_at_center,white,transparent)] absolute w-full"}
                />
            </div>

            <Card className="p-0 rounded-4xl bg-linear-0 from-primary/5 to-transparent backdrop-blur-2xl max-w-md mx-auto border-primary/70 ring-3 ring-primary/10">
                <CardContent className="grid p-0">
                    <form action={formAction} className="p-6 md:p-12">
                        <input type="hidden" name="callbackUrl" value={callbackUrl || ''} />
                        <BlurFade className="flex flex-col gap-5 text-foreground/90 min-h-96">
                            <div className='mb-4 text-center'>
                                <h1 className="text-2xl flex items-center justify-center gap-2 font-bold">
                                    <span className="relative flex size-4 shrink-0">
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60" />
                                        <span className="relative inline-flex size-4 rounded-full bg-primary" />
                                    </span>
                                    <FlipWords words={["Hi, Welcome back"]} />
                                </h1>
                                <BlurFade delay={0.5} className='mt-2'>
                                    <p className="text-balance text-foreground/80">Sign in to your PPhat account</p>
                                </BlurFade>
                            </div>

                            {state?.error && (
                                <BlurFade className="flex w-full items-center gap-1 text-destructive justify-center text-sm">
                                    <span className="relative flex size-2 shrink-0">
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive/60" />
                                        <span className="relative inline-flex size-2 rounded-full bg-destructive" />
                                    </span>
                                    <FlipWords words={[state.error]} className='text-destructive' />
                                </BlurFade>
                            )}

                            <BlurFade delay={0.5} className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" placeholder="john@example.com" autoComplete="email" required />
                            </BlurFade>

                            <BlurFade delay={0.6} className="grid gap-3">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a href="#" className="ml-auto text-sm underline-offset-2 hover:underline" > Forgot your password? </a>
                                </div>
                                <Input id="password" name="password" type="password" placeholder='***********' autoComplete="current-password" required className='pt-2.5' />
                            </BlurFade>
                            <MagneticArea>
                                <BlurFade delay={0.7} className='mt-4'>
                                    <SubmitButton pending={isPending} />
                                </BlurFade>

                            </MagneticArea>

                            <BlurFade delay={0.8} className="relative text-center mt-5 text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-foreground/10">
                                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                            </BlurFade>

                            <BlurFade delay={0.8} className='grid grid-cols-2 gap-1'>
                                <Button type="button" disabled variant={'outline'} className="w-full ring-1 mt-5 ring-foreground/10 border-transparent justify-center text-center rounded-r-none">
                                    <a href={`${process.env.NEXT_PUBLIC_APP_API}/v1/api/auth/google`} className="flex items-center justify-center w-full text-foreground/90">
                                        <IconBrandGoogle fill='currentColor' strokeWidth={0} className="mr-2 h-4 w-4" />
                                        Login with Google
                                    </a>
                                </Button>
                                <Button type="button" disabled variant={'outline'} className="w-full ring-1 border-transparent mt-5 ring-foreground/10 justify-center text-center rounded-l-none">
                                    <a href={`${process.env.NEXT_PUBLIC_APP_API}/v1/api/auth/github`} className="flex items-center justify-center w-full text-foreground/90">
                                        <IconBrandGithub className="mr-2 h-4 w-4" />
                                        Login with GitHub
                                    </a>
                                </Button>
                            </BlurFade>

                        </BlurFade>
                    </form>

                    {/* <div className="relative hidden bg-muted md:block">
                        <Image src="/assets/placeholder/placeholder.svg" alt="Image" width={200} height={200} className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
                    </div> */}
                </CardContent>
            </Card>
            <BlurFade delay={0.4} className='flex flex-col items-center'>
                <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                    By clicking continue, you agree to our <a href="#">Terms of Service</a>{' '}
                    and <a href="#">Privacy Policy</a>.
                </div>
            </BlurFade>
        </div >
    );
}
