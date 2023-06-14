import { Link as Anchor } from "react-router-dom"

export default function Button() {
  let token = localStorage.getItem('token')

  return (
    <>
      {token ? (
        <Anchor className=" mt-5 w-[50%]" to="/games/:pages">
          <button className=" text-white not-italic font-medium text-2xl leading-[95.19%] bg-cyan-900  rounded-xl hover:bg-slate-500 transition-all flex flex-row justify-center items-center gap-2.5 w-60 h-[55px] p-4">
            Explore Games!
          </button>
        </Anchor>
      ) : (
        <div className="flex  mt-5 w-[60%] px-5">
            <Anchor className=" " to="/auth">
          <button className=" text-white not-italic font-medium text-2xl leading-[95.19%] bg-cyan-900  rounded-xl hover:bg-slate-500 transition-all flex flex-row justify-center items-center gap-2.5 w-56 h-[55px] p-4">
            Sign in
          </button>
          </Anchor>
          <Anchor className=" " to="/games/:pages">
          <button className="text-white not-italic ml-10 font-medium text-2xl leading-[95.19%] bg-cyan-900 rounded-xl hover:bg-slate-500 transition-all flex flex-row justify-center items-center gap-2.5 w-56 h-[55px] p-4">
          Explore Games!
          </button>
          </Anchor>
          </div>
       
       
      )}
    </>
  )
}
