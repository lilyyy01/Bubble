"use client"
import Link from "next/link"

export default function Contact() {
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log("form data:", formData);
        const response = await fetch(
            '/api/sendEmail',
            {
                method: 'post',
                body: formData
            }
        );
        console.log("response", response);
    };

    return (
        <main className="flex min-h-screen flex-col items-center" >
            <div className="relative flex place-items-center p-5 bg-white text-black">
                <Link href="/">Home</Link>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-4 flex flex-col w-500">

                    <label htmlFor="form-name">Name </label>
                    <input id="form-name" autoComplete="name" maxLength={50} name="name" className="text-black"/>

                    <label htmlFor="form-email"> Email:</label>
                    <input id="form-email" required autoComplete="email" maxLength={80} name="email" type="email" className="text-black"/>

                    <label htmlFor="form-message"> Message: </label>
                    <textarea id="form-message" required name="message" rows={5} className="text-black"/>

                </div>
                <button className=" rounded bg-sky-400" type="submit">Send</button>
            </form>
        </main>
    )
}