import decode from "jwt-decode"

let checkToken = () => {
  let decoded;
  if(localStorage.token){
    if(window.location.pathname === "/login" || window.location.pathname.includes("register")){
      window.location.href = "/dashboard"
    }
    try{
      decoded = decode(localStorage.token)
      if(!decoded.exp || decoded.exp * 1000 < new Date()){
        localStorage.removeItem("token")
        window.location.href = "/login"
        }
    }
    catch(err){
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
  }
  else{
    if(window.location.pathname !== "/login" && !window.location.pathname.includes("register") && window.location.pathname !== "/")
      window.location.href = "/login"
  }
}

export default checkToken