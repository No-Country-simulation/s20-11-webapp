import Header from './Header'
import Footer from './Footer'

function HomeCoordinator() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col relative overflow-hidden">
        <Header/>
        <main>
  <h2 className="p-4 text-right">+ Agregar curso</h2>
  <div className="para-centrar flex justify-center">
    <div className="contenedor-general flex flex-wrap gap-2 md:gap-8 w-[312px] mx-auto md:px-10 md:w-auto md:mx-0">
      <div className="curso1 bg-purple-700 p-4 w-[150px] rounded-md text-center">
        <p>Curso de matemáticas</p>
      </div>
      <div className="curso2 bg-purple-700 p-4 w-[150px] rounded-md text-center">
        <p>Curso de inglés</p>
      </div>
      <div className="curso3 bg-purple-700 p-4 w-[150px] rounded-md text-center">
        <p>Curso de geografía</p>
      </div>
      <div className="curso1 bg-purple-700 p-4 w-[150px] rounded-md text-center">
        <p>Curso de biología</p>
      </div>
      <div className="curso2 bg-purple-700 p-4 w-[150px] rounded-md text-center">
        <p>Curso de educación cívica</p>
      </div>
      <div className="curso3 bg-purple-700 p-4 w-[150px] rounded-md text-center">
        <p>Curso de literatura</p>
      </div>
      <div className="curso1 bg-purple-700 p-4 w-[150px] rounded-md text-center">
        <p>Curso de computación</p>
      </div>
      <div className="curso2 bg-purple-700 p-4 w-[150px] rounded-md text-center">
        <p>Curso de contabilidad</p>
      </div>
      <div className="curso3 bg-purple-700 p-4 w-[150px] rounded-md text-center">
        <p>Curso de francés</p>
      </div>
    </div>
  </div>
</main>
        <Footer/>      
    </div>
  )
}

export default HomeCoordinator
