import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import  store  from '../redux/store';
import { insertItems } from '../redux/reducer/action';
import { useParams, } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding:'auto',
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

interface ExpandMoreProps extends IconButtonProps {
    expand?: boolean;
  }
  
  const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand,id,...other } = props;
    return <IconButton {...other} />;
  })(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    variants: [
      {
        props: ({ expand }) => !expand,
        style: {
          transform: 'rotate(0deg)',
        },
      },
      {
        props: ({ expand }) => !!expand,
        style: {
          transform: 'rotate(180deg)',
        },
      },
    ],
  }));

  const output = [

  ]
  
export default function ProductItem(props){
    
  const [ expanded, setExpanded] = React.useState(false);
  const {caps,tshirts,bags,watches,sunglasses,} = useParams();

  const clickAddToCart =()=> {
       const targetHidden = document.querySelectorAll('.target-hidden');    
       const playArea = document.querySelectorAll('.play-area');    
       const btn = document.querySelectorAll('.btnAddToCart');    
       const childDiv = document.createElement('div');
             childDiv.className="contents";
       const spinner = childDiv.cloneNode(true);
             spinner.className = "loader"
             childDiv.appendChild(spinner);      
          btn.forEach((el,i)=>{
             el.addEventListener('click',(x)=>{
                x.stopPropagation();
                 const refId = parseInt(el.value);
                 props.items.map((item)=>{
                     if(refId === item.id){
                         store.dispatch(insertItems(item))
                     }
                 });
                 playArea[i].className = "animated hinge"
                 targetHidden[i].insertBefore(childDiv, playArea[i])
                   setTimeout(()=>{
                       try{
                        targetHidden[i].removeChild(childDiv);
                        targetHidden[i].removeChild(playArea[i]);
                       }catch(error){
                          console.log('please wait.. loading')
                       }finally{
                       }
                   },1000)
             })
          })


  };

  const handleExpandClick = () => {
          //  setExpanded(!expanded);
  const btns = document.querySelectorAll('.trigger-point');
  const collapse = document.querySelectorAll('#collapse-in');
          btns.forEach((el,i)=>{
          el.addEventListener('click',(e) =>{
            e.stopPropagation();
            const node1 = btns[i];
            const node2 = collapse[i];
            if(node1.ariaExpanded === 'false'){
              node1.ariaExpanded = 'true';
              node2.id = 'collapse-out';
              node2.className = 'MuiCollapse-root MuiCollapse-vertical MuiCollapse-entered css-qr6njo-MuiCollapse-root';
              console.log(node2.id);
              setExpanded(true);
            } else if (node1.ariaExpanded === 'true'){
              node1.ariaExpanded = 'false';
              node2.id = 'collapse-in';
              node2.className = 'MuiCollapse-root MuiCollapse-vertical MuiCollapse-hidden css-cwrbtg-MuiCollapse-root';
              console.log(node2.id);
              setExpanded(false);
            }else{
             node1.ariaExpanded = 'false';
             node2.id = 'collapse-in';
             setExpanded(false);
            }
            
          });
    });     
  };
  return (
    <>
    <Grid container 
    columns={{xs:6,sm:9,md:12, lg:12}} 
    rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 1 }}>
       
      { props.items.map((items,index)=>{
       return (
           <Grid size="auto" className="target-hidden">
             <div className="play-area">
              <Card sx={{ maxWidth: 270 }} key={items.id}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      R
                    </Avatar>
                  }
                  title={items.title}
                  subheader={items.price}
                />
                <CardMedia
                  component="img"
                  height="150"
                  src={items.url}
                  alt="geneva 5"
                />
                <CardContent>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <Button value={items.id} onClick={clickAddToCart} size="small" color="success" variant="outlined" className="btnAddToCart">
                    <Typography align="left" noWrap sx={{flexGrow:1,fontSize:12,}}>Add to Cart</Typography>
                  </Button>
                  <IconButton color="warning" aria-label="comments" size="small">
                  <Typography align="left" noWrap sx={{flexGrow:1,fontSize:14}}>396 comments</Typography>
                    </IconButton>
                    <ExpandMore
                      expand={expanded}
                      className='trigger-point'
                      onClick={handleExpandClick}
                      aria-expanded={expanded}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon/>
                    </ExpandMore>
                </CardActions>
                <Collapse timeout="auto" id="collapse-in">
                  <CardContent>
                  <Typography variant="h6" sx={{ marginBottom: 2 }}>Specs:</Typography>
                    <Typography sx={{ marginBottom: 2 }}>
                          {items.specs}
                    </Typography>
                  </CardContent>
                </Collapse>
              </Card>
              </div> 
          </Grid>
         )
      }
      
    )}
    </Grid>
    </>
  );
}
