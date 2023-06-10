import { Link as Anchor } from "react-router-dom"

export default function Button() {
  let token = localStorage.getItem('token')

  return (
    <>
      {token ? (
        <Anchor to="/games/:pages">
          <button className=" rounded-2xl text-white not-italic font-medium text-2xl leading-[95.19%] bg-[#05835b00] flex flex-row justify-center items-center gap-2.5 w-60 h-[55px] p-4">
            Explore Games!
          </button>
        </Anchor>
      ) : (
        <Anchor className=" mt-5 w-[50%]" to="/auth">
          <button className=" text-white not-italic font-medium text-2xl leading-[95.19%] bg-[#343434] rounded-xl hover:bg-slate-500 transition-all flex flex-row justify-center items-center gap-2.5 w-60 h-[55px] p-4">
            Sign in
          </button>
        </Anchor>
      )}
    </>
  )
}
