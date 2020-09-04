
const URL_Service = {

  getURL() {
    const URL = localStorage.getItem("URL");
    if(URL) {
      return localStorage.getItem("URL");
    }
    return "Not URL defined"
  },

  setURL(URL) {
    if(URL) {
      return localStorage.setItem("URL", URL);
    }
    return "Error: URL Not valid"
  }
  
}

export default URL_Service;
