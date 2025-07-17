const imgVector = "http://localhost:3845/assets/d9a1b603c6f16c94d5229ee0d279f143a48fddcc.svg";
const imgEllipse2 = "http://localhost:3845/assets/f8cca2f3f8ed100db18ed1d0f7bed0acd5183ad1.svg";

function ArrowButton() {
  return (
    <div
      className="relative size-full"
      data-name="Arrow Button"
      id="node-29_33"
    >
      <div
        className="absolute bottom-[24%] left-[40%] right-[34%] top-[24%]"
        data-name="Vector"
        id="node-29_31"
      >
        <div className="absolute bottom-[-7.692%] left-[-15.385%] right-[-21.757%] top-[-7.692%]">
          <img alt="" className="block max-w-none size-full" src={imgVector} />
        </div>
      </div>
      <div className="absolute inset-0" id="node-29_32">
        <img alt="" className="block max-w-none size-full" src={imgEllipse2} />
      </div>
    </div>
  );
}

export default ArrowButton;
