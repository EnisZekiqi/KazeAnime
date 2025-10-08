"use client";



const Features = () => {

    

  return (
  <section className="relative w-full flex flex-col overflow-visible items-start justify-center py-16 bg-transparent">
      {/* Background decorative image (half visible on the left) */}
  <div className="max-w-7xl flex flex-col items-start bg-transparent w-full gap-10 px-6 z-[200]">
        {/* Header */}
        <div className="flex flex-col items-start gap-4">
          <span className="font-medium text-md text-[#32cd87]">Features</span>
          <h1 className="text-5xl font-normal text-white">How it works</h1>
        </div>

        {/* Feature Cards */}
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-6 w-full">
          {[
            {
              id: 1,
              title: "Explore",
              desc: "Browse our extensive library of anime and manga titles to find your next favorite series.",
            },
            {
              id: 2,
              title: "Discover",
              desc: "Get personalized recommendations based on your viewing history and preferences.",
            },
            {
              id: 3,
              title: "Enjoy",
              desc: "Watch and read your favorite anime and manga anytime, anywhere, on any device.",
            },
          ].map((feature) => (
            <div
              key={feature.id}
              className="flex flex-col items-start gap-4 p-6 bg-[#141414] border border-[#333] rounded-lg w-full sm:w-64 h-64 backdrop-blur-md hover:border-[#32cd87]/50 transition"
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <span className="text-2xl text-[#141414] font-bold">
                  {feature.id}
                </span>
              </div>
              <h2 className="text-white text-2xl font-medium">{feature.title}</h2>
              <p className="text-[#a5a5a5] text-start">{feature.desc}</p>
             
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute top-0 -left-[12%] rotate-180 -translate-x-1/4 w-[20%] h-full overflow-visible pointer-events-none z-[100]">
        <img
          src="https://framerusercontent.com/images/dwxExDkm76wbBZfsBvtV3qnpVs.png?scale-down-to=1024"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-left opacity-100 blur-lg floating-vertical"
        />
      </div>

      {/* Content */}
      
    </section>
  );
};

export default Features;
