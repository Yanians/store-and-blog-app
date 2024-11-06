import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Products from './products';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ProductItem from './product-component/ProductItem.tsx';
import { useParams, Route, Routes, Outlet,useLocation, } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import { getProducts } from './imgroute';

const drawerWidth = 10;
const ModifiedPaper = styled((props)=><Paper {...props} />)(({theme,toggle}) => ({
  width:'auto',
  height:'auto',
  padding:theme.spacing(1),
  ...theme.typography.body2,
  textAlign:'center',
  backgroundColor:toggle ? 'rgba(7, 25, 63, 0.1)' :'background.paper',
  borderColor:toggle ? 'rgba(7, 30, 69, 0.9)':'background.paper',
}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
   ({ theme }) => ({
     flexGrow: 1,
     padding: theme.spacing(3),
     transition: theme.transitions.create('margin', {
       easing: theme.transitions.easing.sharp,
       duration: theme.transitions.duration.leavingScreen,
     }),
     marginLeft: `-${drawerWidth}px`,
     variants: [
       {
         props: ({ open }) => open,
         style: {
           transition: theme.transitions.create('margin', {
             easing: theme.transitions.easing.easeOut,
             duration: theme.transitions.duration.enteringScreen,
           }),
           marginLeft: 170,
         },
       },
     ],
   }),
 );

 const DrawerHeader = styled('div')(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   padding: theme.spacing(0, 1),
   // necessary for content to be below app bar
   ...theme.mixins.toolbar,
   justifyContent: 'flex-end',
 }));

export default function Storepage(props) {
  const products = getProducts();
  const { pathname } = useLocation();
  console.log(pathname);
  return (
  <Box sx={{display:'flex'}}>
    <Main open={props.open}>
      <DrawerHeader />
       <ModifiedPaper
         toggle={props.receiveToggle}
         variant="outlined"
         square={false}
         aria-label="contacts"
       >
         <Box>
            <Typography color="error" variant="h3" >STORE</Typography>
         </Box>
         <Grid container 
         spacing={{xs:1,sm:2,md:2,lg:3}}
         columns={{xs:6,sm:9, md:12}}>
           {products.map((items,i)=>{
            if(pathname ==="/products/"+items.link){
              return <Outlet />
            }
            else if(pathname === "/products"){
              return(
              <Grid size={3} key={items.products.id}>
                      <Products key={items.link} link={items.link} items={items.products} />
                   </Grid>
              )     
            }else{
              return <Grid size="auto"></Grid>
            }  
          })}

         </Grid>
      </ModifiedPaper>
      </Main>   
  </Box>  
  );
}