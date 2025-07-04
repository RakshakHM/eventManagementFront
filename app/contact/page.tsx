import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="container mx-auto py-12 max-w-3xl">
      <div className="flex flex-col items-center text-center gap-6">
        <Image src="/placeholder-user.jpg" alt="Contact EventPro" width={120} height={120} className="rounded-full shadow mb-6" />
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Have questions, feedback, or need help with your booking? Our team is here to assist you. Fill out the form below and we'll get back to you as soon as possible.
        </p>
        <form className="w-full max-w-md mx-auto space-y-4">
          <input type="text" name="name" placeholder="Your Name" className="w-full border rounded px-4 py-2" required />
          <input type="email" name="email" placeholder="Your Email" className="w-full border rounded px-4 py-2" required />
          <textarea name="message" placeholder="Your Message" className="w-full border rounded px-4 py-2 min-h-[100px]" required />
          <button type="submit" className="w-full bg-primary text-white rounded px-4 py-2 font-semibold hover:bg-primary/90 transition">Send Message</button>
        </form>
      </div>
    </div>
  );
} 