"use client"

import { ActivityTitleCard } from "@/app/global-components/utility-components/activity-title.card";
import { PollingLoginDialogPopUpToken } from "@/app/global-components/utility-components/polling-login-dialog.popup";
import { RegisterForm } from "@/app/global-components/utility-components/register-form";
import { ImageWithLoader } from "@/app/global-components/utility-components/with-loader.image";
import { useAuthStore } from "@/app/store/auth.store";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CustomerSignUp() {
    const router = useRouter()
     const isLogin = useAuthStore((state) => state.isLogin);
        useEffect(() => {
           
            if (isLogin) {
              
              router.push("/");
            }
          }, [isLogin]);
  return (
    <>
    <PollingLoginDialogPopUpToken />
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="flex justify-center flex-1">
          <div className="flex-1 bg-green-100 text-center hidden lg:flex">
            <div className=" w-full bg-cover bg-center bg-no-repeat">
              <ImageWithLoader
                src="/rafting.jpg"
                alt={"register-banner"}
                classNameProp="w-full h-full object-cover"
                skeletonClassName="w-full h-full object-cover"
                fallbackSrc="/fallback-image.png"
                priority={true} // Gambar ini tidak diberi prioritas
                width={3000}
                height={3000}
              />
            </div>
          </div>

          <div className="lg:w-1/2 xl:w-7/12 p-6 sm:p-12 my-auto">
            <div className="mx-auto max-w-[448px]">
              <Link href="/" className="flex justify-center mb-6 md:mb-12">
                <Image
                  src="/bst-logo-dark-green.png"
                  alt="best-travell-agent-bali-sun-tours"
                  width="135"
                  height="58"
                  objectFit="cover"
                  className="w-[200px] h-[45px] md:w-[200px] md:h-[45px]"
                />
              </Link>

              <div className="mx-auto text-center">
                <ActivityTitleCard
                  customSizeText="text-lg md:text-xl"
                  textColor="text-[#008000]"
                  title="Join Us!"
                />
                <p className="text-center mb-3">
                  Unlock exclusive travel deals and unforgettable experiences.
                </p>
              </div>

              <RegisterForm onClick={() => router.push("/customer/signin")} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
