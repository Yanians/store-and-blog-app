import * as React from 'react';
import { useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { pink } from '@mui/material/colors';
import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp';
import { useNavigate } from 'react-router-dom';
import store  from '../redux/store';
import Divider from '@mui/material/Divider';
import * as Action from '../redux/reducer';
import { Typography } from '@mui/material';
const tblCell = ["Name","Quantity","Price","Total","Remove"]

export default function TableStore(props) {
  
  const products = useSelector((product)=>product.TableStore);

  const records = useSelector((items)=>items.Record);

  const navigate = useNavigate();

   let { dispatch } = store;

  let total = 0;
  let count = 0;
  products.map((item)=>{
            total += parseInt(item.items.price); /*counts the total price*/
            count += parseInt(item.items.count);
     return total;
  });

  const increaseItem = async(event)=>{
      event.preventDefault();
    const id = parseInt(event.target.value);
     records.map((record)=>{
       if(id === record.id){
         const price = record.price;
             dispatch(Action.Increase(id, price)); 
       }
    });
  }
  const decreaseItem = async(event)=>{
    event.preventDefault();
    const id = parseInt(event.target.value);
    console.log(id)
     records.map((record)=>{
     if(id === record.id){
       const price = record.price;
         dispatch(Action.Decrease({id,price}));
     }
   });
  }

  const removeItem = async (e) => {
   let refId = parseInt(e.target.value);
     dispatch(Action.deleteItem(refId));
   return refId;
 }

 const NavigateToStore=()=>{
   navigate("/products");
 }

 React.useEffect(()=>{

      removeItem().then(refId=>{
      }).catch((err)=>{
        Error(err);
      });

      decreaseItem().then((result)=>{
      }).catch(err=>{
        Error("Im from table-store page decreaseItem() ",err)
      });

      increaseItem().then(result=>{

      }).catch((err)=>{
        Error("Im from table-store page increaseItem() ",err)
      })
      
 },[ decreaseItem, ])

 let content  = <Box>
                <Typography variant="h4">Your Purchased:</Typography>
                <Divider />
                  <span>{total === 0 ? null : <b>Total Amount: </b>} &#x20b1; {total}</span>
                  <Divider />
                  <span><b>Total Device{count > 1 ? "s" : null}</b>: {count}</span>
                </Box>  
 
 const table =  products ? products.map((item,i) => {
         return (
            <TableRow
              key={item.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.items.title} 
                <Avatar
                alt={`${item.items.title}`}
                src={item.items.url}
                sx={{ width: 24, height: 24 }}
                variant="square"
                size="large"
              />
              </TableCell>
              <TableCell component="th" scope="row">
              {
                item.items.count === 0 ?
                (<Button disabled><strong>-</strong></Button>)
                : (<><Button value={item.id} onClick={e=>decreaseItem(e)} variant="outlined" size="medium"><strong >-</strong></Button>
                      <Button disabled size="small" color="error"><strong style={{fontSize:16}}>{item.items.count}</strong></Button>
                  <Button value={item.id} onClick={e=>increaseItem(e)} variant="outlined" size="medium"><strong>+</strong></Button></>) 
              } 
              </TableCell>
              <TableCell component="th" scope="row">
                {records.map((record)=>record.id ===item.id ? record.price : null)}
              </TableCell>
              <TableCell component="th" scope="row">
                {item.items.price}
              </TableCell>
              <TableCell component="th" scope="row">
              <Button size="small" value={item.id} onClick={e=>removeItem(e)} color="error" variant="contained">remove</Button> 
              </TableCell>
            </TableRow>
          )
      }):null

  return (
    
   <Box sx={{mt:15}}>
      {total === 0 ? null : content }
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
             {total === 0 
              ? <Typography noWrap component="div" sx={{flexGrow:1}} variant="h3"> You have no order: </Typography>
              : tblCell.map((item,index)=>{
                return(
                      <TableCell key={index}>
                        <Typography noWrap component="div" variant="body1" color="info">{item}</Typography>
                    </TableCell>
               )
            })}
          </TableRow>
        </TableHead>
        <TableBody>
        {
          table
        }
          <TableRow>
            <TableCell>
            <ShoppingCartSharpIcon sx={{color:pink[700],ml:3,fontSize:74}} className={`animatedd fadeInLeft ${+ total === 0 ? `infinite`:``}`}/>
            </TableCell>
            <TableCell>
            <Button size="small"  onClick={e=>NavigateToStore(e)} color="success" variant="contained">Add to Cart</Button> 
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
}
