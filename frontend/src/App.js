import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/layout';
import { PrivateRoutes } from './components/privateRoute';
import Home from './pages/home';
import Login from './pages/login';
import TaskDetail from './pages/taskDetail';
function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route element={<PrivateRoutes/>}>
              <Route path='/' element={<Home/>} />
              <Route path='create' element={<TaskDetail/>} />
              <Route path='edit/:id' element={<TaskDetail/>} />
          </Route>
          <Route path='/login' element={<Login/>}/>
            
        </Routes>
      </Layout>
        
    </div>
  );
}

export default App;
