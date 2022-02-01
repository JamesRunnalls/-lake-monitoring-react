import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import location from "./img/location.svg";
import area from "./img/area.svg";
import depth from "./img/depth.svg";
import elevation from "./img/elevation.svg";
import phone from "./img/phone.svg";
import datalakes from "./img/datalakes.png";
import metadata from "./../../metadata.json";
import L from "leaflet";

class Data extends Component {
  state = {
    text: {
      DE: {
        title: "Temperaturmonitoring",
        titlebutton: "Andere Seen",
        interp: "Interpretation der Daten",
        linegraph: "Oberflächentemperatur",
        heatmap: "Wasser Temperatur",
        job1: "Wissenschaftlicher Betreuer des Projekts",
        job2: "Verantwortlicher Techniker",
        notfound: "See nicht gefunden!",
      },
      EN: {
        title: "Temperature Monitoring",
        titlebutton: "View Other Lakes",
        interp: "Data Interpretation",
        linegraph: "Surface Temperature",
        heatmap: "Water Temperature",
        job1: "Scientific Supervisor of the Project",
        job2: "Responsible Technician",
        notfound: "Lake not found!",
      },
      IT: {
        title: "Monitoraggio della Temperatura",
        titlebutton: "Altri Laghi",
        interp: "Interpretazione dei Dati",
        linegraph: "Temperatura Superficiale",
        heatmap: "Temperatura dell'Acqua",
        job1: "Responsabile Scientifico del Progetto",
        job2: "Tecnico Responsabile",
        notfound: "Lago non trovato!",
      },
      FR: {
        title: "Surveillance de la Température",
        titlebutton: "Autres Lacs",
        interp: "L'interprétation des Données",
        linegraph: "Température Superficielle",
        heatmap: "Température de l'Eau",
        job1: "Superviseur Scientifique du Projet",
        job2: "Technicien Responsable",
        notfound: "Lac introuvable!",
      },
    },
  };

  updateMap = () => {
    this.map.invalidateSize();
  };

  async componentDidMount() {
    var name = window.location.search.replace("?", "");
    if (Object.keys(metadata).includes(name)) {
      var location = L.latLng(metadata[name]["lat"], metadata[name]["lng"]);
      this.map = L.map("map", {
        preferCanvas: true,
        zoomControl: false,
        center: location,
        zoom: 15,
        minZoom: 8,
      });
      L.tileLayer(
        "https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg",
        {
          attribution:
            '<a title="Swiss Federal Office of Topography" href="https://www.swisstopo.admin.ch/">swisstopo</a>',
        }
      ).addTo(this.map);
      new L.marker(location, {
        id: name,
        icon: L.divIcon({
          className: "map-marker",
          html:
            `<div style="padding:10px;transform:translate(2px, -21px);position: absolute;">` +
            `<div class="pin bounce" id="${
              "pin-" + name
            }" style="background-color:#044E54" />` +
            `</div> `,
        }),
      }).addTo(this.map);
      window.addEventListener("resize", this.updateMap, false);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateMap, false);
  }
  render() {
    var { text } = this.state;
    var { lang } = this.props;
    var name = window.location.search.replace("?", "");
    if (Object.keys(metadata).includes(name)) {
      document.title = metadata[name]["name"] + " " + text[lang].title;
      return (
        <div className="data">
          <div className="title">
            {metadata[name]["name"]}{" "}
            <div className="extratitle">{text[lang].title}</div>
            <Link to={"/" + lang.toLowerCase()}>
              <div className="title-button">{text[lang].titlebutton}</div>
            </Link>
          </div>
          <div className="left">
            <div className="info-box">
              <div className="info-box-content">
                <div className="info">
                  <img src={location} alt="location" />{" "}
                  {metadata[name]["location"]}
                </div>
                <div className="info">
                  <img src={depth} alt="depth" /> {metadata[name]["depth"][0]}
                  <div className="unit">{metadata[name]["depth"][1]}</div>
                </div>
                <div className="info">
                  <img src={area} alt="area" /> {metadata[name]["area"][0]}
                  <div className="unit">{metadata[name]["area"][1]}</div>
                </div>
                <div className="info">
                  <img src={elevation} alt="elevation" />{" "}
                  {metadata[name]["elevation"][0]}
                  <div className="unit">{metadata[name]["elevation"][1]}</div>
                </div>
                <div id="map" />
              </div>
            </div>
            <div className="info-box">
              <div className="contact">
                <div className="contact-icon">
                  <img src={phone} alt="Phone" />
                </div>
                <div className="contact-text">
                  <div className="name">Fabian Bärenbold</div>
                  <div className="job">{text[lang].job1}</div>
                  <div className="phone">+41 58 765 21 77</div>
                  <div className="email">fabian.baerenbold@eawag.ch</div>
                </div>
              </div>
              <div className="contact">
                <div className="contact-icon">
                  <img src={phone} alt="Phone" />
                </div>
                <div className="contact-text">
                  <div className="name">Michael Plüss</div>
                  <div className="job">{text[lang].job2}</div>
                  <div className="phone">+41 58 765 22 55</div>
                  <div className="email">michael.pluess@eawag.ch</div>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="info-box">
              <div className="info-box-header">{text[lang].interp}</div>
              <div className="info-box-content">
                <div className="text">{metadata[name]["text"][lang]}</div>
              </div>
            </div>
            <div className="info-box">
              <div className="info-box-header">
                {text[lang].linegraph}
                <a
                  href={metadata[name]["linegraph"].split("?")[0]}
                  target="_blank"
                  title="View on Datalakes"
                  rel="noopener noreferrer"
                >
                  <img src={datalakes} alt="Datalakes" />
                </a>
              </div>
              <div className="info-box-content">
                <iframe src={metadata[name]["linegraph"]} title="Datalakes" />
              </div>
            </div>
            <div className="info-box">
              <div className="info-box-header">
                {text[lang].heatmap}
                <a
                  href={metadata[name]["heatmap"].split("?")[0]}
                  target="_blank"
                  title="View on Datalakes"
                  rel="noopener noreferrer"
                >
                  <img src={datalakes} alt="Datalakes" />
                </a>
              </div>
              <div className="info-box-content">
                <iframe src={metadata[name]["heatmap"]} title="Datalakes" />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      document.title = text[lang].notfound;
      return (
        <div className="notfound">
          {text[lang].notfound}
          <Link to={"/" + lang.toLowerCase()}>
            <div className="notfound-button">{text[lang].titlebutton}</div>
          </Link>
        </div>
      );
    }
  }
}

export default Data;
