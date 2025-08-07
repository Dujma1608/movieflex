export default function Hero() {
  return (
    <div className="relative h-[50%] lg:h-[70vh]">
      <div
        className="absolute h-[100%] inset-0 bg-cover bg-center blur-[6px] opacity-50 -z-10"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
      >
        <div
          className="absolute bottom-0 left-0 w-full h-10"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,100), rgba(37, 37, 37, 0))",
          }}
        />
      </div>

      <main className="z-10 flex flex-col items-center justify-center h-screen text-white">
        <h1 className="px-2 text-[32px] lg:text-[50px] text-center font-bold mb-4">
          Welcome to MovieFlex
        </h1>
        <p className="text-lg lg:text-xl max-w-xl text-center mb-15">
          Discover your favorite movies with ease.
        </p>
      </main>
    </div>
  );
}
