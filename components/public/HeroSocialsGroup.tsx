const imgVector1 = "http://localhost:3845/assets/0bdab201d1b41814415226c60852de56963e5172.svg";
const imgVector2 = "http://localhost:3845/assets/9b316878ed324fce15c262a5917951f57874e806.svg";
const imgVector3 = "http://localhost:3845/assets/26af3e1151f2ca14b2b9eb74d221584d225f400b.svg";

function HeroSocialsGroup() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-12 items-end justify-center pb-1.5 pt-0 px-0 relative size-full"
      data-name="Hero Socials Group"
      id="node-47_102"
    >
      <div
        className="relative shrink-0 size-[47.04px]"
        data-name="Vector"
        id="node-9_418"
      >
        <img alt="" className="block max-w-none size-full" src={imgVector1} />
      </div>
      <div
        className="relative shrink-0 size-[47.04px]"
        data-name="Vector"
        id="node-9_414"
      >
        <img alt="" className="block max-w-none size-full" src={imgVector2} />
      </div>
      <div
        className="h-[47.04px] relative shrink-0 w-[48.229px]"
        data-name="Vector"
        id="node-9_394"
      >
        <img alt="" className="block max-w-none size-full" src={imgVector3} />
      </div>
    </div>
  );
}

export default HeroSocialsGroup;
