import * as React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { IApplicationState } from "../../../Store/Store";

export interface IShopViewCategoryProps {
    shopName: string;
    allGenresData: any[];
}

export interface State {}

class ShopViewCategory extends React.Component<IShopViewCategoryProps, State> {
    render() {
        const { shopName, allGenresData } = this.props;
    return (
      <>
        <div className="row">
          <div className="col-12">
            <h2>
              {shopName} ({allGenresData[0].items.length})
            </h2>
          </div>
        </div>
        <div className="row">
          {allGenresData[0] !== undefined &&
            allGenresData[0].items.map((book: any, k: number) => (
              <div className="col-4" key={k}>
                <NavLink to="#">
                  <img
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt={`Card image_${k}`}
                  />
                </NavLink>
                <p>{shopName}</p>
                <NavLink to="#">{book.volumeInfo.title}</NavLink>
                <p>
                  {book.saleInfo.retailPrice.currencyCode}{" "}
                  {book.saleInfo.retailPrice.amount}
                </p>
              </div>
            ))}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => ({
    shopName: state.shopContainer.shopName,
    allGenresData: state.data.allGenresData,
  });
  
  const mapDispatchToProps = (dispatch: any) => {
    return {};
  };

export default connect(mapStateToProps, mapDispatchToProps)(ShopViewCategory);
