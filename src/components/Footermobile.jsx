import footer from "../assets/image/footer.png"
import logo from "../assets/image/logo-minga.png"

export default function Footermobile() {
  return (
    <footer className="md:hidden">
      <div>
        <img src={footer} className="h- bg-gradient-to-b from-[#F9A8D4] to-[#F472B6]" />
      </div>
      <div className="flex items-center justify-around bg-[#F472B6]">
        <div className="flex gap-10 text-white font-bold">
          <h5>Home</h5>
          <h5>Mangas</h5>
        </div>
        <div className="pb-5">
          <img src={logo} className="w-[3rem]" />
        </div>
      </div>
    </footer>
  )
}
