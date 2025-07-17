const imgImage = "http://localhost:3845/assets/09199d0cb99c3d78af626202459c77f0502932fa.png";
const imgMarker1 = "http://localhost:3845/assets/184a7e8f1b99748dbede3ac5ed56724dbf42dd1b.svg";

function Award() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-[30px] items-start justify-center p-0 relative size-full"
      data-name="Award"
      id="node-51_910"
    >
      <div
        className="h-[150px] relative shrink-0 w-5"
        data-name="Marker"
        id="node-51_817"
      >
        <img alt="" className="block max-w-none size-full" src={imgMarker1} />
      </div>
      <div
        className="basis-0 box-border content-stretch flex flex-col gap-[30px] grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
        data-name="Content"
        id="node-51_909"
      >
        <div
          className="box-border content-stretch flex flex-col gap-[5px] items-start justify-start leading-[0] pb-0 pt-[5px] px-0 relative shrink-0 text-[#e7e8ef] text-left w-full"
          data-name="Text"
          id="node-51_483"
        >
          <div
            className="[text-shadow:rgba(0,0,0,0.5)_0px_3.9446px_3.9446px] font-['Plus_Jakarta_Sans:Medium',_sans-serif] font-medium relative shrink-0 text-[24px] w-full"
            id="node-51_484"
          >
            <p className="block leading-[normal]">University of Santo Tomas</p>
          </div>
          <div
            className="-webkit-box css-bhv5v2 font-['Plus_Jakarta_Sans:ExtraLight_Italic',_sans-serif] font-extralight italic overflow-ellipsis overflow-hidden relative shrink-0 text-[15.7784px] w-full"
            id="node-51_485"
          >
            <p className="block leading-[normal]">2022 - 2026</p>
          </div>
          <div
            className="-webkit-box css-bhv5v2 font-['Plus_Jakarta_Sans:Regular',_sans-serif] font-normal overflow-ellipsis overflow-hidden relative shrink-0 text-[16px] w-full"
            id="node-51_486"
          >
            <p className="block leading-[normal]">
              Lorem ipsum dolor sit amet consectetur. A tellus aenean elementum
              id orci justo nibh tellus id. Iaculis suspendisse at ut amet elit
              eget curabitur fringilla. Hendrerit ac elit adipiscing sit tortor.
              Duis turpis facilisis arcu at.
            </p>
          </div>
        </div>
        <div
          className="bg-center bg-cover bg-no-repeat h-36 pointer-events-none relative rounded-3xl shrink-0 w-64"
          data-name="Image"
          id="node-51_487"
          style={{ backgroundImage: `url('${imgImage}')` }}
        >
          <div className="absolute border-[#b6b8bf] border-[1.6px] border-solid inset-[-1.6px] rounded-[25.6px]" />
          <div className="absolute inset-0 shadow-[0px_3.15568px_3.15568px_101.771px_inset_rgba(0,0,0,0.1),0px_3.15568px_19.723px_15.7784px_inset_rgba(0,0,0,0.5)]" />
        </div>
      </div>
    </div>
  );
}

export default Award;
