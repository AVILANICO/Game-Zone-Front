import Index from "./pages/Index"
import './App.css'
import Indexmobile from "./components/Indexmobile"


function App() {

    return (
        <>
            <>
                <Index />
            </>
            {/* //mobile */}
            <div className="flex flex-col justify-center items-center content-center xsm:h-full xxsm:hidden">
                <div className="xsm:bg-[url(https://www.xtrafondos.com/descargar.php?id=5703&resolucion=3840x2158)]  bg-center  border-white  xsm:w-full xsm:h-screen xsm:bg-cover    xxsm:w-full xxsm:h-screen xxsm:bg-cover">

                    <Indexmobile />
                </div>
            </div>
        </>
    )
}

export default App