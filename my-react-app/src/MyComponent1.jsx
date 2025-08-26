import React, {useState} from 'react'

function MyComponent1(){

    const [foods, setFoods] = useState(["apple", "orange", "banana"]);

    function addFood(){
        const newFood = document.getElementById('foodInput').value;
        document.getElementById('foodInput').value = "";

        setFoods(n => [...n, newFood]);
    }

    function removeFood(index){
        setFoods(foods.filter((_, i) => i !== index));
    }

    return(
        <div>
            <h2>List of Food:</h2>
            <ul>
                {foods.map((food, index) => 
                <li key={index} onClick={() => removeFood(index)}>
                    {food}
                </li>)}
            </ul>
            <input type="text" id="foodInput" placeholder='Enter food'/>
            <button onClick={addFood}>Add</button>
        </div>
    );

}

export default MyComponent1