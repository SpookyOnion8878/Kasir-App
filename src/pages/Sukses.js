import React, { Component } from "react";
import { Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class Sukses extends Component {
  render() {
    return (
      <div className="mt-4 text-center">
        <Image src="assets/images/sukses.png" width="500" />
        <h2>Sukses Pesan</h2>
        <Link to="/">
          <Button variant="primary" color="secondary">
            Kembali
          </Button>
        </Link>
      </div>
    );
  }
}
