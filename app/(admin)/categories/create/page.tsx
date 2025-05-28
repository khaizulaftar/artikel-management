"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { createCategory } from "@/services/category-service";
import { useEffect, useState } from "react";
import Link from "next/link";

const formSchema = z.object({
    name: z.string().min(3, "Nama minimal 3 karakter"),
    description: z.string().min(10, "Deskripsi minimal 10 karakter"),
});

export default function CreateCategoryPage() {
    const router = useRouter();
    const { isAuthenticated, user } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isAuthenticated || user?.role !== "admin") {
            router.push("/auth/login");
        }
    }, [isAuthenticated, user, router]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            setError("");
            await createCategory(values.name, values.description);
            router.push("/admin/categories");
        } catch (err: any) {
            setError(err.message || "Gagal membuat kategori");
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated || user?.role !== "admin") {
        return null;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Tambah Kategori Baru</h1>
                <Link href="/admin/categories">
                    <Button variant="outline">Kembali</Button>
                </Link>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nama Kategori</FormLabel>
                                <FormControl>
                                    <Input placeholder="Masukkan nama kategori" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Deskripsi</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Masukkan deskripsi kategori"
                                        rows={5}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-end gap-4">
                        <Link href="/admin/categories">
                            <Button type="button" variant="outline">
                                Batal
                            </Button>
                        </Link>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Menyimpan..." : "Simpan"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}