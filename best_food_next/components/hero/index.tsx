import Image from "next/image";
import Link from "next/link";

const Hero = () => {

  return (
    <>
      <section className="pt-35 md:pt-40 xl:pt-15 pb-20 xl:pb-25 overflow-hidden">
        <div className="mx-auto max-w-c-1390 px-4 md:px-2 2xl:px-0">
          <div className="flex lg:items-center lg:gap-8 xl:gap-32.5">
            <div className=" md:w-1/2">
              <h1 className="text-black text-3xl xl:text-hero font-bold mb-5 pr-16 ">
                Lorem ipsum
              </h1>

              <h6 className="text-black xl:text-lg font-medium mb-5 pr-16 ">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr
              </h6>

              <div className="hidden md:block">
                <p>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. 
                  At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. 
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. 
                  At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                </p>
              </div>

              <div className="md:hidden">
                <p>
                    At vero eos et accusam et justo duo dolores et ea rebum. 
                    Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                </p>
              </div>
              
              <div className="mt-10">
                <div className="flex justify-left flex-wrap gap-5">
                  <Link
                    href="/"
                    className="flex bg-black hover:bg-blackho text-white rounded-full ease-in-out duration-300 px-7.5 py-2.5"
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </div>

            <div className="animate_right md:w-1/2 hidden lg:block">
              <div className="relative 2xl:-mr-7.5">
                <div className=" relative aspect-[1920/1440] w-full">
                  <Image
                    className="shadow-solid-l rounded-3xl"
                    src="/1.png"
                    alt="Hero"
                    priority
                    fill
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
