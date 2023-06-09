import { Link as Anchor } from "react-router-dom"

export default function Button() {
  let token = localStorage.getItem('token')

  return (
    <>
      {token ? (
        <Anchor to="/games/:pages">
          <button className=" bg-black rounded-2xl text-white not-italic font-medium text-2xl leading-[95.19%] bg-[#05835b00] flex flex-row justify-center items-center gap-2.5 w-60 h-[55px] p-4">
            Explore Games!
          </button>
        </Anchor>
      ) : (
        <Anchor to="/auth">
          <button style={{ backgroundColor: "transparent" }} className="text-white not-italic font-medium text-2xl leading-[95.19%] bg-gradient-to-r from-btn1 from-(-13.10%) to-btn2 to-58.69% rounded-md flex flex-row justify-center items-center gap-2.5 w-60 h-[55px] p-4">
            Sign in
          </button>
        </Anchor>
      )}
    </>
  )
}
