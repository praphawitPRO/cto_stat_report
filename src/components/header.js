import PropTypes from "prop-types"
import React from "react"
import "./index.css"
const Header = ({ siteTitle }) => (
  <header
    style={{
      background:  '#000000',
      marginBottom: 0,
      height:'100%',
      
    }}
  >
    <div
      style={{
        alignContent:'center',
        marginTop:'auto',
        marginBottom:'auto',
        maxWidth: 1920,
        padding: `0.5rem 1.0875rem`,
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
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: 'CTO Work Statistics',
}

export default Header
