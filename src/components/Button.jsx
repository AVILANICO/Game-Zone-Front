import { Link as Anchor } from "react-router-dom"

export default function Button() {
  let token = localStorage.getItem('token')

  const gradientStyle = {
    background: 'linear-gradient(to right, #00474D, #0891B2)',
  }
  return (
    <>
      {token ? (
        <Anchor className=" mt-5 w-[50%] " to="/games/:pages">
          <button style={gradientStyle} className=" text-white not-italic font-medium text-2xl  rounded-xl shadow-xl hover:shadow-black hover:scale-105 transition-all flex flex-row justify-center items-center gap-2.5 w-60 h-[55px] p-4">
            Explore Games!
          </button>
        </Anchor>
      ) : (
        <div className="flex  mt-5 w-[60%] px-5 flex-wrap md:flex-nowrap ">
          <Anchor className=" " to="/auth">
            <button style={gradientStyle} className=" text-white not-italic font-medium text-2xl xsm:text-md  rounded-xl shadow-xl hover:shadow-black hover:scale-105 transition-all flex flex-row justify-center items-center gap-2.5 w-56 h-[55px] p-4">
              Sign In!
            </button>
          </Anchor>
          <Anchor className=" " to="/games/:pages">
            <button style={gradientStyle} className="text-white not-italic ml-10 font-medium text-2xl xsm:text-md xsm:ml-0 xsm:gap-0 xsm:mt-4 rounded-xl shadow-xl hover:shadow-black hover:scale-105 transition-all flex flex-row justify-center items-center gap-2.5 w-56 h-[55px] p-4     xxsm:text-md xxsm:ml-0 xxsm:gap-0 xxsm:mt-4">
              Explore Games!
            </button>
          </Anchor>
        </div>


      )}
    </>
  )
}
