import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body, a {    
    color: #656565; 
    background-color: #092232;
  }  
  
  *, *:focus {
    font-family: Helvetica;   
    border-radius: 0;    
    outline: none;
  }
  
  #root {
    position: absolute;
    left: 0;
    top: 0;
    min-width: 100%;
    min-height: 100%;    
  }
  
  input[type=textbox], input[type=password] {
    height: 26px;    
    padding: 2px 2px 2px 2px;
    border: solid 1px #cecece;        
  }
  
  button, input[type=submit], input[type=reset] {
    height: 32px;
    padding: 2px 10px 2px 10px;
    margin: 1px;
    border: solid 1px #58AB7E;
    color: white;
    background-color: #58AB7E;
    cursor: pointer;    
  }    
`;

export default GlobalStyle;
