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
            <div className="flex flex-col justify-center items-center content-center xsm:h-full md:hidden">
                <div className="xsm:bg-[url(/src/assets/image/need3.jpg)] bg-center  border-t border-white xsm:w-full xsm:h-screen xsm:bg-cover md:hidden">
                
<Indexmobile /> 
                </div>
            </div>
        </>
    )
}

export default App