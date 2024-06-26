"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from 'axios';
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
// import SectionHeaderTwo from "../Common/SectionHeaderTwo";
// import ReCAPTCHA from "react-google-recaptcha";
import Image from "next/image";

const Contact = () => {
  const router = useRouter();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captcha, setCaptcha] = useState<string | null>();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    phone: '',
    message: '',
  });

  const validateForm = () => {
    return formData.name !== '' && 
           formData.email !== '' && 
           formData.subject !== '' && 
           formData.phone !== '' && 
           formData.message !== '';
  };

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCaptchaChange = (value:any) => {
    setCaptcha(value);
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post("/api/contact", formData, {
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        
        setFormData({ name: '', email: '', subject: '', phone: '',message: '' });

        router.push("/mail-success");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section id="support" className="py-20 lg:py-25 xl:py-30">
        <div className="mx-auto max-w-c-1390 px-7 md:px-8 2xl:px-5">
          {/* <SectionHeaderTwo
            headerInfo={{
              title: "",
              description: ``,
            }}
          /> */}

          <div className="flex flex-wrap md:flex-nowrap flex-col-reverse md:flex-row gap-8 xl:gap-20 md:justify-between">
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: -20,
                },

                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_top w-full md:w-3/5 lg:w-3/4 rounded-lg bg-white"
            >
              <h2 className="text-3xl text-black font-medium mb-15">
               Send us a message
              </h2>

              <form
                onSubmit={handleSubmit}
              >
               <div className="flex flex-col lg:flex-row lg:justify-between gap-7.5 lg:gap-14 mb-7.5">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name} 
                    onChange={handleInputChange}
                    placeholder="First name and surname"
                    className="w-full lg:w-1/2 border-b border-stroke focus-visible:outline-none focus:placeholder:text-black pb-3.5"
                  />
                  
                
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="E-Mail"
                    className="w-full lg:w-1/2 border-b border-stroke focus-visible:outline-none focus:placeholder:text-black pb-3.5"
                  />
                </div>

                <div className="flex flex-col lg:flex-row lg:justify-between gap-7.5 lg:gap-14 mb-12.5">
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Subject"
                    className="w-full lg:w-1/2 border-b border-stroke focus-visible:outline-none focus:placeholder:text-black pb-3.5"
                  />

                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone"
                    className="w-full lg:w-1/2 bg-transparent border-b border-stroke focus-visible:outline-none focus:border-waterloo focus:placeholder:text-black pb-3.5"
                  />
                </div>

                <div className="flex mb-11.5">
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your message to us..."
                    className="w-full bg-transparent border-b border-stroke focus-visible:outline-none focus:border-waterloo focus:placeholder:text-black "
                  ></textarea>
                </div>
                
                {/* <ReCAPTCHA className="w-full px-4" sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} onChange={handleCaptchaChange} /> */}

                <div className="flex flex-wrap xl:justify-between p-1">
                  <button disabled={!validateForm() || isSubmitting || !captcha}
                      className={`inline-flex items-center gap-2.5 bg-black hover:bg-blackho ease-in-out duration-300 font-medium text-white rounded-sm px-6 py-3
                      ${(!validateForm() || isSubmitting || !captcha) ? 'cursor-not-allowed' : ''}`}
                    >
                    {isSubmitting ? 'Being sent...' : 'Send message'}
                  </button>
                </div>
              </form>
            </motion.div>

            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: -20,
                },

                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 2, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_top w-full md:w-2/5 lg:w-[26%]"
            >
              <h2 className="text-black text-3xl font-semibold mb-8">
               Our contact details
              </h2>

              <div className="mb-6 5">
                <div className="flex flex-wrap content-center justify-start items-center">
                  <Image
                    width={20}
                    height={15}
                    src="/images/icon/location.png"
                    alt=""
                    className="pb-2"
                  />
                  <p className="font-medium text-black text-metatitle3 pb-2 pl-2">
                    Address
                  </p>
                </div>
                <p>
                  <a href="https://maps.app.goo.gl/GvuUdhGDsRdP2WAj7" className="hover:text-black" target="_blank">
                    "" <br />
                    ""
                  </a>
                </p>
              </div>

              <div className="mb-6 5">
                <div className="flex flex-wrap content-center justify-start items-center">
                  <Image
                    width={20}
                    height={15}
                    src="/images/icon/message.png"
                    alt=""
                    className="pb-2"
                  />
                  <p className="font-medium text-black text-metatitle3 pb-2 pl-2">
                    E-Mail
                  </p>
                </div>
                <p>
                  <a href="mailto:" className="hover:text-black cursor-pointer">lorem@ipsum.com</a>
                </p>
              </div>
              
              <div>
                <div className="flex flex-wrap content-center justify-start items-center">
                  <Image
                    width={20}
                    height={15}
                    src="/images/icon/call.png"
                    alt=""
                    className="pb-2"
                  />
                  <p className="font-medium text-black text-metatitle3 pb-2 pl-2">
                    Phone
                  </p>
                </div>
                <p>
                  <a href="tel:+00 000 00 00" className="hover:text-black cursor-pointer">+00 000 00 00</a>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
