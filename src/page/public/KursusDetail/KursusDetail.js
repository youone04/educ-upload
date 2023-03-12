import React, { useEffect, useState } from "react";
import NavbarComp from "../../../components/NavbarComp/NavbarComp";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetailKursusPublic } from "../../../redux/actions/actionsDetailKursusPublic/actionsDetailKursusPublic";
import CardKursusDetail from "./CardKursusDetail";
import ModalPembayaran from "./ModalPembayaran";
import { getToken } from "../../../redux/actions/actionLogin";
import { getMetodePembayaran } from "../../../redux/actions/actionMetodePembayaran/actionMetodePembayaran";
import Footer from "../../../components/Footer/Footer";
import { getKursusPublic } from "../../../redux/actions/actionKursusPublic/actionKursusPublic";
import Card from "react-bootstrap/Card";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import numberWithCommas from "../../../func/numberWithCommas";

function KursusDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const getDataDetailKursus = useSelector(
    (state) => state.dataDetailKursusPublic
  );
  const { data, loading, error } = getDataDetailKursus.detailKursusPublic;

  const getDataLogin = useSelector((state) => state.login);
  const { token } = getDataLogin.login;

  const getMetodePem = useSelector((state) => state.dataMetodePembayaran);
  const {
    data: dataMetodePembayaran,
    loading: loadingMetodePem,
    error: errorMetodePem,
  } = getMetodePem.metodePembayaran;

  const getKursusPublicData = useSelector((state) => state.dataKursusPublic);
  const {
    data: dataKursus,
    loading: loadingKursus,
    error: errorKursus,
  } = getKursusPublicData.kursusPublic;

  const [modalShow, setModalShow] = useState(false);
  const [jadwal, setDataJadwal] = useState([]);

  useEffect(() => {
    dispatch(getDetailKursusPublic(id));
    dispatch(getToken());
    dispatch(getKursusPublic());
    dispatch(getMetodePembayaran());
  }, [dispatch, id]);

  const handleShowButton = (data) => {
    setModalShow(true);
    setDataJadwal(data);
  };

  return (
    <>
      <NavbarComp />
      {loading || loadingMetodePem || loadingKursus ? (
        <p>loading</p>
      ) : error || errorMetodePem || errorKursus ? (
        <p>{error || errorMetodePem || errorKursus}</p>
      ) : (
        <>
          <ModalPembayaran
            token={token}
            jadwal={jadwal}
            show={modalShow}
            data={data}
            metode={dataMetodePembayaran}
            onHide={() => setModalShow(false)}
          />
          <CardKursusDetail handleShowButton={handleShowButton} data={data} />

          <div className="container mt-5">
            <Card className="card-home">
              <div className="d-flex">
                <h5>Kursus terbaru</h5>
              </div>
              <div className="row col-12 pl-4">
                {dataKursus.filter(d => d.id != id).map((k, i) => {
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

          <Footer />
        </>
      )}
    </>
  );
}

export default KursusDetail;
