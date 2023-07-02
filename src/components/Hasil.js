import React, { Component } from "react";
import { Badge, Col, ListGroup, Row } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";

export default class Hasil extends Component {
  render() {
    const { keranjangs } = this.props;

    return (
      <Col md={3} mt="2">
        <h4>
          <strong>Hasil</strong>
        </h4>
        <hr />

        {keranjangs.length !== 0 && ( //cek dulu
          <ListGroup variant="flush">
            {keranjangs.map((cartMenu) => (
              <ListGroup.Item>
                <Row>
                  <Col xs="2">
                    <h4>
                      <Badge pill variant="success">
                        {cartMenu.jumlah}
                      </Badge>
                    </h4>
                  </Col>
                  <Col>
                    <h5>{cartMenu.product.nama}</h5>
                    <p>Rp. {numberWithCommas(cartMenu.product.harga)}</p>
                  </Col>
                  <Col>
                    <strong className="float-right">
                      <p>Rp. {numberWithCommas(cartMenu.total_harga)}</p>
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
    );
  }
}
