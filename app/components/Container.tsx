import React from "react";

interface ContainerProps {
  title: string;
  children: React.ReactNode;
  fullWidth?: boolean;
}

const Container = ({ children, title, fullWidth }: ContainerProps) => {
  return (
    <section className="mx-auto px-6 max-w-7xl lg:px-8 mb-32 py-24 sm:py-32">
      <h2 className="text-4xl font-bold tracking-wide text-lime-500 sm:text-6xl font-lora ">
        {title}
      </h2>

      <div className="flex justify-center items-center">
        <div
          className={`flex justify-center items-center mt-20 shadow-lg shadow-green-900 rounded-lg bg-slate-800 ${
            fullWidth ? "w-full" : "w-full md:w-fit"
          }`}
        >
          {children}
        </div>
      </div>
    </section>
  );
};

export default Container;
