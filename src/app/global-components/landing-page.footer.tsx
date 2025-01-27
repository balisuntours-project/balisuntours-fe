export function LandingPageFooterSection() {
  const tripadvisorHtml = `
    <div id="TA_certificateOfExcellence540" class="TA_certificateOfExcellence">
      <ul id="GUZLx9gWI7c9" class="TA_links VDLPAbhc">
        <li id="H3EWx1LnbLq" class="2FSF0dzSI3VK">
          <a target="_blank" href="https://www.tripadvisor.com/Attraction_Review-g297701-d4441302-Reviews-Bali_SUN_Tours-Ubud_Gianyar_Regency_Bali.html">
            <img src="https://static.tacdn.com/img2/travelers_choice/widgets/tchotel_2024_L.png" alt="TripAdvisor" class="widCOEImg" id="CDSWIDCOELOGO"/>
          </a>
        </li>
      </ul>
    </div>
  `;

  return (
    <>
      <div>
        
        <div className="">
          <div className="w-full md:w-[90%] px-0 sm:px-6 text-gray-800 sm:grid md:grid-cols-3  sm:grid-cols-2 mx-auto">
            <div className=" md:ps-0 md:pb-0 flex items-start w-[140px] md:w-[180px] h-[140px] md:h-[180px] md:block">
              <div className=" md:ps-0 md:pb-0" id="tripadvisor-widget">
                <div
                  id="TA_certificateOfExcellence540"
                  className="TA_certificateOfExcellence"
                >
                  <ul id="GUZLx9gWI7c9" className="TA_links VDLPAbhc">
                    <li id="H3EWx1LnbLq" className="2FSF0dzSI3VK">
                      <a
                        target="_blank"
                        href="https://www.tripadvisor.com/Attraction_Review-g297701-d4441302-Reviews-Bali_SUN_Tours-Ubud_Gianyar_Regency_Bali.html"
                      >
                        <img
                          src="https://static.tacdn.com/img2/travelers_choice/widgets/tchotel_2024_L.png"
                          alt="TripAdvisor"
                          className="widCOEImg"
                          id="CDSWIDCOELOGO"
                        />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          {/*   <div className="px-5 py-3 md:px-0 md:py-5 md:ps-20 md:pe-5">
              <div className="footer-menu mb-2 md:mb-0 text-xs md:text-sm uppercase font-bold">
                Our Services
              </div>
             <div className="flex md:flex-col flex-wrap">
             <a
                className="pb-2 md:pb-0 md:my-2 block text-[10px] md:text-xs hover:text-[#65AD2E]"
                target="_blank"
                href="https://balisuntours.com/package-category/special-offer/"
              >
                Special Offer <span className="text-teal-600  md:p-1"></span>
              </a>
              <span className="block md:hidden mx-1 border-r-2 border-gray-300 h-3 py-auto items-center" />
              <a
                className="pb-2 md:pb-0 md:my-2 block text-[10px] md:text-xs hover:text-[#65AD2E]"
                target="_blank"
                href="https://balisuntours.com/package-category/sight-seeing-tours/"
              >
                Sight Seeing Tours
                <span className="text-teal-600  md:p-1"></span>
              </a>
               <span className="block md:hidden mx-1 border-r-2 border-gray-300 h-3 py-auto items-center" />
              <a
                className="pb-2 md:pb-0 md:my-2 block text-[10px] md:text-xs hover:text-[#65AD2E]"
                target="_blank"
                href="https://balisuntours.com/package-category/adventure-tours/"
              >
                Adventure Tours <span className="text-teal-600  md:p-1"></span>
              </a>
               <span className="block md:hidden mx-1 border-r-2 border-gray-300 h-3 py-auto items-center" />
              <a
                className="pb-2 md:pb-0 md:my-2 block text-[10px] md:text-xs hover:text-[#65AD2E]"
                target="_blank"
                href="https://balisuntours.com/package-category/fun-things-to-do/"
              >
                Fun Things to Do <span className="text-teal-600  md:p-1"></span>
              </a>
               <span className="block md:hidden mx-1 border-r-2 border-gray-300 h-3 py-auto items-center" />
              <a
                className="pb-2 md:pb-0 md:my-2 block text-[10px] md:text-xs hover:text-[#65AD2E]"
                target="_blank"
                href="https://balisuntours.com/package-category/excursion/"
              >
                Excursion <span className="text-teal-600  md:p-1"></span>
              </a>
               <span className="block md:hidden mx-1 border-r-2 border-gray-300 h-3 py-auto items-center" />
              <a
                className="pb-2 md:pb-0 md:my-2 block text-[10px] md:text-xs hover:text-[#65AD2E]"
                target="_blank"
                href="https://www.booking.com/index.html?aid=2036063"
              >
                Hotels <span className="text-teal-600  md:p-1"></span>
              </a>
             
             </div>
            </div> */}
            <div className="px-5 py-3 md:px-0 md:py-5 md:ps-10 md:pe-5">
              <div className="mb-2 md:mb-0 text-xs md:text-sm uppercase font-bold">Support Help</div>
             <div className="flex md:flex-col flex-wrap">
             <a
                className="pb-2 md:pb-0 md:my-2 block text-[10px] md:text-xs hover:text-[#65AD2E]"
                target="_blank"
                href="/about-us"
              >
                About Us <span className="text-teal-600  md:p-1"></span>
              </a>
               <span className="block md:hidden mx-1 border-r-2 border-gray-300 h-3 py-auto items-center" />
              <a
                className="pb-2 md:pb-0 md:my-2 block text-[10px] md:text-xs hover:text-[#65AD2E]"
                target="_blank"
                href="/rules/term-conditions"
              >
                Terms and Conditions
                <span className="text-teal-600  md:p-1"></span>
              </a>
               {/* <span className="block md:hidden mx-1 border-r-2 border-gray-300 h-3 py-auto items-center" />
              <a
                className="pb-2 md:pb-0 md:my-2 block text-[10px] md:text-xs hover:text-[#65AD2E]"
                target="_blank"
                href="https://balisuntours.com/gallery/"
              >
                Gallery <span className="text-teal-600  md:p-1"></span>
              </a> */}
               {/* <span className="block md:hidden mx-1 border-r-2 border-gray-300 h-3 py-auto items-center" />
              <a
                className="pb-2 md:pb-0 md:my-2 block text-[10px] md:text-xs hover:text-[#65AD2E]"
                target="_blank"
                href="https://balisuntours.com/interesting-places/"
              >
                Interesting Places
                <span className="text-teal-600  md:p-1"></span>
              </a> */}
               <span className="block md:hidden mx-1 border-r-2 border-gray-300 h-3 py-auto items-center" />
              <a
                className="pb-2 md:pb-0 md:my-2 block text-[10px] md:text-xs hover:text-[#65AD2E]"
                target="_blank"
                href="https://balisuntours.com/blog/"
              >
                Blog <span className="text-teal-600  md:p-1"></span>
              </a>
               <span className="block md:hidden mx-1 border-r-2 border-gray-300 h-3 py-auto items-center" />
              <a
                className="pb-2 md:pb-0 md:my-2 block text-[10px] md:text-xs hover:text-[#65AD2E]"
                target="_blank"
                href="/charity"
              >
                Charity <span className="text-teal-600  md:p-1"></span>
              </a>
               <span className="block md:hidden mx-1 border-r-2 border-gray-300 h-3 py-auto items-center" />
              <a
                className="pb-2 md:pb-0 md:my-2 block text-[10px] md:text-xs hover:text-[#65AD2E]"
                target="_blank"
                href="/partner"
              >
                Business Partner
                <span className="text-teal-600  md:p-1"></span>
              </a>
              
             </div>
            </div>
            <div className="px-5 py-3 md:px-0 md:py-5">
              <div className="mb-2 md:mb-0 text-xs md:text-sm uppercase font-bold">
               Accepted Payment
              </div>
              <div className="md:flex-auto mt-3 flex-row flex">
                <a href="/#" className="w-6 me-3">
                  <img
                    src="/visa.png"
                    alt="icon"
                    width="100"
                    height="100"
                    className="w-[60px] h-[35px]"
                  />
                </a>
                <a href="/#" className="w-11 me-3 flex items-center justify-center">
                  <img
                    src="/master-card.png"
                    alt="icon"
                    width="100"
                    height="100"
                    className="w-full h-[25px]"
                  />
                </a>
                <a
                  href="#"
                  target="_blank"
                  className="w-6 me-3"
                >
                  <img
                    src="/jcb.png"
                    alt="icon"
                    width="100"
                    height="100"
                    className="w-[60px] h-[35px]"
                  />
                </a>
                <a
                  href="#"
                  target="_blank"
                  className="w-6 me-3"
                >
                  <img
                    src="/america-ex.png"
                    alt="icon"
                    width="100"
                    height="100"
                    className="w-[60px] h-[35px]"
                 />
                </a>
              </div>

             {/*  <div className="text-[#65AD2E] font-extrabold text-[10px] md:text-xs mt-3">
                Booking
              </div>
            <div className="flex md:flex-col flex-wrap">
            <a
                className=" block text-[10px] md:text-xs"
                href="https://wa.me/6281936109809?text=Hi%2C%20Bali%20SUN%20Tours"
                target="_blank"
              >
                <span className="font-black">Whatsapp/Ph :</span> +6281 936 109
                809
              </a>
              <span className="block md:hidden mx-1 border-r-2 border-gray-300 h-3 py-auto items-center" />
              <a
                className=" block text-[10px] md:text-xs"
                href="mailto:booking@balisuntours.com"
                target="_blank"
              >
                <span className="font-black">Email :</span>{" "}
                booking@balisuntours.com
              </a>
            </div> */}

              <div className="mb-2 md:mb-0 text-xs md:text-sm uppercase font-bold mt-8">Follow Us</div>
              <div className="md:flex-auto mt-3 flex-row flex">
                <a href="https://www.facebook.com/balisuntours" className="w-6 me-3">
                  <img
                    src="/facebook.svg"
                    alt="icon"
                    width="35"
                    height="35"
                    className=""
                  />
                </a>
                <a href="https://www.instagram.com/balisuntours" className="w-6 me-3">
                  <img
                    src="/instagram.svg"
                    alt="icon"
                    width="35"
                    height="35"
                    className=""
                  />
                </a>
                <a
                  href="https://api.whatsapp.com/send?phone=6281936109809"
                  target="_blank"
                  className="w-6 me-3"
                >
                  <img
                    src="/wa.svg"
                    alt="icon"
                    width="35"
                    height="35"
                    className=""
                  />
                </a>
                <a
                  href="https://www.youtube.com/channel/UC0MUSpwc1cr-qJxQw0LRRPw"
                  target="_blank"
                  className="w-6 me-3"
                >
                  <img
                    src="/youtube.svg"
                    alt="icon"
                    width="35"
                    height="35"
                    className=""
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <div className="flex md:pb-5 px-3 m-auto pt-5 border-t text-gray-800 text-xs md:text-sm flex-col w-full max-w-full items-center">
            <div className="md:my-5">© 2013 - 2025 PT. Surya Utama Nirmala</div>
          </div>
        </div>
      </div>
    </>
  );
}
