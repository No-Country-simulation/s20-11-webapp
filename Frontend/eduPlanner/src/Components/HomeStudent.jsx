import Header from './Header'
import Footer from './Footer'

function HomeStudent() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col relative overflow-hidden">
        <Header/>
        <main className='flex-grow container mx-auto px-4 py-8'>
            <h1 className='text-3xl font-bold mb-6 bg-gradient-to-r from-[#9333ea] to-[#2563eb] text-transparent bg-clip-text'>¡Hola, Juanita!</h1>
            <h2 className='pt-4'>Novedades</h2>
            <div className="contenedor-general grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-10">
                {/* Novedades */}
                <div className="novedades flex flex-col gap-2">
                    <div className="novedad1 bg-purple-700 rounded-md p-4">
                        <h3 className="text-lg">25/01/2025</h3>
                        <p>Exámen de matemáticas</p>
                    </div>
                    <div className="novedad2 bg-purple-700 rounded-md p-4">
                        <h3 className="text-lg">30/01/2025</h3>
                        <p>Entrega de trabajo práctico</p>
                    </div>
                </div>

                {/* Calendario y horario */}
                <div className="grid grid-cols-2 gap-2 md:flex md:flex-col">
                    <div className="calendario bg-blue-500 rounded-md p-4 h-[200px] md:h-[150px]">
                        <p>Calendario</p>
                    </div>
                    <div className="horario bg-green-500 rounded-md p-4 h-[200px] md:h-[150px]">
                        <p>Horario</p>
                    </div>
                </div>
            </div>
        </main>
        <Footer/>
    </div>
  )
}

export default HomeStudent
