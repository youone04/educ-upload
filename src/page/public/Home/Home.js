import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getKursusPublic } from "../../../redux/actions/actionKursusPublic/actionKursusPublic";
import Card from "react-bootstrap/Card";
import { getToken } from "../../../redux/actions/actionLogin";
import { getMetodePembayaran } from "../../../redux/actions/actionMetodePembayaran/actionMetodePembayaran";
import numberWithCommas from "../../../func/numberWithCommas";
import NavbarComp from "../../../components/NavbarComp/NavbarComp";
import { Link } from "react-router-dom";
import Jumbotron from "../../../components/Jumbotron/Jumbotron";
import Footer from "../../../components/Footer/Footer";
import HomeCarousel from "../../../components/HomeCarousel/HomeCarousel";

export default function Home() {
  const dispatch = useDispatch();
  const getKursusPublicData = useSelector((state) => state.dataKursusPublic);
  const { data, loading, error } = getKursusPublicData.kursusPublic;
  const getDataLogin = useSelector((state) => state.login);
  const getMetodePem = useSelector((state) => state.dataMetodePembayaran);
  const {
    data: dataMetodePembayaran,
    loading: loadingMetodePem,
    error: errorMetodePem,
  } = getMetodePem.metodePembayaran;
  const { token } = getDataLogin.login;

  useEffect(() => {
    dispatch(getKursusPublic());
    dispatch(getToken());
    dispatch(getMetodePembayaran());
  }, [dispatch]);

  return (
    <>
      {loading || loadingMetodePem ? (
        <p>loading</p>
      ) : error || errorMetodePem ? (
        <p>{error || errorMetodePem}</p>
      ) : (
        <>
          <NavbarComp />
          <Jumbotron />
          <marquee>
            <h6>
              Kursus di mentori secara daring, ayo tunggu apa lagi daftar
              sekarang diskon <span className="text-success">30%</span>
            </h6>
          </marquee>
          {/* <marquee><h4>Selamat pagi ,tetap mengeluh dan putus asa ya!</h4></marquee> */}

          <div className="container mt-5">
            <Card className="card-home">
              <div className="d-flex">
                <h5>Kursus terbaru</h5>
                <p style={{ marginLeft: "auto" }}>Lihat semua</p>
              </div>
              <div className="row col-12 pl-4">
                {data.map((k, i) => {
                  return (
                    <Card
                      style={{ width: 330 }}
                      className="mr-2 col-sm-12 col-lg-4 card-hover card-item-cust p-0"
                      key={i}
                    >
                      <Card.Img height={170} variant="top" src={k.gambar} />
                      <Card.Body>
                        <Card.Title>{k.judul}</Card.Title>
                        <Card.Text>{k.deskripsi.slice(0, 70)} . .</Card.Text>
                        <div className="d-flex mt-3">
                          <span className="badge">
                            <i>Sertifikat</i>
                          </span>
                          <span
                            className="badge"
                            style={{ background: "blue" }}
                          >
                            <i>Online</i>
                          </span>
                          <span
                            className="badge"
                            style={{ background: "green" }}
                          >
                            <i>Mentor</i>
                          </span>
                        </div>
                        <hr />
                        <h6
                          style={{
                            textDecoration: "line-through",
                            color: "gray",
                          }}
                        >
                          Rp. {numberWithCommas(k.harga)}.-
                        </h6>
                        <div style={{ opacity: "0.9", width: "100%" }}>
                          <h5>Rp. {numberWithCommas(k.harga)}.-</h5>
                          <div className="button-detail">
                            <Link
                              style={{
                                marginLeft: "auto",
                                textDecoration: "none",
                                color: "white",
                              }}
                              to={`/kursus/${k.id}`}
                            >
                              Lihat Detail Kelas
                            </Link>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  );
                })}
              </div>
            </Card>
          </div>

          <div className="container mt-5">
            <Card className="card-home">
              <div className="d-flex">
                <h5>Kursus terlaris</h5>
                <p style={{ marginLeft: "auto" }}>Lihat semua</p>
              </div>
              <div className="row col-12 pl-4">
                {data.map((k, i) => {
                  return (
                    <Card
                      style={{ width: 330 }}
                      className="mr-2 col-sm-12 col-lg-4 card-hover card-item-cust p-0"
                      key={i}
                    >
                      <Card.Img height={170} variant="top" src={k.gambar} />
                      <Card.Body>
                        <Card.Title>{k.judul}</Card.Title>
                        <Card.Text>{k.deskripsi.slice(0, 70)} . .</Card.Text>
                        <div className="d-flex mt-3">
                          <span className="badge">
                            <i>Sertifikat</i>
                          </span>
                          <span
                            className="badge"
                            style={{ background: "blue" }}
                          >
                            <i>Online</i>
                          </span>
                          <span
                            className="badge"
                            style={{ background: "green" }}
                          >
                            <i>Mentor</i>
                          </span>
                        </div>
                        <hr />
                        <h6
                          style={{
                            textDecoration: "line-through",
                            color: "gray",
                          }}
                        >
                          Rp. {numberWithCommas(k.harga)}.-
                        </h6>
                        <div style={{ opacity: "0.9", width: "100%" }}>
                          <h5>Rp. {numberWithCommas(k.harga)}.-</h5>
                          <div className="button-detail">
                            <Link
                              style={{
                                marginLeft: "auto",
                                textDecoration: "none",
                                color: "white",
                              }}
                              to={`/kursus/${k.id}`}
                            >
                              Lihat Detail Kelas
                            </Link>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  );
                })}
              </div>
            </Card>
          </div>
          <HomeCarousel/>
          <Footer />
        </>
      )}
    </>
  );
}
