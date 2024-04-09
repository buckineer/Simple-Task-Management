import Footer from "../Footer";
import Header from '../Header';


const MainLayout = ({children}) => {
  return (
    <div>
      <Header />
      <main className="min-h-screen py-10 px-4 sm:px-24">
        {children}
      </main>
      
      <Footer/>
    </div>
  );
}

export default MainLayout;