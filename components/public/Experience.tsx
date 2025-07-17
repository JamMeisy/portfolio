interface ExperienceProps {
  property1?: "Default" | "Selected";
}

function Experience({ property1 = "Default" }: ExperienceProps) {
  if (property1 === "Selected") {
    return (
      <button
        className="cursor-pointer relative rounded-[82.1971px] size-full"
        data-name="Property 1=Selected"
        id="node-39_198"
      >
        <div className="absolute border-[#e5ba49] border-[1.5px] border-solid inset-0 pointer-events-none rounded-[82.1971px]" />
        <div className="flex flex-row items-center justify-center relative size-full">
          <div className="[flex-flow:wrap] box-border content-center flex gap-[10.024px] items-center justify-center px-[16.707px] py-0 relative size-full">
            <div
              className="[text-shadow:#f4ebd5_0px_0px_1.2px] font-['Plus_Jakarta_Sans:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#e5ba49] text-[19.3424px] text-center w-[108px]"
              id="node-39_199"
            >
              <p className="block leading-[normal]">Projects</p>
            </div>
          </div>
        </div>
      </button>
    );
  }
  return null;
}

export default Experience;
