import React from "react";
import style from "./IngredientDetails.module.css";
import PropTypes from "prop-types";
import {ingredientsType} from "../../utils/ingredientsType";

function IngredientDetails({ingredient}) {
  return (
    <div className={style.details}>
      <img
        className={style.image}
        src={ingredient?.image_large}
        alt={ingredient?.name}
      />
      <h4 className="text text_type_main-medium mt-4 mb-8">
        {ingredient?.name}
      </h4>
      <ul className={`${style.list} mb-5`}>
        <li className={style.item}>
          <p className={`${style.itemText} text text_type_main-default mb-2`}>
            Калории,ккал
          </p>
          <p className={`${style.itemText} text text_type_digits-default`}>
            {ingredient?.calories}
          </p>
        </li>
        <li className={style.item}>
          <p className={`${style.itemText} text text_type_main-default mb-2`}>
            Белки, г
          </p>
          <p className={`${style.itemText} text text_type_digits-default`}>
            {ingredient?.proteins}
          </p>
        </li>
        <li className={style.item}>
          <p className={`${style.itemText} text text_type_main-default mb-2`}>
            Жиры, г
          </p>
          <p className={`${style.itemText} text text_type_digits-default`}>
            {ingredient?.fat}
          </p>
        </li>
        <li className={style.item}>
          <p className={`${style.itemText} text text_type_main-default mb-2`}>
            Углеводы, г
          </p>
          <p className={`${style.itemText} text text_type_digits-default`}>
            {ingredient?.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  )
}

IngredientDetails.propTypes = {
  ingredient: PropTypes.shape(ingredientsType).isRequired
}

export default IngredientDetails;