import React, { Component } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { API_URL } from "../utils/constants";

export default class TotalBayar extends Component {
  submitTotalBayar = (TotalBayar) => {
    const pesanan = {
      total_bayar: TotalBayar,
      menus: this.props.keranjangs,
    };

    axios.post(API_URL + "pesanans", pesanan).then((res) => {
      this.props.history.push("/sukses");
    });
  };

  render() {
    const TotalBayar = this.props.keranjangs.reduce(function (result, item) {
      return result + item.total_harga;
    }, 0);

    return (
      <div className="fixed-bottom">
        <Row>
          <Col md={{ span: 3, offset: 9 }} className="px-4">
            <h5>
              Total Harga :
              <strong className="float-end" mr="3">
                Rp. {numberWithCommas(TotalBayar)}
              </strong>
            </h5>
            <Button
              variant="primary"
              className="w-100 mr-2 mb-2 mt-3"
              size="md"
              onClick={() => this.submitTotalBayar(TotalBayar)}
            >
              <FontAwesomeIcon icon={faShoppingCart} /> <strong> BAYAR</strong>
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
