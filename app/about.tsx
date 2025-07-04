import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 max-w-3xl">
      <div className="flex flex-col items-center text-center gap-6">
        <Image src="/placeholder.jpg" alt="About EventPro" width={400} height={250} className="rounded-lg shadow-lg mb-6" />
        <h1 className="text-4xl font-bold mb-4">About EventPro</h1>
        <p className="text-lg text-muted-foreground mb-4">
          EventPro is your one-stop platform for discovering, booking, and managing the best event services in Bangalore. Whether you're planning a wedding, corporate event, or private party, we connect you with top-rated venues, photographers, decorators, and more. Our mission is to make event planning seamless, transparent, and enjoyable for everyone.
        </p>
        <p className="text-md text-muted-foreground">
          With real-time availability, verified reviews, and secure bookings, EventPro empowers you to create unforgettable experiences with confidence. Our team is passionate about events and dedicated to helping you every step of the way.
        </p>
      </div>
    </div>
  );
} 