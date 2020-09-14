import * as React from "react";
import f from "./Fable.module.scss";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { IApplicationState } from "../../../../Store/Store";
import { getFableBooks } from "../../../../Actions/MainStateActions";
import { connect } from "react-redux";
import fableImg from "../../../../Media/Images/fable.jpg";

export interface IFableProps {
  fable: any | null;
  isLoading: boolean;
  getFableBooks: typeof getFableBooks;
}

export interface IFableState {
  isClose: boolean;
}

class Fable extends React.Component<IFableProps, IFableState> {
  item: React.RefObject<HTMLDivElement>;
  constructor(props: IFableProps) {
    super(props);
    this.state = { isClose: true };
    this.item = React.createRef();
  }

  toggleBtn = () => {
    this.setState({ isClose: !this.state.isClose });
    this.showMoreInfo();
  };

  showMoreInfo = () => {
    const node = this.item.current;
    this.state.isClose
      ? (node!.style.height = "auto")
      : (node!.style.height = "0rem");
  };

  componentDidMount() {
    if (this.props.fable === null) {
      this.props.getFableBooks();
    }
  }

  render() {
    const { isClose } = this.state;
    const {fable } = this.props;
    return (
      <>
        <div className={f.item} onClick={this.toggleBtn}>
          <span>
            {isClose ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
          </span>
          <NavLink to="#">Fable</NavLink>
        </div>
        <div className={f.item_more_info} ref={this.item}>
          {fable !== null && (
            <>
              <div className={f.item_more_info_img}>
                <img src={fableImg} alt="img" />
                <span>Shop Fable</span>
                <NavLink to="#">Shop All</NavLink>
              </div>
              <div className={f.item_more_info_list}>
                {fable.items.map((book: any, i: number) => (
                  <span key={i}>{book.volumeInfo.title}</span>
                ))}
              </div>
            </>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => ({
  fable: state.allGenres.fable,
  isLoading: state.allGenres.isLoading,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    getFableBooks: () => dispatch(getFableBooks()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Fable);