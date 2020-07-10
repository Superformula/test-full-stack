import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body, a {    
    color: #000000; 
    background-color: #F8F8F8;
  }  
  
  * {
    font-family: Source Sans Pro;   
    border-radius: 0;    
    outline: none;
    padding: 0;            
    margin: 0;
  }
  
  #root {
    position: absolute;
    left: 0;
    top: 0;
    min-width: 100%;
    min-height: 100%;    
  }    
`;

export default GlobalStyle;
