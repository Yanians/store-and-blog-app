import * as React from 'react';
import Storepage from './storepage';
import Header from './header';
export default function Main(props){
     return (
     <>
        <Header close={props.close} toggle={props.toggle} open={props.open} />
            <Storepage open={props.openFrom} receiveToggle={props.receiveToggle} />,
        </>
     )
}