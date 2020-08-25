import PropTypes from "prop-types"
import React from "react"
import "./index.css"
import { useDispatch } from 'react-redux';

const Header = ({ siteTitle }) => {
  const dispatch = useDispatch()
  return (
    <header
    style={{
      background:  '#000000',
      marginBottom: 0,
      height:'100%',
      display:'flex',
    }}
  >
    <div
      style={{
        alignContent:'center',
        marginTop:'auto',
        marginBottom:'auto',
        // maxWidth: 1920,
        padding: `0.5rem 1.0875rem`,
        flex: '1 1 auto',
      }}
    >
      <h1 style={{ 
        textAlign:'left',
        fontSize:40,
        fontFamily:'CPN_font',
        color:'#FF0000',
        padding:'10px',
        margin:0,
        }}>
        
          {siteTitle}
        
      </h1>
    </div>
    <div
      style={{
        alignContent:'top',
        flex: '1 1 auto',
        textAlign: "right",
      }}
    >
      <button 
      style={{
        backgroundColor:"#000",
        color:'#FFF',
        fontWeight: "bold",
      }}
      onClick={() => dispatch({ type: "reset_store" })}>
       log out
      </button>
      
    </div>
  </header>
)
};
  

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: 'CTO Work Statistics',
}

export default Header
