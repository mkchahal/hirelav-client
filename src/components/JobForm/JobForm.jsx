import React from "react";
import { Link } from "react-router-dom";

class JobForm extends React.Component {

    render() {
        let { currentItem, warehouses, categories, stock, handleSubmit, changeStockStatus, backLink, title, submitButton } = this.props;
        return (
            <div className="edit">
                <header className="edit__head">
                    <Link to={backLink} className="edit__back-button"></Link>
                    <h1 className="edit__title">{title}</h1>
                </header>
                <form className="form-wrap" onSubmit={handleSubmit}>
                    <div className="form">
                        <div className="form--left">
                            <h2 className="form__subtitle">Item Details</h2>
                            <label htmlFor="name" className="form__label">
                                Item Name
                                <input type="text" name="name" className="form__name form__input" defaultValue={currentItem.itemName} placeholder="Item Name" />
                            </label>
                            <label htmlFor="description" className="form__label">
                                Description
                                <textarea name="description" className="form__description form__input" defaultValue={currentItem.description} placeholder="Please enter a brief item description"></textarea>
                            </label>
                            <label htmlFor="category" className="form__label">
                                Category
                                <select name="category" className="form__input form__dropdown" defaultValue={currentItem.category}>
                                    <option value="">Please select</option>
                                    {categories.map((category, i) => {
                                        return (
                                            currentItem.category === category ? (
                                                <option key={i} selected value={category}>{category}</option>
                                            ) : (
                                                <option key={i} value={category}>{category}</option>
                                            )
                                        )
                                    })}
                                </select>
                            </label>
                        </div>
                        <div className="form--right">
                            <h2 className="form__subtitle">Item Availability</h2>
                            <div className="form__label">
                                Status
                                <div className="form__status">
                                    <div className="form__stock-wrap">
                                        <input type="radio" name="stock" id="inStock" value="In Stock" className="form__radio" onChange={changeStockStatus} checked={stock === "In Stock"} />
                                        <label htmlFor="inStock" className="form__stock">
                                            In stock
                                        </label>
                                    </div>
                                    <div className="form__stock-wrap">
                                        <input type="radio" name="stock" id="outStock" value="Out of Stock" className="form__radio" onChange={changeStockStatus} checked={stock === "Out of Stock"} />
                                        <label htmlFor="outStock" className="form__stock">
                                            Out of stock
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {(stock === "In Stock") &&
                                <label htmlFor="quantity" className="form__label">
                                    Quantity:
                                    <input type="text" name="quantity" id="quantity" className="form__input" defaultValue={currentItem.quantity} placeholder="0" />
                                </label>
                            }
                            <label htmlFor="warehouse" className="form__label">
                                Warehouse
                                <select name="warehouse" className="form__dropdown form__input" defaultValue={currentItem.warehouseName}>
                                    <option value="">Please select</option>
                                    {warehouses.map((warehouse, i) => {
                                        return (
                                            warehouse.name === currentItem.warehouseName ? (
                                                <option key={i} selected value={warehouse.name}>{warehouse.name}</option>
                                            ) : (
                                                <option key={i} value={warehouse.name}>{warehouse.name}</option>)
                                        )
                                    })}
                                </select>
                            </label>
                        </div>
                    </div>
                    <div className="form__buttons">
                        <Link to={backLink} className="form__cancel">Cancel</Link>
                        <button className="form__submit">{submitButton}</button>
                    </div>
                </form>
            </div >
        )

    }

}

export default JobForm;