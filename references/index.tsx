import type { NextPage } from 'next';
import Image from "next/image";



const Desktop:NextPage = () => {
    return (
        <div className="w-full relative bg-gray-200 flex flex-col items-center justify-start pt-[70px] px-0 pb-0 box-border gap-[90px] text-center text-4xl text-aliceblue font-plus-jakarta-sans">
            <div className="w-[878px] relative h-[46.3px] text-left text-[21.23px]">
                <div className="absolute top-[0px] left-[0px] w-[878px] flex flex-row items-start justify-between py-0 px-[19.3px] box-border gap-0">
                    <div className="w-[86.9px] flex flex-row items-center justify-center p-[9.7px] box-border">
                        <div className="relative font-semibold">Home</div>
                    </div>
                    <div className="w-[87.8px] flex flex-row items-center justify-center p-[9.7px] box-border">
                        <div className="relative font-semibold">About</div>
                    </div>
                    <div className="w-[113.9px] flex flex-row items-center justify-center p-[9.7px] box-border">
                        <div className="relative font-semibold">Services</div>
                    </div>
                    <div className="w-[95px] flex flex-row items-center justify-center p-[9.7px] box-border">
                        <div className="relative font-semibold">Works</div>
                    </div>
                    <div className="w-[111px] flex flex-row items-center justify-center p-[9.7px] box-border">
                        <div className="relative font-semibold">Contact</div>
                    </div>
                </div>
            </div>
            <div className="w-[1010px] h-[459px] flex flex-row items-center justify-between gap-0 text-xl">
                <div className="w-[376px] h-[446px] flex flex-col items-start justify-between gap-0">
                    <div className="self-stretch flex flex-row items-center justify-between gap-0">
                        <Image className="w-[18px] relative h-[18px] object-contain" width={18} height={18} sizes="100vw" alt="" src="Arrow Button.svg" />
                        <div className="w-[302px] relative h-[302px] overflow-hidden flex items-center justify-center">
                            <Image className="w-full h-full object-cover absolute left-[0px] top-[23px] [transform:scale(1.151)]" width={302} height={302} sizes="100vw" alt="" src="Image+Arc.png" />
                        </div>
                        <Image className="w-[18px] relative h-[18px]" width={18} height={18} sizes="100vw" alt="" src="Arrow Button.svg" />
                    </div>
                    <div className="self-stretch relative flex items-center justify-center h-8 shrink-0">jammeisytan@gmail.com</div>
                    <div className="self-stretch h-[53px] flex flex-row items-end justify-center pt-0 px-0 pb-1.5 box-border gap-12">
                        <Image className="w-[47px] relative h-[47px]" width={47} height={47} sizes="100vw" alt="" src="Vector.svg" />
                        <Image className="w-[47px] relative h-[47px]" width={47} height={47} sizes="100vw" alt="" src="Vector.svg" />
                        <Image className="w-[48.2px] relative h-[47px]" width={48.2} height={47} sizes="100vw" alt="" src="Vector.svg" />
                    </div>
                </div>
                <div className="w-[578px] h-[459px] flex flex-col items-start justify-between gap-0 text-left text-2xl">
                    <div className="self-stretch h-[358px] flex flex-col items-start justify-start pt-[31px] px-0 pb-0 box-border gap-2.5">
                        <div className="self-stretch h-[145px] flex flex-col items-start justify-between gap-0">
                            <b className="self-stretch relative leading-[90px] flex items-center h-[70.6px] shrink-0 [text-shadow:0px_0px_47.23px_#362f0d,_0px_0px_27.55px_#362f0d,_0px_0px_13.78px_#362f0d,_0px_0px_3.94px_#362f0d,_0px_0px_1.97px_#362f0d]">Hello! I’m</b>
                            <b className="self-stretch relative text-[80px] leading-[90px] flex text-transparent !bg-clip-text [background:linear-gradient(90deg,_#e5ba49,_#92bef1)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] items-center h-28 shrink-0 [text-shadow:0px_0px_47.23px_#362f0d,_0px_0px_27.55px_#362f0d,_0px_0px_13.78px_#362f0d,_0px_0px_3.94px_#362f0d,_0px_0px_1.97px_#362f0d]">Jam Meisy Tan</b>
                        </div>
                        <i className="self-stretch relative text-[22px] font-light text-silver-100">Web Developer</i>
                        <div className="self-stretch relative text-xl inline-block h-[125px] shrink-0">Lorem ipsum dolor sit amet consectetur. Cras amet feugiat ac odio aliquet nec mauris mauris nec. Porttitor urna sollicitudin dui tincidunt libero massa id pharetra. Pellentesque ullamcorper ut non dapibus et in. Egestas sed maecenas rhoncus hendrerit volutpat diam.</div>
                    </div>
                    <div className="self-stretch h-[60px] flex flex-row items-end justify-start gap-[26px]">
                        <Image className="w-[60px] rounded-[111.82px] h-[60px]" width={60} height={60} sizes="100vw" alt="" src="Buttons.svg" />
                        <Image className="w-[60px] rounded-[111.82px] h-[60px]" width={60} height={60} sizes="100vw" alt="" src="Buttons.svg" />
                    </div>
                </div>
            </div>
            <Image className="w-[1010px] relative h-6" width={1010} height={24} sizes="100vw" alt="" src="Divider.svg" />
            <div className="w-[1010px] overflow-hidden flex flex-col items-center justify-start gap-[34px]">
                <div className="self-stretch h-[235px] flex flex-col items-center justify-between py-0 px-[5px] box-border gap-0 text-left">
                    <div className="w-[852px] relative leading-[57.3px] font-semibold flex items-center h-[62px] shrink-0">About Me</div>
                    <div className="w-[852px] flex flex-row items-center justify-between gap-0 text-xl">
                        <div className="w-[588px] relative flex items-center h-[156px] shrink-0">Lorem ipsum dolor sit amet consectetur. Cras amet feugiat ac odio aliquet nec mauris mauris nec. Porttitor urna sollicitudin dui tincidunt libero massa id pharetra. Pellentesque ullamcorper ut non dapibus et in. Egestas sed maecenas rhoncus hendrerit volutpat diam.</div>
                        <div className="w-[244px] flex flex-col items-start justify-center gap-[18px]">
                            <div className="w-[226px] relative h-[69px]">
                                <div className="absolute w-full top-[57.97%] left-[0%] inline-block">of Experience</div>
                                <div className="absolute w-full top-[0%] left-[0%] text-[32px] font-semibold inline-block">3+ Years</div>
                            </div>
                            <div className="w-[226px] relative h-[69px]">
                                <div className="absolute w-full top-[57.97%] left-[0%] inline-block">and Much More</div>
                                <div className="absolute w-full top-[0%] left-[0%] text-[32px] font-semibold inline-block">20+ Projects</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="self-stretch h-[223px] flex flex-col items-center justify-between py-0 px-[27px] box-border gap-0 text-3xl">
                    <div className="w-[234px] relative leading-[41.6px] font-semibold flex items-center justify-center h-[45px] shrink-0">Technical Skills</div>
                    <div className="self-stretch flex flex-row items-center justify-center flex-wrap content-center py-1.5 px-0 gap-x-10 gap-y-[17.7px]">
                        <Image className="w-[44.4px] relative h-[50.4px]" width={44.4} height={50.4} sizes="100vw" alt="" src="HTML.svg" />
                        <Image className="w-[44.8px] relative h-[50.4px] object-contain" width={44.8} height={50.4} sizes="100vw" alt="" src="CSS.png" />
                        <Image className="w-[50.4px] relative h-[50.4px]" width={50.4} height={50.4} sizes="100vw" alt="" src="Javascript.svg" />
                        <Image className="w-[57.6px] relative h-[34.4px]" width={57.6} height={34.4} sizes="100vw" alt="" src="Tailwindcss.svg" />
                        <Image className="w-[57.7px] relative h-[51.4px] object-contain" width={57.7} height={51.4} sizes="100vw" alt="" src="React.png" />
                        <Image className="w-9 relative h-[54px]" width={36} height={54} sizes="100vw" alt="" src="Figma.svg" />
                        <Image className="w-[40.6px] relative h-[50.4px]" width={40.6} height={50.4} sizes="100vw" alt="" src="Flutter.svg" />
                        <Image className="w-[52.4px] relative h-[52.4px]" width={52.4} height={52.4} sizes="100vw" alt="" src="Dart.svg" />
                        <Image className="w-[52.8px] relative h-[52.8px]" width={52.8} height={52.8} sizes="100vw" alt="" src="Git.svg" />
                        <Image className="w-[53.1px] relative h-[53.7px] object-cover" width={53.1} height={53.7} sizes="100vw" alt="" src="Python.png" />
                        <Image className="w-[64.1px] relative h-[49.4px] object-cover" width={64.1} height={49.4} sizes="100vw" alt="" src="RStudio.png" />
                        <Image className="w-[55.3px] relative h-[62.3px]" width={55.3} height={62.3} sizes="100vw" alt="" src="NodeJS.svg" />
                        <Image className="w-[45.7px] relative h-[62px]" width={45.7} height={62} sizes="100vw" alt="" src="Java.svg" />
                        <Image className="w-16 relative h-[62.4px]" width={64} height={62.4} sizes="100vw" alt="" src="MySQL.svg" />
                        <Image className="w-[63.1px] relative h-8" width={63.1} height={32} sizes="100vw" alt="" src="PHP.svg" />
                        <Image className="w-[52.7px] relative h-[54.7px]" width={52.7} height={54.7} sizes="100vw" alt="" src="PostgreSQL.svg" />
                    </div>
                </div>
                <div className="w-[197px] rounded-[117.48px] bg-aliceblue border-gray-200 border-solid border-[2.9px] box-border h-[63px] flex flex-row items-center justify-center flex-wrap content-center py-0 px-[23.9px] gap-[14.3px] text-[21.01px] text-gray-200">
                    <Image className="w-[34.4px] relative h-[34.4px] overflow-hidden shrink-0" width={34.4} height={34.4} sizes="100vw" alt="" src="Frame.svg" />
                    <div className="flex-1 relative font-semibold">Resume</div>
                </div>
            </div>
            <div className="flex flex-col items-center justify-start gap-[43px]">
                <div className="self-stretch relative leading-[57.3px] font-semibold flex items-center justify-center h-[62px] shrink-0">Services</div>
                <div className="self-stretch flex flex-col items-center justify-start gap-2.5 text-left text-[23.67px]">
                    <div className="self-stretch flex flex-row items-center justify-start gap-[16.5px]">
                        <div className="flex flex-col items-center justify-start p-px gap-[12.8px]">
                            <Image className="w-[321.5px] relative h-[182.4px] object-cover" width={321.5} height={182.4} sizes="100vw" alt="" src="Group 4.png" />
                            <div className="w-[296.8px] h-[80.9px] flex flex-col items-start justify-between gap-0">
                                <div className="self-stretch relative font-medium inline-block h-[29.6px] shrink-0 [text-shadow:0px_3.9445977210998535px_3.94px_rgba(0,_0,_0,_0.5)]">Full-Stack Web Developer</div>
                                <div className="self-stretch relative text-[15.78px] [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">Lorem ipsum dolor sit amet consectetur. A tellus aenean elementum id orci justo nibh tellus id. Iaculis suspendisse at ut amet elit eget curabitur fringilla. Hendrerit ac elit adipiscing sit tortor. Duis turpis facilisis arcu at.</div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-start p-px gap-[12.8px]">
                            <Image className="w-[321.5px] relative h-[182.4px] object-cover" width={321.5} height={182.4} sizes="100vw" alt="" src="Group 4.png" />
                            <div className="w-[296.8px] h-[80.9px] flex flex-col items-start justify-between gap-0">
                                <div className="self-stretch relative font-medium inline-block h-[29.6px] shrink-0 [text-shadow:0px_3.9445977210998535px_3.94px_rgba(0,_0,_0,_0.5)]">UI/UX Designer</div>
                                <div className="self-stretch relative text-[15.78px] [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">Lorem ipsum dolor sit amet consectetur. A tellus aenean elementum id orci justo nibh tellus id. Iaculis suspendisse at ut amet elit eget curabitur fringilla. Hendrerit ac elit adipiscing sit tortor. Duis turpis facilisis arcu at.</div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-start p-px gap-[12.8px]">
                            <Image className="w-[321.5px] relative h-[182.4px] object-cover" width={321.5} height={182.4} sizes="100vw" alt="" src="Group 4.png" />
                            <div className="w-[296.8px] h-[80.9px] flex flex-col items-start justify-between gap-0">
                                <div className="self-stretch relative font-medium inline-block h-[29.6px] shrink-0 [text-shadow:0px_3.9445977210998535px_3.94px_rgba(0,_0,_0,_0.5)]">Mobile Developer</div>
                                <div className="self-stretch relative text-[15.78px] [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">Lorem ipsum dolor sit amet consectetur. A tellus aenean elementum id orci justo nibh tellus id. Iaculis suspendisse at ut amet elit eget curabitur fringilla. Hendrerit ac elit adipiscing sit tortor. Duis turpis facilisis arcu at.</div>
                            </div>
                        </div>
                    </div>
                    <div className="w-[1010px] relative h-[46px] text-center text-xl text-silver-100">
                        <div className="absolute top-[0px] left-[0px] rounded-[60px] bg-silver-200 w-[1010px] h-[2.7px]" />
                        <div className="absolute top-[12.38px] left-[430.5px] font-extralight inline-block w-[149px] h-[33.6px]">See More</div>
                    </div>
                </div>
            </div>
            <div className="w-[1010px] flex flex-col items-center justify-start py-0.5 px-0 box-border gap-[31px] text-left text-2xl">
                <div className="w-[430px] relative text-4xl leading-[57.3px] font-semibold text-center flex items-center justify-center">{`Works & Experiences`}</div>
                <div className="self-stretch flex flex-row items-center justify-start gap-[25px] text-center text-[19.34px] text-silver-100">
                    <div className="w-[133px] rounded-[82.2px] border-goldenrod border-solid border-[1.5px] box-border h-[39px] flex flex-row items-center justify-center flex-wrap content-center py-0 px-[16.7px] text-goldenrod">
                        <div className="w-[108px] relative font-medium inline-block shrink-0 [text-shadow:0px_0px_1.2px_#f4ebd5]">Projects</div>
                    </div>
                    <div className="w-[154px] rounded-[82.2px] border-silver-100 border-solid border-[1.5px] box-border h-[39px] flex flex-row items-center justify-center flex-wrap content-center py-0 px-[16.7px]">
                        <div className="w-[108px] relative inline-block shrink-0">Education</div>
                    </div>
                    <div className="w-[123px] rounded-[82.2px] border-silver-100 border-solid border-[1.5px] box-border h-[39px] flex flex-row items-center justify-center flex-wrap content-center py-0 px-[16.7px]">
                        <div className="w-[108px] relative inline-block shrink-0">Career</div>
                    </div>
                    <div className="w-[125px] rounded-[82.2px] border-silver-100 border-solid border-[1.5px] box-border h-[39px] flex flex-row items-center justify-center flex-wrap content-center py-0 px-[16.7px]">
                        <div className="w-[108px] relative inline-block shrink-0">Awards</div>
                    </div>
                </div>
                <div className="self-stretch flex flex-col items-start justify-start gap-[31px]">
                    <div className="self-stretch flex flex-row items-start justify-start gap-5">
                        <Image className="w-80 relative rounded-[30px] h-[210px] object-cover" width={320} height={210} sizes="100vw" alt="" src="Image.png" />
                        <div className="self-stretch flex-1 flex flex-col items-start justify-start pt-2.5 px-0 pb-0 gap-[5px]">
                            <div className="self-stretch relative font-medium [text-shadow:0px_3.9445977210998535px_3.94px_rgba(0,_0,_0,_0.5)]">Account Management and Course Scheduler System for ActiveLearning.PH</div>
                            <i className="self-stretch relative text-[15.78px] [display:-webkit-inline-box] font-extralight overflow-hidden text-ellipsis [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">May 2024</i>
                            <div className="self-stretch relative text-base [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">Lorem ipsum dolor sit amet consectetur. A tellus aenean elementum id orci justo nibh tellus id. Iaculis suspendisse at ut amet elit eget curabitur fringilla. Hendrerit ac elit adipiscing sit tortor. Duis turpis facilisis arcu at.</div>
                        </div>
                    </div>
                    <div className="self-stretch flex flex-row items-start justify-start gap-5">
                        <Image className="w-80 relative rounded-[30px] h-[210px] object-cover" width={320} height={210} sizes="100vw" alt="" src="Image.png" />
                        <div className="self-stretch flex-1 flex flex-col items-start justify-start pt-2.5 px-0 pb-0 gap-[5px]">
                            <div className="self-stretch relative font-medium [text-shadow:0px_3.9445977210998535px_3.94px_rgba(0,_0,_0,_0.5)]">Account Management and Course Scheduler System for ActiveLearning.PH</div>
                            <i className="self-stretch relative text-[15.78px] [display:-webkit-inline-box] font-extralight overflow-hidden text-ellipsis [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">May 2024</i>
                            <div className="self-stretch relative text-base [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">Lorem ipsum dolor sit amet consectetur. A tellus aenean elementum id orci justo nibh tellus id. Iaculis suspendisse at ut amet elit eget curabitur fringilla. Hendrerit ac elit adipiscing sit tortor. Duis turpis facilisis arcu at.</div>
                        </div>
                    </div>
                    <div className="self-stretch flex flex-row items-start justify-start gap-5">
                        <Image className="w-80 relative rounded-[30px] h-[210px] object-cover" width={320} height={210} sizes="100vw" alt="" src="Image.png" />
                        <div className="self-stretch flex-1 flex flex-col items-start justify-start pt-2.5 px-0 pb-0 gap-[5px]">
                            <div className="self-stretch relative font-medium [text-shadow:0px_3.9445977210998535px_3.94px_rgba(0,_0,_0,_0.5)]">Account Management and Course Scheduler System for ActiveLearning.PH</div>
                            <i className="self-stretch relative text-[15.78px] [display:-webkit-inline-box] font-extralight overflow-hidden text-ellipsis [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">May 2024</i>
                            <div className="self-stretch relative text-base [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">Lorem ipsum dolor sit amet consectetur. A tellus aenean elementum id orci justo nibh tellus id. Iaculis suspendisse at ut amet elit eget curabitur fringilla. Hendrerit ac elit adipiscing sit tortor. Duis turpis facilisis arcu at.</div>
                        </div>
                    </div>
                </div>
                <div className="self-stretch flex flex-col items-start justify-start gap-[31px]">
                    <div className="self-stretch flex flex-row items-start justify-center gap-[30px]">
                        <Image className="w-[150px] relative h-[150px] object-cover" width={150} height={150} sizes="100vw" alt="" src="Image.png" />
                        <Image className="w-5 h-[150px]" width={20} height={150} sizes="100vw" alt="" src="Marker.svg" />
                        <div className="self-stretch flex-1 flex flex-col items-start justify-start pt-[5px] px-0 pb-0 gap-[5px]">
                            <div className="self-stretch relative font-medium [text-shadow:0px_3.9445977210998535px_3.94px_rgba(0,_0,_0,_0.5)]">University of Santo Tomas</div>
                            <i className="self-stretch relative text-[15.78px] [display:-webkit-inline-box] font-extralight overflow-hidden text-ellipsis [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">2022 - 2026</i>
                            <div className="self-stretch relative text-base [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">Lorem ipsum dolor sit amet consectetur. A tellus aenean elementum id orci justo nibh tellus id. Iaculis suspendisse at ut amet elit eget curabitur fringilla. Hendrerit ac elit adipiscing sit tortor. Duis turpis facilisis arcu at.</div>
                        </div>
                    </div>
                    <div className="self-stretch flex flex-row items-start justify-center gap-[30px]">
                        <Image className="w-[150px] relative h-[150px] object-cover" width={150} height={150} sizes="100vw" alt="" src="Image.png" />
                        <Image className="w-5 h-[150px]" width={20} height={150} sizes="100vw" alt="" src="Marker.svg" />
                        <div className="self-stretch flex-1 flex flex-col items-start justify-start pt-[5px] px-0 pb-0 gap-[5px]">
                            <div className="self-stretch relative font-medium [text-shadow:0px_3.9445977210998535px_3.94px_rgba(0,_0,_0,_0.5)]">University of Santo Tomas</div>
                            <i className="self-stretch relative text-[15.78px] [display:-webkit-inline-box] font-extralight overflow-hidden text-ellipsis [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">2022 - 2026</i>
                            <div className="self-stretch relative text-base [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">Lorem ipsum dolor sit amet consectetur. A tellus aenean elementum id orci justo nibh tellus id. Iaculis suspendisse at ut amet elit eget curabitur fringilla. Hendrerit ac elit adipiscing sit tortor. Duis turpis facilisis arcu at.</div>
                        </div>
                    </div>
                    <div className="self-stretch flex flex-row items-start justify-center gap-[30px]">
                        <Image className="w-[150px] relative h-[150px] object-cover" width={150} height={150} sizes="100vw" alt="" src="Image.png" />
                        <Image className="w-5 h-[150px]" width={20} height={150} sizes="100vw" alt="" src="Marker.svg" />
                        <div className="self-stretch flex-1 flex flex-col items-start justify-start pt-[5px] px-0 pb-0 gap-[5px]">
                            <div className="self-stretch relative font-medium [text-shadow:0px_3.9445977210998535px_3.94px_rgba(0,_0,_0,_0.5)]">University of Santo Tomas</div>
                            <i className="self-stretch relative text-[15.78px] [display:-webkit-inline-box] font-extralight overflow-hidden text-ellipsis [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">2022 - 2026</i>
                            <div className="self-stretch relative text-base [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">Lorem ipsum dolor sit amet consectetur. A tellus aenean elementum id orci justo nibh tellus id. Iaculis suspendisse at ut amet elit eget curabitur fringilla. Hendrerit ac elit adipiscing sit tortor. Duis turpis facilisis arcu at.</div>
                        </div>
                    </div>
                </div>
                <div className="w-[1010px] h-[496px] flex flex-col items-start justify-between gap-0">
                    <div className="self-stretch flex flex-row items-start justify-center gap-[30px]">
                        <Image className="w-[150px] relative h-[150px] object-cover" width={150} height={150} sizes="100vw" alt="" src="Image.png" />
                        <Image className="w-5 h-[150px]" width={20} height={150} sizes="100vw" alt="" src="Marker.svg" />
                        <div className="self-stretch flex-1 flex flex-col items-start justify-start pt-[5px] px-0 pb-0 gap-[5px]">
                            <div className="self-stretch relative font-medium [text-shadow:0px_3.9445977210998535px_3.94px_rgba(0,_0,_0,_0.5)]">Shift Data Services Inc.</div>
                            <i className="self-stretch relative text-[15.78px] [display:-webkit-inline-box] font-extralight overflow-hidden text-ellipsis [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">Jan 2024 - Present</i>
                            <div className="self-stretch relative text-base [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">Lorem ipsum dolor sit amet consectetur. A tellus aenean elementum id orci justo nibh tellus id. Iaculis suspendisse at ut amet elit eget curabitur fringilla. Hendrerit ac elit adipiscing sit tortor. Duis turpis facilisis arcu at.</div>
                        </div>
                    </div>
                    <div className="self-stretch flex flex-row items-start justify-center gap-[30px]">
                        <Image className="w-[150px] relative h-[150px] object-cover" width={150} height={150} sizes="100vw" alt="" src="Image.png" />
                        <Image className="w-5 h-[150px]" width={20} height={150} sizes="100vw" alt="" src="Marker.svg" />
                        <div className="self-stretch flex-1 flex flex-col items-start justify-start pt-[5px] px-0 pb-0 gap-[5px]">
                            <div className="self-stretch relative font-medium [text-shadow:0px_3.9445977210998535px_3.94px_rgba(0,_0,_0,_0.5)]">Shift Data Services Inc.</div>
                            <i className="self-stretch relative text-[15.78px] [display:-webkit-inline-box] font-extralight overflow-hidden text-ellipsis [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">Jan 2024 - Present</i>
                            <div className="self-stretch relative text-base [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">Lorem ipsum dolor sit amet consectetur. A tellus aenean elementum id orci justo nibh tellus id. Iaculis suspendisse at ut amet elit eget curabitur fringilla. Hendrerit ac elit adipiscing sit tortor. Duis turpis facilisis arcu at.</div>
                        </div>
                    </div>
                    <div className="self-stretch flex flex-row items-start justify-center gap-[30px]">
                        <Image className="w-[150px] relative h-[150px] object-cover" width={150} height={150} sizes="100vw" alt="" src="Image.png" />
                        <Image className="w-5 h-[150px]" width={20} height={150} sizes="100vw" alt="" src="Marker.svg" />
                        <div className="self-stretch flex-1 flex flex-col items-start justify-start pt-[5px] px-0 pb-0 gap-[5px]">
                            <div className="self-stretch relative font-medium [text-shadow:0px_3.9445977210998535px_3.94px_rgba(0,_0,_0,_0.5)]">Shift Data Services Inc.</div>
                            <i className="self-stretch relative text-[15.78px] [display:-webkit-inline-box] font-extralight overflow-hidden text-ellipsis [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">Jan 2024 - Present</i>
                            <div className="self-stretch relative text-base [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">Lorem ipsum dolor sit amet consectetur. A tellus aenean elementum id orci justo nibh tellus id. Iaculis suspendisse at ut amet elit eget curabitur fringilla. Hendrerit ac elit adipiscing sit tortor. Duis turpis facilisis arcu at.</div>
                        </div>
                    </div>
                </div>
                <div className="self-stretch h-[589px] flex flex-col items-start justify-between gap-0">
                    <div className="self-stretch flex flex-row items-start justify-center gap-[30px]">
                        <Image className="w-5 h-[150px]" width={20} height={150} sizes="100vw" alt="" src="Marker.svg" />
                        <div className="flex-1 flex flex-col items-start justify-start gap-[30px]">
                            <div className="self-stretch flex flex-col items-start justify-start pt-[5px] px-0 pb-0 gap-[5px]">
                                <div className="self-stretch relative font-medium [text-shadow:0px_3.9445977210998535px_3.94px_rgba(0,_0,_0,_0.5)]">University of Santo Tomas</div>
                                <i className="self-stretch relative text-[15.78px] [display:-webkit-inline-box] font-extralight overflow-hidden text-ellipsis [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">2022 - 2026</i>
                                <div className="self-stretch relative text-base [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">Lorem ipsum dolor sit amet consectetur. A tellus aenean elementum id orci justo nibh tellus id. Iaculis suspendisse at ut amet elit eget curabitur fringilla. Hendrerit ac elit adipiscing sit tortor. Duis turpis facilisis arcu at.</div>
                            </div>
                            <Image className="w-64 relative rounded-3xl h-36 object-cover" width={256} height={144} sizes="100vw" alt="" src="Image.png" />
                        </div>
                    </div>
                    <div className="self-stretch flex flex-row items-start justify-center gap-[30px]">
                        <Image className="w-5 h-[150px]" width={20} height={150} sizes="100vw" alt="" src="Marker.svg" />
                        <div className="flex-1 flex flex-col items-start justify-start gap-[30px]">
                            <div className="self-stretch flex flex-col items-start justify-start pt-[5px] px-0 pb-0 gap-[5px]">
                                <div className="self-stretch relative font-medium [text-shadow:0px_3.9445977210998535px_3.94px_rgba(0,_0,_0,_0.5)]">University of Santo Tomas</div>
                                <i className="self-stretch relative text-[15.78px] [display:-webkit-inline-box] font-extralight overflow-hidden text-ellipsis [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">2022 - 2026</i>
                                <div className="self-stretch relative text-base [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">Lorem ipsum dolor sit amet consectetur. A tellus aenean elementum id orci justo nibh tellus id. Iaculis suspendisse at ut amet elit eget curabitur fringilla. Hendrerit ac elit adipiscing sit tortor. Duis turpis facilisis arcu at.</div>
                            </div>
                            <Image className="w-64 relative rounded-3xl h-36 object-cover" width={256} height={144} sizes="100vw" alt="" src="Image.png" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-[838px] flex flex-col items-center justify-start gap-7">
                <div className="self-stretch relative leading-[57.3px] font-semibold">Contact Me</div>
                <div className="w-[495px] flex flex-col items-center justify-start gap-[25px] text-left text-xl">
                    <div className="w-[324px] h-[34px] flex flex-row items-start justify-center gap-[25px] text-antiquewhite">
                        <Image className="w-[33.6px] relative h-[33.6px] overflow-hidden shrink-0" width={33.6} height={33.6} sizes="100vw" alt="" src="Frame.svg" />
                        <div className="w-[267px] relative flex items-center h-8 shrink-0">jammeisytan@gmail.com</div>
                    </div>
                    <div className="self-stretch relative h-[101px]">
                        <Image className="relative w-[474px] h-[88px]" width={474} height={88} sizes="100vw" alt="" src="Subtract.svg" />
                        <i className="absolute w-[88.4%] top-[43px] left-[7.17%] inline-block font-light h-[307px] [text-shadow:0px_3.9445977210998535px_3.94px_rgba(0,_0,_0,_0.5)]">Write your name/company</i>
                        <div className="absolute w-[20.67%] top-[0px] left-[7.17%] text-antiquewhite text-center inline-block h-[30px] [text-shadow:0px_3.9445977210998535px_3.94px_rgba(0,_0,_0,_0.5)]">Name</div>
                    </div>
                    <div className="self-stretch relative h-[103px]">
                        <Image className="relative w-[474px] h-[90px]" width={474} height={90} sizes="100vw" alt="" src="Subtract.svg" />
                        <i className="absolute w-[88.4%] top-[43px] left-[7.17%] inline-block font-light h-[307px] [text-shadow:0px_3.9445977210998535px_3.94px_rgba(0,_0,_0,_0.5)]">Write your email @</i>
                        <div className="absolute w-[20.67%] top-[0px] left-[7.17%] text-antiquewhite text-center inline-block h-[30px] [text-shadow:0px_3.9445977210998535px_3.94px_rgba(0,_0,_0,_0.5)]">Email</div>
                    </div>
                    <div className="self-stretch relative h-[381px]">
                        <Image className="relative w-[474px] h-[368px]" width={474} height={368} sizes="100vw" alt="" src="Subtract.svg" />
                        <i className="absolute w-[88.4%] top-[43px] left-[7.17%] inline-block font-light h-[307px] [text-shadow:0px_3.9445977210998535px_3.94px_rgba(0,_0,_0,_0.5)]">Write your message...</i>
                        <div className="absolute w-[20.67%] top-[0px] left-[7.17%] text-antiquewhite text-center inline-block h-[30px] [text-shadow:0px_3.9445977210998535px_3.94px_rgba(0,_0,_0,_0.5)]">Message</div>
                    </div>
                </div>
            </div>
            <div className="self-stretch bg-gray-100 border-silver-200 border-solid border-t-[1px] flex flex-row items-center justify-between py-[97px] px-[200px] gap-0 text-left text-[40px]">
                <div className="w-[269px] h-[99px] flex flex-col items-start justify-between gap-0">
                    <div className="w-[143px] relative h-[50px]">
                        <div className="absolute top-[0px] left-[0px] font-medium">Jam</div>
                        <Image className="absolute top-[0px] left-[93px] w-[50px] h-[50px] object-cover" width={50} height={50} sizes="100vw" alt="" src="Empty Jam Jar.png" />
                    </div>
                    <div className="w-[322px] relative text-base text-silver-100 inline-block">
                        <p className="m-0">{`Copyright © 2024 Jam Meisy Tan. `}</p>
                        <p className="m-0">All Rights Reserved.</p>
                    </div>
                </div>
                <div className="w-[667px] h-[105px] flex flex-col items-end justify-between gap-0 text-[21.23px]">
                    <div className="self-stretch flex flex-row items-start justify-between gap-0">
                        <div className="w-[86.9px] flex flex-row items-center justify-center p-[9.7px] box-border">
                            <div className="relative font-semibold">Home</div>
                        </div>
                        <div className="w-[87.8px] flex flex-row items-center justify-center p-[9.7px] box-border">
                            <div className="relative font-semibold">About</div>
                        </div>
                        <div className="w-[113.9px] flex flex-row items-center justify-center p-[9.7px] box-border">
                            <div className="relative font-semibold">Services</div>
                        </div>
                        <div className="w-[95px] flex flex-row items-center justify-center p-[9.7px] box-border">
                            <div className="relative font-semibold">Works</div>
                        </div>
                        <div className="w-[111px] flex flex-row items-center justify-center p-[9.7px] box-border">
                            <div className="relative font-semibold">Contact</div>
                        </div>
                    </div>
                    <div className="w-[235px] h-11 flex flex-row items-end justify-between py-0 pl-0 pr-[18px] box-border gap-0">
                        <Image className="w-[38px] relative h-[38px]" width={38} height={38} sizes="100vw" alt="" src="Vector.svg" />
                        <Image className="w-[38px] relative h-[38px]" width={38} height={38} sizes="100vw" alt="" src="Vector.svg" />
                        <Image className="w-[39px] relative h-[38px]" width={39} height={38} sizes="100vw" alt="" src="Vector.svg" />
                    </div>
                </div>
            </div>
        </div>);
};

export default Desktop;
