function List(){
    
    const fruits = [{id: 1, name:"apple", calorie: 66},
                    {id: 2, name:"apple", calorie: 66},
                    {id: 3, name:"apple", calorie: 66},
                    {id: 4, name:"apple", calorie: 66}
    ];

    const listItems = fruits.map(fruit =>
         <li key={fruit.id}>
            {fruit.name}: &nbsp;
            {fruit.calorie}
        </li>);

    return(<ol>{listItems}</ol>)

}

export default List