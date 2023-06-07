import Button from "./Button"
export default function Indexmobile() {
  return (
    <div style={{ backgroundColor: "transparent" }} className="xsm: flex xsm: mt-40 xsm: flex-col items-center content-center">
      <h1 style={{ backgroundColor: "transparent" }} className="text-white xsm: text-4xl xsm:text-center xsm:font-bold">Experience the thrill of Need for Speed</h1>
      <h3 style={{ backgroundColor: "transparent" }} className="text-white xsm: self-center xsm:text-base xsm:mb-2 p-3">Choose your ride and dominate the streets</h3>
      <div style={{ backgroundColor: "transparent" }} className="xsm: self-center">
        <Button/>
      </div>
    </div>
  )
}