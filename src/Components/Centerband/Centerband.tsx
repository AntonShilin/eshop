import * as React from "react";
import c from "./Centerband.module.scss";
import { IApplicationState } from "../../Store/Store";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { getShopID, selectShopName } from "../../Actions/ShopActions";

export interface ICenterbandProps {
  genresName: string[];
  isHiddenContainer: boolean;
  getShopID: typeof getShopID;
  selectShopName: typeof selectShopName;
}

export interface State {}

class Centerband extends React.Component<ICenterbandProps, State> {
  render() {
    const { genresName, isHiddenContainer } = this.props;
    return (
      isHiddenContainer && (
        <div className={`container-xl ${c.center_band}`}>
          <div className="row">
            <div
              className={`col-lg-5 col-md-5 col-sm-12 ${c.center_band_name}`}
            >
              <h1>Find your book</h1>
            </div>
            <div
              className={`col-lg-7 col-md-7 col-sm-12 ${c.center_band_content}`}
            >
              <div className="row">
                {genresName.map(
                  (name: any, k: number) =>
                    k > 3 &&
                    k < 6 && (
                      <div key={k} className="col-lg-6 col-md-6 col-sm-12">
                        <img
                          src={require(`../../Media/Images/${name}.png`)}
                          alt="name"
                        />
                        <>
                          {k % 2 ? (
                            <NavLink
                              to="/shop"
                              onClick={() => {
                                this.props.getShopID(0);
                                this.props.selectShopName(genresName[5]);
                              }}
                            >
                              {`Shop ${name}`} <FaLongArrowAltRight />
                            </NavLink>
                          ) : (
                            <NavLink
                              to="/shop"
                              onClick={() => {
                                this.props.getShopID(1);
                                this.props.selectShopName(genresName[4]);
                              }}
                            >
                              <FaLongArrowAltLeft /> {`Shop ${name}`}
                            </NavLink>
                          )}
                        </>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        </div>
      )
    );
  }
}

const mapStateToProps = (state: IApplicationState) => ({
  genresName: state.data.genresName,
  isHiddenContainer: state.shopContainer.isHiddenContainer,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    getShopID: (id: number) => dispatch(getShopID(id)),
    selectShopName: (name: string) => dispatch(selectShopName(name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Centerband);
