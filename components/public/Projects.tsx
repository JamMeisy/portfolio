const imgImage = "http://localhost:3845/assets/09199d0cb99c3d78af626202459c77f0502932fa.png";

function Projects() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-5 items-start justify-start p-0 relative size-full"
      data-name="Projects"
      id="node-51_408"
    >
      <div
        className="bg-center bg-cover bg-no-repeat h-[210px] pointer-events-none relative rounded-[30px] shrink-0 w-80"
        data-name="Image"
        id="node-48_136"
        style={{ backgroundImage: `url('${imgImage}')` }}
      >
        <div className="absolute border border-[#f4ebd5] border-solid inset-0 rounded-[30px]" />
        <div className="absolute inset-0 shadow-[0px_3.9446px_3.9446px_127.213px_inset_rgba(0,0,0,0.1),0px_3.9446px_24.6537px_19.723px_inset_rgba(0,0,0,0.5)]" />
      </div>
      <div
        className="basis-0 box-border content-stretch flex flex-col gap-[5px] grow items-start justify-start leading-[0] min-h-px min-w-px pb-0 pt-2.5 px-0 relative self-stretch shrink-0 text-[#e7e8ef] text-left"
        data-name="Content"
        id="node-48_137"
      >
        <div
          className="[text-shadow:rgba(0,0,0,0.5)_0px_3.9446px_3.9446px] font-['Plus_Jakarta_Sans:Medium',_sans-serif] font-medium relative shrink-0 text-[24px] w-full"
          id="node-48_138"
        >
          <p className="block leading-[normal]">
            Account Management and Course Scheduler System for ActiveLearning.PH
          </p>
        </div>
        <div
          className="-webkit-box css-bhv5v2 font-['Plus_Jakarta_Sans:ExtraLight_Italic',_sans-serif] font-extralight italic overflow-ellipsis overflow-hidden relative shrink-0 text-[15.7784px] w-full"
          id="node-48_391"
        >
          <p className="block leading-[normal]">May 2024</p>
        </div>
        <div
          className="-webkit-box css-bhv5v2 font-['Plus_Jakarta_Sans:Regular',_sans-serif] font-normal overflow-ellipsis overflow-hidden relative shrink-0 text-[16px] w-full"
          id="node-48_139"
        >
          <p className="block leading-[normal]">
            Lorem ipsum dolor sit amet consectetur. A tellus aenean elementum id
            orci justo nibh tellus id. Iaculis suspendisse at ut amet elit eget
            curabitur fringilla. Hendrerit ac elit adipiscing sit tortor. Duis
            turpis facilisis arcu at.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Projects;
