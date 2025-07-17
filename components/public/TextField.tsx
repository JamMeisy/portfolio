const imgSubtract = "http://localhost:3845/assets/64283781a7c73be76627328d4622786a4f56a88a.svg";

function TextField() {
  return (
    <div className="relative size-full" data-name="TextField" id="node-41_237">
      <div
        className="absolute bottom-0 left-1/2 top-[3.412%] translate-x-[-50%] w-[474px]"
        data-name="Subtract"
        id="node-41_232"
      >
        <div className="absolute bottom-[-2.144%] left-[-0.832%] right-[-0.832%] top-0">
          <img alt="" className="block max-w-none size-full" src={imgSubtract} />
        </div>
      </div>
      <div
        className="[text-shadow:rgba(0,0,0,0.5)_0px_3.9446px_3.9446px] absolute font-['Plus_Jakarta_Sans:Light_Italic',_sans-serif] font-light h-[307px] italic leading-[0] left-[7.173%] right-[4.43%] text-[#e7e8ef] text-[20px] text-left top-[43px]"
        id="node-41_236"
      >
        <p className="block leading-[normal]">Write your message...</p>
      </div>
      <div
        className="[text-shadow:rgba(0,0,0,0.5)_0px_3.9446px_3.9446px] absolute font-['Plus_Jakarta_Sans:Regular',_sans-serif] font-normal h-[30px] leading-[0] left-[7.173%] right-[72.152%] text-[#f4ebd5] text-[20px] text-center top-0"
        id="node-41_235"
      >
        <p className="block leading-[normal]">Message</p>
      </div>
    </div>
  );
}

export default TextField;
