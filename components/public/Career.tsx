const imgImage2 = "http://localhost:3845/assets/35786ce7a6809d30e6d079c1fdb2ec580ed3f0aa.png";
const imgMarker = "http://localhost:3845/assets/cbff4735cb3e9e05e3e75f1022d8cea3516fc86b.svg";

function Career() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-[30px] items-start justify-center p-0 relative size-full"
      data-name="Career"
      id="node-51_928"
    >
      <div
        className="bg-center bg-contain bg-no-repeat relative shrink-0 size-[150px]"
        data-name="Image"
        id="node-51_921"
        style={{ backgroundImage: `url('${imgImage2}')` }}
      >
        <div className="absolute inset-0 pointer-events-none shadow-[0px_4.63885px_4.63885px_149.603px_inset_rgba(0,0,0,0.1)]" />
      </div>
      <div
        className="h-[150px] relative shrink-0 w-5"
        data-name="Marker"
        id="node-51_922"
      >
        <img alt="" className="block max-w-none size-full" src={imgMarker} />
      </div>
      <div
        className="basis-0 box-border content-stretch flex flex-col gap-[5px] grow items-start justify-start leading-[0] min-h-px min-w-px pb-0 pt-[5px] px-0 relative self-stretch shrink-0 text-[#e7e8ef] text-left"
        data-name="Content"
        id="node-51_924"
      >
        <div
          className="[text-shadow:rgba(0,0,0,0.5)_0px_3.9446px_3.9446px] font-['Plus_Jakarta_Sans:Medium',_sans-serif] font-medium relative shrink-0 text-[24px] w-full"
          id="node-51_925"
        >
          <p className="block leading-[normal]">Shift Data Services Inc.</p>
        </div>
        <div
          className="-webkit-box css-bhv5v2 font-['Plus_Jakarta_Sans:ExtraLight_Italic',_sans-serif] font-extralight italic overflow-ellipsis overflow-hidden relative shrink-0 text-[15.7784px] w-full"
          id="node-51_926"
        >
          <p className="block leading-[normal]">Jan 2024 - Present</p>
        </div>
        <div
          className="-webkit-box css-bhv5v2 font-['Plus_Jakarta_Sans:Regular',_sans-serif] font-normal overflow-ellipsis overflow-hidden relative shrink-0 text-[16px] w-full"
          id="node-51_927"
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

export default Career;
