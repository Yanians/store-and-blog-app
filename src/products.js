import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import Link from '@mui/material/Link';
import { Link, useParams,useLocation, } from 'react-router-dom';
import { CardMedia } from '@mui/material';
import Typography from '@mui/material/Typography';
import { ConnectingAirportsOutlined } from '@mui/icons-material';

export default function Products(props) {

  const { pathname } = useLocation();
  const [datas, setDatas] = React.useState([]);
  const [counts, setCounts ] = React.useState(0)
  const [state, setState] = React.useState({
    totalItems:0,
    data:[],
  });

    const readData = async() =>{
      const count = props.items.map(item=>item.link)
             setCounts(count.length);
        const items = await props.items.filter((item,index)=>{
            if(count.length === item.id){
              setDatas(item)            
                return item;
            }
        });
        return items;
    }
    
  React.useEffect(()=>{
       readData().then((data)=>{
       })
  },[ state, datas, counts, ]);
  return (
    <Box sx={{ minWidth: 175 }} key={props.key}>
      <Card variant="outlined">
          <CardContent>
          <Typography color="warning" gutterBottom variant="h4" >
            {datas.title}
            </Typography>
            <CardMedia
              component="img"
              height="194"
              image={datas.url}
              alt={datas.title}
            />
            <Typography noWrap sx={{flexGrow:1,}} variant="h5">
              <br/>
              <b>{counts}</b> &nbsp;<i>items in store</i>
              <br />
            </Typography>
            <Typography sx={{color:"text.secondary", fontSize:16}}>{datas.description}</Typography>
          </CardContent>
          <CardActions>
               <Link to={`${props.link}`} >
                 <Typography variant="overline" noWrap sx={{flexGrow:1,}}>show more items</Typography>
                </Link>     
          </CardActions>
      </Card>
    </Box>
  );
}
