export default function LoginPage(){
    return(
        <div className="w-full h-screen">
            <div className="w-full h-full flex">
                <div className="w-[65%] relative overflow-hidden">
                    <img src="/images/login_bg.jpg" alt="Família feliz dentro de sua casa" className="w-full h-full object-cover"/>
                    <div className="w-full h-full start-0 top-0 absolute bg-gradient-to-r from-lime-500 to-sky-600 opacity-70"></div>
                </div>
                <div className="w-[35%]">
                    <div className="w-full h-full flex flex-col justify-center items-center p-8">
                        <h1 className="font-light text-2xl">Entre com suas informações</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}