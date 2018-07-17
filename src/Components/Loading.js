
import React from 'react';

class Element extends React.Component{
    render(){
        return (
           <div>
               Loading
            </div> 
        );
    }
}

export class Loading extends React.Component{
    render(){
        return <Element/>; 
    }
}