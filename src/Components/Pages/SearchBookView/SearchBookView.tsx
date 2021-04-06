import * as React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { addBookToCart } from "../../../Actions/CartActions";
import { IApplicationState } from "../../../Store/Store";
import Loading from "../../Loading/Loading";
import sbw from "./SearchBookView.module.scss";

export interface ISearchBookViewProps {
  shopName: string;
  allGenresData: any[];
  viewBookID: string;
  addBookToCart: typeof addBookToCart;
}

export interface ISearchBookViewState {
  quantityToPurchase: number;
}

class SearchBookView extends React.Component<
  ISearchBookViewProps,
  ISearchBookViewState
> {
  constructor(props: ISearchBookViewProps) {
    super(props);
    this.state = {
      quantityToPurchase: 1,
    };
  }

  increment = () => {
    this.setState({ quantityToPurchase: this.state.quantityToPurchase + 1 });
  };

  decrement = () => {
    if (this.state.quantityToPurchase > 1) {
      this.setState({ quantityToPurchase: this.state.quantityToPurchase - 1 });
    }
  };

  
  render() {
    const { shopName, allGenresData, viewBookID } = this.props;
    const { quantityToPurchase } = this.state;

    return (
        <div className={`container-xl ${sbw.search_book_view_bg}`}>
          <div className="row">
            <div className="col">
              <div>
                <NavLink to="/">
                  <FiArrowLeft />
                  Back to Menu
                </NavLink>
              </div>
            </div>
          </div>
          {allGenresData !== undefined &&
            allGenresData.map((genre: any, i: number) =>
              genre.items.map(
                (book: any, k: number) =>
                  book.id === viewBookID && (
                    <div className="row" key={k}>
                      <div className="col-lg-7 col-md-7 col-sm-12">
                        <img
                          src={book.volumeInfo.imageLinks.thumbnail}
                          alt="img"
                        />
                      </div>
                      <div className="col-lg-5 col-md-5 col-sm-12">
                        <p>{shopName}</p>
                        <h3>{book.volumeInfo.title}</h3>
                        <p>
                          Price: ${" "}
                          {(book.saleInfo.retailPrice.amount / 28).toFixed(2)}
                        </p>
                        <p>{book.volumeInfo.pageCount} pages</p>
                        <p>Published: {book.volumeInfo.publishedDate}</p>
                        <div>
                          <span>Qty</span>
                          <span onClick={this.decrement}>-</span>
                          <span>{quantityToPurchase}</span>
                          <span onClick={this.increment}>+</span>
                        </div>
                        <button
                          onClick={() =>
                            this.props.addBookToCart(
                              book.volumeInfo.imageLinks.thumbnail,
                              shopName,
                              book.volumeInfo.title,
                              (book.saleInfo.retailPrice.amount / 28).toFixed(
                                2
                              ),
                              book.volumeInfo.pageCount,
                              book.volumeInfo.publishedDate,
                              this.state.quantityToPurchase,
                              +(book.saleInfo.retailPrice.amount / 28).toFixed(
                                2
                              ) * this.state.quantityToPurchase,
                              book.id
                            )
                          }
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  )
              )
            )}
        </div>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => ({
  shopName: state.shopContainer.shopName,
  allGenresData: state.data.allGenresData,
  viewBookID: state.shopContainer.viewBookID,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    addBookToCart: (...arg: any) => dispatch(addBookToCart(...arg)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBookView);
