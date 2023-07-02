import React, { Component } from "react";
import { NavbarComponent, Hasil, ListCategories, Menus } from "./components";
import { Row, Col, Container } from "react-bootstrap";
import { API_URL } from "./utils/constants";
import axios from "axios";
import swal from "sweetalert";

// constructor //
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      ChooseCategory: "Makanan",
      keranjangs: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "products?category.nama=" + this.state.ChooseCategory)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //prevState memungkinkan untuk mengecek setiap ada perubahan data
  componentDidUpdate(prevState) {
    if (this.state.keranjangs !== prevState.keranjangs) {
      axios
        .get(API_URL + "keranjangs")
        .then((res) => {
          const keranjangs = res.data;
          this.setState({ keranjangs });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  // ubah kategori //
  ChangeCategory = (value) => {
    this.setState({
      ChooseCategory: value,
      menus: [],
    });

    axios
      .get(API_URL + "products?category.nama=" + value)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Method Masuk keranjang //

  inCart = (value) => {
    //get
    axios
      .get(API_URL + "keranjangs?product.id=" + value.id)
      .then((res) => {
        if (res.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };

          axios
            .post(API_URL + "keranjangs", keranjang)
            .then((res) => {
              swal({
                title: "Sukses",
                text: "Sukses Masuk Keranjang" + keranjang.product.nama,
                icon: "success",
                button: false,
                timer: 1000,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          const keranjang = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value,
          };
          //method put
          axios
            .put(API_URL + "keranjangs/" + res.data[0].id, keranjang)
            .then((res) => {
              swal({
                title: "Sukses",
                text: "Sukses Masuk Keranjang" + keranjang.product.nama,
                icon: "success",
                button: false,
                timer: 1000,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //list menu //

  render() {
    const { menus, ChooseCategory, keranjangs } = this.state;
    return (
      <div className="App">
        <NavbarComponent />
        <div className="mt-3">
          <Container fluid>
            <Row>
              <ListCategories
                ChangeCategory={this.ChangeCategory}
                ChooseCategory={ChooseCategory}
              />
              <Col>
                <h4>
                  <strong>Daftar Produk</strong>
                </h4>
                <hr />

                <Row>
                  {menus &&
                    menus.map((menu) => (
                      <Menus key={menu.id} menu={menu} inCart={this.inCart} />
                    ))}
                </Row>
              </Col>
              <Hasil keranjangs={keranjangs} />
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
