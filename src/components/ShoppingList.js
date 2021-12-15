import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";
import { v4 as uuid } from "uuid";

function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [toList, setToList] = useState(items);
  const [search, setSearch] = useState("");

  function searchFilter(event) {
    console.log(event.target.value);
    setSearch(event.target.value);
  }

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function addToList(event) {
    event.preventDefault();
    const newItem = {
      id: uuid(),
      name: event.target[0].value,
      category: event.target[1].value,
    };
    const newList = [...toList, newItem];
    setToList(newList);
  }

  const itemsToDisplay = toList.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm items={toList} onItemFormSubmit={addToList} />
      <Filter onSearchChange={handleCategoryChange} search={searchFilter} />
      <ul className="Items">
        {itemsToDisplay.map((item) =>
          search === "" ||
          item.name.toLowerCase().includes(search.toLocaleLowerCase()) ? (
            <Item
              key={item.id}
              name={item.name}
              category={item.category}
              items={toList}
            />
          ) : null
        )}
      </ul>
    </div>
  );
}

export default ShoppingList;
