import React, {useState , useEffect } from "react";


const Url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' ;
const defaultUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=o'  ;

function App() {

  const [drinkData , setDrinkData] = useState([]) ;
  const [searchTerm , setSearchTerm] = useState("") ;

  const fetchData = async (ApiUrl) => {
    const response = await fetch(ApiUrl) ;
    const {drinks} = await response.json() ;

    if (!drinks) {
      const res2 = await fetch(defaultUrl);
      const result2 = await res2.json();
      setDrinkData(result2.drinks || []);
      return;
    }

    setDrinkData(Array.isArray(drinks) ? drinks : []);

    
  }

  useEffect(() => {
    fetchData(defaultUrl);
  }, []);


  useEffect(() => {

  if (searchTerm.trim() === "") return; 

    const correcrUrl = `${Url}${searchTerm}` 

    fetchData(correcrUrl) ;
  }, [searchTerm]) ;

  return (
    <div>
      <form>
        <input 
        style={{padding : "20px", marginLeft : "50%"}}
        value={searchTerm}
        onChange= {(e) => setSearchTerm(e.target.value)}
        
        type="text" name="search" id = "search" placeholder="search something new" /><br />
        
      </form>

      <hr />
      <ul className="cocktail-data">
        {
          drinkData.map((eachData) => {
            const {idDrink , strDrink , strDrinkThumb} = eachData ;
            return (
              <li key={idDrink}>
                <img src= {strDrinkThumb} /><br />
                <h1>{strDrink}</h1>
                
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}



export default App;
