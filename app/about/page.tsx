import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 max-w-3xl">
      <div className="flex flex-col items-center text-center gap-6">
        <Image src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="About EventPro - Event Planning Team" width={600} height={400} className="rounded-lg shadow-lg mb-6" />
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