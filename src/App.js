
import * as React from 'react';

import Header from './header';
// import Header from './layout/header';
import Storepage from './storepage';

import Home from './home';

import { Routes, Route, useLocation, useNavigate, } from 'react-router-dom';

import { getProducts } from './imgroute';

import TableStore from './table/table-store';

import ProductItem from './product-component/ProductItem.tsx';

import { Typography } from '@mui/material';

export default function App(){
const { pathname }= useLocation();
let navigate = useNavigate();
 const [ states, setState ] = React.useState({
  toggle:false,
  openDrawer:false,
  routes:getProducts(),
 });
  const handleToggle=(toggle)=>{
      setState({ ...states,toggle:toggle,});
  }

  const handleOpenDrawer=(open)=>{
       setState({...states,openDrawer:open})
  }

  const handleDrawerClose=(close)=>{
  setState({...states,openDrawer:close})
 }
const { toggle, openDrawer,routes } = states;
    return (
     <>
      <Header close={e=>handleDrawerClose(e)} open={e=>handleOpenDrawer(e)} toggle={e=>handleToggle(e)}/>
        <Routes>

          <Route exact path="/" element={<Home />} />

            <Route path="products" element={<Storepage open={openDrawer} receiveToggle={toggle} products={routes}/> }>
               {
                routes.map((items,index)=>{     
                    if(pathname === "products/"+items.link){
                      return (
                        <Route key={index} path={`products/:${items.link}`} element={
                          <ProductItem link={items.link} items={items.products} />
                        }/>
                       ) 
                    } else {           
                    return (
                      <Route key={index} path={items.link} element={
                        <ProductItem link={items.link} items={items.products} />
                      }/>
                     ) 
                  }
                 })}
            </Route>    

            <Route path="*" element={<h3>page not found!!</h3>}/>   

            {
                routes.map((items,index)=>{   
                  if(pathname ==="/"+items.link){
                    return (
                      <Route key={index} path={items.link} element={
                        <ProductItem link={items.link} items={items.products} />} />
                   )   
                  }
                })
            }
            <Route path="table-store" element={<TableStore />} />
            </Routes>  
       </>
      
    )
  }
