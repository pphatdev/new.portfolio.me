"use client";

import { BorderBeam } from "@/shared/components/background/border-beam";
import { GridPattern } from "@/shared/components/background/grid-pattern";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Label } from "@/shared/components/ui/label";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Spinner } from "@/shared/components/ui/loading";
import { useState, FormEvent, useCallback } from "react";
import { Send, AlertCircle } from "lucide-react";
import { cn } from "@/shared/libs/utils";

export function ContactForm() {
    // Form state
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    // Form submission state
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form validation state
    const [formErrors, setFormErrors] = useState<{
        name?: string;
        email?: string;
        subject?: string;
        message?: string;
    }>({});

    const validateForm = (): boolean => {
        const errors: typeof formErrors = {};
        let isValid = true;

        if (!formData.name.trim()) {
            errors.name = "Name is required";
            isValid = false;
        }

        if (!formData.email.trim()) {
            errors.email = "Email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Email is invalid";
            isValid = false;
        }

        if (!formData.subject.trim()) {
            errors.subject = "Subject is required";
            isValid = false;
        }

        if (!formData.message.trim()) {
            errors.message = "Message is required";
            isValid = false;
        } else if (formData.message.trim().length < 10) {
            errors.message = "Message must be at least 10 characters";
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (formErrors[name as keyof typeof formErrors]) {
            setFormErrors(prev => ({ ...prev, [name]: undefined }));
        }
    }, [formErrors]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = (await response.json().catch(() => ({}))) as { error?: string };

            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong. Please try again.');
            }

            setSubmitted(true);
            setFormData({
                name: "",
                email: "",
                subject: "",
                message: ""
            });
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Failed to send message. Please try again later.");
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="relative pt-24 bg-linear-to-b from-background via-muted/30 to-background pb-20">
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <GridPattern
                    width={32}
                    height={32}
                    strokeDasharray={"5 2"}
                    className={"mask-[radial-gradient(300px_circle_at_center,white,transparent)] absolute w-full"}
                />
            </div>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
                <div className="translate-y-2">
                    <Card className="overflow-hidden bg-background/80 backdrop-blur-3xl relative rounded-4xl border-foreground/5 shadow-lg shadow-primary/5">
                        <CardContent className="p-6 sm:px-8">
                            {submitted ? (
                                <div className="text-center pb-12 pt-5">
                                    <div className="inline-flex items-center justify-center size-20 bg-primary/10 rounded-full text-primary mb-4">
                                        <svg className="size-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-semibold mb-4">Message Sent!</h3>
                                    <p className="text-muted-foreground mb-2">Thank you for reaching out. Your message has been sent to:</p>
                                    <p className="font-medium text-primary mb-6">info.sophat@gmail.com</p>
                                    <p className="text-sm text-muted-foreground mb-6">I'll get back to you as soon as possible.</p>
                                    <Button className="rounded-full mx-auto cursor-pointer" onClick={() => setSubmitted(false)}>Send Another Message</Button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <h2 className="text-2xl font-semibold mb-6">Send Me a Message</h2>

                                    {error && (
                                        <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-md mb-6">
                                            {error}
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="gap-3 flex flex-col">
                                            <Label htmlFor="name">Your Name</Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                placeholder="John Doe"
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                                className={cn(formErrors.name ? "border-destructive ring-primary" : "", "rounded-xl bg-transparent")}
                                                aria-invalid={Boolean(formErrors.name)}
                                            />
                                            {formErrors.name && (
                                                <p className="text-sm text-destructive flex items-center gap-1 mt-1">
                                                    <AlertCircle className="h-3 w-3" />
                                                    {formErrors.name}
                                                </p>
                                            )}
                                        </div>
                                        <div className="gap-3 flex flex-col">
                                            <Label htmlFor="email">Your Email</Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="john@example.com"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                className={cn(formErrors.email ? "border-destructive ring-primary" : "", "rounded-xl bg-transparent")}
                                                aria-invalid={Boolean(formErrors.email)}
                                            />
                                            {formErrors.email && (
                                                <p className="text-sm text-destructive flex items-center gap-1 mt-1">
                                                    <AlertCircle className="h-3 w-3" />
                                                    {formErrors.email}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="gap-3 flex flex-col">
                                        <Label htmlFor="subject">Subject</Label>
                                        <Input
                                            id="subject"
                                            name="subject"
                                            placeholder="Project Inquiry"
                                            required
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className={cn(formErrors.subject ? "border-destructive ring-primary" : "", "rounded-xl bg-transparent")}
                                            aria-invalid={Boolean(formErrors.subject)}
                                        />
                                        {formErrors.subject && (
                                            <p className="text-sm text-destructive flex items-center gap-1 mt-1">
                                                <AlertCircle className="h-3 w-3" />
                                                {formErrors.subject}
                                            </p>
                                        )}
                                    </div>

                                    <div className="gap-3 flex flex-col">
                                        <Label htmlFor="message">Your Message</Label>
                                        <Textarea
                                            id="message"
                                            name="message"
                                            placeholder="Hello, I'd like to discuss a project..."
                                            rows={6}
                                            required
                                            value={formData.message}
                                            onChange={handleChange}
                                            className={cn("resize-none", formErrors.message ? "border-destructive ring-primary" : "", "rounded-xl bg-transparent")}
                                            aria-invalid={Boolean(formErrors.message)}
                                        />
                                        {formErrors.message && (
                                            <p className="text-sm text-destructive flex items-center gap-1 mt-1">
                                                <AlertCircle className="h-3 w-3" />
                                                {formErrors.message}
                                            </p>
                                        )}
                                    </div>
                                    <Button
                                        type="submit"
                                        variant="default"
                                        className="w-full mx-auto sm:w-auto rounded-full"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Spinner className="mr-2 h-4 w-4" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="mr-2 h-4 w-4" />
                                                Send Message
                                            </>
                                        )}
                                    </Button>
                                </form>
                            )}
                        </CardContent>
                        <BorderBeam
                            size={100}
                            duration={10}
                            className="from-transparent via-primary to-transparent"
                        />
                        <BorderBeam
                            size={100}
                            duration={10}
                            delay={5}
                            className="from-transparent via-primary to-transparent"
                        />
                    </Card>
                </div>
            </div>
        </div>
    );
}
