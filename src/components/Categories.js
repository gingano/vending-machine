import React from 'react'
import { useSelector } from 'react-redux'
import { arrayOfItems } from '../utils/helpers'

const Categories = () => {
  const productsState = useSelector(({ products }) => products)

  return (
    <ul className="categories">
      {productsState.products.map((category) => (
        <li
          key={`categoty-item-${category.id}`}
          className="categories__category"
        >
          <h2 className="categories__category-name">{category.name}</h2>
          <ul className="categories__items-list">
            {arrayOfItems(category.itemsCount).map(() => (
              <li key={Math.random()} className="categories__item">
                <img
                  className="categories__item-image"
                  src={`/images/${category.imageName}`}
                  alt="categories-item"
                />
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}

export default Categories
